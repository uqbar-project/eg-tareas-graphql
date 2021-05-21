# Clase de GraphQL - Ejemplo de Tareas
![GraphQL Logo](images/Logo.png)

[![Build Status](https://travis-ci.com/uqbar-project/eg-tareas-graphql.svg?branch=main)](https://travis-ci.com/uqbar-project/eg-tareas-graphql)
## Introducción

### ¿Qué es GraphQL?
Según la [documentación oficial](https://graphql.org) GraphQL es un lenguaje de consultas para APIs así como también una solución para satisfacer esas consultas con la información existente en el sistema.  

### Claro si, ¿Pero qué es GraphQL?
Cuando construimos un backend lo hacemos para ofrecer una interfaz que nos permita interactuar con el sistema de una manera especifica, segura y acotada, siguiendo el principal estándar que son las API REST.

Durante las clases hemos visto mejores practicas y estrategias de diseño para llegar a soluciones flexibles y escalables, sin embargo las API RESTs tienen un cierto factor de rigidez al cambio en la medida que las formas con las que podemos interactuar con un endpoint de una API REST se limitan a endpoints, query params, headers y un body. Lo que GraphQL propone es tener un lenguaje de consultas completo para desde el cliente poder realizar consultas más complejas sin necesidad de alterar la implementación.

Vale la pena mencionar que GraphQL no está atado a ninguna tecnología, simplemente es una capa intermedia entre el punto de entrada del backend y la propia implementación del mismo.

(TODO: Hacer o buscar un diagrama más claro)
![Diagrama de GraphQL agnostico](images/Diagrama-1.jpg)

## Ejemplo

Para este ejemplo vamos a usar un front escrito en `React` y un backend hecho en `NodeJS` con una biblioteca muy utilizada para manejar peticiones HTTP que se llama `express` y `MongoDB` para la base.

### Como se levanta

### Backend

1. Instalamos las dependencias con `npm` con el comando:
```bash
npm i
```

2. Ponemos a correr la instancia de `mongo` en docker con el siguiente comando:
```bash
docker-compose up
```

3. En la carpeta raíz del back crear un archivo llamado .env con la url para conectarse a mongo, en mi caso es:
```
DB_URL=mongodb://localhost:27017/tareas
```

Por defecto la aplicación corre en el puerto 8080 pero podemos proveer un valor diferente para la variable `PORT` en este mismo archivo si así lo deseamos.

4. Ponemos a correr el server con:
```bash
npm run dev
```

En este punto el server está corriendo y podemos acceder a la interfaz grafica que provee opcionalmente GraphQL para interactuar con la API en la url `localhost:8080/graphql`.

### Frontend

1. Instalamos las dependencias con `yarn` con el comando: 
```bash
yarn install
```

2. Creamos un archivo `.env` en la carpeta raíz del front con el siguiente contenido:
```
REACT_APP_GRAPHQL_API_URL="http://localhost:8080/graphql"
```

3. Iniciamos el server de react con el comando:
```bash
yarn run dev
```
