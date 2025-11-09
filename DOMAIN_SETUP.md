# Configuración de Dominio Personalizado: cbcgroup.cl

Este documento contiene las instrucciones para configurar el dominio `cbcgroup.cl` para que apunte a CloudFront.

## Información de la Infraestructura

- **Dominio**: cbcgroup.cl
- **CloudFront Distribution ID**: E3UDQPNOG879DF
- **CloudFront Domain**: d2e7ltyhy5atb5.cloudfront.net
- **Certificado SSL ARN**: arn:aws:acm:us-east-1:041238861016:certificate/bc6619b0-9bb6-4d31-bdf5-13299075a036
- **Región**: us-east-1

## Pasos para Configurar el Dominio

### Paso 1: Configurar Registros DNS en GoDaddy

1. **Accede al panel de GoDaddy**:
   - Ve a: https://dcc.godaddy.com/control/portfolio/cbcgroup.cl/settings
   - O navega manualmente: Dominios → cbcgroup.cl → Configuración

2. **Abre la gestión de DNS**:
   - Haz clic en el botón **"Administrar DNS"** (o en la pestaña "DNS")

3. **Agrega los registros CNAME para validar el certificado SSL**:

   **Registro 1 - Validación del dominio raíz:**
   - **Tipo**: CNAME
   - **Nombre**: `_607f5d83c41269ec3311533a96ae3299`
   - **Valor**: `_11604e9227a702869425029d0b32f53c.jkddzztszm.acm-validations.aws.`
   - **TTL**: 600 (o el valor por defecto)

   **Registro 2 - Validación de www:**
   - **Tipo**: CNAME
   - **Nombre**: `_fe451e25a1bace52e3745aec9c47fc47.www`
   - **Valor**: `_827cb9cfe022e9eb45f72c283ea2a514.jkddzztszm.acm-validations.aws.`
   - **TTL**: 600 (o el valor por defecto)

4. **Agrega o modifica los registros CNAME para apuntar el dominio a CloudFront**:

   **Registro 3 - Dominio raíz:**
   - **Tipo**: CNAME
   - **Nombre**: `@` (o deja en blanco para el dominio raíz)
   - **Valor**: `d2e7ltyhy5atb5.cloudfront.net`
   - **TTL**: 600
   - **Nota**: Si ya existe un registro para el dominio raíz, modifícalo para que apunte a CloudFront

   **Registro 4 - Subdominio www:**
   - **Tipo**: CNAME
   - **Nombre**: `www`
   - **Valor**: `d2e7ltyhy5atb5.cloudfront.net`
   - **TTL**: 600
   - **Nota**: Si ya existe un registro `www` (como el que apunta a `cbcgroup.cl.`), **modifícalo** para que apunte a `d2e7ltyhy5atb5.cloudfront.net`

### Paso 2: Verificar la Validación del Certificado

Después de agregar los registros de validación, espera 5-30 minutos y verifica el estado del certificado:

```bash
aws acm describe-certificate \
  --certificate-arn arn:aws:acm:us-east-1:041238861016:certificate/bc6619b0-9bb6-4d31-bdf5-13299075a036 \
  --region us-east-1 \
  --query 'Certificate.Status' \
  --output text
```

El estado debe cambiar de `PENDING_VALIDATION` a `ISSUED` cuando la validación sea exitosa.

### Paso 3: Actualizar CloudFront con el Dominio Personalizado

Una vez que el certificado esté validado (`ISSUED`), ejecuta:

```bash
./update-cloudfront-domain.sh arn:aws:acm:us-east-1:041238861016:certificate/bc6619b0-9bb6-4d31-bdf5-13299075a036
```

Este script actualizará la distribución de CloudFront para:
- Agregar los aliases `cbcgroup.cl` y `www.cbcgroup.cl`
- Configurar el certificado SSL personalizado
- Habilitar HTTPS para el dominio personalizado

### Paso 3.5: Crear y Asociar Función de Redirección

Para que `www.cbcgroup.cl` redirija automáticamente a `cbcgroup.cl`, ejecuta:

