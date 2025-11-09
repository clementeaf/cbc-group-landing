#!/bin/bash

# Script para actualizar CloudFront con dominio personalizado
# Uso: ./update-cloudfront-domain.sh <CERTIFICATE_ARN>

set -e

if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar el ARN del certificado SSL"
    echo "   Uso: ./update-cloudfront-domain.sh <CERTIFICATE_ARN>"
    exit 1
fi

CERT_ARN="$1"
DOMAIN="cbcgroup.cl"
DISTRIBUTION_ID="E3UDQPNOG879DF"

echo "🔄 Actualizando CloudFront con dominio personalizado..."
echo "   Dominio: $DOMAIN"
echo "   Certificado: $CERT_ARN"
echo ""

# Obtener configuración actual
echo "📥 Obteniendo configuración actual de CloudFront..."
ETAG=$(aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --query 'ETag' \
    --output text)

aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --query 'DistributionConfig' \
    --output json > /tmp/cloudfront-config-update.json

# Actualizar configuración con alias y certificado
echo "✏️  Actualizando configuración..."

# Usar Python para actualizar el JSON de forma segura
python3 << EOF
import json

with open('/tmp/cloudfront-config-update.json', 'r') as f:
    config = json.load(f)

# Agregar alias
config['Aliases'] = {
    'Quantity': 2,
    'Items': ['$DOMAIN', 'www.$DOMAIN']
}

# Actualizar certificado SSL
config['ViewerCertificate'] = {
    'CloudFrontDefaultCertificate': False,
    'ACMCertificateArn': '$CERT_ARN',
    'SSLSupportMethod': 'sni-only',
    'MinimumProtocolVersion': 'TLSv1.2_2021',
    'CertificateSource': 'acm'
}

with open('/tmp/cloudfront-config-update.json', 'w') as f:
    json.dump(config, f, indent=2)
EOF

# Actualizar distribución
echo "📤 Aplicando cambios a CloudFront..."
aws cloudfront update-distribution \
    --id "$DISTRIBUTION_ID" \
    --distribution-config file:///tmp/cloudfront-config-update.json \
    --if-match "$ETAG" \
    --query 'Distribution.{Id:Id,Status:Status,DomainName:DomainName}' \
    --output table

rm /tmp/cloudfront-config-update.json

echo ""
echo "✅ CloudFront actualizado exitosamente!"
echo ""
echo "📝 Siguiente paso: Crear y asociar función de redirección"
echo "   1. Ejecuta: ./create-redirect-function.sh"
echo "   2. Luego: ./associate-function-to-cloudfront.sh"
echo ""
echo "⏳ Nota: Los cambios pueden tardar 15-20 minutos en propagarse."
echo "   Verifica el estado con:"
echo "   aws cloudfront get-distribution --id $DISTRIBUTION_ID --query 'Distribution.Status' --output text"
echo ""
echo "🌐 Una vez propagado, el sitio estará disponible en:"
echo "   https://$DOMAIN (URL principal)"
echo "   https://www.$DOMAIN (redirigirá automáticamente a $DOMAIN)"

