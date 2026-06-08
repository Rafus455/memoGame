import { router } from 'expo-router';
import { useContext } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../components/AppContext';

export default function HomeScreen() {
  const { photos, setPhotos, gridSize, setGridSize, requiredPhotos } = useContext(AppContext);

  const gridOptions = [2, 4, 8];

  const handleGridSelection = (size: number) => {
    setGridSize(size);
    setPhotos([]); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PixelMem</Text>
      
      <Text style={styles.subtitle}>1. Choisissez la taille du jeu :</Text>
      <View style={styles.gridSelector}>
        {gridOptions.map((size) => (
          <TouchableOpacity 
            key={size} 
            style={[styles.gridButton, gridSize === size && styles.gridButtonActive]}
            onPress={() => handleGridSelection(size)}
          >
            <Text style={styles.gridButtonText}>{size}x{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.statusText}>
        Photos prises : {photos.length} / {requiredPhotos}
      </Text>

      <View style={styles.actions}>
        <Button 
          title="Prendre des photos" 
          onPress={() => router.push('/camera')} 
        />
        <View style={{ height: 20 }} />
        <Button 
          title="Jouer !" 
          disabled={photos.length < requiredPhotos}
          onPress={() => router.push('/game')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  gridSelector: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  gridButton: { padding: 10, borderWidth: 1, borderColor: '#007AFF', borderRadius: 8 },
  gridButtonActive: { backgroundColor: '#007AFF' },
  gridButtonText: { color: '#000', fontWeight: 'bold' },
  statusText: { fontSize: 16, marginBottom: 20, fontStyle: 'italic' },
  actions: { width: '100%' }
});