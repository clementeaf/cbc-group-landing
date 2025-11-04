# Despliegue Rápido a S3/CloudFront

## Opción 1: Configuración Automática (Recomendado)

```bash
# 1. Configurar infraestructura AWS
./setup-aws.sh

# 2. Copiar las variables de entorno que se muestran
export S3_BUCKET_NAME="tu-bucket-name"
export CLOUDFRONT_DISTRIBUTION_ID="tu-distribution-id"
export AWS_REGION="us-east-1"

# 3. Desplegar
./deploy.sh
```

## Opción 2: Configuración Manual

Si ya tienes un bucket S3 y distribución CloudFront configurados:

```bash
# Configurar variables de entorno
export S3_BUCKET_NAME="tu-bucket-name"
export CLOUDFRONT_DISTRIBUTION_ID="tu-distribution-id"
export AWS_REGION="us-east-1"

# Desplegar
./deploy.sh
```

## Verificación

Después del despliegue, espera 5-15 minutos para que CloudFront propague los cambios y luego visita:

- **URL de S3**: `http://$S3_BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com`
- **URL de CloudFront**: (configurada en tu distribución)

## Próximos Pasos

1. Configurar dominio personalizado en CloudFront (opcional)
2. Configurar SSL/TLS automático
3. Configurar CI/CD para despliegues automáticos

Ver `DEPLOY.md` para información detallada.

