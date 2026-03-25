import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function Navbar() {
  const navigate = useNavigate();
  // Проверяваме дали има логнат потребител в паметта на браузъра
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
    // Презареждаме страницата, за да се обнови менюто
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">🌱 Aqua-Sense</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Начало</Link>
        <Link to="/products">Продукти</Link>
        <Link to="/about">За нас</Link>
        <Link to="/demo" className="nav-demo-btn">Live Demo</Link>
        <Link to="/cart" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>🛒</Link>
        
        {/* Проверка дали има логнат потребител */}
        {user ? (
          <>
            {/* АКО Е АДМИН, ПОКАЗВАМЕ ЗЛАТНИЯ БУТОН: */}
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: 'gold', fontWeight: 'bold' }}>👑 Админ</Link>
            )}
            
            <Link to="/profile" style={{ color: '#00ff88', fontWeight: 'bold' }}>👤 {user.name}</Link>
            <button onClick={handleLogout} className="nav-logout-btn">Изход</button>
          </>
        ) : (
          /* Ако няма логнат потребител, показваме Вход */
          <Link to="/login" className="nav-login-btn">Вход / Регистрация</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;