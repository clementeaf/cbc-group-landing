#!/bin/bash

# Script de ayuda para configurar secrets de GitHub
# Este script te guía en el proceso de configuración

set -e

echo "🔐 Configuración de Secrets para GitHub Actions"
echo "================================================"
echo ""
echo "Este script te ayudará a obtener la información necesaria"
echo "para configurar los secrets en GitHub."
echo ""
echo "📋 Secrets necesarios:"
echo "   1. AWS_ACCESS_KEY_ID"
echo "   2. AWS_SECRET_ACCESS_KEY"
echo "   3. S3_BUCKET_NAME"
echo "   4. CLOUDFRONT_DISTRIBUTION_ID (opcional)"
echo "   5. AWS_REGION (opcional, default: us-east-1)"
echo ""

# Verificar AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI no está instalado. Por favor instálalo primero."
    exit 1
fi

# Verificar que AWS está configurado
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI no está configurado. Ejecuta 'aws configure' primero."
    exit 1
fi

echo "✅ AWS CLI configurado correctamente"
echo ""

# Obtener información de AWS
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(aws configure get region || echo "us-east-1")

echo "📊 Información de AWS:"
echo "   Account ID: $AWS_ACCOUNT_ID"
echo "   Región: $AWS_REGION"
echo ""

# Solicitar bucket name
read -p "📦 Nombre del bucket S3 (o presiona Enter para usar 'cbc-group-landing'): " BUCKET_NAME
BUCKET_NAME=${BUCKET_NAME:-cbc-group-landing}

echo ""
echo "🔍 Verificando bucket S3..."
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 > /dev/null; then
    echo "✅ Bucket encontrado: $BUCKET_NAME"
else
    echo "⚠️  Bucket no encontrado. ¿Quieres crearlo? (y/n)"
    read -p "   " CREATE_BUCKET
    if [ "$CREATE_BUCKET" = "y" ] || [ "$CREATE_BUCKET" = "Y" ]; then
        echo "📦 Creando bucket..."
        aws s3 mb "s3://$BUCKET_NAME" --region "$AWS_REGION"
        echo "✅ Bucket creado"
    else
        echo "⚠️  Asegúrate de crear el bucket antes de configurar los secrets"
    fi
fi

echo ""
echo "☁️  Verificando distribuciones de CloudFront..."
DISTRIBUTIONS=$(aws cloudfront list-distributions --query 'DistributionList.Items[*].[Id,Comment]' --output text)

if [ -n "$DISTRIBUTIONS" ]; then
    echo "📋 Distribuciones encontradas:"
    echo "$DISTRIBUTIONS" | while read -r id comment; do
        echo "   ID: $id - Comment: $comment"
    done
    echo ""
    read -p "🔗 ID de distribución de CloudFront (o presiona Enter para omitir): " DISTRIBUTION_ID
else
    echo "⚠️  No se encontraron distribuciones de CloudFront"
    DISTRIBUTION_ID=""
fi

echo ""
echo "================================================"
echo "📝 INFORMACIÓN PARA CONFIGURAR EN GITHUB"
echo "================================================"
echo ""
echo "Ve a: https://github.com/clementeaf/cbc-group-landing/settings/secrets/actions"
echo ""
echo "Agrega los siguientes secrets:"
echo ""
echo "1. AWS_ACCESS_KEY_ID"
echo "   Valor: $(aws configure get aws_access_key_id)"
echo ""
echo "2. AWS_SECRET_ACCESS_KEY"
echo "   Valor: $(aws configure get aws_secret_access_key)"
echo ""
echo "3. S3_BUCKET_NAME"
echo "   Valor: $BUCKET_NAME"
echo ""

if [ -n "$DISTRIBUTION_ID" ]; then
    echo "4. CLOUDFRONT_DISTRIBUTION_ID"
    echo "   Valor: $DISTRIBUTION_ID"
    echo ""
fi

echo "5. AWS_REGION (opcional)"
echo "   Valor: $AWS_REGION"
echo ""
echo "================================================"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   - No compartas estas credenciales públicamente"
echo "   - Es recomendable crear un usuario IAM específico para CI/CD"
echo "   - Ver CI_CD_SETUP.md para más información"
echo ""

