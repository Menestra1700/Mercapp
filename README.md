# MercApp

## Descripción
MercApp es una aplicacion web de una sola pagina (SPA) desarrollada con Vue 3 y Composition API que consume una API REST propia. Permite gestionar un catalogo de productos, filtros, busqueda y un carrito de compras persistente.

## Datos del Estudiante
- Nombre: Enrique Patricio Guerrero Fuentes 
- Asignatura: Aplicaciones Web

## Funcionalidades Implementadas

### Backend (API REST)
- GET /api/products - Listar todos los productos
- GET /api/products/:id - Obtener un producto por ID
- POST /api/products - Crear nuevo producto
- PUT /api/products/:id - Editar producto existente
- DELETE /api/products/:id - Eliminar producto
- GET /api/categories - Listar categorias
- 12 productos y 5 categorias precargadas
- Validaciones y manejo de errores (400/404/500)

### Frontend (Vue 3)
- Catalogo de productos con diseño responsivo
- Buscador por nombre/descripcion
- Filtro por categoria
- Vista de detalle de producto (/product/:id)
- Carrito de compras con persistencia en localStorage
- Anadir, eliminar y modificar cantidades en el carrito
- Formulario para crear/editar productos con validacion
- Lazy loading de vistas (carga perezosa)
- Pagina 404 para rutas no encontradas
- Componentes reutilizables (ProductCard)
- Composables (useApi para peticiones HTTP)
- Comunicacion entre componentes (props/emits)

## Instalacion y Ejecución

### Requisitos Previos
- Node.js (version 18 o superior)
- npm (incluido con Node.js)

### Clon del repositorio
git clone https://github.com/Menestra1700/Mercapp.git
cd Mercapp

### Instalación y ejecución del Backend
cd backend
npm install
node server.js

### Instalación y ejecución del Frontend
Abrir una nueva terminal
cd frontend
npm install
npm run dev

### 4. Acceder a la aplicacion
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Tecnologias Utilizadas
- Frontend: Vue 3, Vue Router, Vite
- Backend: Node.js, Express, CORS
- Persistencia: localStorage, JSON en memoria

## Endpoints de la API

GET    /api/products       - Obtener todos los productos
GET    /api/products/:id   - Obtener un producto por ID
POST   /api/products       - Crear un nuevo producto
PUT    /api/products/:id   - Actualizar un producto
DELETE /api/products/:id   - Eliminar un producto
GET    /api/categories     - Obtener todas las categorias
