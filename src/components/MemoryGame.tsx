import React, { useState, useEffect } from \'react\';
import { View, Text, TouchableOpacity, StyleSheet, Image } from \'react-native\';
// TODO: Import Lottie animation component if needed
// TODO: Import sound library if needed
// TODO: Import useGameStore

interface Card {
  id: number;
  value: string; // e.g., 'animal1', 'animal2'
  isFlipped: boolean;
  isMatched: boolean;
}

const initialCards: Card[] = [
  { id: 1, value: \'animal1\', isFlipped: false, isMatched: false },
  { id: 2, value: \'animal1\', isFlipped: false, isMatched: false },
  { id: 3, value: \'animal2\', isFlipped: false, isMatched: false },
  { id: 4, value: \'animal2\', isFlipped: false, isMatched: false },
];

// Function to shuffle cards
const shuffleArray = (array: Card[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(shuffleArray(initialCards));
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // Indices of flipped cards
  const [matchedCards, setMatchedCards] = useState<string[]>([]); // Values of matched pairs
  const [isGameComplete, setIsGameComplete] = useState(false);

  // TODO: Integrate useGameStore here
  // const { completedMiniGames } = useGameStore();

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [index1, index2] = flippedCards;
      const card1 = cards[index1];
      const card2 = cards[index2];

      if (card1.value === card2.value) {
        // Match found
        setCards(prevCards =>
          prevCards.map((card, index) =>
            index === index1 || index === index2 ? { ...card, isMatched: true, isFlipped: true } : card
          )
        );
        setMatchedCards(prevMatched => [...prevMatched, card1.value]);
        setFlippedCards([]);
      } else {
        // No match, flip back after a delay
        const timeoutId = setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((card, index) =>
              index === index1 || index === index2 ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000); // Flip back after 1 second

        return () => clearTimeout(timeoutId); // Cleanup timeout
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    // Check if all pairs are matched (2 pairs for 2x2 grid)
    if (matchedCards.length === initialCards.length / 2 && initialCards.length > 0) {
      setIsGameComplete(true);
      // TODO: Play match sound
      // TODO: Show Lottie animation
      // TODO: Call useGameStore action: completedMiniGames.push('memoryGame')
    }
  }, [matchedCards]);

  const handleCardPress = (index: number) => {
    const card = cards[index];

    // Ignore if already matched, already flipped, or two cards are already face up
    if (card.isMatched || card.isFlipped || flippedCards.length === 2) {
      return;
    }

    // Flip the card
    setCards(prevCards =>
      prevCards.map((c, i) =>
        i === index ? { ...c, isFlipped: true } : c
      )
    );
    setFlippedCards(prevFlipped => [...prevFlipped, index]);
  };

  const handleHomePress = () => {
    // TODO: Implement navigation back to the map screen
    console.log(\'Navigate back to home\');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Game</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() => handleCardPress(index)}
            disabled={isGameComplete || card.isMatched || card.isFlipped || flippedCards.length === 2}
          >
            <View style={[styles.card, card.isFlipped ? styles.cardFlipped : styles.cardHidden]}>
              {card.isFlipped || card.isMatched ? (
                // TODO: Replace with actual animal images based on card.value
                <Image
                  source={{ uri: \`https://via.placeholder.com/100x100?text=\${card.value}\` }} // Placeholder
                  style={styles.cardImage}
                />
              ) : (
                // TODO: Replace with actual card back image
                <Text style={styles.cardBackText}>?</Text> // Placeholder for card back
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {isGameComplete && (
        <View style={styles.completionMessage}>
          <Text>Game Complete!</Text>
          {/* TODO: Add Lottie animation component here */}
          <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: \'center\',
    alignItems: \'center\',
    padding: 20,
    backgroundColor: \'#f0f0f0\', // Example background
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  grid: {
    width: 200, // Adjust based on card size and spacing
    height: 200, // Adjust based on card size and spacing
    flexDirection: \'row\',
    flexWrap: \'wrap\',
    justifyContent: \'center\',
    alignItems: \'center\',
  },
  cardContainer: {
    width: \'45%\', // Adjust to fit 2x2 grid with spacing
    aspectRatio: 1, // Keep cards square
    margin: \'2.5%\', // Spacing between cards
    // Ensure tap target is at least 44x44, container helps with this
    minWidth: 44,
    minHeight: 44,
  },
  card: {
    flex: 1,
    justifyContent: \'center\',
    alignItems: \'center\',
    borderRadius: 8,
    backfaceVisibility: \'hidden\', // Hide the back when flipped
  },
  cardHidden: {
    backgroundColor: \'#3498db\', // Example card back color
  },
  cardFlipped: {
    backgroundColor: \'#ffffff\', // Example card face color
  },
  cardImage: {
    width: \'100%\',
    height: \'100%\',
    resizeMode: \'contain\',
  },
  cardBackText: {
    fontSize: 30,
    color: \'#ffffff\',
  },
  completionMessage: {
    marginTop: 30,
    alignItems: \'center\',
  },
  homeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: \'#2ecc71\', // Example button color
    borderRadius: 5,
    // Ensure tap target is at least 44x44
    minWidth: 44,
    minHeight: 44,
    justifyContent: \'center\', // Center text vertically
    alignItems: \'center\', // Center text horizontally
  },
  homeButtonText: {
    color: \'#ffffff\',
    fontSize: 18,
  },
});

export default MemoryGame;
