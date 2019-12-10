
## Descripción de la plataforma
La idea de la plataforma es hacer que lx usuarix que visite la página envíe mensajes de presión a personas del ámbito de la política. Así, la página ofrece 4 tipos de botones por cada figura política: *facebook*, *twitter*, *instagram* y *teléfono*; donde se le ofrece a lx usuarix un medio rápido y certero para comunicarse por ese medio con esa figura política. Además, se le ofrece a lx usuarix, al hacer click en estos botones, un mensaje prearmado a modo de sugerencia. Pero este mensaje no es siempre igual, sino que varía según la postura que haya tomado la figura política en torno a un tema particular. Por ejemplo, si se está tratando el tema de fumigaciones con agroquímicos, debajo de la foto de cada político figurará una etiqueta que diga *A favor*, *En contra*, *Se abstiene* o *No confirmado*, según la postura que haya tomado frente a esta temática. Entonces, al hacer click en algún botón de las redes sociales, aparecerá un mensaje en base a esta postura, incentivando, por ejemplo, a que cambie de opinión, si es que está en contra, o felicitarlo, si es que está a favor, o cualquier personalización que lxs administradorxs del sistema apliquen.

La plataforma consta con la posibilidad de enumerar varios temas, que figurarán en un listado en la pantalla principal de la página. Al ingresar a uno de estos, se mostrarán lxs políticxs con sus respectivas posturas y botones de redes sociales, como antes descripto. Uno de los temas se puede marcar como *Destacado* dentro del panel de administración. Esto hará que ese tema aparezca primero en la home de la página, mostrando ya lxs politicxs con sus posturas, y más abajo el listado usual con todo el resto de los temas.

## Tablas de la base de datos
Los datos principales que maneja el sistema son *candidatxs* y *proyectos*. Algunos datos de lxs candidatxs son: nombre, apellido, foto y cuentas de redes sociales. Algunos datos de los proyectos son: nombre, descripción, imagen y videos.

También existen los *cargos*. Estos cargos se cargan libremente en el sistema. En nuestra implementación algunos cargos son: diputadx, senadorx y jefe de gobierno. A cada candidatx se le asigna un cargo, y a cada proyecto se le asigna un grupo de cargos. Así, no todxs lxs candidatxs están involucradxs con todos los proyectos, sino solo lxs candidatxs que sean de los cargos asignados al proyecto.

Lxs candidatxs, además, tienen una *postura* por cada proyecto, definida en la pantalla de edición de cada candidatx; esta puede ser: a favor, en contra, se abstiene, o no confirmado. A partir de la postura que haya tomada lx candidatx, la plataforma sugerirá un *mensaje* para enviarle. Estos mensajes se definen en cada proyecto, por cada postura posible, y pueden ser varios mensajes por postura.

## Servicios de la plataforma
Esta plataforma consta de un frontend y un backend. El frontend está hecho en *Angular 5.2.10*, probado con *Yarn 1.19.1* y *Node 10.16.3*. El backend está hecho en *CakePHP 3.8.\**, con *PHP 7.3.3* + *Apache* y *MySql*. El frontend busca el contenido e imágenes desde la API del backend. El backend, además de exponer una API, tiene un panel de adminstración web para cargar datos manualmente.

## Ejecutar el proyecto localmente
#### Backend
Para probar el backend basta con hacer `docker-compose up` detro de la carpeta raíz del mismo. Esto creará un contenedor de MySql y otro con la aplicación principal, como se puede ver en su  [`docker-compose.yaml`](backend/docker-compose.yaml). Una vez iniciados, podrán navegar a [http://localhost:7000/](http://localhost:7000/) y acceder al panel de administración con las credenciales `admin`/`admin`.

#### Frontend
Para probar el frontend deben tener Node y Yarn instalados; como mencionamos anteriormente, las versiones que a nosotros no nos trajeron problemas son las 10.16.3 y 1.19.1 respectivamente. Ya teniendo esto, primero debemos instalar todas las dependencias del proyecto haciendo `yarn install` dentro de la carpeta del frontend. Si todo va bien, ya podemos hacer `yarn start` para hostear el servicio en [http://localhost:4200/](http://localhost:4200/).

## Listado de archivos importantes 
#### Frontend
- `src/index.html` contiene el esqueleto html de la página, desde donde Angular se monta en el tag `<app-root>`
- `src/app/app.component.*` contiene el esqueleto Angular de la página, desde donde las rutas se montan en el tag `<router-outlet>`
- `src/app/helpers/routes.helper.ts` rutas del sistemas (o sea las URLs aceptadas)
- `src/app/pages/*` páginas del sistema, donde reciden los códigos a donde apuntan las rutas anteriores. Dentro tenemos:
  - `main` pantalla que figura en la home
  - `project-view` pantalla de vista de detalle de un proyecto, a la que se llega haciendo click en el listado de proyectos de la home
  - `full-list` pantalla con el listado completo de políticos de un proyecto, se llega haciendo click en "Ver listado completo" dentro de un proyecto
- `src/services/*` funciones de GET/POST que se comunican con la API del backend, estas se llaman desde los componentes Angular de la página
- `src/model/*` acá están definidas las clases a las cuales se convierten las respuestas de los GET/POST anteriores para mayor facilidad de acceso a los atributos de los json devueltos por la API
- `src/theme/*` estilos scss generales del sistema y variables scss
- `src/assets/images/*` imágenes del sistema
- `dist/*` archivos generados por `yarn build`, sería la compilación del proyecto, y es el código que se termina subiendo al servidor en producción

## Configuraciones útiles
#### Conexión desde el frontend hacia el backend
Esto se hace editando los parámetros `api` e `imgBase` dentro de [`frontend/package.json`](frontend/package.json). Estas variables las levanta el frontend en el archivo `src/environments/environment.ts`. 

En entorno de producción (Docker) estas URLs están harcodeadas en `src/environments/environment.prod.ts`. 

#### Agregar rutas al backend
Para agregar rutas al backend, sea para la API o para el panel de administración, hay que editar el archivo `config/routes.php` y agregar la ruta, y editar el archivo `src/Controller/AppController.php` para admitir el acceso a la función (action) que utiliza dicha ruta.

#### Hostear el frontend en la LAN para compartirlo localmente
Para esto se puede hacer `yarn startlan` en vez de `yarn start` pero deben editar la IP que usa, dentro de `packaje.json`, el la sección `scripts`, en el comando `startlan` (línea ~11)

## Bugs conocidos
#### Imágenes JPG
El backend no admite imágenes JPG/JPEG. Deben ser convertidas a PNG, GIF, u otro formato para poder ser subidas.

#### Frontend en iPhones
En algunos iPhones 6 el frontend no carga, o carga por la mitad y queda congelado.
