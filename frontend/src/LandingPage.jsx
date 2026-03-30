import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Импортираме преводача
import './App.css';

function LandingPage() {
  const { t } = useTranslation(); // Инициализираме го

  return (
    <div className="landing-page">
      {/* HERO СЕКЦИЯ */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="gradient-text">{t('hero_title')}</h1>
          <p>{t('hero_subtitle')}</p>
          <div className="hero-buttons">
            <Link to="/products"><button className="water-button primary-btn">🛒 {t('buy_now')}</button></Link>
            <Link to="/demo">
              <button className="water-button secondary-btn">💻 {t('see_demo')}</button>
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
        <h2>{t('video_title')}</h2>
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
          <h2>{t('box_title')}</h2>
          <ul className="box-features">
            <li>✅ {t('box_feature_1')}</li>
            <li>✅ {t('box_feature_2')}</li>
            <li>✅ {t('box_feature_3')}</li>
            <li>✅ {t('box_feature_4')}</li>
          </ul>
        </div>
        <div className="box-image-container">
          <img src="/productbox.jpg" alt="Aqua-Sense Box" className="box-image" />
        </div>
      </section>

      {/* РЕВЮТА ОТ КЛИЕНТИ */}
      <section className="reviews-section">
        <h2>{t('reviews_title')}</h2>
        <div className="reviews-container">
          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>"{t('review_1_text')}"</p>
            <span>- {t('review_1_author')}</span>
          </div>
          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>"{t('review_2_text')}"</p>
            <span>- {t('review_2_author')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;