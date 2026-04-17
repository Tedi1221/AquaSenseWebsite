import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';

export default function ExploreScreen() {
  // 🚀 ПОПРАВКА: Добавено <any>, за да не мрънка TypeScript
  const [sensorData, setSensorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Функция за дърпане на данните от сензора
  const fetchSensorData = async () => {
    try {
      const res = await fetch('https://aquasense-backend-hg8e.onrender.com/api/data');
      
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        // Взимаме най-първия запис (най-новия)
        if (data && data.length > 0) {
          setSensorData(data[0]);
        }
      } else {
        console.log("Сървърът се събужда...");
      }
    } catch (error) {
      console.error("Грешка при зареждане на сензорите:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Зареждане при първоначално отваряне
  useEffect(() => {
    fetchSensorData();
  }, []);

  // Функция за "дърпане надолу за презареждане" (Pull-to-refresh)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSensorData();
  }, []);

  // 🚀 ПОПРАВКА: Добавено (dateString: any)
  const formatDate = (dateString: any) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('bg-BG', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌿 Моята градина</Text>
        <Text style={styles.subtitle}>Живи данни от Aqua-Sense Pro</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00d2ff" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00d2ff" />
          }
        >
          {sensorData ? (
            <>
              <Text style={styles.updateText}>Последно обновяване: {formatDate(sensorData.timestamp)}</Text>
              
              <View style={styles.cardsGrid}>
                {/* Карта: Влажност */}
                <View style={styles.metricCard}>
                  <Text style={styles.metricIcon}>💧</Text>
                  <Text style={styles.metricLabel}>Влажност на почвата</Text>
                  <Text style={[styles.metricValue, { color: sensorData.moisture < 30 ? '#ff4d4d' : '#00d2ff' }]}>
                    {sensorData.moisture}%
                  </Text>
                  <Text style={styles.metricStatus}>
                    {sensorData.moisture < 30 ? 'Критично сухо!' : 'Оптимално'}
                  </Text>
                </View>

                {/* Карта: Светлина */}
                <View style={styles.metricCard}>
                  <Text style={styles.metricIcon}>☀️</Text>
                  <Text style={styles.metricLabel}>Слънчева светлина</Text>
                  <Text style={[styles.metricValue, { color: '#ffd700' }]}>
                    {sensorData.light}%
                  </Text>
                  <Text style={styles.metricStatus}>
                    {sensorData.light > 70 ? 'Силно слънце' : 'Нормално'}
                  </Text>
                </View>
              </View>

              {/* Широка карта за общия статус */}
              <View style={styles.statusCard}>
                <Text style={styles.statusTitle}>Системен статус</Text>
                <View style={styles.statusRow}>
                  <Text style={styles.statusLabel}>Помпа:</Text>
                  <Text style={styles.statusActive}>
                    {sensorData.status === 'Watering' ? 'ВКЛЮЧЕНА (Полива се)' : 'Готовност'}
                  </Text>
                </View>
                <View style={styles.statusRow}>
                  <Text style={styles.statusLabel}>Връзка:</Text>
                  <Text style={styles.statusActive}>Онлайн 🟢</Text>
                </View>
              </View>

              <Text style={styles.hintText}>↓ Дръпни надолу за обновяване ↓</Text>
            </>
          ) : (
            <Text style={{ color: '#a1a1a6', textAlign: 'center', marginTop: 40 }}>
              Няма намерени данни от сензора.
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ff88', 
  },
  subtitle: {
    fontSize: 16,
    color: '#a1a1a6',
    marginTop: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  updateText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#1e1e1e',
    width: '48%', 
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  metricIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  metricLabel: {
    color: '#a1a1a6',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metricStatus: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  statusTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusLabel: {
    color: '#a1a1a6',
    fontSize: 16,
  },
  statusActive: {
    color: '#00ff88',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hintText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  }
});