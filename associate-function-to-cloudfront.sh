#!/bin/bash

# Script para asociar CloudFront Function a la distribución
# Uso: ./associate-function-to-cloudfront.sh

set -e

FUNCTION_NAME="redirect-www-to-non-www"
DISTRIBUTION_ID="E3UDQPNOG879DF"

echo "🔗 Asociando CloudFront Function a la distribución..."

# Obtener configuración actual
ETAG=$(aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --query 'ETag' \
    --output text)

aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --query 'DistributionConfig' \
    --output json > /tmp/cloudfront-config-function.json

# Obtener ARN de la función
FUNCTION_ARN=$(aws cloudfront describe-function --name "$FUNCTION_NAME" --query 'FunctionSummary.FunctionARN' --output text)

echo "📝 Función ARN: $FUNCTION_ARN"

# Actualizar configuración para asociar la función
python3 << EOF
import json

with open('/tmp/cloudfront-config-function.json', 'r') as f:
    config = json.load(f)

# Asociar función al comportamiento por defecto
default_cache_behavior = config['DefaultCacheBehavior']

# Verificar si ya existe FunctionAssociations
if 'FunctionAssociations' not in default_cache_behavior:
    default_cache_behavior['FunctionAssociations'] = {
        'Quantity': 0,
        'Items': []
    }

# Agregar función de redirección
function_associations = default_cache_behavior['FunctionAssociations']
function_associations['Items'].append({
    'FunctionARN': '$FUNCTION_ARN',
    'EventType': 'viewer-request'
})
function_associations['Quantity'] = len(function_associations['Items'])

with open('/tmp/cloudfront-config-function.json', 'w') as f:
    json.dump(config, f, indent=2)
EOF

# Actualizar distribución
echo "📤 Aplicando cambios a CloudFront..."
aws cloudfront update-distribution \
    --id "$DISTRIBUTION_ID" \
    --distribution-config file:///tmp/cloudfront-config-function.json \
    --if-match "$ETAG" \
    --query 'Distribution.{Id:Id,Status:Status,DomainName:DomainName}' \
    --output table

rm /tmp/cloudfront-config-function.json

echo ""
echo "✅ Función asociada exitosamente!"
echo ""
echo "⏳ Nota: Los cambios pueden tardar 15-20 minutos en propagarse."
echo "   Verifica el estado con:"
echo "   aws cloudfront get-distribution --id $DISTRIBUTION_ID --query 'Distribution.Status' --output text"

