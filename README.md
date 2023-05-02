# Proyecto Final API

## Base de datos de entradas:

- Obtener todas las entradas:
````
- GET: http://localhost:3000/api/v1/entries
````  

- Obtener una entrada por ID:
````
- GET: http://localhost:3000/api/v1/entries/:id
````  

- Crear una entrada:
````
- POST: http://localhost:3000/api/v1/entries
````  

- Editar una entrada por id:
````
- PUT: http://localhost:3000/api/v1/entries/:id
````
- Eliminar una entrada por id:
````
- DELETE: http://localhost:3000/api/v1/entries/:id
````  
-Eliminar todas las entradas de un usuario por id:
````
- DELETE: http://localhost:3000/api/v1/entries/user/
````  
## Base de datos de los usuarios:
- Obtener todos los usuarios:
````
- GET: http://localhost:3000/api/v1/users
````
- Obtener un usuario por ID:
````
- GET: http://localhost:3000/api/v1/users/:id
````
- Crear un usuario:
````
- POST: http://localhost:3000/api/v1/auth/register
````
- Editar un usuario por id:
````
- PUT: http://localhost:3000/api/v1/users/:id
````
- Eliminar un usuario por id:
````
- DELETE: http://localhost:3000/api/v1/users
````

## Endpoints de autentificación:

- Logear con un usuario:
````
- POST: http://localhost:3000/api/v1/auth/login
````
- Delogear con un usuario:
````
- GET: http://localhost:3000/api/v1/auth/logout
````
- Renovar token de usuario:
````
- POST: http://localhost:3000/api/v1/auth/renew
````