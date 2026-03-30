import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function AdminPanel() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', 'tickets'
  
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', imageUrl: '/product.jpg' });
  const [editingId, setEditingId] = useState(null);
  
  const [orders, setOrders] = useState([]);
  
  const [tickets, setTickets] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  if (!user || user.role !== 'admin') {
    return <h2 style={{ textAlign: 'center', marginTop: '100px', color: '#ff4d4d' }}>⛔ Достъпът е отказан.</h2>;
  }

  const fetchData = async () => {
    try {
      const [prodRes, ordRes, tickRes] = await Promise.all([
        axios.get('https://aquasense-backend-hg8e.onrender.com/api/products'),
        axios.get('https://aquasense-backend-hg8e.onrender.com/api/orders'),
        axios.get('https://aquasense-backend-hg8e.onrender.com/api/tickets')
      ]);
      setProducts(prodRes.data);
      setOrders(ordRes.data);
      setTickets(tickRes.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchData(); }, []);

  // ПРОДУКТИ
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await axios.put(`https://aquasense-backend-hg8e.onrender.com/api/products/${editingId}`, newProduct);
      else await axios.post('https://aquasense-backend-hg8e.onrender.com/api/products', newProduct);
      setEditingId(null);
      setNewProduct({ name: '', price: '', description: '', imageUrl: '/product.jpg' });
      fetchData();
    } catch (error) { alert('Грешка при запис.'); }
  };
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Изтриване?")) { await axios.delete(`https://aquasense-backend-hg8e.onrender.com/api/products/${id}`); fetchData(); }
  };

  // ПОРЪЧКИ
  const handleUpdateOrderStatus = async (id, newStatus) => {
    await axios.put(`https://aquasense-backend-hg8e.onrender.com/api/orders/${id}/status`, { status: newStatus });
    fetchData();
  };

  // СЪПОРТ (ТИКЕТИ)
  const handleReplySubmit = async (ticketId) => {
    if (!replyText.trim()) return;
    try {
      await axios.put(`https://aquasense-backend-hg8e.onrender.com/api/tickets/${ticketId}/reply`, { reply: replyText });
      setReplyingTo(null);
      setReplyText('');
      fetchData();
      alert('Отговорът е изпратен!');
    } catch (error) { alert('Грешка при изпращане на отговор.'); }
  };

  return (
    <div className="profile-page" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '50px' }}>
      <h1 className="gradient-text" style={{ textAlign: 'center', fontSize: '3rem', margin: '20px 0' }}>Админ Панел</h1>
      
      {/* Навигация */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', margin: '30px 0' }}>
        <button onClick={() => setActiveTab('products')} className="water-button" style={{ background: activeTab === 'products' ? '#00d2ff' : '#222', color: activeTab === 'products' ? '#000' : '#fff' }}>📦 Продукти</button>
        <button onClick={() => setActiveTab('orders')} className="water-button" style={{ background: activeTab === 'orders' ? '#00ff88' : '#222', color: activeTab === 'orders' ? '#000' : '#fff' }}>🛒 Поръчки</button>
        <button onClick={() => setActiveTab('tickets')} className="water-button" style={{ background: activeTab === 'tickets' ? '#ff4d4d' : '#222', color: activeTab === 'tickets' ? '#fff' : '#fff' }}>🎧 Съпорт {tickets.filter(t => t.status === 'Open').length > 0 && `(${tickets.filter(t => t.status === 'Open').length})`}</button>
      </div>

      <div className="cards-container" style={{ flexDirection: 'column', alignItems: 'center' }}>
        
        {/* ТАБ: ПРОДУКТИ */}
        {activeTab === 'products' && (
          <div style={{ width: '100%' }}>
            {/* Тук кодът е идентичен с предишния за продуктите, просто стилизиран като glass-card */}
            <div className="glass-card" style={{ width: '100%', marginBottom: '20px' }}>
              <h3>{editingId ? '✏️ Редактирай' : '➕ Добави продукт'}</h3>
              <form onSubmit={handleProductSubmit} className="auth-form">
                <input type="text" placeholder="Име" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required style={{background:'#111'}}/>
                <input type="number" placeholder="Цена (€)" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required style={{background:'#111'}}/>
                <input type="text" placeholder="Описание" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} required style={{background:'#111'}}/>
                <input type="text" placeholder="Снимка (/product.jpg)" value={newProduct.imageUrl} onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})} required style={{background:'#111'}}/>
                <button type="submit" className="water-button" style={{ background: '#00d2ff', color: '#121212', marginTop: '10px' }}>Запази</button>
              </form>
            </div>
            <div className="glass-card" style={{ width: '100%' }}>
              <h3>📦 Налични продукти</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {products.map(p => (
                  <li key={p._id} style={{ background: 'rgba(0,0,0,0.4)', margin: '10px 0', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span><strong>{p.name}</strong> - €{p.price}</span>
                    <div>
                      <button onClick={() => {setEditingId(p._id); setNewProduct(p);}} style={{ background: '#333', border: 'none', padding: '8px 12px', borderRadius: '8px', marginRight: '10px', color: 'white', cursor: 'pointer' }}>✏️</button>
                      <button onClick={() => handleDeleteProduct(p._id)} style={{ background: '#ff4d4d', border: 'none', padding: '8px 12px', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ТАБ: ПОРЪЧКИ */}
        {activeTab === 'orders' && (
          <div className="glass-card" style={{ width: '100%' }}>
            <h3>📋 Управление на поръчки</h3>
            {orders.length === 0 ? <p>Няма нови поръчки.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {orders.map(order => (
                  <div key={order._id} style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', borderLeft: order.status === 'Pending' ? '4px solid gold' : (order.status === 'Shipped' ? '4px solid #00ff88' : '4px solid #ff4d4d') }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>{order.customerName} ({order.userEmail})</strong>
                      <span style={{ color: '#00d2ff', fontWeight: 'bold' }}>€{order.totalPrice}</span>
                    </div>
                    <p style={{ margin: '5px 0', color: '#a1a1a6' }}>📍 {order.address} | 📞 {order.phone}</p>
                    <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Продукти: {order.items.map(i => i.name).join(', ')}</p>
                    <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>Статус: <strong>{order.status}</strong></span>
                      {order.status === 'Pending' && (
                        <>
                          <button onClick={() => handleUpdateOrderStatus(order._id, 'Shipped')} className="water-button" style={{ background: '#00ff88', color: '#121212', padding: '5px 15px', fontSize: '0.9rem' }}>Изпрати</button>
                          <button onClick={() => handleUpdateOrderStatus(order._id, 'Rejected')} className="water-button" style={{ background: '#ff4d4d', padding: '5px 15px', fontSize: '0.9rem' }}>Откажи</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ТАБ: СЪПОРТ */}
        {activeTab === 'tickets' && (
          <div className="glass-card" style={{ width: '100%' }}>
            <h3>🎧 Клиентски запитвания</h3>
            {tickets.length === 0 ? <p>Няма нови запитвания.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {tickets.map(ticket => (
                  <div key={ticket._id} style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', borderLeft: ticket.status === 'Open' ? '4px solid #ff4d4d' : '4px solid #333' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong style={{ fontSize: '1.1rem' }}>{ticket.subject}</strong>
                      <span style={{ color: '#a1a1a6', fontSize: '0.9rem' }}>{ticket.userEmail}</span>
                    </div>
                    <p style={{ margin: '0 0 15px 0', color: '#e1e1e1' }}>"{ticket.message}"</p>
                    
                    {ticket.status === 'Open' ? (
                      replyingTo === ticket._id ? (
                        <div style={{ marginTop: '10px' }}>
                          <textarea placeholder="Напишете отговор..." value={replyText} onChange={(e) => setReplyText(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#111', color: 'white', minHeight: '80px', marginBottom: '10px', fontFamily: 'inherit' }} />
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleReplySubmit(ticket._id)} className="water-button" style={{ background: '#00d2ff', color: '#121212', padding: '5px 15px', fontSize: '0.9rem' }}>Изпрати отговор</button>
                            <button onClick={() => {setReplyingTo(null); setReplyText('');}} className="water-button" style={{ background: '#333', padding: '5px 15px', fontSize: '0.9rem' }}>Отказ</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => setReplyingTo(ticket._id)} className="water-button" style={{ background: '#333', padding: '8px 20px', fontSize: '0.9rem' }}>↩️ Отговори</button>
                      )
                    ) : (
                      <div style={{ background: 'rgba(0, 255, 136, 0.1)', padding: '15px', borderRadius: '8px', borderLeft: '2px solid #00ff88' }}>
                        <p style={{ margin: '0 0 5px 0', color: '#00ff88', fontSize: '0.85rem' }}>Вашият отговор:</p>
                        <p style={{ margin: 0, color: '#f5f5f7' }}>{ticket.adminReply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;