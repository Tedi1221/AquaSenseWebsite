import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function AdminPanel() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [activeTab, setActiveTab] = useState('products'); // 'products' или 'orders'
  
  // State за продукти
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', imageUrl: '/product.jpg' });
  const [editingId, setEditingId] = useState(null);
  
  // State за поръчки
  const [orders, setOrders] = useState([]);

  if (!user || user.role !== 'admin') {
    return <h2 style={{ textAlign: 'center', marginTop: '100px', color: '#ff4d4d' }}>⛔ Достъпът е отказан.</h2>;
  }

  const fetchData = async () => {
    try {
      const prodRes = await axios.get('https://aquasense-backend-hg8e.onrender.com/api/products');
      setProducts(prodRes.data);
      const ordRes = await axios.get('https://aquasense-backend-hg8e.onrender.com/api/orders');
      setOrders(ordRes.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchData(); }, []);

  // Логика за ПРОДУКТИ
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://aquasense-backend-hg8e.onrender.com/api/products/${editingId}`, newProduct);
      } else {
        await axios.post('https://aquasense-backend-hg8e.onrender.com/api/products', newProduct);
      }
      setEditingId(null);
      setNewProduct({ name: '', price: '', description: '', imageUrl: '/product.jpg' });
      fetchData();
      alert('Запазено успешно!');
    } catch (error) { alert('Грешка при запис.'); }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Изтриване на продукта?")) {
      await axios.delete(`https://aquasense-backend-hg8e.onrender.com/api/products/${id}`);
      fetchData();
    }
  };

  // Логика за ПОРЪЧКИ
  const handleUpdateOrderStatus = async (id, newStatus) => {
    try {
      await axios.put(`https://aquasense-backend-hg8e.onrender.com/api/orders/${id}/status`, { status: newStatus });
      fetchData(); // Опресняваме списъка
    } catch (error) { alert("Грешка при обновяване на статуса."); }
  };

  return (
    <div className="profile-page" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: 'gold', textAlign: 'center' }}>👑 Админ Панел</h1>
      
      {/* Навигация на панела */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '30px 0' }}>
        <button onClick={() => setActiveTab('products')} className="water-button" style={{ background: activeTab === 'products' ? 'gold' : '#333', color: activeTab === 'products' ? '#121212' : 'white' }}>📦 Продукти</button>
        <button onClick={() => setActiveTab('orders')} className="water-button" style={{ background: activeTab === 'orders' ? 'gold' : '#333', color: activeTab === 'orders' ? '#121212' : 'white' }}>🛒 Поръчки</button>
      </div>

      <div className="cards-container" style={{ flexDirection: 'column', alignItems: 'center' }}>
        
        {/* ТАБ: ПРОДУКТИ */}
        {activeTab === 'products' && (
          <>
            <div className="card" style={{ width: '100%', borderTop: '4px solid gold' }}>
              <h3>{editingId ? '✏️ Редактирай' : '➕ Добави продукт'}</h3>
              <form onSubmit={handleProductSubmit} className="auth-form">
                <input type="text" placeholder="Име" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required />
                <input type="number" placeholder="Цена (€)" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required />
                <input type="text" placeholder="Описание" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} required />
                <input type="text" placeholder="Снимка (/product.jpg)" value={newProduct.imageUrl} onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})} required />
                <button type="submit" className="water-button" style={{ background: 'gold', color: '#121212', marginTop: '10px' }}>Запази</button>
              </form>
            </div>
            <div className="card" style={{ width: '100%', marginTop: '20px' }}>
              <h3>📦 Налични продукти</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {products.map(p => (
                  <li key={p._id} style={{ background: '#2a2a2a', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>{p.name}</strong> - €{p.price}</span>
                    <div>
                      <button onClick={() => {setEditingId(p._id); setNewProduct(p);}} style={{ background: '#00d2ff', border: 'none', padding: '5px 10px', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }}>✏️</button>
                      <button onClick={() => handleDeleteProduct(p._id)} style={{ background: '#ff4d4d', border: 'none', padding: '5px 10px', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* ТАБ: ПОРЪЧКИ */}
        {activeTab === 'orders' && (
          <div className="card" style={{ width: '100%', borderTop: '4px solid #00d2ff' }}>
            <h3>📋 Всички клиентски поръчки</h3>
            {orders.length === 0 ? <p>Няма нови поръчки.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {orders.map(order => (
                  <div key={order._id} style={{ background: '#2a2a2a', padding: '15px', borderRadius: '8px', borderLeft: order.status === 'Pending' ? '4px solid gold' : (order.status === 'Shipped' ? '4px solid #00ff88' : '4px solid #ff4d4d') }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>{order.customerName} ({order.userEmail})</strong>
                      <span style={{ color: 'gold' }}>Общо: €{order.totalPrice}</span>
                    </div>
                    <p style={{ margin: '5px 0', color: '#aaa' }}>📍 {order.address} | 📞 {order.phone}</p>
                    <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Продукти: {order.items.map(i => i.name).join(', ')}</p>
                    
                    <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>Статус: <strong>{order.status}</strong></span>
                      {order.status === 'Pending' && (
                        <>
                          <button onClick={() => handleUpdateOrderStatus(order._id, 'Shipped')} style={{ background: '#00ff88', color: '#121212', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>📦 Изпрати</button>
                          <button onClick={() => handleUpdateOrderStatus(order._id, 'Rejected')} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>❌ Откажи</button>
                        </>
                      )}
                    </div>
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