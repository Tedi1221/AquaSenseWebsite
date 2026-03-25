import './App.css';

function About() {
  return (
    <div className="profile-page" style={{ padding: '50px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ color: '#00d2ff', fontSize: '3rem', marginBottom: '10px' }}>За проекта Aqua-Sense Pro</h1>
        <p style={{ fontSize: '1.5rem', color: '#aaa' }}>Официален проект по дисциплината <strong>"Практикум"</strong></p>
        <p style={{ fontSize: '1.2rem', color: '#00ff88' }}>Технически Университет - София</p>
      </div>

      <div className="card" style={{ borderTop: '4px solid gold', marginBottom: '50px' }}>
        <h2 style={{ color: 'gold', textAlign: 'center', marginBottom: '20px' }}>👨‍💻 Екип разработчици</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', fontSize: '1.2rem' }}>
          <p>🔹 <strong>Теодор Бараков</strong></p>
          <p>🔹 <strong>Николай Пенев</strong></p>
          <p>🔹 <strong>Борис Цеков</strong></p>
          <p>🔹 <strong>Катерина Йонкова</strong></p>
        </div>
      </div>

      <h2 style={{ color: '#00d2ff', textAlign: 'center', marginBottom: '30px' }}>🛠️ Използвани технологии (MERN Stack)</h2>
      <div className="cards-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        
        <div className="card">
          <h3 style={{ color: '#4DB33D' }}>🍃 MongoDB Atlas</h3>
          <p>Облачна NoSQL база данни. Използва се за сигурно съхранение на данните от сензорите, криптирани потребителски профили и продуктовия каталог.</p>
        </div>
        
        <div className="card">
          <h3 style={{ color: '#aaaaaa' }}>⚙️ Express.js & Node.js</h3>
          <p>Мощната бекенд среда. Осигурява RESTful API архитектура, маршрутизиране, криптиране на пароли (bcryptjs) и сесийни токени (JWT).</p>
        </div>
        
        <div className="card">
          <h3 style={{ color: '#00d8ff' }}>⚛️ React (Vite)</h3>
          <p>Фронтенд библиотеката за потребителския интерфейс. Използва React Router за навигация, hooks за управление на състоянието и Chart.js за графики.</p>
        </div>
        
        <div className="card">
          <h3 style={{ color: '#00979C' }}>📟 IoT Хардуер (Ардуино)</h3>
          <p>Логиката, която отговаря за събирането на реални данни от сензорите за влажност и светлина, и интелигентното управление на водната помпа.</p>
        </div>

      </div>
    </div>
  );
}

export default About;