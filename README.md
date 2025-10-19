# Sistema de Gestión de Biblioteca

Este es un sistema completo de gestión de biblioteca que permite administrar libros, autores, préstamos y usuarios.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- `/backend` - API REST desarrollada con Laravel
- `/frontend` - Interfaz de usuario desarrollada con React y Vite

## Características Principales

- Gestión de usuarios y autenticación
- Catálogo de libros
- Gestión de autores
- Control de préstamos
- Categorización por géneros
- Búsqueda avanzada
- Reportes y estadísticas

## Requisitos del Sistema

### Backend
- PHP >= 8.1
- Composer
- MySQL/MariaDB
- Node.js y npm

### Frontend
- Node.js >= 16
- npm >= 8

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/David40t/Biblioteca.git
cd Biblioteca
```

2. Configurar el backend (ver `/backend/README.md`)

3. Configurar el frontend (ver `/frontend/README.md`)

## Desarrollo

Para desarrollar localmente, necesitarás ejecutar tanto el backend como el frontend:

1. Backend:
```bash
cd backend
php artisan serve
```

2. Frontend:
```bash
cd frontend
npm run dev
```

## Contribuir

1. Fork el proyecto
2. Crea tu rama de función (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.