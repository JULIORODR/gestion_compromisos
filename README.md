# gestion_compromisos

Sistema para la gestión de actas, compromisos y gestiones.

## Características
- Backend en Django + Django REST Framework
- Frontend en React con CSS Modules
- Autenticación JWT y roles (admin/base)
- Protección de archivos y rutas
- Consumo exclusivo de API propia
- Diseño moderno tipo dashboard

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
