# 🚀 Guía de Administración - TRI-NEO

Esta guía explica cómo gestionar el acceso de los usuarios manualmente.

## 1. Acceso al Panel Admin

1. Entrá a la app con tu cuenta de admin (`ramacomaleras@hotmail.com`).
2. Ve a la sección de **Perfil** (ícono de usuario en el menú inferior).
3. Verás un botón dorado que dice **PANEL ADMINISTRACIÓN**. 
4. Si no lo ves, asegurate de que tu correo esté marcado como admin en la base de datos (ya lo hemos hecho por vos).

## 2. Cómo Activar un Usuario (Flujo de Venta Manual)

Cuando un usuario te escriba por WhatsApp con su comprobante de MercadoPago:

1. Abrí el **Panel de Administración** desde tu perfil.
2. Buscá al usuario por su **email** usando la barra de búsqueda.
3. El usuario aparecerá en la lista. 
4. Hacé clic en el botón **"DAR ACCESO"**.
5. El estado cambiará a **VITALICIO (Check verde)**.
6. ¡Listo! El usuario ahora podrá entrar al Home y ver las fases de meditación instantáneamente.

## 3. Verificación de Audios y Ebook

### Audios
- Los audios están comprimidos en formato MP3 (128kbps) para que la app cargue rápido.
- Se encuentran localmente en `public/audios/` para máxima velocidad.
- Podés probarlos entrando a cualquier fase (1, 2 o 3) en el reproductor.

### Ebook
- El ebook se descarga desde la sección **Ebook** del menú inferior.
- Actualmente apunta tanto al storage de Supabase como a un archivo local de respaldo en `public/ebook.pdf`.

## 4. Gestión Técnica (Solo si es necesario)

Si necesitás marcar a OTRO usuario como admin, ejecutá este SQL en el Dashboard de Supabase:

```sql
UPDATE public.users SET is_admin = true WHERE email = 'correo-del-nuevo-admin@ejemplo.com';
```

---
*TRI-NEO App - SaaS Factory System*
