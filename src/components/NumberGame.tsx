import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import { t } from '../i18n'; // Assuming t function from localization stub

export const NumberGame: React.FC = () => {
  const { goToScene, completeMiniGame } = useGameStore();

  // Game state
  const [sequenceLength, setSequenceLength] = useState<number>(3); // Start with sequence 1-2-3
  const [currentStep, setCurrentStep] = useState<number>(0); // Current index in the sequence the user needs to tap
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(''); // Display messages to the user

  // Numbers to display on buttons (1-9)
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Function to start or restart the game
  const startGame = () => {
    setSequenceLength(3);
    setCurrentStep(0);
    setGameCompleted(false);
    setGameActive(true);
    setMessage(t('tap_number') + ' 1'); // TODO: Add tap_number to i18n
  };

  // Handle number button press
  const handleNumberPress = (tappedNumber: number) => {
    if (!gameActive || gameCompleted) {
      return;
    }

    // The number the user is currently supposed to tap
    const expectedNumber = currentStep + 1;

    if (tappedNumber === expectedNumber) {
      // Correct number tapped
      if (currentStep === sequenceLength - 1) {
        // Sequence completed
        if (sequenceLength === 9) {
          // Game completed
          setGameActive(false);
          setGameCompleted(true);
          setMessage(t('game_complete')); // TODO: Add game_complete to i18n
          // TODO: Integrate sound playback - /assets/sounds/win.mp3
          // TODO: Display confetti animation - confetti.json Lottie
          // TODO: Call completeMiniGame('numberGame', stars) - Decide on stars later
           completeMiniGame('numberGame', 3); // Example: awarding 3 stars
        } else {
          // Sequence extended
          setSequenceLength(prevLength => prevLength + 1);
          setCurrentStep(0);
          const nextNumber = 1; // Next sequence starts with 1
          setMessage(t('sequence_correct') + ' ' + t('tap_number') + ' ' + nextNumber); // TODO: Add sequence_correct to i18n
        }
      } else {
        // Move to the next number in the sequence
        setCurrentStep(prevStep => prevStep + 1);
        const nextNumber = expectedNumber + 1;
        setMessage(t('tap_number') + ' ' + nextNumber);
      }
    } else {
      // Incorrect number tapped - reset sequence
      setCurrentStep(0);
      setMessage(t('wrong_number') + ' ' + t('tap_number') + ' 1'); // TODO: Add wrong_number to i18n

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('number_game_title')}</Text> {/* TODO: Add number_game_title to i18n */}

      {!gameActive && !gameCompleted && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      )}

      {gameActive && !gameCompleted && (
        <View>
          <Text style={styles.messageText}>{message}</Text>
          <View style={styles.grid}>
            {numbers.map((number) => (
              <TouchableOpacity
                key={number}
                style={styles.numberButton}
                onPress={() => handleNumberPress(number)}
              >
                <Text style={styles.buttonText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      {gameCompleted && (
        <View style={styles.completionContainer}>
          <Text style={styles.completionText}>{message}</Text>
          <TouchableOpacity style={styles.homeButton} onPress={() => goToScene('worldMap')}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // TODO: Placeholder background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  startButton: {
    backgroundColor: '#28a745', // Green color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 100, // Ensure touch target size
    minHeight: 44, // Ensure touch target size
  buttonText: {
    color: '#fff',
    fontSize: 18,
  messageText: {
    fontSize: 20,
    textAlign: 'center',
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // Grid for numbers 1-9
    width: 300, // Example width
  numberButton: {
    width: 80, // Example size, ensure >= 44px
    height: 80, // Example size, ensure >= 44px
    margin: 5,
    backgroundColor: '#007bff', // Blue color
  completionContainer: {
    marginTop: 20,
  completionText: {
    fontSize: 22,
    color: '#28a745', // Green color for success
  homeButton: {
    padding: 10,
    backgroundColor: '#6c757d', // Grey color
    borderRadius: 5,
    minWidth: 44, // Ensure touch target size
});
//
