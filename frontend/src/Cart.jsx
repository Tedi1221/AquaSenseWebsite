import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({ address: '', phone: '' });
  const navigate = useNavigate();
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const handleRemove = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Моля, влезте в профила си, за да завършите поръчката!");
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        userEmail: user.email,
        customerName: user.name,
        address: formData.address,
        phone: formData.phone,
        items: cartItems,
        totalPrice: total
      };

      await axios.post('https://aquasense-backend-hg8e.onrender.com/api/orders', orderData);
      
      alert("✅ Поръчката е приета успешно! Очаквайте потвърждение.");
      setCartItems([]);
      localStorage.removeItem('cart');
      setShowCheckout(false);
      navigate('/profile'); // Пращаме го в профила да си види поръчката
    } catch (error) {
      alert("Възникна грешка при изпращане на поръчката.");
    }
  };

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
                <button onClick={() => handleRemove(i)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}>✖</button>
              </div>
            </div>
          ))}
          
          <div className="card" style={{ marginTop: '20px', textAlign: 'right', borderTop: '4px solid gold' }}>
            <h2>Общо: <span style={{ color: 'gold' }}>€{total.toFixed(2)}</span></h2>
            
            {!showCheckout ? (
              <button className="water-button" onClick={() => setShowCheckout(true)} style={{ marginTop: '15px', background: 'gold', color: '#121212' }}>
                💳 Продължи към плащане
              </button>
            ) : (
              <form onSubmit={handleOrderSubmit} className="auth-form" style={{ marginTop: '20px', textAlign: 'left' }}>
                <h3 style={{ color: '#00d2ff', marginBottom: '15px' }}>📍 Данни за доставка</h3>
                <input type="text" placeholder="Точен адрес за доставка" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
                <input type="tel" placeholder="Телефонен номер" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button type="submit" className="water-button" style={{ background: '#00ff88', color: '#121212', flex: 1 }}>✅ Завърши поръчката</button>
                  <button type="button" onClick={() => setShowCheckout(false)} className="water-button" style={{ background: '#333', flex: 1 }}>Отказ</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;