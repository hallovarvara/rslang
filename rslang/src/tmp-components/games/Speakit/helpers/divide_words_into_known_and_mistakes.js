export default (allWords, guessedWords) => {
  const mistakes = [];
  const known = [];

  allWords.forEach((wordObj) => {
    if (guessedWords.find((guessedWordObj) => guessedWordObj.id === wordObj.id)) {
      known.push(wordObj);
    } else {
      mistakes.push(wordObj);
    }
  });

  return {
    mistakes,
    known,
  };
};
