import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingCart, Sun, Moon, LogOut, User, Menu, X, Home, Droplets } from 'lucide-react';
import './App.css';

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [isLightMode, setIsLightMode] = useState(false);
  const [cartCount, setCartCount] = useState(0); 
  const [animating, setAnimating] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false);

  const updateCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300); 
  };

  useEffect(() => {
    updateCart(); 
    window.addEventListener('cartUpdated', updateCart); 
    
    if (localStorage.getItem('theme') === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    }
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

  const toggleTheme = () => {
    if (isLightMode) { 
      document.body.classList.remove('light-mode'); 
      localStorage.setItem('theme', 'dark'); 
      setIsLightMode(false); 
    } else { 
      document.body.classList.add('light-mode'); 
      localStorage.setItem('theme', 'light'); 
      setIsLightMode(true); 
    }
  };

  const toggleLanguage = () => { i18n.changeLanguage(i18n.language === 'bg' ? 'en' : 'bg'); };
  const handleLogout = () => { localStorage.removeItem('user'); localStorage.removeItem('token'); navigate('/login'); window.location.reload(); };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <Droplets size={28} color="#00f0ff" />
        Aqua-Sense
      </Link>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/"><Home size={18} /> {t('nav_home')}</Link>
        <Link to="/products">📦 {t('nav_products')}</Link>
        <Link to="/about">ℹ️ {t('nav_about')}</Link>
        
        <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <motion.div animate={animating ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
            <ShoppingCart size={22} />
          </motion.div>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        
        <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}>
          {isLightMode ? <Moon size={22} /> : <Sun size={22} color="#facc15" />}
        </button>

        <button onClick={toggleLanguage} style={{ background: 'transparent', border: '1px solid var(--border-glass)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: 'var(--text-primary)' }}>
          {i18n.language === 'bg' ? 'EN' : 'БГ'}
        </button>

        {user ? (
          <>
            {user.role === 'admin' && <Link to="/admin" style={{ color: 'gold', fontWeight: 'bold' }}>Admin</Link>}
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-secondary)' }}>
              <User size={18} /> {user.name}
            </Link>
            <button onClick={handleLogout} className="nav-logout-btn" title={t('nav_logout')}>
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-login-btn">{t('nav_login')}</Link>
        )}
      </div>

      <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'none' }}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .nav-links { display: ${menuOpen ? 'flex' : 'none'} !important; flex-direction: column; width: 100%; margin-top: 1rem; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;