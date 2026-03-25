import { useNavigate, Link } from 'react-router-dom';
import './App.css';

function Profile() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Защита: Ако не си логнат, те връща към Вход
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

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 style={{ color: '#00d2ff' }}>Добре дошли, {user.name}!</h1>
        <p style={{ color: '#aaa' }}>Вашият профил: {user.email}</p>
      </div>

      <div className="cards-container">
        <div className="card" style={{ borderTop: '4px solid #00ff88' }}>
          <h3>📦 Моите поръчки</h3>
          <p>Нямате направени поръчки все още.</p>
          <button className="water-button" style={{ marginTop: '15px', fontSize: '1rem', padding: '10px 20px' }}>
            Разгледай магазина
          </button>
        </div>

        <div className="card" style={{ borderTop: '4px solid #00d2ff' }}>
          <h3>🌱 Моите устройства</h3>
          <p>Управлявайте вашите Aqua-Sense системи.</p>
          <Link to="/dashboard">
            <button className="water-button" style={{ marginTop: '15px', fontSize: '1rem', padding: '10px 20px', background: 'transparent', border: '2px solid #00d2ff' }}>
              Към Таблото (Demo)
            </button>
          </Link>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={handleLogout} className="logout-button-big">
          🚪 Изход от профила
        </button>
      </div>
    </div>
  );
}

export default Profile;