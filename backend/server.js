const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Успешна връзка с MongoDB Atlas!'))
  .catch(err => console.error('❌ Грешка при свързване с базата:', err));

// 1. СХЕМИ ЗА БАЗАТА ДАННИ
const sensorSchema = new mongoose.Schema({ moisture: Number, light: Number, status: String, timestamp: { type: Date, default: Date.now } });
const SensorData = mongoose.model('SensorData', sensorSchema);

// ДОБАВЕНО: role (с базова стойност 'user')
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } 
});
const User = mongoose.model('User', userSchema);

// ДОБАВЕНО: Схема за Продуктите в магазина
// ДОБАВЕНО: Схема за Продуктите в магазина (с ревюта)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  reviews: [{
    userName: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }]
});
const Product = mongoose.model('Product', productSchema);


// 2. ПЪТИЩА ЗА СЕНЗОРА И ПРОДУКТИТЕ
app.post('/api/data', async (req, res) => {
  try { const newData = new SensorData(req.body); await newData.save(); res.status(201).json(newData); } 
  catch (error) { res.status(500).json(error); }
});

app.get('/api/data', async (req, res) => {
  try { const data = await SensorData.find().sort({ timestamp: -1 }).limit(20); res.status(200).json(data); } 
  catch (error) { res.status(500).json(error); }
});

// Пътища за Продуктите (За Админ панела и Магазина)
app.post('/api/products', async (req, res) => {
  try { const newProduct = new Product(req.body); await newProduct.save(); res.status(201).json(newProduct); } 
  catch (error) { res.status(500).json(error); }
});

app.get('/api/products', async (req, res) => {
  try { const products = await Product.find(); res.status(200).json(products); } 
  catch (error) { res.status(500).json(error); }
});

// Взимане на ЕДИН конкретен продукт по ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) { res.status(500).json(error); }
});

// Добавяне на ревю към продукт
app.post('/api/products/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.reviews.push(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) { res.status(500).json(error); }
});

// Редактиране на продукт (PUT)
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) { res.status(500).json(error); }
});

// Изтриване на продукт (DELETE)
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Продуктът е изтрит!" });
  } catch (error) { res.status(500).json(error); }
});

// Схема за ПОРЪЧКИ
const orderSchema = new mongoose.Schema({
  userEmail: String,
  customerName: String,
  address: String,
  phone: String,
  items: Array,
  totalPrice: Number,
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected, Shipped
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// Схема за ТИКЕТИ (Съпорт)
const ticketSchema = new mongoose.Schema({
  userEmail: String,
  subject: String,
  message: String,
  status: { type: String, default: 'Open' }, // Open, Answered, Closed
  adminReply: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
const Ticket = mongoose.model('Ticket', ticketSchema);

// --- ПЪТИЩА ЗА ПОРЪЧКИ ---
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) { res.status(500).json(error); }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) { res.status(500).json(error); }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) { res.status(500).json(error); }
});

// --- ПЪТИЩА ЗА ТИКЕТИ (СЪПОРТ) ---
app.post('/api/tickets', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) { res.status(500).json(error); }
});

app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) { res.status(500).json(error); }
});

app.put('/api/tickets/:id/reply', async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, { adminReply: req.body.reply, status: 'Answered' }, { new: true });
    res.status(200).json(updatedTicket);
  } catch (error) { res.status(500).json(error); }
});

// 3. ПЪТИЩА ЗА ВХОД И РЕГИСТРАЦИЯ
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Този имейл вече е регистриран!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Успешна регистрация!" });
  } catch (error) { res.status(500).json({ message: "Грешка при регистрация." }); }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Грешен имейл или парола." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Грешен имейл или парола." });

    const token = jwt.sign({ id: user._id }, "super_secret_key", { expiresIn: "1h" });
    // ДОБАВЕНО: Връщаме и ролята (role) към фронтенда!
    res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) { res.status(500).json({ message: "Грешка при вход." }); }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Сървърът работи на порт ${PORT}`));