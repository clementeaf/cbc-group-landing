#!/bin/bash

# Script para configurar Route 53 para el dominio cbcgroup.cl
# Esto permite usar ALIAS records para el dominio raíz

set -e

DOMAIN="cbcgroup.cl"
CLOUDFRONT_DOMAIN="d2e7ltyhy5atb5.cloudfront.net"
HOSTED_ZONE_NAME="${DOMAIN}."

echo "🌐 Configurando Route 53 para $DOMAIN..."

# Verificar si ya existe una hosted zone
EXISTING_ZONE=$(aws route53 list-hosted-zones-by-name \
    --dns-name "$HOSTED_ZONE_NAME" \
    --query 'HostedZones[?Name==`'"$HOSTED_ZONE_NAME"'`].Id' \
    --output text 2>/dev/null || echo "")

if [ -z "$EXISTING_ZONE" ] || [ "$EXISTING_ZONE" == "None" ]; then
    echo "📝 Creando hosted zone en Route 53..."
    ZONE_OUTPUT=$(aws route53 create-hosted-zone \
        --name "$DOMAIN" \
        --caller-reference "cbcgroup-cl-$(date +%s)")
    
    HOSTED_ZONE_ID=$(echo "$ZONE_OUTPUT" | grep -o '"Id": "/hostedzone/[^"]*' | cut -d'/' -f3)
    echo "✅ Hosted zone creada: $HOSTED_ZONE_ID"
else
    HOSTED_ZONE_ID=$(echo "$EXISTING_ZONE" | cut -d'/' -f3)
    echo "✅ Hosted zone existente encontrada: $HOSTED_ZONE_ID"
fi

# Obtener nameservers
echo "📋 Obteniendo nameservers..."
NAMESERVERS=$(aws route53 get-hosted-zone \
    --id "$HOSTED_ZONE_ID" \
    --query 'DelegationSet.NameServers' \
    --output text)

echo ""
echo "✅ Configuración completada!"
echo ""
echo "📝 IMPORTANTE: Debes cambiar los nameservers en GoDaddy a:"
echo ""
for ns in $NAMESERVERS; do
    echo "   - $ns"
done
echo ""
echo "🔧 Pasos en GoDaddy:"
echo "   1. Ve a: https://dcc.godaddy.com/control/portfolio/cbcgroup.cl/settings"
echo "   2. Haz clic en 'Administrar DNS'"
echo "   3. Busca la sección 'Nameservers' o 'Servidores de nombres'"
echo "   4. Cambia a 'Personalizados' y agrega los nameservers de arriba"
echo ""
echo "📌 Hosted Zone ID: $HOSTED_ZONE_ID"
echo ""
echo "🚀 Después de cambiar los nameservers, ejecuta:"
echo "   ./create-route53-records.sh $HOSTED_ZONE_ID"

