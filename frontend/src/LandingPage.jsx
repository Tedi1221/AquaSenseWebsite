import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Droplets, CheckCircle2, Play, ShoppingBag } from 'lucide-react';
import './App.css';

function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <header className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Centered Liquid Badge */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ 
              marginBottom: '2rem', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'rgba(0, 240, 255, 0.1)', 
              padding: '12px 24px', 
              borderRadius: '99px', 
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: 'var(--accent-primary)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.15)'
            }}
          >
            <Droplets size={20} color="var(--accent-primary)" />
            <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>{t('next_gen') || "Next-Gen Smart Watering"}</span>
          </motion.div>
          
          <h1 className="gradient-text">{t('hero_title')}</h1>
          <p>{t('hero_subtitle')}</p>
          
          <div className="hero-buttons">
            <Link to="/products">
              <button className="water-button">
                <ShoppingBag size={20} /> {t('buy_now')}
              </button>
            </Link>
            <Link to="/demo">
              <button className="water-button secondary-btn">
                <Play size={20} fill="currentColor" /> {t('see_demo')}
              </button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
          style={{ marginTop: '5rem', width: '100%', maxWidth: '850px', position: 'relative' }}
        >
          {/* Glow effect behind the image */}
          <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', background: 'var(--accent-primary)', filter: 'blur(100px)', opacity: 0.2, zIndex: -1 }}></div>
          <div className="glass-card" style={{ padding: '12px', borderRadius: '32px' }}>
            <img src="/product.jpg" alt="Aqua-Sense Pro Device" style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', borderRadius: '24px', display: 'block' }} />
          </div>
        </motion.div>
      </header>

      {/* BOX FEATURES SECTION */}
      <section style={{ padding: '8rem 2rem', width: '100%', maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ flex: '1 1 400px' }}
        >
          <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: 1.1 }} className="gradient-text">{t('box_title')}</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            {[1, 2, 3, 4].map((num, i) => (
              <motion.li 
                key={num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <CheckCircle2 color="var(--accent-secondary)" size={24} /> 
                {t(`box_feature_${num}`)}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ flex: '1 1 400px', position: 'relative' }}
        >
           <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', background: 'var(--accent-secondary)', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 }}></div>
           <div className="glass-card" style={{ padding: '12px', borderRadius: '32px' }}>
             <img src="/productbox.jpg" alt="Aqua-Sense Box" style={{ width: '100%', borderRadius: '24px', display: 'block' }} />
           </div>
        </motion.div>
      </section>

      {/* VIDEO & REVIEWS COMBINED */}
      <section style={{ padding: '6rem 2rem', width: '100%', textAlign: 'center', position: 'relative' }}>
        <h2 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>{t('video_title')}</h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '1000px', margin: '0 auto 6rem', position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', bottom: 0, background: 'var(--accent-primary)', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 }}></div>
          <div className="glass-card" style={{ padding: '12px', borderRadius: '32px' }}>
             <video src="/promo-video.mp4" autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '24px', display: 'block', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        </motion.div>

        <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>{t('reviews_title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { text: t('review_1_text'), author: t('review_1_author') },
            { text: t('review_2_text'), author: t('review_2_author') }
          ].map((review, i) => (
            <motion.div 
              key={i}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', padding: '3rem' }}
            >
              <div style={{ color: '#fbbf24', fontSize: '1.8rem', marginBottom: '1.5rem', letterSpacing: '2px' }}>★★★★★</div>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '2.5rem', fontStyle: 'italic', flex: 1, lineHeight: 1.6 }}>"{review.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                  {review.author.charAt(0)}
                </div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{review.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;