import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sun, AlertTriangle, CheckCircle2 } from 'lucide-react';
import './App.css';

function LiveDemo() {
  const [moisture, setMoisture] = useState(60);
  const [light, setLight] = useState(80);
  const [isWatering, setIsWatering] = useState(false);

  useEffect(() => {
    if (moisture < 30 && !isWatering) {
      setIsWatering(true);
      setTimeout(() => {
        setMoisture(80);
        setIsWatering(false);
      }, 3000);
    }
  }, [moisture, isWatering]);

  const isLightMode = document.body.classList.contains('light-mode');

  // Dynamic colors for the virtual environment
  const soilOpacity = Math.max(0.2, moisture / 100);
  const lightOpacity = Math.max(0.1, light / 100);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem', minHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
      
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Interactive Demo</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Adjust the environment below and watch how Aqua-Sense Pro intelligently responds to keep the plant healthy.
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(300px, 0.8fr)', 
        gap: '3rem', 
        alignItems: 'center' 
      }}>
        
        {/* LEFT: Virtual Simulation Environment */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          style={{ width: '100%', position: 'relative' }}
        >
          {/* Virtual Pot Container (Glassmorphic Window) */}
          <div className="glass-card" style={{ height: '450px', position: 'relative', overflow: 'hidden', padding: 0, borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
            
            {/* Dynamic Sky Background */}
            <motion.div 
              animate={{ opacity: lightOpacity }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: isLightMode ? 'linear-gradient(to bottom, #87CEEB, #f8fafc)' : 'linear-gradient(to bottom, #020617, #0f172a)', zIndex: 0 }}
            />

            {/* Glowing Sun Effect */}
            <motion.div 
              animate={{ scale: light / 50 + 0.5, opacity: lightOpacity }}
              transition={{ type: 'spring' }}
              style={{ position: 'absolute', top: '10%', right: '10%', width: '100px', height: '100px', borderRadius: '50%', background: '#fbbf24', filter: 'blur(30px)', zIndex: 1 }}
            />

            {/* Smart Device */}
            <div style={{ position: 'absolute', bottom: '30%', left: '20%', width: '30px', height: '120px', background: 'rgba(255,255,255,0.9)', borderRadius: '15px', zIndex: 3, boxShadow: '0 10px 20px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10px' }}>
              <motion.div 
                animate={{ background: isWatering ? '#00f0ff' : '#333', boxShadow: isWatering ? '0 0 15px #00f0ff' : 'none' }}
                style={{ width: '8px', height: '8px', borderRadius: '50%' }}
              />
              {/* Water Droplet Animation */}
              {isWatering && (
                <motion.div
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: 80, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={{ position: 'absolute', top: '40px', color: '#00f0ff', fontSize: '24px' }}
                >
                  <Droplets size={20} />
                </motion.div>
              )}
            </div>

            {/* Plant Visualization */}
            <motion.div 
              animate={{ 
                rotate: moisture < 30 ? 25 : 0, 
                scale: moisture > 70 ? 1.1 : (moisture < 30 ? 0.9 : 1),
                filter: moisture < 30 ? 'grayscale(80%) hue-rotate(-30deg)' : 'grayscale(0%)'
              }}
              transition={{ duration: 1 }}
              style={{ position: 'absolute', bottom: '25%', left: '50%', transformOrigin: 'bottom center', fontSize: '100px', marginLeft: '-50px', zIndex: 2 }}
            >
              {moisture < 30 ? '🥀' : '🌿'}
            </motion.div>

            {/* Dynamic Soil */}
            <motion.div 
              animate={{ backgroundColor: `rgba(139, 69, 19, ${soilOpacity})` }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', borderTop: '2px solid rgba(255,255,255,0.1)', zIndex: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
               <span style={{ color: 'white', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Soil Moisture: {moisture}%</span>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: Control Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ width: '100%' }}
        >
          <div className="glass-card" style={{ padding: '3rem', height: '100%' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2.5rem' }}>Control Panel</h3>
            
            {/* Moisture Slider */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Droplets size={20} color="var(--accent-primary)" /> Soil Moisture</span>
                <span style={{ color: moisture < 30 ? '#ef4444' : 'var(--accent-primary)', fontWeight: 'bold' }}>{moisture}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={moisture} 
                onChange={(e) => setMoisture(Number(e.target.value))} 
                className="demo-slider" disabled={isWatering}
              />
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '10px 0 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                {isWatering ? <><AlertTriangle size={14} color="#00f0ff" /> Aqua-Sense is actively watering...</> : "Slide below 30% to trigger auto-watering."}
              </p>
            </div>

            {/* Light Slider */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Sun size={20} color="#fbbf24" /> Sunlight</span>
                <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{light}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={light} 
                onChange={(e) => setLight(Number(e.target.value))} 
                className="demo-slider"
              />
            </div>

            {/* Status Indicator */}
            <motion.div 
              animate={{ 
                background: isWatering ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                borderColor: isWatering ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'
              }}
              style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid', transition: 'all 0.3s' }}
            >
              <h4 style={{ margin: '0 0 10px 0', color: isWatering ? 'var(--accent-primary)' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isWatering ? <Activity size={18} /> : <CheckCircle2 size={18} color="var(--accent-secondary)" />} System Status
              </h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {isWatering 
                  ? "Critical dryness detected. Micro-pump activated. Restoring optimal moisture levels..." 
                  : "Sensors operating normally. Environment is optimal for plant growth."}
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}

// Activity icon missing from lucide import, defining simple fallback if needed or using existing
import { Activity } from 'lucide-react';

export default LiveDemo;