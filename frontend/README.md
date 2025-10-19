# Frontend Biblioteca

Este es el frontend de la aplicación Biblioteca, desarrollado con React y Vite.

## Requisitos Previos

- Node.js >= 16
- npm >= 8

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

## Estructura del Proyecto

```
src/
├── assets/     # Recursos estáticos
├── pages/      # Componentes de páginas
└── services/   # Servicios y llamadas a API
```

## Scripts Disponibles

### Desarrollo

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

### Construcción

Para construir la aplicación para producción:
```bash
npm run build
```

### Vista previa

Para previsualizar la versión de producción:
```bash
npm run preview
```

## Características

- Interfaz moderna y responsive
- Integración con API REST del backend
- Gestión de estado eficiente
- Rutas protegidas
- Validación de formularios

## ESLint

El proyecto utiliza ESLint para mantener un código limpio y consistente. Puedes ejecutar el linter con:
```bash
npm run lint
```

## Licencia

Este proyecto está bajo la Licencia MIT.
