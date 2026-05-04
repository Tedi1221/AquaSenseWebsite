import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Droplets, Sun, Activity, Power } from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { useTranslation } from 'react-i18next';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [isWatering, setIsWatering] = useState(false);
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://aquasense-backend-hg8e.onrender.com/api/data');
      setSensorData(response.data);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleWaterNow = () => {
    setIsWatering(true);
    // Simulate watering delay
    setTimeout(() => {
      setIsWatering(false);
    }, 5000);
  };

  const isLightMode = document.body.classList.contains('light-mode');
  const textColor = isLightMode ? '#0f172a' : '#ffffff';
  const gridColor = isLightMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';

  const chartData = {
    labels: [...sensorData].reverse().map(d => new Date(d.timestamp).toLocaleTimeString('bg-BG')),
    datasets: [
      {
        label: 'Moisture Level (%)',
        data: [...sensorData].reverse().map(d => d.moisture),
        borderColor: '#00f0ff',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#00f0ff',
        pointBorderColor: '#fff',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { labels: { color: textColor, font: { family: 'Outfit', size: 14 } } },
      tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', titleFont: { family: 'Outfit' }, padding: 12, cornerRadius: 8 }
    },
    scales: {
      y: { ticks: { color: textColor }, grid: { color: gridColor }, beginAtZero: true },
      x: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  const latestData = sensorData.length > 0 ? sensorData[0] : null;

  return (
    <div className="dashboard">
      <header className="header" style={{ marginBottom: '4rem' }}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="gradient-text" style={{ fontSize: '3.5rem' }}
        >
          {t('dash_title')}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          {t('dash_subtitle')}
        </motion.p>
      </header>

      <main>
        <div className="cards-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card glass-card">
            <h3><Droplets color="var(--accent-primary)" /> {t('moisture')}</h3>
            <p className="value" style={{ color: 'var(--accent-primary)' }}>{latestData ? `${latestData.moisture}%` : '--'}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card glass-card">
            <h3><Sun color="#fbbf24" /> {t('light')}</h3>
            <p className="value" style={{ color: '#fbbf24' }}>{latestData ? `${latestData.light}%` : '--'}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card glass-card">
            <h3><Activity color={isWatering ? '#00ff88' : 'var(--text-secondary)'} /> {t('status')}</h3>
            <p className="value" style={{ color: isWatering ? '#00ff88' : 'var(--text-primary)', fontSize: '2rem' }}>
              {isWatering ? t('watering') : (latestData ? latestData.status : t('standby'))}
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass-card" style={{ height: '400px', marginBottom: '3rem', padding: '1.5rem' }}>
          <Line options={chartOptions} data={chartData} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            className="water-button" 
            onClick={handleWaterNow}
            disabled={isWatering}
            style={{ 
              transform: isWatering ? 'scale(0.95)' : 'none', 
              opacity: isWatering ? 0.7 : 1,
              background: isWatering ? '#00ff88' : 'var(--accent-gradient)'
            }}
          >
            <Power size={22} /> {isWatering ? t('pump_active') : t('water_now')}
          </button>
        </motion.div>
      </main>
    </div>
  );
}

export default Dashboard;