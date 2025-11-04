#!/bin/bash

# Script de configuración inicial de AWS S3 y CloudFront
# Este script configura la infraestructura necesaria para el despliegue

set -e

# Variables de configuración
BUCKET_NAME="${S3_BUCKET_NAME:-cbc-group-landing-$(date +%s)}"
REGION="${AWS_REGION:-us-east-1}"

echo "🔧 Configurando infraestructura AWS..."

# 1. Crear S3 Bucket
echo "📦 Creando bucket S3: $BUCKET_NAME"
aws s3 mb "s3://$BUCKET_NAME" --region "$REGION" || {
    echo "⚠️  El bucket ya existe o hay un error. Continuando..."
}

# 2. Habilitar hosting estático
echo "🌐 Configurando hosting estático..."
aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html

# 3. Configurar política de bucket
echo "📋 Configurando política de bucket..."
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

# 4. Configurar CORS (opcional pero recomendado)
echo "🌍 Configurando CORS..."
cat > /tmp/cors.json << EOF
{
    "CORSRules": [
        {
            "AllowedOrigins": ["*"],
            "AllowedMethods": ["GET", "HEAD"],
            "AllowedHeaders": ["*"],
            "MaxAgeSeconds": 3000
        }
    ]
}
EOF

aws s3api put-bucket-cors --bucket "$BUCKET_NAME" --cors-configuration file:///tmp/cors.json
rm /tmp/cors.json

# 5. Crear distribución de CloudFront
echo "☁️  Creando distribución de CloudFront..."
cat > /tmp/cloudfront-config.json << EOF
{
    "CallerReference": "$(date +%s)",
    "Comment": "CBC Group Landing Distribution",
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3.amazonaws.com",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true
    },
    "Enabled": true,
    "PriceClass": "PriceClass_100"
}
EOF

DISTRIBUTION_OUTPUT=$(aws cloudfront create-distribution --distribution-config file:///tmp/cloudfront-config.json)
DISTRIBUTION_ID=$(echo "$DISTRIBUTION_OUTPUT" | grep -o '"Id": "[^"]*' | cut -d'"' -f4)
rm /tmp/cloudfront-config.json

echo ""
echo "✅ Configuración completada!"
echo ""
echo "📝 Información importante:"
echo "   Bucket S3: $BUCKET_NAME"
echo "   Distribution ID: $DISTRIBUTION_ID"
echo "   Región: $REGION"
echo ""
echo "🔧 Configura estas variables de entorno:"
echo "   export S3_BUCKET_NAME=\"$BUCKET_NAME\""
echo "   export CLOUDFRONT_DISTRIBUTION_ID=\"$DISTRIBUTION_ID\""
echo "   export AWS_REGION=\"$REGION\""
echo ""
echo "⏳ Nota: La distribución de CloudFront puede tomar 15-20 minutos en estar lista."
echo "   Puedes verificar el estado con:"
echo "   aws cloudfront get-distribution --id $DISTRIBUTION_ID"

