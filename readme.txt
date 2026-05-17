Nombre: Enrique Patricio Guerrero Fuentes
Curso: Aplicaciones Web

URL del repositorio GitHub: https://github.com/Menestra1700/Mercapp

Instrucciones para ejecutar:

Backend:
cd backend
npm install
node server.js

Frontend (abrir otra terminal):
cd frontend
npm install
npm run dev

Abrir navegador en: http://localhost:5173

Funcionalidades implementadas:
- Catalogo de productos (12 productos, 5 categorias)
- Buscador por nombre/descripcion
- Filtro por categoria
- Carrito de compras persistente (localStorage)
- Crear, editar y eliminar productos
- Vista de detalle de producto (/product/:id)
- Pagina 404 para rutas no encontradas
- Lazy loading de vistas
- Componentes reutilizables (ProductCard)
- Composables (useApi para peticiones HTTP)
- Comunicacion entre componentes (props/emits)
- API REST completa (GET, POST, PUT, DELETE)
- Validaciones y manejo de errores
- Persistencia de datos en memoria

Instalacion y Ejecución

Requisitos Previos
- Node.js (version 18 o superior)
- npm (incluido con Node.js)

Clon del repositorio
git clone https://github.com/Menestra1700/Mercapp.git
cd Mercapp

Instalación y ejecución del Backend
cd backend
npm install
node server.js

Instalación y ejecución del Frontend
Abrir una nueva terminal
cd frontend
npm install
npm run dev

Acceder a la aplicacion
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

Tecnologias Utilizadas
- Frontend: Vue 3, Vue Router, Vite
- Backend: Node.js, Express, CORS
- Persistencia: localStorage, JSON en memoria

Endpoints de la API

GET    /api/products       - Obtener todos los productos
GET    /api/products/:id   - Obtener un producto por ID
POST   /api/products       - Crear un nuevo producto
PUT    /api/products/:id   - Actualizar un producto
DELETE /api/products/:id   - Eliminar un producto
GET    /api/categories     - Obtener todas las categorias