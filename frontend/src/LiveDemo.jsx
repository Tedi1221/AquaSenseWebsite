import { useState, useEffect } from 'react';
import './App.css';

function LiveDemo() {
  const [moisture, setMoisture] = useState(60);
  const [light, setLight] = useState(80);
  const [isWatering, setIsWatering] = useState(false);

  // Логика за автоматично поливане (Aqua-Sense)
  useEffect(() => {
    // Ако влажността падне под 30% и в момента не се полива
    if (moisture < 30 && !isWatering) {
      setIsWatering(true); // Включваме устройството
      
      // Симулираме процеса на поливане, който отнема 3 секунди
      setTimeout(() => {
        setMoisture(80); // Връщаме влажността на оптимално ниво
        setIsWatering(false); // Спираме устройството
      }, 3000);
    }
  }, [moisture, isWatering]);

  // Определяне на състоянието на цветето
  let plantClass = 'plant-normal';
  if (moisture > 70) plantClass = 'plant-thriving';
  else if (moisture < 30) plantClass = 'plant-wilted';

  // Динамични цветове
  // Почвата става от тъмно кафява (мокра) към светло пясъчна (суха)
  const soilColor = `hsl(30, 40%, ${100 - (moisture / 1.5)}%)`; 
  // Небето става по-тъмно, когато няма светлина
  const skyColor = `linear-gradient(to bottom, hsl(200, ${light}%, ${light/2}%), #e0f6ff)`;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '10px' }}>Изпробвай магията</h1>
        <p style={{ fontSize: '1.2rem', color: '#a1a1a6' }}>
          Намали влажността, за да видиш как Aqua-Sense Pro реагира и спасява растението автономно.
        </p>
      </div>

      <div className="demo-container">
        
        {/* ЛЯВО: Визуалната симулация */}
        <div style={{ flex: '1 1 500px' }}>
          <div className="virtual-pot" style={{ background: skyColor }}>
            
            {/* Слънце */}
            <div className="demo-sun" style={{ opacity: light / 100, transform: `scale(${light / 50})` }}>☀️</div>
            
            {/* Устройство Aqua-Sense */}
            <div className="demo-device">
              <div className={`device-led ${isWatering ? 'active' : ''}`}></div>
              <div className={`water-drop ${isWatering ? 'flowing' : ''}`}>💧</div>
            </div>

            {/* Растение */}
            <div className={`demo-plant ${plantClass}`}>
              {moisture < 30 ? '🥀' : '🌿'}
            </div>

            {/* Почва */}
            <div className="demo-soil" style={{ backgroundColor: soilColor }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', marginTop: '20px', fontWeight: 'bold' }}>
                Влажност на почвата: {moisture}%
              </div>
            </div>

          </div>
        </div>

        {/* ДЯСНО: Контролен панел */}
        <div style={{ flex: '1 1 400px' }}>
          <div className="glass-card" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '1.8rem', marginTop: 0 }}>Контролен панел</h3>
            
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>💧 Влажност на почвата</span>
                <span style={{ color: moisture < 30 ? '#ff4d4d' : '#00d2ff', fontWeight: 'bold' }}>{moisture}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={moisture} 
                onChange={(e) => setMoisture(Number(e.target.value))} 
                className="demo-slider"
                disabled={isWatering} // Блокираме слайдера, докато устройството полива
              />
              <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>
                {isWatering 
                  ? "⚠️ Aqua-Sense полива растението в момента..." 
                  : "Плъзнете наляво (под 30%), за да симулирате засушаване."}
              </p>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>☀️ Слънчева светлина</span>
                <span style={{ color: 'gold', fontWeight: 'bold' }}>{light}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={light} 
                onChange={(e) => setLight(Number(e.target.value))} 
                className="demo-slider"
              />
            </div>

            {/* Индикатор за статус */}
            <div style={{ 
              marginTop: '40px', 
              padding: '20px', 
              borderRadius: '16px', 
              background: isWatering ? 'rgba(0, 210, 255, 0.1)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${isWatering ? '#00d2ff' : 'rgba(255,255,255,0.1)'}`,
              transition: 'all 0.3s'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: isWatering ? '#00d2ff' : 'white' }}>
                Статус на Aqua-Sense:
              </h4>
              <p style={{ margin: 0, color: '#a1a1a6' }}>
                {isWatering 
                  ? "Отчетена е критична сухота. Микро-помпата е активирана. Доставяне на вода..." 
                  : "Сензорите работят нормално. Растението е в оптимална среда."}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default LiveDemo;