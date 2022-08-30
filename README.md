
<div align="center">
  <h3>Video de la aplicación: https://youtu.be/pEdW-2I7_T8 </h3>
</div>

[![Watch the video](https://img.youtube.com/vi/pEdW-2I7_T8/maxresdefault.jpg)](https://youtu.be/pEdW-2I7_T8)

# **Documentación del frontend**

## **Empezando**

Primero, clonas el repositório de GitHub (Es necesario el backend para la funcionalidad: https://github.com/KevinMCruzP/dux_vitae_backend)

Ejemplo utilizando SSH:

```
    git clone git@github.com:The-noobs-programmers/dux_vitae_frontend.git
```

Ahora debes de entrar al directorio del proyecto y bajar las dependencias que se encuentran en el archivo package.json:

```
    yarn
    o
    npm install
```

Para hacer funcionar el servidor de desenvolvimiento, debes de ejecutar el comando:

```
    yarn dev
    o
    npm run dev
```

Para exibir el proyecto en desenvolvimiento, debes de entrar al [http://localhost:3000](http://localhost:3000) en cualquier browser compatible.

## **Flujo de la aplicación frontend**

![flujoAppFrontEnd1](https://user-images.githubusercontent.com/72741197/174701293-47458c29-2dda-4384-aff3-82b5feaab05e.png)

![client](https://user-images.githubusercontent.com/72741197/174701352-6e3e068f-16e8-4d59-8e8f-b389c3accd3d.png)

![nutritionist](https://user-images.githubusercontent.com/72741197/174701373-26148a84-1305-46af-be98-304ff08a3db0.png)

![admin](https://user-images.githubusercontent.com/72741197/174701396-d9cb398c-de17-407c-8edc-86493f448b20.png)

## **Herramientas**

Para la creación del frontend se utilizó la biblioteca de Javascript [React](https://es.reactjs.org/).

Como repositorio se utilizó [GitHub](https://github.com/KevinMCruzP).

Y para el versionado se utilizó [Git](https://git-scm.com/).

Para más información de las librerías utilizadas se puede consultar en el archivo package.json.

| HERRAMIENTAS                                                       | APLICAR                                                                  |
| :----------------------------------------------------------------- | :----------------------------------------------------------------------- |
| [Next](https://nextjs.org/)                                        | Framework de ReactJS                                                     |
| [Typescript](https://www.typescriptlang.org/docs/)                 | Superconjunto de JavaScript para tipar                                   |
| [Chakra-UI](https://chakra-ui.com/)                                | Biblioteca de componentes para construir, estilizar la base de app react |
| [Axios](https://github.com/axios/axios)                            | Biblioteca para el uso de métodos HTTP y consumir API                    |
| [React-icons](https://react-icons.github.io/react-icons/)          | Biblioteca para icons                                                    |
| [Nookies](https://www.npmjs.com/package/nookies)                   | Biblioteca para agregar, destruir, o gerenciar cookies de la página      |
| [jwt-decode](https://jwt.io/)                                      | Decodificar un token, y agarrar sus contenidos                           |
| [socket.io-client](https://socket.io/docs/v4/client-installation/) | Comunicación bidireccional y de baja latencia para cada plataforma       |
| [yup](https://www.npmjs.com/package/yup)                           | Biblioteca de javascript para analizar valores y validar                 |

## **Rutas**

| URL                    | Descripción                                                                       |
| :--------------------- | :-------------------------------------------------------------------------------- |
| Rutas                  |                                                                                   |
| /                      | Página para hacer login                                                           |
| /client/register       | Página de registro del cliente                                                    |
| /nutritionist/register | Página de registro del nutricionista                                              |
| Ruta Clientes          |
| /client/home           | Muestra datos de diferentes secciones de la app                                   |
| /client/message        | Página con la sección de chat                                                     |
| /client/minute         | Contiene los archivos de minutas subidas (No funcional)                           |
| /client/nutritionist   | Tabla con todos los nutricionistas, en donde se puede crear solicitudes           |
| /client/profile        | Tiene el perfil del cliente, y se puede actualizar los datos                      |
| Ruta Nutricionistas    |
| /nutritionist/home     | Muestra datos de clientes, solicitudes y diferentes secciones de la app           |
| /nutritionist/client   | Tabla con un listado de clientes                                                  |
| /nutritionist/message  | Página con la sección de chat                                                     |
| /nutritionist/profile  | Contiene el perfil del nutricionista, y se puede actualizar los datos             |
| /nutritionist/request  | Contiene las solicitudes de clientes                                              |
| Ruta Administrador     |
| /admin/dashboard       | Página con el dashboard                                                           |
| /admin/client          | Tabla con todos los clientes                                                      |
| /admin/nutritionist    | Tabla con todos los nutricionistas                                                |
| /admin/certificate     | Contiene los archivos de certificados, enviados por nutricionistas (No funcional) |

## **Proximas caracteristicas**

- Agregar archivos de minutas en pdf
- Página de agenda
- Hacer la página de configuración
- Más datos en la página home
