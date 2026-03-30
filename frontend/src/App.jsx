import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminPanel from './AdminPanel';
import Profile from './Profile';
import Products from './Products';
import Cart from './Cart';
import ProductDetails from './ProductDetails'; // Ето го правилно импортиран!
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
        {/* Ето го новият път за индивидуалния продукт */}
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;