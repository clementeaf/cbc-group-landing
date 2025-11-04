# Configuración de CI/CD para Despliegue Automático

Este proyecto está configurado para desplegarse automáticamente a S3/CloudFront después de cada push (incluyendo merges) y cada commit.

## Workflows de GitHub Actions

Se han creado dos workflows:

1. **`.github/workflows/deploy.yml`**: Despliegue completo con invalidación de CloudFront
2. **`.github/workflows/deploy-on-commit.yml`**: Despliegue rápido en cada commit

## Configuración de Secrets en GitHub

Necesitas configurar los siguientes secrets en tu repositorio de GitHub:

### Pasos para configurar secrets:

1. Ve a tu repositorio en GitHub: `https://github.com/clementeaf/cbc-group-landing`
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret**
4. Agrega los siguientes secrets:

#### Secrets Requeridos:

| Secret Name | Descripción | Ejemplo |
|------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | ID de acceso de AWS | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | Clave secreta de AWS | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `S3_BUCKET_NAME` | Nombre del bucket S3 | `cbc-group-landing` |
| `CLOUDFRONT_DISTRIBUTION_ID` | ID de distribución de CloudFront | `E1234567890ABC` |
| `AWS_REGION` | Región de AWS (opcional, default: us-east-1) | `us-east-1` |

### Crear Usuario IAM para CI/CD (Recomendado)

Es recomendable crear un usuario IAM específico para CI/CD con permisos limitados:

```bash
# 1. Crear usuario IAM
aws iam create-user --user-name cbc-group-landing-deploy

# 2. Crear política con permisos mínimos
cat > /tmp/deploy-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket",
                "s3:PutObjectAcl"
            ],
            "Resource": [
                "arn:aws:s3:::cbc-group-landing/*",
                "arn:aws:s3:::cbc-group-landing"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetInvalidation"
            ],
            "Resource": "*"
        }
    ]
}
EOF

# 3. Crear política
aws iam create-policy \
    --policy-name CBCGroupLandingDeployPolicy \
    --policy-document file:///tmp/deploy-policy.json

# 4. Adjuntar política al usuario
aws iam attach-user-policy \
    --user-name cbc-group-landing-deploy \
    --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/CBCGroupLandingDeployPolicy

# 5. Crear access key
aws iam create-access-key --user-name cbc-group-landing-deploy
```

Usa las credenciales generadas para configurar los secrets en GitHub.

## Verificación

Una vez configurados los secrets:

1. Haz un commit y push a la rama `main`:
   ```bash
   git add .
   git commit -m "test: verificar despliegue automático"
   git push origin main
   ```

2. Ve a la pestaña **Actions** en GitHub para ver el progreso del despliegue

3. El despliegue se ejecutará automáticamente y verás:
   - ✅ Build completado
   - ✅ Despliegue a S3
   - ✅ Invalidación de CloudFront

## Comportamiento

### En cada Push a main/master:
- ✅ Se ejecuta el build de la aplicación
- ✅ Se despliegan los archivos a S3
- ✅ Se invalida el cache de CloudFront

### En cada Commit:
- ✅ Se ejecuta el build de la aplicación
- ✅ Se despliegan los archivos a S3
- ✅ Se invalida el cache de CloudFront (si está configurado)

## Troubleshooting

### Error: "AWS_ACCESS_KEY_ID not found"
- Verifica que los secrets estén configurados correctamente en GitHub
- Asegúrate de que los nombres de los secrets coincidan exactamente

### Error: "Access Denied" al subir a S3
- Verifica que el usuario IAM tenga los permisos necesarios
- Verifica que el bucket S3 exista y tenga los permisos correctos

### Error: "Distribution not found" en CloudFront
- Verifica que `CLOUDFRONT_DISTRIBUTION_ID` esté configurado correctamente
- El workflow continuará sin error si no está configurado (solo desplegará a S3)

## Monitoreo

Puedes monitorear los despliegues en:
- **GitHub Actions**: `https://github.com/clementeaf/cbc-group-landing/actions`
- **CloudWatch Logs**: Si configuras logging en CloudFront
- **S3 Console**: Para verificar que los archivos se subieron correctamente

## Notas

- Los despliegues son automáticos, no necesitas ejecutar comandos manualmente
- El cache de CloudFront puede tomar 5-15 minutos en propagarse
- Los archivos HTML se suben con cache corto (0 segundos) para actualizaciones inmediatas
- Los assets estáticos tienen cache largo (1 año) para mejor performance

