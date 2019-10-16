
### Dinámica de la plataforma
**BOCETO** La idea de esta plataforma es incentivar la comunicación desde la ciudadanía hacia ciertas figuras políticas con eje en algún tema de importancia sociopolítico que esté siendo tratado en el momento. Así, la plataforma ofrece diversos medios digitales y mensajes sugeridos para comunicarse con estxs políticxs y expresar conformidad o disconformidad con respecto a la postura que haya tomado dicha figura política en torno a un eje en discusión.

### Infraestructura general de servicios
Esta plataforma consta de un frontend y un backend. El frontend está hecho en Angular **5.2.10**, probado con Yarn **1.19.1** y Node **10.16.3**. El backend está hecho en CakePHP **3.8.\***, con PHP **7.3.3** + Apache y MySql. El frontend busca el contenido e imágenes desde la api del backend. El backend, además de exponer una api, tiene un panel de adminstración web para cargar datos manualmente.

### Datos principales
Los datos principales que maneja el sistema son *candidatxs* y *proyectos*. Algunos datos de lxs candidatxs son: nombre, apellido, foto y cuentas de redes sociales. Algunos datos de los proyectos son: nombre, descripción, imagen y videos.

También existen los *cargos*. Estos cargos se cargan libremente en el sistema. En nuestra implementación algunos cargos son: diputadx, senadorx y jefe de gobierno. A cada candidatx se le asigna un cargo, y a cada proyecto se le asigna un grupo de cargos. Así, no todxs lxs candidatxs están involucradxs con todos los proyectos, sino solo lxs candidatxs que sean de los cargos asignados al proyecto.

Lxs candidatxs, además, tienen una *postura* por cada proyecto, definida en la pantalla de edición de cada candidatx; esta puede ser: a favor, en contra, se abstiene, o no confirmado. A partir de la postura que haya tomada lx candidatx, la plataforma sugerirá un *mensaje* para enviarle. Estos mensajes se definen en cada proyecto, por cada postura posible, y pueden ser varios mensajes por postura.

### Correr el proyecto localmente
#### Backend
Para probar el backend basta con hacer `docker-compose up` detro de la carpeta raíz del mismo. Esto creará un contenedor de MySql y otro con la aplicación principal, como se puede ver en su  [`docker-compose.yaml`](backend/docker-compose.yaml). Una vez iniciados, podrán navegar a [http://localhost:7000/](http://localhost:7000/) y acceder al panel de administración con las credenciales `admin`/`admin`.

#### Frontend
Para probar el frontend deben tener Node y Yarn instalados; como mencionamos anteriormente, las versiones que a nosotros no nos trajeron problemas son las 10.16.3 y 1.19.1 respectivamente. Ya teniendo esto, primero debemos instalar todas las dependencias del proyecto haciendo `yarn install` dentro de la carpeta del frontend. Si todo va bien, ya podemos hacer `yarn start` para hostear el servicio en [http://localhost:4200/](http://localhost:4200/).

### Algunas configuraciones útiles
#### Cambiar url de conexión entre el frontend y el backend
Esto se hace editando los parámetros `api` e `imgBase` dentro de [`frontend/package.json`](frontend/package.json). Estas variables las levanta el frontend en el archivo `src/environments/environment.ts`.

#### Agregar urls al backend
Para agregar urls al backend, sea para la api o para el panel, hay que editar el archivo `config/routes.php` y agregar la ruta, y editar el archivo `src/Controller/AppController.php` para admitir el acceso a la función (action) que utiliza dicha ruta.

### Bugs conocidos
#### Imágenes JPG
El backend no admite imágenes JPG/JPEG. Deben ser convertidas a PNG u otro formato para poder ser subidas.
