const http = require('http');

const categories = [
  { id: 1, name: 'Electrónicos' },
  { id: 2, name: 'Ropa' },
  { id: 3, name: 'Hogar' },
  { id: 4, name: 'Deportes' },
  { id: 5, name: 'Libros' }
];

let products = [
  { id: 1, name: 'Laptop Gaming', price: 1200, description: 'Laptop de alta gama para gaming', stock: 10, categoryId: 1, imageUrl: 'https://picsum.photos/id/0/300/200' },
  { id: 2, name: 'Smartphone', price: 800, description: 'Teléfono inteligente última generación', stock: 15, categoryId: 1, imageUrl: 'https://picsum.photos/id/1/300/200' },
  { id: 3, name: 'Camiseta Deportiva', price: 25, description: 'Camiseta de algodón transpirable', stock: 50, categoryId: 2, imageUrl: 'https://picsum.photos/id/2/300/200' },
  { id: 4, name: 'Sofá Moderno', price: 450, description: 'Sofá elegante para tu hogar', stock: 5, categoryId: 3, imageUrl: 'https://picsum.photos/id/3/300/200' },
  { id: 5, name: 'Audífonos Bluetooth', price: 80, description: 'Sonido envolvente sin cables', stock: 30, categoryId: 1, imageUrl: 'https://picsum.photos/id/4/300/200' },
  { id: 6, name: 'Pantalón Jeans', price: 45, description: 'Jeans de corte moderno', stock: 40, categoryId: 2, imageUrl: 'https://picsum.photos/id/5/300/200' },
  { id: 7, name: 'Lámpara LED', price: 35, description: 'Iluminación eficiente', stock: 25, categoryId: 3, imageUrl: 'https://picsum.photos/id/6/300/200' },
  { id: 8, name: 'Pelota de Fútbol', price: 30, description: 'Pelota oficial', stock: 20, categoryId: 4, imageUrl: 'https://picsum.photos/id/7/300/200' },
  { id: 9, name: 'Tablet', price: 300, description: 'Pantalla 10 pulgadas', stock: 12, categoryId: 1, imageUrl: 'https://picsum.photos/id/8/300/200' },
  { id: 10, name: 'Zapatos Running', price: 90, description: 'Amortiguación profesional', stock: 18, categoryId: 4, imageUrl: 'https://picsum.photos/id/9/300/200' },
  { id: 11, name: 'Libro JavaScript', price: 40, description: 'Aprende JavaScript desde cero', stock: 25, categoryId: 5, imageUrl: 'https://picsum.photos/id/10/300/200' },
  { id: 12, name: 'Mesa de Escritorio', price: 150, description: 'Mesa ergonómica', stock: 8, categoryId: 3, imageUrl: 'https://picsum.photos/id/11/300/200' }
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  const url = req.url;
  
  if (url === '/api/products' && req.method === 'GET') {
    res.end(JSON.stringify(products));
  }

  else if (url === '/api/categories' && req.method === 'GET') {
    res.end(JSON.stringify(categories));
  }

  else if (url.match(/\/api\/products\/\d+/) && req.method === 'GET') {
    const id = parseInt(url.split('/')[3]);
    const product = products.find(p => p.id === id);
    if (product) {
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Producto no encontrado' }));
    }
  }

  else if (url === '/api/products' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const newProduct = JSON.parse(body);
      newProduct.id = products.length + 1;
      products.push(newProduct);
      res.writeHead(201);
      res.end(JSON.stringify(newProduct));
    });
  }

  else if (url.match(/\/api\/products\/\d+/) && req.method === 'PUT') {
    const id = parseInt(url.split('/')[3]);
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...JSON.parse(body) };
        res.end(JSON.stringify(products[index]));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Producto no encontrado' }));
      }
    });
  }

  else if (url.match(/\/api\/products\/\d+/) && req.method === 'DELETE') {
    const id = parseInt(url.split('/')[3]);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Producto no encontrado' }));
    }
  }
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

server.listen(3000, () => {
  console.log(' Servidor con 12 productos y 5 categorías');
  console.log(' http://localhost:3000/api/products');
});