import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function Navbar() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // State за темата
  const [isLightMode, setIsLightMode] = useState(false);

  // Проверяваме дали потребителят е избрал светла тема преди
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    }
  }, []);

  // Функция за превключване на темата
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">🌱 Aqua-Sense</Link>
      </div>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/">Начало</Link>
        <Link to="/products">Продукти</Link>
        <Link to="/about">За нас</Link>
        <Link to="/demo" className="nav-demo-btn">Live Demo</Link>
        <Link to="/cart" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>🛒</Link>
        
        {/* БУТОН ЗА СМЯНА НА ТЕМАТА */}
        <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', outline: 'none' }}>
          {isLightMode ? '🌙' : '☀️'}
        </button>

        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: 'gold', fontWeight: 'bold' }}>👑 Админ</Link>
            )}
            <Link to="/profile" style={{ color: '#00ff88', fontWeight: 'bold' }}>👤 {user.name}</Link>
            <button onClick={handleLogout} className="nav-logout-btn">Изход</button>
          </>
        ) : (
          <Link to="/login" className="nav-login-btn">Вход / Регистрация</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;