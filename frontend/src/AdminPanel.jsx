import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function AdminPanel() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', imageUrl: '/product.jpg' });
  const [editingId, setEditingId] = useState(null);

  if (!user || user.role !== 'admin') {
    return <h2 style={{ textAlign: 'center', marginTop: '100px', color: '#ff4d4d' }}>⛔ Достъпът е отказан.</h2>;
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://aquasense-backend-hg8e.onrender.com/api/products');
      setProducts(res.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://aquasense-backend-hg8e.onrender.com/api/products/${editingId}`, newProduct);
        alert('Продуктът е обновен!');
        setEditingId(null);
      } else {
        await axios.post('https://aquasense-backend-hg8e.onrender.com/api/products', newProduct);
        alert('Продуктът е добавен!');
      }
      setNewProduct({ name: '', price: '', description: '', imageUrl: '/product.jpg' });
      fetchProducts();
    } catch (error) { alert('Грешка при запис.'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Сигурни ли сте, че искате да изтриете този продукт?")) {
      try {
        await axios.delete(`https://aquasense-backend-hg8e.onrender.com/api/products/${id}`);
        fetchProducts();
      } catch (error) { alert("Грешка при изтриване."); }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setNewProduct({ name: product.name, price: product.price, description: product.description, imageUrl: product.imageUrl });
  };

  return (
    <div className="profile-page">
      <h1 style={{ color: 'gold', textAlign: 'center' }}>👑 Админ Панел</h1>
      
      <div className="cards-container" style={{ flexDirection: 'column', alignItems: 'center' }}>
        <div className="card" style={{ width: '100%', maxWidth: '600px', borderTop: '4px solid gold' }}>
          <h3>{editingId ? '✏️ Редактирай продукт' : '➕ Добави нов продукт'}</h3>
          <form onSubmit={handleSubmit} className="auth-form">
            <input type="text" placeholder="Име" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required />
            <input type="number" placeholder="Цена (в €)" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required />
            <input type="text" placeholder="Описание" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} required />
            <input type="text" placeholder="Снимка (напр. /product.jpg)" value={newProduct.imageUrl} onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})} required />
            
            <button type="submit" className="water-button" style={{ background: 'gold', color: '#121212', marginTop: '10px' }}>
              {editingId ? 'Запази промените' : 'Добави продукт'}
            </button>
            {editingId && <button type="button" onClick={() => {setEditingId(null); setNewProduct({ name: '', price: '', description: '', imageUrl: '/product.jpg' })}} style={{marginTop: '10px', padding: '10px', background: 'transparent', color: 'white', border: '1px solid #aaa'}}>Отказ</button>}
          </form>
        </div>

        <div className="card" style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}>
          <h3>📦 Налични продукти</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {products.map(p => (
              <li key={p._id} style={{ background: '#2a2a2a', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong>{p.name}</strong> - €{p.price}</span>
                <div>
                  <button onClick={() => handleEdit(p)} style={{ background: '#00d2ff', border: 'none', padding: '5px 10px', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }}>✏️</button>
                  <button onClick={() => handleDelete(p._id)} style={{ background: '#ff4d4d', border: 'none', padding: '5px 10px', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;