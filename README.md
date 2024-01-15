# SimpleCredit

## Comenzando 🚀

_Clonar el repositorio desde la rama main_
```
git clone https://github.com/MarckoM236/simpleCredit.git
```

### Pre-requisitos 📋

_versión de PHP igual o superior a 8.1_


### Instalación 🔧

_Instalar dependencias de composer_

```
cd backend
composer install
```

_instalar dependencias NPM_

```
cd frontend
npm install
```

## Despliegue 📦

_crear Base de datos Mysql y asignar un usuario_

_renombrar el archivo .env.example a simplemente .env y agregar los datos de conexion_

```
DB_DATABASE=nameDB
DB_USERNAME=root
DB_PASSWORD=
```

Ejecutar migraciones por medio de artisan

```
php artisan migrate
```

_Ejecutar seeders para datos requeridos_

```
php artisan DB:seed
```

_Ejecutar servidor de laravel o ubicar en un host accesible_

```
php artisan serve
```

_Para el frontend, se debe configurar las variables de entorno , ubicadas en la ruta src/app/environments, y configurar la url del backend dependiendo donde se alojó, igualmente se deberá indicar la key de OpenIA, ya que esta, aunque se puede solicitar gratuitamente, las peticiones fallan y se debe agregar crédito, para su correcto funcionamiento._

```
export const environment = {
    production: false,
    apiUrl: 'http://127.0.0.1:8001/api/',
    openAIUrl: 'https://api.openai.com/v1/chat/completions',
    openAIKey:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  };
```

_Ejecutar aplicacion Angular_

```
ng serve
```

## Construido con 🛠️

* Laravel Framework
* Angular framework
* CSS3 - Bootstrap
* MySql
