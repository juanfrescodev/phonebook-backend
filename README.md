# Phonebook App - Backend + Frontend

Esta es la aplicación completa de la Agenda Telefónica (Phonebook) creada en la Parte 3 del curso Full Stack Open.

El proyecto combina:

- **Backend**: Node.js + Express
- **Frontend**: React (Vite)
- **Despliegue**: Render (backend sirve el frontend)

---

## 1. Estado actual

- Backend desplegado y funcionando: [https://phonebook-backend-wnhz.onrender.com/](https://phonebook-backend-wnhz.onrender.com/)
- Frontend integrado en el backend (`dist/`) y funcionando en producción.  
- Localmente, el frontend también funciona con `npm run dev` (configuración de proxy incluida para conectarse al backend en localhost:3001).

---

## 2. Scripts importantes

Desde el directorio del backend:

```bash
# Iniciar backend en modo desarrollo
npm run dev

# Generar build del frontend y copiarlo dentro del backend
npm run build:ui

# Desplegar backend (y frontend integrado) en Render
npm run deploy:full
```

## 3. Cómo probar la app

Abrir el link online en un navegador para probar la app completa.

Usar REST Client o Postman para probar las rutas del backend:

```bash
GET /api/persons
POST /api/persons
DELETE /api/persons/:id
GET /info
```

## 4. Notas

La carpeta dist/ contiene el build del frontend y se sirve como contenido estático desde Express.

Las rutas relativas (/api/...) funcionan tanto localmente como en producción gracias a la configuración del proxy de Vite en modo desarrollo.

## 5. Repositorio

[GitHub - phonebook-backend](https://github.com/juanfrescodev/phonebook-backend)
