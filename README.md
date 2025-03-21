# Noticias API

Este proyecto es un backend para una plataforma de noticias desarrollado con Laravel.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- PHP >= 8.1
- Composer
- MySQL o PostgreSQL
- Laravel 10

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/tu-usuario/noticias-api.git
cd noticias-api
composer install
```

Copia el archivo de entorno y configura tu base de datos:

```bash
cp .env.example .env
php artisan key:generate
```

Edita el archivo `.env` para configurar la base de datos y luego ejecuta las migraciones:

```bash
php artisan migrate --seed
```

## Servidor de desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```bash
php artisan serve
```

Esto iniciará el servidor en `http://127.0.0.1:8000/`.

## Rutas principales

El backend expone las siguientes rutas para gestionar noticias:

- `GET /api/noticias` - Obtener todas las noticias
- `GET /api/noticias/{id}` - Obtener una noticia específica
- `POST /api/noticias` - Crear una nueva noticia
- `PUT /api/noticias/{id}` - Actualizar una noticia
- `DELETE /api/noticias/{id}` - Eliminar una noticia

## Pruebas

Para ejecutar las pruebas, usa:

```bash
php artisan test
```

## Despliegue

Para generar una versión optimizada del proyecto, ejecuta:

```bash
php artisan optimize
```

Asegúrate de configurar correctamente tu entorno de producción y base de datos antes del despliegue.

## Colaboradores

- **[Rafaelx-ss](https://github.com/Rafaelx-ss)**
- **[JosePK0](https://github.com/JosePK0)**
- **[KevDom0317](https://github.com/KevDom0317)**
- **[blackgroxy](https://github.com/Gu1ll3rmo)**

## Recursos adicionales

- [Documentación de Laravel](https://laravel.com/docs)
- [Composer](https://getcomposer.org/)

