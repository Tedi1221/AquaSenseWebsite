import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Profile() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  const [myOrders, setMyOrders] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });

  const fetchData = async () => {
    if (user) {
      try {
        const [ordersRes, ticketsRes] = await Promise.all([
          axios.get('https://aquasense-backend-hg8e.onrender.com/api/orders'),
          axios.get('https://aquasense-backend-hg8e.onrender.com/api/tickets')
        ]);
        
        setMyOrders(ordersRes.data.filter(order => order.userEmail === user.email));
        setMyTickets(ticketsRes.data.filter(ticket => ticket.userEmail === user.email));
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => { fetchData(); }, [user]);

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

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://aquasense-backend-hg8e.onrender.com/api/tickets', {
        userEmail: user.email,
        subject: newTicket.subject,
        message: newTicket.message
      });
      alert('Съобщението е изпратено успешно! Ще получите отговор тук скоро.');
      setNewTicket({ subject: '', message: '' });
      setShowTicketForm(false);
      fetchData(); // Опресняваме списъка
    } catch (error) {
      alert('Възникна грешка при изпращането.');
    }
  };

  return (
    <div className="profile-page" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '50px' }}>
      <div className="profile-header" style={{ marginBottom: '40px', marginTop: '20px' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem', margin: 0 }}>Здравейте, {user.name}</h1>
        <p style={{ color: '#a1a1a6', fontSize: '1.2rem' }}>{user.email}</p>
      </div>

      <div className="cards-container" style={{ flexDirection: 'column', gap: '30px' }}>
        
        {/* СЕКЦИЯ: МОИТЕ ПОРЪЧКИ */}
        <div className="glass-card" style={{ width: '100%', borderTop: '2px solid #00ff88' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>📦 История на поръчките</h3>
          {myOrders.length === 0 ? (
            <p style={{ color: '#a1a1a6' }}>Нямате направени поръчки.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {myOrders.map(order => (
                <div key={order._id} style={{ background: 'rgba(0,0,0,0.4)', padding: '15px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Поръчка от {new Date(order.createdAt).toLocaleDateString('bg-BG')}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#a1a1a6' }}>{order.items.map(i => i.name).join(', ')}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0 0 5px 0', color: '#00d2ff', fontWeight: 'bold', fontSize: '1.1rem' }}>€{order.totalPrice}</p>
                    <span style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '12px', background: order.status === 'Pending' ? '#555' : (order.status === 'Shipped' ? '#00ff88' : '#ff4d4d'), color: order.status === 'Pending' ? 'white' : '#121212', fontWeight: 'bold' }}>
                      {order.status === 'Pending' ? 'Чака одобрение' : (order.status === 'Shipped' ? 'Изпратена' : 'Отказана')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* СЕКЦИЯ: УСТРОЙСТВА */}
        <div className="glass-card" style={{ width: '100%', borderTop: '2px solid #00d2ff' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🌱 Моите устройства</h3>
          <p style={{ color: '#a1a1a6', marginBottom: '20px' }}>Управлявайте вашите Aqua-Sense системи и следете данните в реално време.</p>
          <Link to="/dashboard">
            <button className="water-button" style={{ background: 'transparent', border: '1px solid #00d2ff', color: '#00d2ff' }}>
              Към Таблото за Управление
            </button>
          </Link>
        </div>

        {/* СЕКЦИЯ: ПОДДРЪЖКА (СЪПОРТ) */}
        <div className="glass-card" style={{ width: '100%', borderTop: '2px solid #ff4d4d' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>🎧 Център за поддръжка</h3>
            <button onClick={() => setShowTicketForm(!showTicketForm)} className="water-button" style={{ padding: '8px 15px', fontSize: '0.9rem', background: showTicketForm ? '#333' : '#00d2ff' }}>
              {showTicketForm ? 'Отказ' : 'Ново запитване'}
            </button>
          </div>

          {showTicketForm && (
            <form onSubmit={handleTicketSubmit} className="auth-form" style={{ marginBottom: '30px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px' }}>
              <input type="text" placeholder="Тема (напр. Проблем с помпата)" value={newTicket.subject} onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})} required style={{ background: '#111' }} />
              <textarea placeholder="Опишете проблема си тук..." value={newTicket.message} onChange={(e) => setNewTicket({...newTicket, message: e.target.value})} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#111', color: 'white', minHeight: '100px', marginBottom: '10px', fontFamily: 'inherit' }} />
              <button type="submit" className="water-button" style={{ width: '100%', background: '#ff4d4d' }}>Изпрати съобщение</button>
            </form>
          )}

          {myTickets.length === 0 ? (
            <p style={{ color: '#a1a1a6' }}>Нямате отворени запитвания.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {myTickets.map(ticket => (
                <div key={ticket._id} style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', borderLeft: ticket.status === 'Open' ? '3px solid #ff4d4d' : '3px solid #00ff88' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong style={{ fontSize: '1.1rem' }}>{ticket.subject}</strong>
                    <span style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '8px', background: ticket.status === 'Open' ? '#ff4d4d' : '#00ff88', color: ticket.status === 'Open' ? 'white' : '#121212', fontWeight: 'bold' }}>
                      {ticket.status === 'Open' ? 'Чака отговор' : 'Отговорено'}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 15px 0', color: '#ccc', fontSize: '0.95rem' }}>Вие: {ticket.message}</p>
                  
                  {ticket.adminReply && (
                    <div style={{ background: 'rgba(0, 210, 255, 0.1)', padding: '15px', borderRadius: '8px', borderLeft: '2px solid #00d2ff' }}>
                      <p style={{ margin: '0 0 5px 0', color: '#00d2ff', fontWeight: 'bold', fontSize: '0.85rem' }}>Отговор от екипа:</p>
                      <p style={{ margin: 0, color: '#f5f5f7' }}>{ticket.adminReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button onClick={handleLogout} style={{ background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '10px 30px', borderRadius: '999px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s' }}>
          Изход от профила
        </button>
      </div>
    </div>
  );
}

export default Profile;