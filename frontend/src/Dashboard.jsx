import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [sensorData, setSensorData] = useState([]);

  const fetchData = async () => {
    try {
      // С новия реален линк
      const response = await axios.get('https://aquasense-backend-hg8e.onrender.com/api/data');
      setSensorData(response.data);
    } catch (error) {
      console.error("Грешка при връзка с бекенда:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleWaterNow = () => {
    alert("💧 Успешно изпратена команда към Aqua-Sense Pro! Помпата е активирана.");
  };

  const chartData = {
    labels: [...sensorData].reverse().map(d => new Date(d.timestamp).toLocaleTimeString('bg-BG')),
    datasets: [
      {
        label: 'Влажност (Стойност от сензора)',
        data: [...sensorData].reverse().map(d => d.moisture),
        borderColor: '#00d2ff',
        backgroundColor: 'rgba(0, 210, 255, 0.2)',
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: 'white' } } },
    scales: {
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  };

  const latestData = sensorData.length > 0 ? sensorData[0] : null;

  return (
    <div className="dashboard">
      <header className="header">
        <h1>🌱 Aqua-Sense Pro</h1>
        <p>Вашият интелигентен асистент за поливане</p>
      </header>

      <main>
        <div className="cards-container">
          <div className="card">
            <h3>💧 Текуща влажност</h3>
            <p className="value">{latestData ? latestData.moisture : '--'}</p>
          </div>
          <div className="card">
            <h3>☀️ Светлина</h3>
            <p className="value">{latestData ? latestData.light : '--'}</p>
          </div>
          <div className="card">
            <h3>⚙️ Статус помпа</h3>
            <p className={`value ${latestData && latestData.status === 'WATERING' ? 'active' : ''}`}>
              {latestData ? latestData.status : '--'}
            </p>
          </div>
        </div>

        <div className="chart-container">
          <Line options={chartOptions} data={chartData} />
        </div>

        <div className="actions">
          <button className="water-button" onClick={handleWaterNow}>
            💦 Полей сега
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;