export function updateState(group) {
  return async dispatch => {
    const words = []
    const translateWords = []
    const idWords = []
    const answerState = null
    dispatch(fetchAllCards())

    try {
      const allCards = await getCards(group)

      allCards.forEach(card => {
        words.push(card.word)
        translateWords.push(card.wordTranslate)
        idWords.push(card.id)
      })
      const activeCard = getRandomIntInclusive(0, allCards.length - 1)
      const activeQuestion = allCards[activeCard].word

      dispatch(fetchAllCardsSuccess(words, translateWords, idWords, activeCard, activeQuestion, answerState))
    } catch (e) {
      dispatch(fetchError(e))
    }
  }
}