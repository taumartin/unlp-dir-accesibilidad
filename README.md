# unlp-dir-accesibilidad

UNLP | Seminario Lenguajes - JS | Trabajo Extra Final - App Dirección de Accesibilidad U.N.L.P.

## Versiones

* Node v20.18 / NPM v10.8
* PostgreSQL v19.0
* Sequelize v6.37
* Express v4.21
* Angular v19.1
* Bootstrap v5.3.3 (NgBootstrap v18.0)

Más detalles de dependencias en:

* ./appfront/package.json
* ./apiback/package.json

## Docker deploy

1. Crear archivo `.env` en el directorio root del proyecto.
2. Configurar las variables de entorno en el archivo `.env`:
   * `NODE_ENV=production` para indicar que el ambiente es productivo.
   * `PORT` para configurar el puerto de escucha de Express (API Backend).
   * `API_BASE_URL` para configurar la URL pública para el acceso a la app. Sin barra al final.
   * `POSTGRES_USER` y `POSTGRES_PASSWORD` configuran las credenciales de acceso a la BD.
   * `POSGRES_DB` configura el nombre de la BD.
   * `JWT_SECRET` y `JWT_REFRESH_SECRET` configuran claves de cifrado para la autenticación de los usuarios con JWT.
   * `JWT_TOKEN_EXPIRES_IN` y `JWT_REFRESH_EXPIRES_IN` configuran los tiempos de expiración para los tokens JWT.
   * `JWT_COOKIE_USE_HTTPS` configura el uso de cookies HTTPS, donde se almacenan temporalmente tokens JWT de sesión de usuarios.
   * Ejemplo:
     ``` dotenv
     NODE_ENV=production
     PORT=3000
     API_BASE_URL=http://unlp.example.com:3000
     POSTGRES_USER=change_me
     POSTGRES_PASSWORD=change_me
     POSTGRES_DB=tutorias_unlp
     JWT_SECRET=change_me
     JWT_REFRESH_SECRET=change_me
     JWT_TOKEN_EXPIRES_IN=1h
     JWT_REFRESH_EXPIRES_IN=7d
     JWT_COOKIE_USE_HTTPS=false
     ```
3. Crear/Levantar los contenedores con Docker Compose.
   * Ejemplo:
     ``` bash
     docker-compose up -d --build
     ```
4. Acceder a la URL configurada.
   * Ejemplo: http://unlp.example.com:3000/
5. En caso de funcionar correctamente se redirigirá el navegador a la URL `../portal/home` y se visualizará la pantalla Home de la app.

## Primer login

Para crear el primer usuario:

1. Navegar a la URL `../portal/auth/signup`.
2. Se debería ver el formulario de registración.
3. Completar el formulario con un e-mail y contraseña y hacer submit.
4. Se debería crear un usuario en la BD con los datos ingresados. El usuario se encontrará inactivo.
5. Para poder hacer login con el usuario se debe actualizar el estado del usuario por DB. Se puede conectar a la BD mediante el puerto local `54320`.
6. Los datos del usuario se encuentran en la tabla `usuarios`, la columna a modifcar es `esta_activo`.
   * Ejemplo:
     ``` postgresql
     update public.usuarios u
     set esta_activo = true
     where u.correo = 'usuario@email.com';
     ```
7. Realizar el login desde la URL `../portal/auth/login`. Esto debería dirigir a la Home.
8. Probar ingresar a la URL `../portal/abm/usuarios`, verificar que se visualize la lista de usuarios con el único usuario recién creado.

## Permisos de Usuarios

En esta versión de la aplicación no se desarrollaron Roles y Permisos de usuarios. De modo que cualquier usuario con login habilitado (`esta_activo=true`) puede utilizar la app sin restricciones.
