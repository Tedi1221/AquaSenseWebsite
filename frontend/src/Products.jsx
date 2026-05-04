import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingCart, Info } from 'lucide-react';
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
    window.dispatchEvent(new Event('cartUpdated')); 
  };

  return (
    <div style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '4rem' }}
      >
        {t('nav_products')}
      </motion.h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem',
      }}>
        {products.length === 0 ? <p style={{ gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>Loading products...</p> : null}
        
        {products.map((product, i) => (
          <motion.div 
            key={product._id} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card" 
            style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', padding: '1.5rem' }}
          >
            <Link to={`/product/${product._id}`} style={{ overflow: 'hidden', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={product.images?.[0] || product.imageUrl || '/product.jpg'} 
                alt={product.name} 
                style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} 
              />
            </Link>
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{product.name}</h3>
            
            <h2 style={{ color: 'var(--accent-primary)', fontSize: '2rem', marginBottom: '1.5rem', marginTop: 'auto' }}>€{product.price}</h2>
            
            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
              <Link to={`/product/${product._id}`} style={{ flex: 1 }}>
                <button className="water-button secondary-btn" style={{ width: '100%', padding: '0.8rem 0', fontSize: '1rem', justifyContent: 'center' }}>
                  <Info size={18} /> Details
                </button>
              </Link>
              <button className="water-button" onClick={() => handleBuy(product)} style={{ flex: 1, padding: '0.8rem 0', fontSize: '1rem', justifyContent: 'center' }}>
                <ShoppingCart size={18} /> Add
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Products;