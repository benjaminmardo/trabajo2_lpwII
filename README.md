# Sistema de inventario tecnológico

## Descripción

Este proyecto implementa una aplicación web para registrar y administrar los equipos tecnológicos de una institución. La solución permite listar, consultar, crear, editar y eliminar equipos, además de buscar por nombre, código, tipo, ubicación o estado.

El desarrollo corresponde al caso de LPW2 y está organizado como una aplicación cliente-servidor. El frontend, desarrollado con Vue y TypeScript, consume una API REST en NestJS mediante HTTP y JSON. El backend aplica las reglas de validación y utiliza TypeORM para guardar los datos en MySQL.

## Datos de entrega

- Estudiante: [Completar nombre y apellido]
- Asignatura: LPW2
- Repositorio público: [Agregar la URL después de publicar en GitHub]

## Tecnologías utilizadas

- Vue 3, TypeScript y Vite para la interfaz.
- NestJS y TypeScript para la API REST.
- TypeORM como ORM y patrón Repository para el acceso a datos.
- MySQL como base de datos relacional.
- class-validator y class-transformer para validar y transformar los datos recibidos.

## Requisitos previos

- Node.js y npm.
- MySQL Server activo.
- MySQL Workbench, recomendado para crear la base de datos y revisar sus registros.
- Git para administrar el historial del proyecto.

## Estructura del proyecto

    bodega-lpw2/
    ├── backend/
    │   └── src/
    │       ├── equipos/
    │       │   ├── dto/
    │       │   ├── entities/
    │       │   ├── equipos.controller.ts
    │       │   ├── equipos.module.ts
    │       │   └── equipos.service.ts
    │       ├── app.module.ts
    │       └── main.ts
    ├── database/
    │   ├── crear-base.sql
    │   └── datos-prueba.sql
    ├── frontend/
    │   └── src/
    │       ├── components/
    │       ├── services/equiposApi.ts
    │       └── views/InventarioView.vue
    ├── .gitignore
    └── README.md

El controlador recibe las solicitudes HTTP y delega las operaciones al servicio. El servicio usa el repository de TypeORM para consultar o modificar la entidad Equipo en MySQL. En el frontend, equiposApi.ts concentra las solicitudes a la API y la vista InventarioView.vue coordina la pantalla principal.

## Configuración de MySQL

1. Iniciar MySQL Server y abrir la conexión local desde MySQL Workbench.
2. Abrir database/crear-base.sql en Workbench y ejecutar el script. Se crea la base inventario_tecnologico.
3. La tabla equipos se crea al iniciar el backend, mediante TypeORM. Para este proyecto, DB_SYNCHRONIZE=true está habilitado en el entorno local de desarrollo.
4. Después de iniciar el backend por primera vez, ejecutar database/datos-prueba.sql en Workbench para insertar cinco equipos de ejemplo. El script debe ejecutarse una sola vez para evitar duplicados.

Para comprobar la carga de datos, ejecutar:

    USE inventario_tecnologico;
    SELECT COUNT(*) FROM equipos;
    SELECT * FROM equipos;

## Variables de entorno

Las variables de conexión se definen en backend/.env. Para crear el archivo local, desde PowerShell y la carpeta principal del proyecto:

    Copy-Item backend/.env.example backend/.env

Luego se debe editar backend/.env y configurar un usuario y contraseña válidos de MySQL. MYSQL_USER y MYSQL_PASSWORD deben corresponder a la misma cuenta. El archivo .env está excluido por .gitignore y no debe subirse a GitHub.

Las variables incluidas en backend/.env.example son:

- PORT: puerto donde escucha NestJS. El valor de desarrollo es 3000.
- FRONTEND_URL: origen de Vue permitido por CORS. El valor de desarrollo es http://localhost:5173.
- MYSQL_HOST y MYSQL_PORT: dirección y puerto del servidor MySQL. Para una instalación local se usa localhost y 3306.
- MYSQL_USER y MYSQL_PASSWORD: credenciales del usuario de MySQL.
- MYSQL_DATABASE: nombre de la base de datos, inventario_tecnologico.
- DB_SYNCHRONIZE: permite a TypeORM sincronizar el esquema durante el desarrollo local. No se recomienda habilitarlo en producción.

El frontend utiliza frontend/.env para configurar VITE_API_URL. Su valor de desarrollo es http://localhost:3000.

## Instalación y ejecución

### Backend

Abrir una terminal en la carpeta principal del repositorio y ejecutar:

    cd backend
    npm install
    Copy-Item .env.example .env

Editar backend/.env con las credenciales de MySQL y luego iniciar NestJS:

    npm run start:dev

La API queda disponible en http://localhost:3000. La terminal debe permanecer abierta mientras se utiliza la aplicación.

### Frontend

Abrir una segunda terminal en la carpeta principal del repositorio y ejecutar:

    cd frontend
    npm install
    Copy-Item .env.example .env
    npm run dev

Vite mostrará la dirección local de la aplicación; normalmente es http://localhost:5173. El backend también debe estar ejecutándose para que la interfaz pueda consultar los equipos.

## Funcionalidades

- Listar y consultar equipos almacenados en MySQL.
- Crear, editar y eliminar equipos.
- Confirmar la eliminación antes de enviar la solicitud.
- Buscar por nombre, código de inventario, tipo o ubicación y filtrar por estado.
- Mostrar estados de carga, errores de comunicación y mensajes de validación.
- Actualizar el listado después de crear, editar o eliminar un registro.

## Endpoints de la API

- GET /equipos: obtiene todos los equipos.
- GET /equipos/:id: obtiene un equipo por su ID.
- POST /equipos: registra un equipo.
- PATCH /equipos/:id: actualiza los campos enviados para un equipo.
- DELETE /equipos/:id: elimina un equipo.

La entidad principal es Equipo. codigoInventario y nombre son obligatorios y deben tener al menos tres caracteres. estado acepta Disponible, En uso, Mantención o Baja. fechaAdquisicion debe ser una fecha válida. La API responde 404 si el ID solicitado no existe y rechaza propiedades que no están definidas en el DTO.


## Declaración de uso de Inteligencia Artificial

Se utilizó ChatGPT como apoyo para planificar la estructura, proponer fragmentos de código y analizar errores durante el desarrollo. El estudiante debe revisar y adaptar la implementación, ejecutar las pruebas descritas y poder explicar las decisiones tomadas en el proyecto.
