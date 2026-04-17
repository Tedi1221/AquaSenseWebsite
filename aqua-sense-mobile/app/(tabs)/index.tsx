import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const [products, setProducts] = useState<any>([]); // 🚀 Добавено <any>
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://aquasense-backend-hg8e.onrender.com/api/products')
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          throw new Error("Сървърът се събужда. Моля, презаредете след малко.");
        }
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Грешка при дърпане на данните:", err.message);
        setLoading(false);
      });
  }, []);

  // 🚀 ПОПРАВКА: Добавено { item: any }
  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.images?.[0] || item.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>€{item.price}</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>🛒 Добави в количката</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌱 Aqua-Sense</Text>
        <Text style={styles.subtitle}>Бъдещето на вашите растения е тук.</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00d2ff" style={{ marginTop: 50 }} />
      ) : products.length === 0 ? (
        <Text style={{ color: '#a1a1a6', textAlign: 'center', marginTop: 20 }}>
          Сървърът се събужда... Моля, изчакайте и презаредете приложението.
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderProduct}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00d2ff',
  },
  subtitle: {
    fontSize: 14,
    color: '#a1a1a6',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  productName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    color: '#00d2ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00d2ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold', // С главно W
    fontSize: 16,
  },
});