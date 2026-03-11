# Frontend - Consulta Psicológica

## Descripción

Frontend desarrollado en Angular 17 para el sistema de gestión de consulta psicológica. Proporciona una interfaz moderna y responsive para usuarios y administradores.

## Características

### Para Visitantes
- ✅ Página de inicio con información de la consulta
- ✅ Visualización de servicios y especialidades
- ✅ Información de contacto y horarios

### Para Usuarios Registrados
- ✅ Panel de usuario personal
- ✅ Solicitud de citas
- ✅ Visualización de citas programadas
- ✅ Información de la consulta

### Para Administradores (Psicóloga)
- ✅ Panel de administración completo
- ✅ Gestión de clientes
- ✅ Gestión de citas
- ✅ Control financiero
- ✅ Configuración de la consulta

## Tecnologías Utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Iconos
- **RxJS** - Programación reactiva
- **Angular Material** - Componentes UI

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**:
```bash
cd psicologia-frontend
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar el backend**:
Asegúrate de que el backend esté ejecutándose en `http://localhost:5000`

4. **Ejecutar en modo desarrollo**:
```bash
npm start
```

La aplicación estará disponible en: `http://localhost:4200`

### Comandos Útiles

```bash
# Ejecutar en modo desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test

# Ejecutar linting
npm run lint
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── models/           # Interfaces TypeScript
│   ├── services/         # Servicios para API
│   ├── interceptors/     # Interceptores HTTP
│   ├── pages/           # Componentes de páginas
│   │   ├── home/        # Página de inicio
│   │   ├── auth/        # Autenticación
│   │   ├── dashboard/   # Panel de usuario
│   │   ├── admin/       # Panel de administración
│   │   └── not-found/   # Página 404
│   ├── app.component.ts # Componente principal
│   ├── app.routes.ts    # Configuración de rutas
│   └── app.config.ts    # Configuración de la app
├── assets/              # Recursos estáticos
└── styles.scss          # Estilos globales
```

## Funcionalidades Principales

### Autenticación
- Login/Logout
- Registro de usuarios
- Gestión de tokens JWT
- Protección de rutas

### Gestión de Clientes (Admin)
- Lista de clientes
- Crear/editar clientes
- Información detallada
- Historial de citas

### Gestión de Citas
- Programar citas
- Confirmar/cancelar
- Estados de citas
- Calendario

### Gestión Financiera (Admin)
- Registro de ingresos/gastos
- Categorización
- Reportes
- Balance

### Configuración (Admin)
- Información de la consulta
- Horarios
- Servicios
- Contacto

## API Endpoints

El frontend se comunica con el backend a través de los siguientes endpoints:

- **Autenticación**: `/api/auth/*`
- **Clientes**: `/api/clients/*`
- **Citas**: `/api/appointments/*`
- **Finanzas**: `/api/financial/*`
- **Consultación**: `/api/consultation/*`

## Responsive Design

La aplicación está completamente optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## Navegación

### Rutas Públicas
- `/` - Página de inicio
- `/home` - Página de inicio
- `/login` - Iniciar sesión
- `/register` - Registrarse

### Rutas Protegidas (Usuarios)
- `/dashboard` - Panel de usuario

### Rutas de Administración
- `/admin` - Panel de administración
- `/admin/clients` - Gestión de clientes
- `/admin/appointments` - Gestión de citas
- `/admin/financial` - Gestión financiera
- `/admin/consultation` - Configuración

## Desarrollo

### Crear un nuevo componente
```bash
ng generate component pages/nuevo-componente
```

### Crear un nuevo servicio
```bash
ng generate service services/nuevo-servicio
```

### Crear un nuevo modelo
```bash
# Crear manualmente en src/app/models/
```

## Despliegue

### Build de Producción
```bash
npm run build
```

### Desplegar en servidor
Los archivos generados en `dist/` pueden ser desplegados en cualquier servidor web estático.

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT.

---

**Nota**: Este frontend está diseñado para trabajar con el backend Spring Boot correspondiente.
