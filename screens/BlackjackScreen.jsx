import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BlackjackScreen = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameResult, setGameResult] = useState('');

  const dealInitialCards = () => {
    const playerCard1 = getRandomCard();
    const dealerCard1 = getRandomCard();
    const playerCard2 = getRandomCard();
    const dealerCard2 = getRandomCard();

    setPlayerCards([playerCard1, playerCard2]);
    setDealerCards([dealerCard1, dealerCard2]);
    setPlayerScore(calculateHandScore([playerCard1, playerCard2]));
    setDealerScore(calculateHandScore([dealerCard1, dealerCard2]));

    // Check for immediate blackjack
    if (playerScore === 21 && dealerScore === 21) {
      setGameResult("It's a Tie! Both player and dealer have Blackjack!");
    } else if (playerScore === 21) {
      setGameResult('Player wins with Blackjack!');
    } else if (dealerScore === 21) {
      setGameResult('Dealer wins with Blackjack!');
    }
  };

  const getRandomCard = () => {
    const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
  };

  const calculateHandScore = (hand) => {
    let score = 0;
    let hasAce = false;

    for (let card of hand) {
      if (card === 'A') {
        score += 11;
        hasAce = true;
      } else if (card === 'K' || card === 'Q' || card === 'J') {
        score += 10;
      } else {
        score += parseInt(card);
      }
    }

    if (score > 21 && hasAce) {
      score -= 10;
    }

    return score;
  };

  const handleHit = () => {
    const newCard = getRandomCard();
    const newPlayerCards = [...playerCards, newCard];
    const newPlayerScore = calculateHandScore(newPlayerCards);

    setPlayerCards(newPlayerCards);
    setPlayerScore(newPlayerScore);

    if (newPlayerScore > 21) {
      setGameResult('Player Busts! Dealer wins!');
    }
  };

  const handleStand = () => {
    const drawDealerCard = () => {
      const newCard = getRandomCard();
      const newDealerCards = [...dealerCards, newCard];
      const newDealerScore = calculateHandScore(newDealerCards);
  
      setDealerCards(newDealerCards);
      setDealerScore(newDealerScore);
  
      if (newDealerScore < 17) {
        // If the dealer's score is still less than 17, draw another card
        drawDealerCard();
      } else {
        // Check the game result once the dealer is done drawing cards
        if (newDealerScore > 21) {
          setGameResult('Dealer Busts! Player wins!');
        } else {
          if (playerScore === newDealerScore) {
            setGameResult("It's a Tie!");
          } else if (playerScore > newDealerScore) {
            setGameResult('Player wins!');
          } else {
            setGameResult('Dealer wins!');
          }
        }
      }
    };
  
    // Start the dealer's card drawing process
    drawDealerCard();
  };
  
  

  const handleReset = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGameResult('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blackjack Game</Text>
      <Text>Player Cards: {JSON.stringify(playerCards)}</Text>
      <Text>Dealer Cards: {JSON.stringify(dealerCards)}</Text>
      <Text>Player Score: {playerScore}</Text>
      <Text>Dealer Score: {dealerScore}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Deal" onPress={dealInitialCards} />
        <Button title="Hit" onPress={handleHit} />
        <Button title="Stand" onPress={handleStand} />
      </View>
      <Text>{gameResult}</Text>
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00FF00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default BlackjackScreen;

   
