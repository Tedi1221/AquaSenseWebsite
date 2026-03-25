import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isLogin) {
        // ВХОД
        const res = await axios.post('http://localhost:5001/api/login', {
          email: formData.email,
          password: formData.password
        });
        
        // Запазваме данните локално
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        
        // Пренасочваме към профила и презареждаме, за да се ъпдейтне менюто
        navigate('/profile');
        window.location.reload();
      } else {
        // РЕГИСТРАЦИЯ
        const res = await axios.post('http://localhost:5001/api/register', formData);
        setMessage(res.data.message);
        setIsLogin(true); // Връщаме формата на Вход
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Възникна грешка при връзката със сървъра!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 style={{ color: '#00d2ff', textAlign: 'center' }}>
          {isLogin ? 'Вход в системата' : 'Създаване на профил'}
        </h2>
        
        {message && <p className="alert-message">{message}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input 
              type="text" name="name" placeholder="Вашето име" 
              value={formData.name} onChange={handleChange} required 
            />
          )}
          <input 
            type="email" name="email" placeholder="Имейл адрес" 
            value={formData.email} onChange={handleChange} required 
          />
          <input 
            type="password" name="password" placeholder="Парола" 
            value={formData.password} onChange={handleChange} required 
          />
          <button type="submit" className="water-button" style={{ width: '100%', marginTop: '10px' }}>
            {isLogin ? 'Влез' : 'Регистрирай се'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer', color: '#aaa' }} 
           onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Нямате профил? Регистрирайте се тук.' : 'Вече имате профил? Влезте тук.'}
        </p>
      </div>
    </div>
  );
}

export default Login;