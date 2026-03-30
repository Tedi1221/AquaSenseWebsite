import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function ProductDetails() {
  const { id } = useParams(); // Взимаме ID-то от URL-а
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  // State за новото ревю
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://aquasense-backend-hg8e.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (error) { console.error(error); }
    };
    fetchProduct();
  }, [id]);

  const handleBuy = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    alert(`🛒 "${product.name}" беше добавен в количката!`);
    navigate('/cart');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Моля, влезте в профила си, за да оставите ревю.");
      return navigate('/login');
    }
    if (!comment.trim()) return;

    try {
      const newReview = { userName: user.name, rating, comment };
      const res = await axios.post(`https://aquasense-backend-hg8e.onrender.com/api/products/${id}/reviews`, newReview);
      setProduct(res.data); // Обновяваме продукта с новото ревю
      setComment('');
      alert("Благодарим ви за ревюто!");
    } catch (error) {
      alert("Грешка при изпращане на ревюто.");
    }
  };

  if (!product) return <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Зареждане...</h2>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
      
      {/* ГОРНА ЧАСТ: Снимка и Детайли */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'center', marginBottom: '80px' }}>
        
        {/* Голяма снимка (Ляво) */}
        <div style={{ flex: '1 1 500px' }}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} />
        </div>
        
        {/* Информация и Купи (Дясно) */}
        <div style={{ flex: '1 1 400px' }}>
          <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '10px' }}>{product.name}</h1>
          <h2 style={{ color: '#00d2ff', fontSize: '2.5rem', marginBottom: '20px' }}>€{product.price}</h2>
          <p style={{ fontSize: '1.2rem', color: '#a1a1a6', lineHeight: '1.6', marginBottom: '40px' }}>
            {product.description}
          </p>
          
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px' }}>
            <p style={{ margin: '0 0 10px 0' }}>✅ В наличност</p>
            <p style={{ margin: '0 0 10px 0' }}>🚚 Безплатна доставка над 100€</p>
            <p style={{ margin: 0 }}>🛡️ 2 години международна гаранция</p>
          </div>

          <button onClick={handleBuy} className="water-button" style={{ width: '100%', fontSize: '1.2rem', padding: '15px' }}>
            🛍️ Добави в количката
          </button>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '50px' }} />

      {/* ДОЛНА ЧАСТ: Ревюта */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Отзиви от клиенти</h2>

        {/* Форма за оставяне на ревю */}
        <div className="glass-card" style={{ marginBottom: '40px' }}>
          <h3 style={{ marginTop: 0 }}>Напишете ревю</h3>
          <form onSubmit={handleReviewSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ marginRight: '15px' }}>Оценка:</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ padding: '8px', borderRadius: '8px', background: '#111', color: 'white', border: '1px solid #333' }}>
                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                <option value="4">⭐⭐⭐⭐ (4/5)</option>
                <option value="3">⭐⭐⭐ (3/5)</option>
                <option value="2">⭐⭐ (2/5)</option>
                <option value="1">⭐ (1/5)</option>
              </select>
            </div>
            <textarea 
              placeholder="Какво мислите за продукта?" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              required 
              style={{ width: '100%', padding: '15px', borderRadius: '12px', background: '#111', color: 'white', border: '1px solid #333', minHeight: '100px', marginBottom: '15px', fontFamily: 'inherit' }}
            />
            <button type="submit" className="water-button">Изпрати ревю</button>
          </form>
        </div>

        {/* Списък с ревюта */}
        <div>
          {(!product.reviews || product.reviews.length === 0) ? (
            <p style={{ color: '#a1a1a6' }}>Все още няма ревюта за този продукт. Бъдете първи!</p>
          ) : (
            product.reviews.slice().reverse().map((review, index) => (
              <div key={index} style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{review.userName}</strong>
                  <span style={{ color: 'gold' }}>{'⭐'.repeat(review.rating)}</span>
                </div>
                <p style={{ margin: '0 0 10px 0', color: '#e1e1e1' }}>{review.comment}</p>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>
                  {new Date(review.date).toLocaleDateString('bg-BG')}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;