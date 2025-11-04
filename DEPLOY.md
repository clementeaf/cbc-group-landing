# Guía de Despliegue a S3/CloudFront

Esta guía explica cómo desplegar la aplicación CBC Group Landing a AWS S3 y CloudFront.

## Prerrequisitos

1. **AWS CLI instalado y configurado**
   ```bash
   aws --version
   aws configure
   ```

2. **Permisos de AWS necesarios**:
   - `s3:CreateBucket`
   - `s3:PutObject`
   - `s3:GetObject`
   - `s3:DeleteObject`
   - `s3:ListBucket`
   - `s3:PutBucketPolicy`
   - `s3:PutBucketWebsite`
   - `cloudfront:CreateInvalidation`
   - `cloudfront:GetDistribution`

## Configuración Inicial

### 1. Crear S3 Bucket

```bash
# Reemplaza 'cbc-group-landing' con el nombre de tu bucket
export S3_BUCKET_NAME="cbc-group-landing"
export AWS_REGION="us-east-1"

# Crear bucket
aws s3 mb s3://$S3_BUCKET_NAME --region $AWS_REGION

# Habilitar hosting estático
aws s3 website s3://$S3_BUCKET_NAME \
    --index-document index.html \
    --error-document index.html
```

### 2. Configurar Política de Bucket

```bash
# Crear política de bucket para acceso público
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$S3_BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $S3_BUCKET_NAME --policy file://bucket-policy.json
```

### 3. Bloquear Acceso Público (Opcional pero recomendado)

Si usas CloudFront, puedes bloquear el acceso público directo al bucket:

```bash
aws s3api put-public-access-block \
    --bucket $S3_BUCKET_NAME \
    --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### 4. Crear Distribución de CloudFront

```bash
# Crear distribución de CloudFront
aws cloudfront create-distribution \
    --origin-domain-name $S3_BUCKET_NAME.s3.amazonaws.com \
    --default-root-object index.html \
    --enabled \
    --comment "CBC Group Landing Distribution"
```

Anota el `Distribution ID` que se retorna.

### 5. Configurar Variables de Entorno

```bash
export S3_BUCKET_NAME="cbc-group-landing"
export CLOUDFRONT_DISTRIBUTION_ID="E1234567890ABC"  # Reemplaza con tu Distribution ID
export AWS_REGION="us-east-1"
```

O crea un archivo `.env.deploy`:

```bash
S3_BUCKET_NAME=cbc-group-landing
CLOUDFRONT_DISTRIBUTION_ID=E1234567890ABC
AWS_REGION=us-east-1
```

## Despliegue

### Opción 1: Usar el Script de Despliegue

```bash
# Dar permisos de ejecución
chmod +x deploy.sh

# Ejecutar despliegue
./deploy.sh
```

### Opción 2: Despliegue Manual

```bash
# 1. Construir la aplicación
npm run build

# 2. Subir archivos a S3
aws s3 sync dist/ s3://$S3_BUCKET_NAME \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html"

# 3. Subir HTML con cache corto
aws s3 sync dist/ s3://$S3_BUCKET_NAME \
    --delete \
    --cache-control "public, max-age=0, must-revalidate" \
    --include "*.html"

# 4. Invalidar cache de CloudFront
aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"
```

## Verificación

Después del despliegue, verifica que todo funcione:

1. **URL de S3** (si no usas CloudFront):
   ```
   http://$S3_BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com
   ```

2. **URL de CloudFront**:
   ```
   https://$DOMAIN_NAME.cloudfront.net
   ```

## Automatización con CI/CD

Puedes integrar este despliegue en tu pipeline de CI/CD:

```yaml
# Ejemplo para GitHub Actions
- name: Deploy to S3
  run: |
    chmod +x deploy.sh
    ./deploy.sh
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    S3_BUCKET_NAME: ${{ secrets.S3_BUCKET_NAME }}
    CLOUDFRONT_DISTRIBUTION_ID: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
```

## Troubleshooting

### Error: Bucket already exists
- El bucket debe tener un nombre único globalmente. Usa un nombre diferente.

### Error: Access Denied
- Verifica que tu usuario de AWS tenga los permisos necesarios.
- Verifica que la política del bucket permita acceso público.

### CloudFront no muestra cambios
- Espera a que la invalidación se complete (puede tomar 5-15 minutos).
- Verifica que los archivos se hayan subido correctamente a S3.

