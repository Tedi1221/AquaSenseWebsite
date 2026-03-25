import { Link } from 'react-router-dom';
import './App.css';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* HERO СЕКЦИЯ */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Бъдещето на вашите растения е тук.</h1>
          <p>Aqua-Sense Pro следи, анализира и полива автоматично. Вие просто се наслаждавате.</p>
          <div className="hero-buttons">
            <Link to="/products"><button className="water-button primary-btn">🛒 Купи сега - 30€</button></Link>
            <Link to="/demo">
              <button className="water-button secondary-btn">💻 Виж Live Demo</button>
            </Link>
          </div>
        </div>
        
        {/* СНИМКА НА ПРОДУКТА (product.jpg) */}
        <div className="hero-image-container">
          <img src="/product.jpg" alt="Aqua-Sense Pro Device" className="hero-image" />
        </div>
      </header>

      {/* ВИДЕО СЕКЦИЯ (promo-video.mp4) */}
      <section className="video-section">
        <h2>Вижте Aqua-Sense в действие</h2>
        <div className="video-container">
          <video 
            src="/promo-video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="promo-video"
          />
        </div>
      </section>

      {/* КАКВО ИМА В КУТИЯТА (productbox.jpg) */}
      <section className="box-section">
        <div className="box-content">
          <h2>Какво получавате в комплекта?</h2>
          <ul className="box-features">
            <li>✅ Основен сензорен модул (Влага и Светлина)</li>
            <li>✅ Микро-помпа с 1.5м силиконов маркуч</li>
            <li>✅ Захранващ адаптер и USB-C кабел</li>
            <li>✅ Безплатен достъп до Cloud платформата</li>
          </ul>
        </div>
        <div className="box-image-container">
          <img src="/productbox.jpg" alt="Aqua-Sense Box" className="box-image" />
        </div>
      </section>

      {/* РЕВЮТА ОТ КЛИЕНТИ */}
      <section className="reviews-section">
        <h2>Какво казват нашите клиенти</h2>
        <div className="reviews-container">
          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>"Откакто имам Aqua-Sense, орхидеите ми най-накрая цъфнаха! Забравям да поливам, но системата не забравя."</p>
            <span>- Мария И.</span>
          </div>
          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>"Уникален продукт. Интеграцията с телефона през Wi-Fi работи безотказно. Препоръчвам!"</p>
            <span>- Димитър К.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;