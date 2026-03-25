import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Взимаме запазените продукти от паметта на браузъра
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const handleRemove = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1); // Премахваме конкретния продукт
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Пресмятаме общата сума
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="profile-page" style={{ padding: '50px 20px', maxWidth: '900px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ color: '#00d2ff', textAlign: 'center', marginBottom: '40px' }}>🛒 Моята количка</h1>
      
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#aaa' }}>Количката ви е празна.</p>
          <Link to="/products"><button className="water-button" style={{ marginTop: '20px' }}>Към магазина</button></Link>
        </div>
      ) : (
        <div className="cards-container" style={{ flexDirection: 'column', gap: '15px' }}>
          {cartItems.map((item, i) => (
            <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{item.name}</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <h3 style={{ color: '#00ff88', margin: 0 }}>€{item.price}</h3>
                <button onClick={() => handleRemove(i)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}>✖ Премахни</button>
              </div>
            </div>
          ))}
          
          <div className="card" style={{ marginTop: '20px', textAlign: 'right', borderTop: '4px solid gold' }}>
            <h2>Общо за плащане: <span style={{ color: 'gold' }}>€{total.toFixed(2)}</span></h2>
            <button className="water-button" style={{ marginTop: '15px', background: 'gold', color: '#121212' }}>💳 Продължи към плащане</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;