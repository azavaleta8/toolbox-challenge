# Toolbox Challenge

## Descripción del Proyecto

File Data Viewer es una aplicación web full-stack que permite a los usuarios explorar y visualizar datos de archivos. La aplicación consta de un backend desarrollado con Node.js y Express, y un frontend construido con React y React Bootstrap.

## Características Principales

- Listado de archivos disponibles
- Visualización de datos de archivos individuales
- Vista de todos los datos de archivos en una tabla unificada
- Búsqueda de archivos por nombre
- API RESTful para la obtención de datos
- Interfaz de usuario responsive y amigable

## Estructura del Proyecto

```
file-data-viewer/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   ├── test/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Configuración y Ejecución

### Requisitos Previos

- Node.js (v14 o superior)
- Docker y Docker Compose (opcional, para ejecución en contenedores)

### Backend

1. Navega al directorio del backend:

   ```
   cd backend
   ```

2. Instala las dependencias:

   ```
   npm install
   ```

3. Crea un archivo `.env` en el directorio `backend/` con las siguientes variables:

   ```
   PORT=3000
   NODE_ENV=development
   ```

4. Ejecuta el servidor:
   ```
   npm start
   ```

El servidor estará disponible en `http://localhost:3000`.

### Frontend

1. Navega al directorio del frontend:

   ```
   cd frontend
   ```

2. Instala las dependencias:

   ```
   npm install
   ```

3. Crea un archivo `.env` en el directorio `frontend/` con la siguiente variable:

   ```
   REACT_APP_API_URL=http://localhost:3000/api
   NODE_ENV=development
   ```

4. Inicia la aplicación React:
   ```
   npm start
   ```

La aplicación estará disponible en `http://localhost:4200/toolbox-challenge`.

### Ejecución con Docker

1. Asegúrate de tener Docker y Docker Compose instalados.

2. Desde el directorio raíz del proyecto, ejecuta:
   ```
   docker-compose up --build
   ```

Esto iniciará tanto el backend como el frontend en contenedores Docker.

### Acceso a la Versión de Producción

También puedes acceder a las versiones desplegadas de la aplicación:

- Frontend: [https://azavaleta8.github.io/toolbox-challenge/](https://azavaleta8.github.io/toolbox-challenge/)
- Backend API Docs: [https://toolbox-challenge.onrender.com/api-docs](https://toolbox-challenge.onrender.com/api-docs)

Estas URLs proporcionan acceso a la aplicación en producción y a la documentación de la API, respectivamente.

## Uso de la Aplicación

1. Abre tu navegador y ve a `https://azavaleta8.github.io/toolbox-challenge`.
2. Utiliza las pestañas para alternar entre la vista de explorador de archivos y la vista de todos los datos.
3. En la vista de explorador, selecciona un archivo de la lista para ver sus datos.
4. Utiliza el campo de búsqueda para filtrar archivos por nombre.

## Pruebas

### Backend

Para ejecutar las pruebas del backend:

```
cd backend
npm test
```

## API Endpoints

- `GET /api/files/list`: Obtiene la lista de archivos disponibles.
- `GET /api/files/data`: Obtiene los datos de todos los archivos.
- `GET /api/files/data?fileName=<nombre>`: Obtiene los datos de un archivo específico.

## Tecnologías Utilizadas

- Backend: Node.js, Express, Axios
- Frontend: React, React Bootstrap, Axios
- Pruebas: Mocha, Chai
- Contenedorización: Docker
