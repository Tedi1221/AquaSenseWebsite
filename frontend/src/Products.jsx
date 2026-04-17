import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './App.css';

function Products() {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://aquasense-backend-hg8e.onrender.com/api/products');
        setProducts(res.data);
      } catch (error) { console.error(error); }
    };
    fetchProducts();
  }, []);

  const handleBuy = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    // Пращаме сигнал към Navbar да обнови количката с анимация
    window.dispatchEvent(new Event('cartUpdated')); 
  };

  return (
    <div style={{ padding: '50px 20px', textAlign: 'center', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '50px' }}>{t('nav_products')}</h1>
      
      {/* 🚀 ОПРАВЕНАТА МРЕЖА: Точно по 3 на ред за десктоп */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', justifyContent: 'center', gap: '40px' }}>
        {products.length === 0 ? <p style={{ gridColumn: '1 / -1' }}>В момента няма налични продукти.</p> : null}
        
        {products.map(product => (
          <div key={product._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', padding: '20px', boxSizing: 'border-box' }}>
            <Link to={`/product/${product._id}`}>
              {/* Показва първата снимка от масива, ако има такава */}
              <img 
                src={product.images?.[0] || product.imageUrl || '/product.jpg'} 
                alt={product.name} 
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px', cursor: 'pointer', transition: 'transform 0.3s' }} 
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} 
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} 
              />
            </Link>
            
            {/* Името е с фиксирана минимална височина, за да не се разместват картите */}
            <h3 style={{ fontSize: '1.4rem', margin: '0 0 15px 0', minHeight: '55px' }}>{product.name}</h3>
            
            {/* 🚀 ОПИСАНИЕТО БЕШЕ ИЗТРИТО ОТ ТУК! */}
            
            {/* marginTop: 'auto' бута цената и бутоните винаги най-отдолу! */}
            <h2 style={{ color: '#00d2ff', margin: '0 0 20px 0', marginTop: 'auto' }}>€{product.price}</h2>
            
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <Link to={`/product/${product._id}`} style={{ flex: 1, textDecoration: 'none' }}>
                <button className="water-button" style={{ width: '100%', padding: '10px 0', background: 'transparent', border: '1px solid #00d2ff', color: '#00d2ff', fontSize: '0.9rem' }}>ℹ️ Детайли</button>
              </Link>
              <button className="water-button" onClick={() => handleBuy(product)} style={{ flex: 1, padding: '10px 0', fontSize: '0.9rem' }}>🛒 Купи</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;