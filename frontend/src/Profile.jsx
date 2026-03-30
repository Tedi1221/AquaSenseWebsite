import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Profile() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    // Взимаме всички поръчки и филтрираме само тези на текущия потребител
    if (user) {
      axios.get('https://aquasense-backend-hg8e.onrender.com/api/orders')
        .then(res => {
          const filteredOrders = res.data.filter(order => order.userEmail === user.email);
          setMyOrders(filteredOrders);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Нямате достъп до тази страница.</h2>
        <Link to="/login"><button className="water-button">Към Вход</button></Link>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="profile-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="profile-header" style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#00d2ff' }}>Добре дошли, {user.name}!</h1>
        <p style={{ color: '#aaa' }}>Вашият профил: {user.email}</p>
      </div>

      <div className="cards-container" style={{ flexDirection: 'column' }}>
        
        {/* СЕКЦИЯ: МОИТЕ ПОРЪЧКИ */}
        <div className="card" style={{ borderTop: '4px solid #00ff88', width: '100%' }}>
          <h3>📦 Моите поръчки</h3>
          {myOrders.length === 0 ? (
            <p style={{ color: '#aaa' }}>Нямате направени поръчки все още.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              {myOrders.map(order => (
                <div key={order._id} style={{ background: '#2a2a2a', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Поръчка от {new Date(order.createdAt).toLocaleDateString('bg-BG')}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc' }}>Продукти: {order.items.map(i => i.name).join(', ')}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0 0 5px 0', color: 'gold', fontWeight: 'bold' }}>€{order.totalPrice}</p>
                    <span style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '12px', background: order.status === 'Pending' ? '#555' : (order.status === 'Shipped' ? '#00ff88' : '#ff4d4d'), color: order.status === 'Pending' ? 'white' : '#121212' }}>
                      {order.status === 'Pending' ? 'Чака одобрение' : (order.status === 'Shipped' ? 'Изпратена' : 'Отказана')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* СЕКЦИЯ: УСТРОЙСТВА */}
        <div className="card" style={{ borderTop: '4px solid #00d2ff', width: '100%', marginTop: '20px' }}>
          <h3>🌱 Моите устройства</h3>
          <p>Управлявайте вашите Aqua-Sense системи.</p>
          <Link to="/dashboard">
            <button className="water-button" style={{ marginTop: '15px', background: 'transparent', border: '2px solid #00d2ff' }}>
              Към Таблото (Управление)
            </button>
          </Link>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={handleLogout} className="logout-button-big">🚪 Изход от профила</button>
      </div>
    </div>
  );
}

export default Profile;