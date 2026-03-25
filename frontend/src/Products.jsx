import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Products() {
  const [products, setProducts] = useState([]);

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
    alert(`🛒 "${product.name}" беше добавен в количката!`);
  };

  return (
    <div style={{ padding: '50px 20px', textAlign: 'center', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#00d2ff', fontSize: '3rem', marginBottom: '50px' }}>Нашите продукти</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 350px))', justifyContent: 'center', gap: '40px' }}>
        
        {products.length === 0 ? <p style={{ gridColumn: '1 / -1' }}>В момента няма налични продукти.</p> : null}
        
        {products.map(product => (
          <div key={product._id} className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', borderTop: '4px solid #00ff88' }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{product.name}</h3>
            <p style={{ color: '#aaa', flexGrow: 1 }}>{product.description}</p>
            <h2 style={{ color: '#00d2ff', margin: '20px 0' }}>€{product.price}</h2>
            
            <button className="water-button" onClick={() => handleBuy(product)} style={{ width: '100%', marginTop: 'auto' }}>
              🛒 Добави в количката
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;