```bash
# 1. Crear la función de redirección
./create-redirect-function.sh

# 2. Asociar la función a CloudFront
./associate-function-to-cloudfront.sh
```

Esto asegurará que cuando un usuario acceda a `www.cbcgroup.cl`, será redirigido automáticamente a `cbcgroup.cl`.

### Paso 4: Verificar la Propagación

Después de actualizar CloudFront, los cambios pueden tardar 15-20 minutos en propagarse. Verifica el estado con:

```bash
aws cloudfront get-distribution \
  --id E3UDQPNOG879DF \
  --query 'Distribution.Status' \
  --output text
```

El estado debe ser `Deployed` cuando esté listo.

### Paso 5: Probar el Dominio

Una vez que todo esté configurado y propagado, el sitio estará disponible en:

- **https://cbcgroup.cl** (URL principal)
- **https://www.cbcgroup.cl** (redirigirá automáticamente a `cbcgroup.cl`)

**Importante**: Ambas URLs mostrarán `cbcgroup.cl` en la barra de direcciones del navegador, ya que `www.cbcgroup.cl` redirige automáticamente a `cbcgroup.cl`.

## Resumen de Registros DNS

| Tipo | Nombre | Valor | Propósito |
|------|--------|-------|-----------|
| CNAME | `_607f5d83c41269ec3311533a96ae3299` | `_11604e9227a702869425029d0b32f53c.jkddzztszm.acm-validations.aws.` | Validación SSL (raíz) |
| CNAME | `_fe451e25a1bace52e3745aec9c47fc47.www` | `_827cb9cfe022e9eb45f72c283ea2a514.jkddzztszm.acm-validations.aws.` | Validación SSL (www) |
| CNAME | `@` (o vacío) | `d2e7ltyhy5atb5.cloudfront.net` | Apuntar dominio raíz a CloudFront |
| CNAME | `www` | `d2e7ltyhy5atb5.cloudfront.net` | Apuntar www a CloudFront |

## Notas Importantes

1. **Propagación DNS**: Los cambios DNS pueden tardar hasta 48 horas en propagarse completamente, aunque generalmente es mucho más rápido (5-30 minutos).

2. **Validación del Certificado**: El certificado SSL debe estar completamente validado antes de actualizar CloudFront. Si intentas actualizar CloudFront antes de que el certificado esté validado, la actualización fallará.

3. **CloudFront Deployment**: Después de actualizar CloudFront, los cambios pueden tardar 15-20 minutos en propagarse. Durante este tiempo, el dominio puede no estar disponible.

4. **HTTPS**: Una vez configurado, el sitio estará disponible tanto en HTTP como en HTTPS, pero CloudFront redirigirá automáticamente HTTP a HTTPS.

## Solución de Problemas

### El certificado no se valida

- Verifica que los registros CNAME de validación estén correctamente configurados en GoDaddy
- Asegúrate de que los nombres y valores coincidan exactamente (incluyendo puntos finales)
- Espera al menos 5 minutos después de agregar los registros antes de verificar

### El dominio no resuelve a CloudFront

- Verifica que los registros CNAME para el dominio estén configurados correctamente
- Asegúrate de que el valor apunte a `d2e7ltyhy5atb5.cloudfront.net`
- Verifica que CloudFront esté en estado `Deployed`

### Error al actualizar CloudFront

- Asegúrate de que el certificado esté en estado `ISSUED`
- Verifica que el certificado esté en la región `us-east-1` (requerido para CloudFront)
- Asegúrate de tener los permisos necesarios en AWS

## Scripts Disponibles

- `setup-custom-domain.sh`: Crea el certificado SSL y muestra las instrucciones
- `update-cloudfront-domain.sh <CERT_ARN>`: Actualiza CloudFront con el dominio personalizado
- `create-redirect-function.sh`: Crea la función CloudFront para redirigir www a no-www
- `associate-function-to-cloudfront.sh`: Asocia la función de redirección a CloudFront

