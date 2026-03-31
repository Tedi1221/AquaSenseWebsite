import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminPanel from './AdminPanel';
import Profile from './Profile';
import Products from './Products';
import Cart from './Cart';
import ProductDetails from './ProductDetails';

// 🚀 ВРЪЩАМЕ ЛИПСВАЩИТЕ ИМПОРТИ:
import About from './About'; 
import Demo from './Demo'; // (Ако файлът ти за демото се казва по друг начин, промени името тук)

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        
        {/* 🚀 ЕТО ГИ ЛИПСВАЩИТЕ МАРШРУТИ: */}
        <Route path="/about" element={<About />} />
        <Route path="/demo" element={<Demo />} />
        
      </Routes>
    </Router>
  );
}

export default App;