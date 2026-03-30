import './App.css';

function About() {
  return (
    <div className="about-page" style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      
      {/* Apple-style Hero Секция */}
      <div className="about-hero" style={{ padding: '100px 0 60px 0' }}>
        <h1 className="gradient-text" style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '20px', letterSpacing: '-2px' }}>
          Иновации, вкоренени в природата.
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#a1a1a6', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Ние сме Aqua-Sense. Създаваме интелигентни технологии, които дават глас на вашите растения. Нашата мисия е да свържем природата с дигиталния свят по най-елегантния възможен начин.
        </p>
      </div>

      {/* Секция с ценности (Glassmorphism) */}
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '50px 0' }}>
        
        <div className="glass-card">
          <h2 style={{ fontSize: '3rem', margin: '0 0 20px 0' }}>🌱</h2>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>Устойчивост</h3>
          <p style={{ color: '#a1a1a6', lineHeight: '1.5' }}>
            Нашите алгоритми пестят до 40% повече вода чрез прецизно анализиране на почвената влага и околната светлина. Нито капка не отива нахалост.
          </p>
        </div>

        <div className="glass-card">
          <h2 style={{ fontSize: '3rem', margin: '0 0 20px 0' }}>🧠</h2>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>Изкуствен Интелект</h3>
          <p style={{ color: '#a1a1a6', lineHeight: '1.5' }}>
            Aqua-Sense не просто полива. Той се учи. Системата разпознава кога слънцето е твърде силно и автоматично спира помпата, за да предпази листата от изгаряне.
          </p>
        </div>

        <div className="glass-card">
          <h2 style={{ fontSize: '3rem', margin: '0 0 20px 0' }}>📱</h2>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>Абсолютен Контрол</h3>
          <p style={{ color: '#a1a1a6', lineHeight: '1.5' }}>
            Цялата екосистема е във вашия джоб. Наблюдавайте графики в реално време, управлявайте устройствата си и поръчвайте консумативи с един клик.
          </p>
        </div>

      </div>

      {/* Финална секция */}
      <div style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '50px' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '20px' }}>Проектиран за бъдещето. Достъпен днес.</h2>
        <p style={{ color: '#a1a1a6', fontSize: '1.2rem', marginBottom: '30px' }}>Присъединете се към хилядите потребители, които вече трансформираха своите домове и офиси.</p>
      </div>

    </div>
  );
}

export default About;