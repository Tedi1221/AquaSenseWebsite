import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [isLightMode, setIsLightMode] = useState(false);
  const [cartCount, setCartCount] = useState(0); // State за бройката в количката
  const [animating, setAnimating] = useState(false); // State за анимацията

  // Функция за прочитане на количката
  const updateCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300); // Спира анимацията след 0.3 сек
  };

  useEffect(() => {
    updateCart(); // Зареждаме бройката при стартиране
    window.addEventListener('cartUpdated', updateCart); // Слушаме за промени!
    
    if (localStorage.getItem('theme') === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    }
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

  const toggleTheme = () => {
    if (isLightMode) { document.body.classList.remove('light-mode'); localStorage.setItem('theme', 'dark'); setIsLightMode(false); } 
    else { document.body.classList.add('light-mode'); localStorage.setItem('theme', 'light'); setIsLightMode(true); }
  };

  const toggleLanguage = () => { i18n.changeLanguage(i18n.language === 'bg' ? 'en' : 'bg'); };
  const handleLogout = () => { localStorage.removeItem('user'); localStorage.removeItem('token'); navigate('/login'); window.location.reload(); };

  return (
    <nav className="navbar">
      <div className="nav-logo"><Link to="/">🌱 Aqua-Sense</Link></div>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/">{t('nav_home')}</Link>
        <Link to="/products">{t('nav_products')}</Link>
        <Link to="/about">{t('nav_about')}</Link>
        <Link to="/demo" className="nav-demo-btn">Live Demo</Link>
        
        {/* ИКОНАТА НА КОЛИЧКАТА С БАДЖ И АНИМАЦИЯ */}
        <Link to="/cart" style={{ fontSize: '1.5rem', textDecoration: 'none', position: 'relative' }}>
          <div className={animating ? 'bump-anim' : ''} style={{ display: 'inline-block' }}>🛒</div>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        
        <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>{isLightMode ? '🌙' : '☀️'}</button>
        <button onClick={toggleLanguage} style={{ background: 'transparent', border: '1px solid #aaa', color: 'inherit', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>{i18n.language === 'bg' ? 'EN' : 'БГ'}</button>

        {user ? (
          <>
            {user.role === 'admin' && <Link to="/admin" style={{ color: 'gold', fontWeight: 'bold' }}>👑 {t('nav_admin')}</Link>}
            <Link to="/profile" style={{ color: '#00ff88', fontWeight: 'bold' }}>👤 {user.name}</Link>
            <button onClick={handleLogout} className="nav-logout-btn">{t('nav_logout')}</button>
          </>
        ) : (
          <Link to="/login" className="nav-login-btn">{t('nav_login')}</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;