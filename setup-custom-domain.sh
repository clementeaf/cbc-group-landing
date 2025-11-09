#!/bin/bash

# Script para configurar dominio personalizado en CloudFront
# Dominio: cbcgroup.cl
# CloudFront Distribution ID: E3UDQPNOG879DF

set -e

DOMAIN="cbcgroup.cl"
DISTRIBUTION_ID="E3UDQPNOG879DF"
REGION="us-east-1"

echo "🌐 Configurando dominio personalizado: $DOMAIN"
echo ""

# 1. Crear certificado SSL en ACM
echo "📜 Paso 1: Creando certificado SSL en ACM..."
CERT_ARN=$(aws acm request-certificate \
    --domain-name "$DOMAIN" \
    --subject-alternative-names "www.$DOMAIN" \
    --validation-method DNS \
    --region "$REGION" \
    --query 'CertificateArn' \
    --output text 2>/dev/null || echo "")

if [ -z "$CERT_ARN" ]; then
    echo "⚠️  El certificado ya existe o hubo un error. Verificando certificados existentes..."
    CERT_ARN=$(aws acm list-certificates --region "$REGION" \
        --query "CertificateSummaryList[?DomainName=='$DOMAIN' || DomainName=='www.$DOMAIN'][0].CertificateArn" \
        --output text)
    
    if [ -z "$CERT_ARN" ] || [ "$CERT_ARN" == "None" ]; then
        echo "❌ No se pudo crear ni encontrar un certificado. Por favor, crea uno manualmente en ACM."
        exit 1
    fi
fi

echo "✅ Certificado encontrado/creado: $CERT_ARN"
echo ""

# 2. Obtener información de validación del certificado
echo "📋 Paso 2: Obteniendo información de validación del certificado..."
sleep 2

VALIDATION_RECORDS=$(aws acm describe-certificate \
    --certificate-arn "$CERT_ARN" \
    --region "$REGION" \
    --query 'Certificate.DomainValidationOptions[*].[DomainName,ResourceRecord.Name,ResourceRecord.Value]' \
    --output text)

if [ -z "$VALIDATION_RECORDS" ]; then
    echo "⚠️  Los registros de validación aún no están disponibles. Espera unos minutos y ejecuta:"
    echo "   aws acm describe-certificate --certificate-arn $CERT_ARN --region $REGION"
    echo ""
    echo "Luego continúa con el paso 3 manualmente."
else
    echo "✅ Registros de validación obtenidos:"
    echo "$VALIDATION_RECORDS" | while read -r domain name value; do
        echo "   Dominio: $domain"
        echo "   Nombre: $name"
        echo "   Valor: $value"
        echo ""
    done
fi

echo ""
echo "📝 Paso 3: Configura estos registros DNS en GoDaddy:"
echo ""
echo "1. Ve a: https://dcc.godaddy.com/control/portfolio/cbcgroup.cl/settings"
echo "2. Haz clic en 'Administrar DNS'"
echo "3. Agrega los siguientes registros CNAME para validar el certificado:"
echo ""
if [ -n "$VALIDATION_RECORDS" ]; then
    echo "$VALIDATION_RECORDS" | while read -r domain name value; do
        echo "   Tipo: CNAME"
        echo "   Nombre: $(echo $name | sed "s/.$DOMAIN.//")"
        echo "   Valor: $value"
        echo "   TTL: 600 (o el valor por defecto)"
        echo ""
    done
fi

echo "4. También agrega un registro CNAME para apuntar el dominio a CloudFront:"
echo "   Tipo: CNAME"
echo "   Nombre: @ (o deja en blanco para el dominio raíz)"
echo "   Valor: d2e7ltyhy5atb5.cloudfront.net"
echo "   TTL: 600"
echo ""
echo "   Y para www:"
echo "   Tipo: CNAME"
echo "   Nombre: www"
echo "   Valor: d2e7ltyhy5atb5.cloudfront.net"
echo "   TTL: 600"
echo ""

echo "⏳ Paso 4: Espera a que el certificado se valide (puede tomar 5-30 minutos)"
echo "   Verifica el estado con:"
echo "   aws acm describe-certificate --certificate-arn $CERT_ARN --region $REGION"
echo ""

echo "🚀 Paso 5: Una vez validado el certificado, ejecuta:"
echo "   ./update-cloudfront-domain.sh $CERT_ARN"
echo ""

echo "📌 Información importante:"
echo "   Certificado ARN: $CERT_ARN"
echo "   Distribution ID: $DISTRIBUTION_ID"
echo "   Dominio: $DOMAIN"
echo "   CloudFront Domain: d2e7ltyhy5atb5.cloudfront.net"

