import { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { AppContext } from '../components/AppContext';

const screenWidth = Dimensions.get('window').width;

export default function GameScreen() {
  const { photos, gridSize } = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    
    const deck = [...photos, ...photos]
      .sort(() => Math.random() - 0.5)
      .map((uri, index) => ({
        id: index,
        uri: uri,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
  }, []);

  const handleCardPress = (index) => {
    if (cards[index].isFlipped || cards[index].isMatched || selectedIndices.length >= 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length === 2) {
      const [firstIndex, secondIndex] = newSelected;
      
      if (newCards[firstIndex].uri === newCards[secondIndex].uri) {
        Vibration.vibrate(200); 
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setMatches(matches + 1);
        setSelectedIndices([]);
      } else {
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setSelectedIndices([]);
        }, 1000);
      }
    }
  };

  const cardSize = (screenWidth - 40) / gridSize - 10;

  const renderCard = ({ item, index }) => (
    <TouchableOpacity 
      style={[styles.card, { width: cardSize, height: cardSize }]} 
      onPress={() => handleCardPress(index)}
      activeOpacity={0.8}
    >
      {(item.isFlipped || item.isMatched) ? (
        <Image source={{ uri: item.uri }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardBack} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Paires trouvées : {matches} / {photos.length}</Text>
      <FlatList
        key={gridSize}
        data={cards}
        numColumns={gridSize}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  scoreText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  grid: { alignItems: 'center', justifyContent: 'center' },
  card: { margin: 5, borderRadius: 8, overflow: 'hidden', backgroundColor: '#ddd', elevation: 3 },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardBack: { width: '100%', height: '100%', backgroundColor: '#007AFF' }
});