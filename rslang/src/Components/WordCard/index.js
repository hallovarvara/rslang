import React from 'react';
import WordCardView from './WordCard.jsx';

const WordCard = ( props ) => {
  const { wordData } = props;

  const audio = new Audio( wordData.audioExample ) //mp3 URL from state

  const playSound = () => {
    audio.play();
  }

  const restoreWord = (id) => {
    // TODO This function will change State
  }

  return (
    <WordCardView 
      wordData = { wordData }
      playSound = { playSound }
      restoreWord = { restoreWord }
    />
  ) 
}

export default WordCard;
