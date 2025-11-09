#!/bin/bash

# Script para crear CloudFront Function que redirige www a no-www
# Uso: ./create-redirect-function.sh

set -e

FUNCTION_NAME="redirect-www-to-non-www"
DISTRIBUTION_ID="E3UDQPNOG879DF"

echo "🔧 Creando CloudFront Function para redirigir www a no-www..."

# Crear la función
FUNCTION_CODE='function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;
    
    if (host.startsWith("www.")) {
        var newHost = host.replace("www.", "");
        return {
            statusCode: 301,
            statusDescription: "Moved Permanently",
            headers: {
                location: { value: "https://" + newHost + request.uri + (request.querystring ? "?" + request.querystring : "") }
            }
        };
    }
    
    return request;
}'

# Verificar si la función ya existe
EXISTING_FUNCTION=$(aws cloudfront list-functions --query "FunctionList[?Name=='$FUNCTION_NAME'].Name" --output text 2>/dev/null || echo "")

if [ -n "$EXISTING_FUNCTION" ]; then
    echo "⚠️  La función ya existe. Actualizando..."
    
    # Obtener ETag de la función existente
    FUNCTION_ETAG=$(aws cloudfront describe-function --name "$FUNCTION_NAME" --query 'ETag' --output text)
    
    # Actualizar función
    echo "$FUNCTION_CODE" | aws cloudfront update-function \
        --name "$FUNCTION_NAME" \
        --function-code file:///dev/stdin \
        --function-config Comment="Redirect www to non-www",Runtime="cloudfront-js-1.0" \
        --if-match "$FUNCTION_ETAG" \
        --query 'FunctionSummary.{Name:Name,Status:Status}' \
        --output table
    
    echo "✅ Función actualizada. Publicando..."
    PUBLISH_ETAG=$(aws cloudfront describe-function --name "$FUNCTION_NAME" --query 'ETag' --output text)
    aws cloudfront publish-function --name "$FUNCTION_NAME" --if-match "$PUBLISH_ETAG" > /dev/null
else
    echo "📝 Creando nueva función..."
    
    # Crear función
    echo "$FUNCTION_CODE" | aws cloudfront create-function \
        --name "$FUNCTION_NAME" \
        --function-code file:///dev/stdin \
        --function-config Comment="Redirect www to non-www",Runtime="cloudfront-js-1.0" \
        --query 'FunctionSummary.{Name:Name,Status:Status}' \
        --output table
    
    echo "✅ Función creada. Publicando..."
    PUBLISH_ETAG=$(aws cloudfront describe-function --name "$FUNCTION_NAME" --query 'ETag' --output text)
    aws cloudfront publish-function --name "$FUNCTION_NAME" --if-match "$PUBLISH_ETAG" > /dev/null
fi

echo ""
echo "✅ Función CloudFront creada/actualizada exitosamente!"
echo ""
echo "📝 Siguiente paso: Asociar la función a CloudFront"
echo "   Ejecuta: ./associate-function-to-cloudfront.sh"

