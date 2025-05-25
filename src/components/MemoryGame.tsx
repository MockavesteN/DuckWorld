import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import { t } from '../i18n'; // Assuming t function from localization stub

// TODO: Define card interface with value, isFlipped, isMatched
interface Card {
  id: number; // Unique ID for React key
  value: string; // Value to match (e.g., 'A', 'B')
  isFlipped: boolean;
  isMatched: boolean;
}

// Helper function to shuffle an array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

export const MemoryGame: React.FC = () => {
  const { goToScene, completeMiniGame } = useGameStore();

  // TODO: Generate cards dynamically based on a set of values for a 2x2 grid (4 cards)
  const initialCards: Card[] = shuffleArray([
    { id: 1, value: 'A', isFlipped: false, isMatched: false },
    { id: 2, value: 'A', isFlipped: false, isMatched: false },
    { id: 3, value: 'B', isFlipped: false, isMatched: false },
    { id: 4, value: 'B', isFlipped: false, isMatched: false },
  ]);

  const [cards, setCards] = useState<Card[]>(initialCards);
  const [flippedCardIndexes, setFlippedCardIndexes] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // To prevent flipping more than 2 cards
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  // Effect to check for matches when 2 cards are flipped
  useEffect(() => {
    if (flippedCardIndexes.length === 2) {
      setIsProcessing(true); // Prevent further clicks

      const [index1, index2] = flippedCardIndexes;
      const card1 = cards[index1];
      const card2 = cards[index2];

      if (card1.value === card2.value) {
        // Match found
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === index1 || index === index2 ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCardIndexes([]); // Clear flipped cards
        setIsProcessing(false);
      } else {
        // No match, flip back after a delay
        const flipBackTimeout = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === index1 || index === index2 ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCardIndexes([]); // Clear flipped cards
          setIsProcessing(false);
        }, 1000); // 1 second delay

        return () => clearTimeout(flipBackTimeout); // Clean up timeout
      }
    }
  }, [flippedCardIndexes, cards]); // Depend on flippedCardIndexes and cards state

  // Effect to check for game completion
    // Game is completed if all cards are matched
    const allMatched = cards.length > 0 && cards.every(card => card.isMatched);
    if (allMatched && !gameCompleted) {
      setGameCompleted(true);
      // TODO: Integrate sound playback - /assets/sounds/match.mp3
      // TODO: Display confetti animation - confetti.json Lottie
      // Call the action to complete the mini-game in the store
      completeMiniGame('memoryGame', 3); // Assuming 3 stars for completing
  }, [cards, gameCompleted, completeMiniGame]); // Depend on cards, gameCompleted, and completeMiniGame action

  const handleCardPress = (index: number) => {
    // Ignore if already flipped, matched, or processing another pair
    if (isProcessing || cards[index].isFlipped || cards[index].isMatched) {
      return;

    // Flip the card
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );

    // Add index to flipped cards
    setFlippedCardIndexes((prevIndexes) => [...prevIndexes, index]);
  };

  return (
    <View style={styles.container}>
      <Text>{t('memory_game_title')}</Text> {/* TODO: Add memory_game_title to i18n */}
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={card.id} // Use card.id as key
            style={[styles.card, card.isFlipped && styles.cardFlipped, card.isMatched && styles.cardMatched]}
            onPress={() => handleCardPress(index)}
            disabled={isProcessing || card.isMatched || card.isFlipped} // Disable button appropriately
          >
            {/* TODO: Replace Text with actual card image/content placeholder */}
            {card.isFlipped || card.isMatched ? (
              <Text style={styles.cardText}>{card.value}</Text>
            ) : (
              <Text style={styles.cardText}>?</Text> // Face down state
            )}
          </TouchableOpacity>
        ))}
      </View>

      {gameCompleted && (
        <TouchableOpacity style={styles.homeButton} onPress={() => goToScene('worldMap')}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      )}
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // TODO: Placeholder background
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // 2x2 grid styling - adjust as needed
    width: 200, // Example width
    height: 200, // Example height
  card: {
    width: 80, // Example size, ensure >= 44px
    height: 80, // Example size, ensure >= 44px
    margin: 10,
    backgroundColor: '#ccc', // Face down color
    borderRadius: 8,
  cardFlipped: {
    backgroundColor: '#fff', // Face up color
  cardMatched: {
    backgroundColor: '#aaffaa', // Matched color (visual indicator)
    // TODO: Matched cards might become invisible or have a different style
    opacity: 0.5, // Example: make matched cards slightly transparent
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  homeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff', // Example button color
    borderRadius: 5,
    minWidth: 44, // Ensure touch target size
    minHeight: 44, // Ensure touch target size
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
});
//
// TODO: Import sound playback library
// TODO: Import Lottie component

// Define card type
  id: number;
  value: string;

const initialCards: Card[] = [
  { id: 1, value: 'A', isFlipped: false, isMatched: false },
  { id: 2, value: 'B', isFlipped: false, isMatched: false },
  { id: 3, value: 'A', isFlipped: false, isMatched: false },
  { id: 4, value: 'B', isFlipped: false, isMatched: false },
];

  const [flippedCards, setFlippedCards] = useState<number[]>([]); // Indices of currently flipped cards
  const [isGameComplete, setIsGameComplete] = useState(false);

  const { goToScene, completeMiniGame } = useGameStore(); // Use the store

  // Handle card press
    if (isGameComplete || cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) {

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    setFlippedCards((prev) => [...prev, index]);

  // Check for matches when two cards are flipped
    if (flippedCards.length === 2) {
      const [index1, index2] = flippedCards;

      // TODO: Add a delay before checking for match/flipping back
      setTimeout(() => {
        const newCards = [...cards];
        if (newCards[index1].value === newCards[index2].value) {
          // Match found
          newCards[index1].isMatched = true;
          newCards[index2].isMatched = true;
          // TODO: Play match sound (`/assets/sounds/match.mp3`)
        } else {
          // No match, flip back
          newCards[index1].isFlipped = false;
          newCards[index2].isFlipped = false;
        }
        setCards(newCards);
        setFlippedCards([]); // Clear flipped cards
      }, 1000); // 1 second delay for now
  }, [flippedCards, cards]);

  // Check for game completion
    const allMatched = cards.every((card) => card.isMatched);
    if (allMatched && cards.length > 0) { // Ensure cards are initialized
      setIsGameComplete(true);
      // TODO: Trigger confetti animation (`confetti.json` Lottie animation)
      // TODO: Mark game as complete in the store and add stars
      // completeMiniGame('memoryGame', 3); // Example call once action is ready
  }, [cards]);

  const handleGoHome = () => {
    goToScene('worldMap');

  // TODO: Use proper image assets or components for cards instead of text
      <Text style={styles.title}>Memory Game</Text>
            key={card.id}
            style={[styles.card, card.isFlipped && styles.cardFlipped]}
            disabled={isGameComplete || card.isMatched || flippedCards.length === 2}
              // TODO: Replace with card image/component
              // TODO: Replace with card back image/component
              <Text style={styles.cardText}>?</Text>
      {isGameComplete && (
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.buttonText}>Go Home</Text>

    padding: 20,
    // TODO: Add background or theme styling
  title: {
    marginBottom: 20,
    // Adjust grid dimensions for 2x2
    width: 80, // Example size, ensure touch target >= 44
    height: 80, // Example size, ensure touch target >= 44
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff',
    fontSize: 30,
    marginTop: 30,
    padding: 15,
    backgroundColor: 'green',
    minWidth: 44, // Ensure touch target >= 44
    minHeight: 44,
  buttonText: {
    color: 'white',

      // Call the completeMiniGame action now that it's available
      completeMiniGame('memoryGame', 3); // Marking as complete with 3 stars
  }, [cards, completeMiniGame]); // Add completeMiniGame to dependency array

import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// TODO: Add sound playback for matches
// TODO: Add Lottie animation for game completion

const MemoryGame: React.FC = () => {
  const goToScene = useGameStore((state) => state.goToScene);
  // TODO: Import and use the completeMiniGame action when it's added to the store.
  // const completeMiniGame = useGameStore((state) => state.completeMiniGame);

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true); // To prevent flipping while checking matches

  // TODO: Use images/icons instead of text for card values
  const cardValues = ['A', 'B', 'C', 'D']; // Placeholder values
  const initialCards: Card[] = [
    ...cardValues.map((value, index) => ({ id: index * 2, value, isFlipped: false, isMatched: false })),
    ...cardValues.map((value, index) => ({ id: index * 2 + 1, value, isFlipped: false, isMatched: false })),
  ].sort(() => Math.random() - 0.5); // Shuffle cards

    setCards(initialCards);
  }, []);

      setCanFlip(false); // Prevent further flips
      const [id1, id2] = flippedCards;
      const card1 = cards.find(card => card.id === id1);
      const card2 = cards.find(card => card.id === id2);

      if (card1 && card2 && card1.value === card2.value) {
        const newCards = cards.map(card =>
          card.id === id1 || card.id === id2 ? { ...card, isMatched: true, isFlipped: true } : card
        setFlippedCards([]);
        setCanFlip(true);

        // Check for game completion
        if (newCards.every(card => card.isMatched)) {
          setIsGameComplete(true);
          // TODO: Call completeMiniGame action here when available
          // completeMiniGame('memoryGame', calculateStars()); // Example call
          // TODO: Play match sound
          // TODO: Show confetti Lottie animation
        const timeoutId = setTimeout(() => {
          const newCards = cards.map(card =>
            card.id === id1 || card.id === id2 ? { ...card, isFlipped: false } : card
          setCards(newCards);
          setFlippedCards([]);
          setCanFlip(true);

        return () => clearTimeout(timeoutId);

  const handleCardPress = (cardId: number) => {
    if (!canFlip || flippedCards.length === 2) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    setFlippedCards([...flippedCards, cardId]);

  // TODO: Implement logic to calculate stars based on performance (e.g., number of moves)
  // const calculateStars = (): number => {
  //   return 3; // Placeholder
  // };

      {isGameComplete ? (
        <View style={styles.completionContainer}>
          <Text style={styles.completionText}>Game Complete!</Text>
          {/* TODO: Display stars earned */}
          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Text style={styles.buttonText}>Home</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {cards.map(card => (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, card.isFlipped && styles.cardFlipped, card.isMatched && styles.cardMatched]} // TODO: Add proper styling for flipped/matched
              onPress={() => handleCardPress(card.id)}
              disabled={!canFlip || card.isFlipped || card.isMatched} // Disable if not allowed to flip or already flipped/matched
            >
              {card.isFlipped || card.isMatched ? (
                <Text style={styles.cardText}>{card.value}</Text>
              ) : (
                // TODO: Add placeholder image or back of card style
                <Text style={styles.cardText}>?</Text>
              )}
            </TouchableOpacity>
          ))}

    backgroundColor: '#f0f0f0',
    // TODO: Adjust grid layout for different screen sizes/orientations
    width: 80, // TODO: Ensure touch target is >= 44px
    height: 80, // TODO: Ensure touch target is >= 44px
    backgroundColor: '#ccc',
    backgroundColor: '#d4edda', // Example matched color
    borderColor: '#28a745',
    fontSize: 20,
  completionContainer: {
  completionText: {
    fontSize: 28,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    minWidth: 44, // Ensure minimum touch target size
    minHeight: 44, // Ensure minimum touch target size
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally

export default MemoryGame;
