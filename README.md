# gestion_compromisos

Sistema para la gestión de actas, compromisos y gestiones.

## Características
# Sistema de Gestión de Actas, Compromisos y Gestiones

## Descripción
Este proyecto es un sistema completo para la gestión de actas, compromisos y gestiones, desarrollado con Django (backend) y React (frontend). Cumple todos los requisitos de seguridad, roles, protección de archivos y diseño moderno tipo dashboard.

## Stack
- **Backend:** Django 5.x, Django REST Framework, SimpleJWT, SQLite
- **Frontend:** React 19.x, CSS Modules

## Características
- **Autenticación:**
  - Login clásico (`correo`, `contraseña`)
  - Token JWT, sesión persistente
  - Roles: Administrador y Usuario Base
  - Rutas protegidas en frontend y backend
- **Usuarios precargados:**
  - admin / admin123 (Administrador)
  - base / base123 (Usuario Base)
- **Panel de Actas:**
  - Tabla con título, estado, fecha, compromisos y botón de detalle
  - Filtros por estado, título y fecha
  - Solo muestra actas según el rol
- **Detalle de Acta:**
  - Muestra todos los datos del acta
  - Lista compromisos y gestiones asociadas
  - PDF embebido y descarga protegida
  - Botón para agregar gestión si el usuario tiene permisos
- **Gestiones:**
  - Formulario con fecha, descripción y archivo adjunto
  - Validaciones: solo PDF/JPG, máximo 5MB
  - Archivos protegidos, solo usuarios autenticados pueden acceder
- **Protección de archivos:**
  - Endpoint `/media/<archivo>` retorna 403 si no está autenticado
- **Diseño moderno:**
  - Dashboard responsivo, estilos con CSS Modules
  - Etiquetas, iconos y animaciones

## Instalación y uso
1. Clona el repositorio:
   ```bash
   git clone https://github.com/JULIORODR/gestion_compromisos.git
   ```
2. Instala dependencias backend:
   ```bash
   cd gestion_compromisos
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py initusers
   python manage.py runserver
   ```
3. Instala dependencias frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. Accede a la app en [http://localhost:3000](http://localhost:3000)

## Estructura de carpetas
- `backend/` y `gestion/`: Django backend y app principal
- `frontend/`: React frontend
- `media/`: Archivos subidos (PDF/JPG)

## Endpoints principales
- `/login/`: Autenticación y obtención de rol
- `/actas/`: Listado y creación de actas
- `/actas/:id/`: Detalle de acta
- `/gestiones/`: Creación de gestiones
- `/usuarios/`: Listado de usuarios
- `/media/<archivo>`: Descarga protegida de archivos

## Seguridad y roles
- El backend valida el rol y protege los endpoints
- El frontend muestra/oculta opciones según el rol
- Los archivos solo pueden ser descargados por usuarios autenticados

## Créditos
Desarrollado por JULIORODR con ayuda de GitHub Copilot.
## Instalación

### Backend
1. Instala dependencias:
   ```sh
   pip install -r requirements.txt
   ```
2. Ejecuta migraciones:
   ```sh
   python manage.py migrate
   ```
3. Inicia el servidor:
   ```sh
   python manage.py runserver
   ```

### Frontend
1. Instala dependencias:
   ```sh
   cd frontend
   npm install
   ```
2. Inicia el servidor:
   ```sh
   npm start
   ```

## Uso
- Accede a `/login` para iniciar sesión.
- Panel de actas, detalle, gestión y descarga de archivos protegidos.

## Requisitos
- Python 3.11+
- Node.js 18+

## Autor
Julio Rodríguez

---

> Proyecto desarrollado para la gestión eficiente de compromisos y actas.
