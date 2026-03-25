import { useState, useEffect } from 'react';
import './App.css';

function LiveDemo() {
  const [moisture, setMoisture] = useState(600);
  const [light, setLight] = useState(400); // Базова нормална светлина
  const [pumpStatus, setPumpStatus] = useState('STANDBY 🛑');
  const [message, setMessage] = useState('');

  // Интелигентната логика за поливане
  useEffect(() => {
    if (light > 850) {
      setPumpStatus('STANDBY 🛑');
      setMessage('⚠️ Силна слънчева светлина! Поливането е спряно принудително, за да не изгорят листата на растението (ефект на лупата).');
    } else if (moisture < 300) {
      setPumpStatus('WATERING 💦');
      setMessage('💧 Растението е жадно! Системата автоматично стартира помпата.');
    } else {
      setPumpStatus('STANDBY 🛑');
      setMessage('✅ Почвата е достатъчно влажна. Системата пести вода и енергия.');
    }
  }, [moisture, light]);

  return (
    <div className="profile-page" style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#00ff88' }}>🎮 Интерактивен Симулатор</h1>
      <p style={{ color: '#aaa', marginBottom: '40px' }}>Променете условията на средата, за да видите как интелигентно реагира Aqua-Sense Pro.</p>

      <div className="cards-container" style={{ alignItems: 'stretch' }}>
        
        {/* Панел за контрол */}
        <div className="card" style={{ flex: 1, minWidth: '300px' }}>
          <h3>🎛️ Контролен панел</h3>
          
          <div style={{ marginTop: '30px', textAlign: 'left' }}>
            <label style={{ color: '#00d2ff', fontWeight: 'bold' }}>Влажност на почвата: {moisture}</label>
            <input 
              type="range" min="0" max="1000" value={moisture} 
              onChange={(e) => setMoisture(e.target.value)} 
              style={{ width: '100%', cursor: 'pointer', marginTop: '10px' }} 
            />
            <p style={{ fontSize: '0.8rem', color: '#666' }}>⬅️ Сухо | Мокро ➡️</p>
          </div>

          <div style={{ marginTop: '30px', textAlign: 'left' }}>
            <label style={{ color: 'gold', fontWeight: 'bold' }}>Слънчева светлина: {light}</label>
            <input 
              type="range" min="0" max="1000" value={light} 
              onChange={(e) => setLight(e.target.value)} 
              style={{ width: '100%', cursor: 'pointer', marginTop: '10px' }} 
            />
            <p style={{ fontSize: '0.8rem', color: '#666' }}>⬅️ Тъмно | Силно слънце ➡️</p>
          </div>
        </div>

        {/* Резултат от сензора */}
        <div className="card" style={{ flex: 1, minWidth: '300px', borderTop: pumpStatus.includes('WATERING') ? '4px solid #00d2ff' : (light > 850 ? '4px solid #ff4d4d' : '4px solid #333') }}>
          <h3>🤖 Реакция на системата</h3>
          
          <div style={{ margin: '30px 0' }}>
            <h1 style={{ fontSize: '2.5rem', color: pumpStatus.includes('WATERING') ? '#00d2ff' : (light > 850 ? '#ff4d4d' : '#aaa'), transition: 'color 0.3s' }}>
              {pumpStatus}
            </h1>
          </div>
          
          <p style={{ color: light > 850 ? '#ff4d4d' : '#ccc', fontSize: '1.2rem', lineHeight: '1.5' }}>
            {message}
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default LiveDemo;