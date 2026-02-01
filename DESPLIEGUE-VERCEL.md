# 🚀 Despliegue en Vercel - Diagnóstico IA

## 📋 Pasos para Desplegar

### 1. **Preparar el Proyecto**
✅ El archivo `index.html` ya está en la raíz del proyecto
✅ Todas las rutas están corregidas
✅ La API serverless está en `/api/gemini.js`

### 2. **Configurar Vercel**

#### Opción A: Desde el Dashboard de Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en **"Add New Project"**
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente la configuración

#### Opción B: Usando Vercel CLI
```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel
```

### 3. **Configurar Variable de Entorno**
⚠️ **IMPORTANTE**: Debes configurar la API key en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Click en **"Settings"** → **"Environment Variables"**
3. Agrega esta variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyByU1pz89RR7-AKpP7Rmsxgjei-JS_jxWM`
   - **Environments:** Marca todas (Production, Preview, Development)
4. Click en **"Save"**

### 4. **Re-desplegar**
Después de agregar la variable de entorno:
- Vercel re-desplegará automáticamente, O
- Puedes forzar un nuevo despliegue desde el Dashboard

### 5. **Verificar**
✅ Visita tu URL de Vercel (ej: `tu-proyecto.vercel.app`)
✅ Prueba el login/registro
✅ Prueba el diagnóstico con síntomas
✅ Verifica que la IA responda correctamente

## 📁 Estructura del Proyecto

```
USABILIDAD/
├── index.html          ← Archivo principal en la raíz
├── vercel.json         ← Configuración de Vercel
├── .vercelignore       ← Archivos a ignorar
├── api/
│   └── gemini.js       ← API serverless (protegida)
├── css/
│   └── style.css
├── html/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   └── soporte.html
├── javascript/
│   ├── config.js
│   ├── supabase-client.js
│   ├── gemini-service.js
│   ├── i18n.js
│   └── script.js
└── assets/
    └── ...
```

## 🔒 Seguridad

- ✅ La API key **NO** está expuesta en el código frontend
- ✅ Se usa una función serverless para proteger la API key
- ✅ Solo el servidor de Vercel tiene acceso a la variable de entorno

## 🐛 Solución de Problemas

### Error: "API key not configured"
→ Verifica que agregaste `GEMINI_API_KEY` en las variables de entorno de Vercel

### Error 404 en rutas
→ El archivo `vercel.json` maneja las rutas correctamente

### La IA no responde
→ Revisa los logs en Vercel Dashboard → Functions → Logs

## 📞 Soporte

Si tienes problemas, revisa:
1. Variables de entorno en Vercel
2. Logs de las funciones serverless
3. Consola del navegador para errores de frontend

---

**¡Listo para producción! 🎉**
