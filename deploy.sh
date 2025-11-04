#!/bin/bash

# Script de despliegue a S3/CloudFront para CBC Group Landing
# Asegúrate de tener AWS CLI configurado con las credenciales apropiadas

set -e

# Variables de configuración
BUCKET_NAME="${S3_BUCKET_NAME:-cbc-group-landing}"
DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"
REGION="${AWS_REGION:-us-east-1}"

echo "🚀 Iniciando despliegue a S3/CloudFront..."

# 1. Construir la aplicación
echo "📦 Construyendo aplicación..."
npm run build

# 2. Verificar que el bucket existe
echo "🔍 Verificando bucket S3: $BUCKET_NAME"
if ! aws s3 ls "s3://$BUCKET_NAME" 2>&1 > /dev/null; then
    echo "❌ El bucket $BUCKET_NAME no existe. Creándolo..."
    aws s3 mb "s3://$BUCKET_NAME" --region "$REGION"
    
    # Configurar bucket para hosting estático
    aws s3 website "s3://$BUCKET_NAME" \
        --index-document index.html \
        --error-document index.html
    
    # Configurar política de bucket para acceso público de lectura
    cat > /tmp/bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF
    aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file:///tmp/bucket-policy.json
    rm /tmp/bucket-policy.json
fi

# 3. Sincronizar archivos al bucket (eliminar archivos obsoletos)
echo "📤 Subiendo archivos a S3..."
aws s3 sync dist/ "s3://$BUCKET_NAME" \
    --delete \
    --region "$REGION" \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "service-worker.js"

# Subir HTML con cache más corto
aws s3 sync dist/ "s3://$BUCKET_NAME" \
    --delete \
    --region "$REGION" \
    --cache-control "public, max-age=0, must-revalidate" \
    --include "*.html"

# 4. Invalidar cache de CloudFront si hay distribution ID
if [ -n "$DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidando cache de CloudFront..."
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id "$DISTRIBUTION_ID" \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)
    echo "✅ Invalidación creada: $INVALIDATION_ID"
else
    echo "⚠️  CLOUDFRONT_DISTRIBUTION_ID no configurado. Saltando invalidación de cache."
fi

echo "✅ ¡Despliegue completado exitosamente!"
echo "🌐 URL del sitio: https://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
if [ -n "$DISTRIBUTION_ID" ]; then
    DOMAIN=$(aws cloudfront get-distribution --id "$DISTRIBUTION_ID" --query 'Distribution.DomainName' --output text)
    echo "🌐 URL de CloudFront: https://$DOMAIN"
fi

