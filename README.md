# CBC Group Landing Page

Landing page para CBC Group construida con React, TypeScript, Vite y Tailwind CSS.

## 🌐 Aplicación Desplegada

La aplicación está desplegada y disponible en:

- **CloudFront (Recomendado)**: https://d2e7ltyhy5atb5.cloudfront.net
- **S3 Directo**: https://cbc-group-landing.s3-website-us-east-1.amazonaws.com

## 🚀 Características

- ⚡️ **Vite** - Build rápido y HMR
- ⚛️ **React 19** - Framework moderno
- 📘 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Estilos utility-first
- 📱 **Responsive** - Diseño mobile-first
- 🔄 **CI/CD** - Despliegue automático a S3/CloudFront

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/          # Páginas de la aplicación
├── data/           # Datos y contenido
├── assets/         # Imágenes y recursos estáticos
└── App.tsx         # Componente principal
```

## 🚀 Despliegue Automático

El proyecto está configurado para desplegarse automáticamente a **AWS S3/CloudFront** después de cada push a la rama `main`.

### Configuración Inicial

1. **Configurar secrets en GitHub**:
   - Ve a: `Settings` → `Secrets and variables` → `Actions`
   - Agrega los siguientes secrets:
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `S3_BUCKET_NAME`
     - `CLOUDFRONT_DISTRIBUTION_ID` (opcional)
     - `AWS_REGION` (opcional, default: us-east-1)

2. **Usar el script de ayuda**:
   ```bash
   ./setup-github-secrets.sh
   ```

3. **O configurar manualmente**:
   - Ver `CI_CD_SETUP.md` para instrucciones detalladas

### Despliegue Manual

Si necesitas desplegar manualmente:

```bash
# Configurar variables de entorno
export S3_BUCKET_NAME="tu-bucket-name"
export CLOUDFRONT_DISTRIBUTION_ID="tu-distribution-id"
export AWS_REGION="us-east-1"

# Desplegar
./deploy.sh
```

Para más información sobre despliegue, ver:
- `QUICK_DEPLOY.md` - Guía rápida
- `DEPLOY.md` - Guía detallada
- `CI_CD_SETUP.md` - Configuración de CI/CD

## 📚 Documentación

- **Despliegue Rápido**: `QUICK_DEPLOY.md`
- **Guía de Despliegue**: `DEPLOY.md`
- **Configuración CI/CD**: `CI_CD_SETUP.md`

## 🛠️ Tecnologías

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **AWS S3** - Hosting estático
- **AWS CloudFront** - CDN
- **GitHub Actions** - CI/CD

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Vista previa de producción
- `npm run lint` - Ejecuta ESLint
- `./deploy.sh` - Despliegue manual a S3/CloudFront
- `./setup-aws.sh` - Configurar infraestructura AWS
- `./setup-github-secrets.sh` - Ayuda para configurar secrets

## 🔧 Desarrollo

El proyecto sigue las mejores prácticas de desarrollo:

- ✅ TypeScript estricto (sin `any`)
- ✅ Componentes funcionales con hooks
- ✅ Responsive design mobile-first
- ✅ SEO optimizado
- ✅ Performance optimizado

## 📄 Licencia

Este proyecto es privado y propiedad de CBC Group.
