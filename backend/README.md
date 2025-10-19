# Backend Biblioteca

Este es el backend de la aplicación Biblioteca, desarrollado con Laravel.

## Requisitos Previos

- PHP >= 8.1
- Composer
- MySQL/MariaDB
- Node.js y npm (para Vite)

## Instalación

1. Clonar el repositorio
2. Instalar dependencias de PHP:
```bash
composer install
```

3. Instalar dependencias de Node:
```bash
npm install
```

4. Configurar el archivo `.env`:
```bash
cp .env.example .env
php artisan key:generate
```

5. Configurar la base de datos en el archivo `.env`

6. Ejecutar las migraciones y seeders:
```bash
php artisan migrate --seed
```

## Estructura del Proyecto

### Modelos
- `User.php` - Gestión de usuarios
- `Author.php` - Gestión de autores
- `Book.php` - Gestión de libros
- `Gender.php` - Gestión de géneros literarios
- `Loan.php` - Gestión de préstamos

### Migraciones
El proyecto incluye migraciones para todas las tablas necesarias:
- Usuarios
- Autores
- Géneros
- Libros
- Préstamos

### Factories y Seeders
Se incluyen factories para generar datos de prueba para:
- Usuarios
- Autores
- Libros
- Géneros

## Ejecución

Para iniciar el servidor de desarrollo:
```bash
php artisan serve
```

## Tests

Para ejecutar las pruebas:
```bash
php artisan test
```
o
```bash
./vendor/bin/pest
```

## Licencia

Este proyecto está bajo la Licencia MIT.
