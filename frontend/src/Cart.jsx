import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const [orderInfo, setOrderInfo] = useState({ name: '', address: '', phone: '' });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Зареждане на количката при старт
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    if (user) {
      setOrderInfo(prev => ({ ...prev, name: user.name }));
    }
  }, []);

  // ФУНКЦИЯ ЗА ПРЕМАХВАНЕ НА ПРОДУКТ (СЪС СИГНАЛ)
  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // 🚀 ПРАЩАМЕ СИГНАЛ КЪМ NAVBAR ДА ОБНОВИ ЧИСЛОТО ВЕДНАГА
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + Number(item.price), 0);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Моля, влезте в профила си, за да направите поръчка.");
      return navigate('/login');
    }
    if (cart.length === 0) return alert("Количката е празна!");

    const orderData = {
      userEmail: user.email,
      customerName: orderInfo.name,
      address: orderInfo.address,
      phone: orderInfo.phone,
      items: cart,
      totalPrice: calculateTotal()
    };

    try {
      await axios.post('https://aquasense-backend-hg8e.onrender.com/api/orders', orderData);
      alert('🎉 Поръчката е приета успешно! Благодарим ви!');
      
      // ИЗЧИСТВАНЕ И СИГНАЛ
      localStorage.removeItem('cart');
      setCart([]);
      window.dispatchEvent(new Event('cartUpdated')); 
      
      navigate('/profile');
    } catch (error) {
      alert('Грешка при изпращане на поръчката.');
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '3rem', color: '#a1a1a6' }}>Твоята количка е празна 🛒</h1>
        <p style={{ marginBottom: '30px' }}>Изглежда още не си избрал нищо за своите растения.</p>
        <button onClick={() => navigate('/products')} className="water-button">Към магазина</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '50px 20px' }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '40px' }}>Твоята количка</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* ЛЯВО: СПИСЪК С ПРОДУКТИ */}
        <div style={{ flex: '1 1 600px' }}>
          {cart.map((item, index) => (
            <div key={index} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px', padding: '15px' }}>
              <img src={item.images?.[0] || item.imageUrl || '/product.jpg'} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ color: '#00d2ff', fontWeight: 'bold', margin: '5px 0' }}>€{item.price}</p>
              </div>
              <button onClick={() => removeFromCart(index)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
            </div>
          ))}
        </div>

        {/* ДЯСНО: ДАННИ ЗА ДОСТАВКА И ПЛАЩАНЕ */}
        <div style={{ flex: '1 1 350px' }}>
          <div className="glass-card" style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ marginTop: 0 }}>Обобщение</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <span>Общо:</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ff88' }}>€{calculateTotal()}</span>
            </div>

            <form onSubmit={handleOrderSubmit} className="auth-form" style={{ background: 'transparent', padding: 0 }}>
              <input type="text" placeholder="Име и фамилия" value={orderInfo.name} onChange={(e) => setOrderInfo({...orderInfo, name: e.target.value})} required style={{ background: '#111' }} />
              <input type="text" placeholder="Адрес за доставка" value={orderInfo.address} onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})} required style={{ background: '#111' }} />
              <input type="tel" placeholder="Телефон за връзка" value={orderInfo.phone} onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})} required style={{ background: '#111' }} />
              
              <button type="submit" className="water-button" style={{ width: '100%', marginTop: '20px', padding: '15px' }}>
                🚀 Завърши поръчката
              </button>
            </form>
            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '15px', textAlign: 'center' }}>
              Плащане при доставка (Наложен платеж)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;