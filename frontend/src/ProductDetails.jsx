import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  // State за галерията
  const [mainImage, setMainImage] = useState('');
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://aquasense-backend-hg8e.onrender.com/api/products/${id}`);
        setProduct(res.data);
        // Задаваме първата снимка за главна
        const allImgs = res.data.images?.length > 0 ? res.data.images : [res.data.imageUrl];
        setMainImage(allImgs[0]);
      } catch (error) { console.error(error); }
    };
    fetchProduct();
  }, [id]);

  const handleBuy = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    // Изпращаме сигнал до Navbar да се обнови и анимира!
    window.dispatchEvent(new Event('cartUpdated'));
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
    } catch (error) {
      alert("Грешка при изпращане на ревюто.");
    }
  };

  if (!product) return <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Зареждане...</h2>;

  // Събираме всички снимки за галерията (новите + старата за съвместимост)
  const galleryImages = product.images?.length > 0 ? product.images : [product.imageUrl];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      
      {/* ГОРНА ЧАСТ: Снимка и Детайли */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', 
        gap: '4rem', 
        alignItems: 'start', 
        marginBottom: '6rem' 
      }}>
        
        {/* ЛЯВО: ГАЛЕРИЯ */}
        <div className="glass-card" style={{ padding: '1rem', borderRadius: '32px' }}>
          {/* Главна снимка */}
          <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '24px', overflow: 'hidden', marginBottom: galleryImages.length > 1 ? '1rem' : '0' }}>
            <img src={mainImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          
          {/* Миниатюри */}
          {galleryImages.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '0.5rem 0' }}>
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  style={{ 
                    width: '80px', height: '80px', flexShrink: 0, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                    border: mainImage === img ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="thumbnail" />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* ДЯСНО: Детайли */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{product.name}</h1>
          <h2 style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', marginBottom: '2rem' }}>€{product.price}</h2>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem', flex: 1 }}>
            {product.description}
          </p>
          
          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid var(--border-glass)', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>✅ <span style={{ color: 'var(--text-primary)' }}>В наличност</span></p>
            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>🚚 <span style={{ color: 'var(--text-primary)' }}>Безплатна доставка над 100€</span></p>
            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>🛡️ <span style={{ color: 'var(--text-primary)' }}>2 години международна гаранция</span></p>
          </div>

          <button onClick={handleBuy} className="water-button" style={{ width: '100%', fontSize: '1.2rem', padding: '1.2rem' }}>
            🛍️ Добави в количката
          </button>
        </div>
      </div>

      {/* ДОЛНА ЧАСТ: Ревюта */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Отзиви от клиенти</h2>

        {/* Форма за оставяне на ревю */}
        <div className="glass-card" style={{ marginBottom: '4rem', padding: '2.5rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>Напишете ревю</h3>
          <form onSubmit={handleReviewSubmit} className="auth-form">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Оценка:</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ padding: '0.8rem', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--border-glass)', outline: 'none' }}>
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
              rows={4}
            />
            <button type="submit" className="water-button" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>Изпрати ревю</button>
          </form>
        </div>

        {/* Списък с ревюта */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {(!product.reviews || product.reviews.length === 0) ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Все още няма ревюта за този продукт. Бъдете първи!</p>
          ) : (
            product.reviews.slice().reverse().map((review, index) => (
              <div key={index} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                      {review.userName.charAt(0)}
                    </div>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{review.userName}</strong>
                  </div>
                  <span style={{ color: '#fbbf24', letterSpacing: '2px', fontSize: '1.2rem' }}>{'★'.repeat(review.rating)}</span>
                </div>
                <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>"{review.comment}"</p>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
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