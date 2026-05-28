const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Modelo de Producto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 },
  categoryId: { type: Number, required: true },
  imageUrl: { type: String, default: 'https://picsum.photos/300/200' }
});

// Modelo de Categoria
const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    inicializarDatos();
  })
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Inicializar datos si no existen
async function inicializarDatos() {
  const productCount = await Product.countDocuments();
  const categoryCount = await Category.countDocuments();
  
  if (categoryCount === 0) {
    const categories = [
      { id: 1, name: 'Electrónicos' },
      { id: 2, name: 'Ropa' },
      { id: 3, name: 'Hogar' },
      { id: 4, name: 'Deportes' },
      { id: 5, name: 'Libros' }
    ];
    await Category.insertMany(categories);
    console.log('📁 Categorías inicializadas');
  }
  
  if (productCount === 0) {
    const products = [
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
    await Product.insertMany(products);
    console.log('📦 Productos inicializados (12 productos)');
  }
}

// RUTAS API
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;
    const newProduct = new Product({ ...req.body, id: newId });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint de salud
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mongodb: mongoose.connection.readyState === 1 });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📦 MongoDB: ${mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'}`);
});