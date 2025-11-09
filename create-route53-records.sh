#!/bin/bash

# Script para crear registros DNS en Route 53
# Uso: ./create-route53-records.sh <HOSTED_ZONE_ID>

set -e

if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar el Hosted Zone ID"
    echo "   Uso: ./create-route53-records.sh <HOSTED_ZONE_ID>"
    exit 1
fi

HOSTED_ZONE_ID="$1"
DOMAIN="cbcgroup.cl"
CLOUDFRONT_DOMAIN="d2e7ltyhy5atb5.cloudfront.net"

echo "📝 Creando registros DNS en Route 53..."

# Crear registro ALIAS para dominio raíz
echo "📌 Creando registro ALIAS para $DOMAIN..."
cat > /tmp/route53-apex.json << EOF
{
    "Changes": [
        {
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": "$DOMAIN.",
                "Type": "A",
                "AliasTarget": {
                    "HostedZoneId": "Z2FDTNDATAQYW2",
                    "DNSName": "$CLOUDFRONT_DOMAIN",
                    "EvaluateTargetHealth": false
                }
            }
        },
        {
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": "$DOMAIN.",
                "Type": "AAAA",
                "AliasTarget": {
                    "HostedZoneId": "Z2FDTNDATAQYW2",
                    "DNSName": "$CLOUDFRONT_DOMAIN",
                    "EvaluateTargetHealth": false
                }
            }
        },
        {
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": "www.$DOMAIN.",
                "Type": "CNAME",
                "TTL": 300,
                "ResourceRecords": [
                    {
                        "Value": "$CLOUDFRONT_DOMAIN"
                    }
                ]
            }
        }
    ]
}
EOF

aws route53 change-resource-record-sets \
    --hosted-zone-id "$HOSTED_ZONE_ID" \
    --change-batch file:///tmp/route53-apex.json \
    --query 'ChangeInfo.{Id:Id,Status:Status}' \
    --output table

rm /tmp/route53-apex.json

echo ""
echo "✅ Registros DNS creados exitosamente!"
echo ""
echo "🌐 Registros configurados:"
echo "   - $DOMAIN (ALIAS → $CLOUDFRONT_DOMAIN)"
echo "   - www.$DOMAIN (CNAME → $CLOUDFRONT_DOMAIN)"
echo ""
echo "⏳ Nota: Los cambios DNS pueden tardar 5-30 minutos en propagarse."

