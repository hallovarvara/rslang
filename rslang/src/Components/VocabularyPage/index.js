import React from 'react';
import VocabularyView from './VocabularyPage.jsx';

const VocabularyPage = (props) => {

  const selectorOptions = [
    ['new', 'new & repeating'],
    ['complicated', 'complicated'],
    ['removed', 'removed']
  ]

  const words = [
    {
    "id": "5e9f5ee35eb9e72bc21af70c",
    "group": 1,
    "page": 1,
    "word": "anxious",
    "image": "files/02_0621.jpg",
    "audio": "files/02_0621.mp3",
    "audioMeaning": "files/02_0621_meaning.mp3",
    "audioExample": "files/02_0621_example.mp3",
    "textMeaning": "<i>Anxious</i> means feeling worried or nervous.",
    "textExample": "She was <b>anxious</b> about not making her appointment on time.",
    "transcription": "[ǽŋkʃəs]",
    "textExampleTranslate": "Она беспокоилась о том, чтобы не договориться о встрече вовремя",
    "textMeaningTranslate": "Тревожно означает чувствовать себя обеспокоенным или нервным",
    "wordTranslate": "озабоченный",
    "wordsPerExampleSentence": 10
    },
    {
    "id": "5e9f5ee35eb9e72bc21af70d",
    "group": 1,
    "page": 1,
    "word": "awful",
    "image": "files/02_0622.jpg",
    "audio": "files/02_0622.mp3",
    "audioMeaning": "files/02_0622_meaning.mp3",
    "audioExample": "files/02_0622_example.mp3",
    "textMeaning": "An <i>awful</i> thing is very bad.",
    "textExample": "Her performance last night was <b>awful</b>.",
    "transcription": "[ɔ́ːfəl]",
    "textExampleTranslate": "Ее выступление прошлой ночью было ужасным",
    "textMeaningTranslate": "Ужасно очень плохо",
    "wordTranslate": "ужасный",
    "wordsPerExampleSentence": 6
    },
    {
    "id": "5e9f5ee35eb9e72bc21af70e",
    "group": 1,
    "page": 1,
    "word": "consist",
    "image": "files/02_0623.jpg",
    "audio": "files/02_0623.mp3",
    "audioMeaning": "files/02_0623_meaning.mp3",
    "audioExample": "files/02_0623_example.mp3",
    "textMeaning": "To <i>consist</i> of certain is to be made of parts or things them.",
    "textExample": "Today’s choices for lunch <b>consisted</b> of pizza, hamburgers, and hot dogs.",
    "transcription": "[kənsíst]",
    "textExampleTranslate": "Сегодняшний выбор на обед состоял из пиццы, гамбургеров и хот-догов",
    "textMeaningTranslate": "Быть состоящим из определенного означает быть составленным из частей или вещей из них",
    "wordTranslate": "состоят",
    "wordsPerExampleSentence": 11
    },
    {
    "id": "5e9f5ee35eb9e72bc21af70f",
    "group": 1,
    "page": 1,
    "word": "desire",
    "image": "files/02_0624.jpg",
    "audio": "files/02_0624.mp3",
    "audioMeaning": "files/02_0624_meaning.mp3",
    "audioExample": "files/02_0624_example.mp3",
    "textMeaning": "To <i>desire</i> is to want something.",
    "textExample": "My sister <b>desires</b> a big house and lots of money.",
    "transcription": "[dizáiər]",
    "textExampleTranslate": "Моя сестра хочет большой дом и много денег",
    "textMeaningTranslate": "Желать - значит хотеть чего-то",
    "wordTranslate": "желание",
    "wordsPerExampleSentence": 10
    },
    {
    "id": "5e9f5ee35eb9e72bc21af710",
    "group": 1,
    "page": 1,
    "word": "eager",
    "image": "files/02_0625.jpg",
    "audio": "files/02_0625.mp3",
    "audioMeaning": "files/02_0625_meaning.mp3",
    "audioExample": "files/02_0625_example.mp3",
    "textMeaning": "<i>Eager</i> shows excitement about something.",
    "textExample": "The man was <b>eager</b> to talk about the good news.",
    "transcription": "[íːgər]",
    "textExampleTranslate": "Человек стремился говорить о хороших новостях",
    "textMeaningTranslate": "Стремление показывает волнение о чем-то",
    "wordTranslate": "нетерпеливый",
    "wordsPerExampleSentence": 10
    }
  ]

  const changeVocabularyType = (e) => {
    alert(e.target.value)  //This function will change vocabulary type in State
  }

  return (
    <div>
      <VocabularyView 
        words = { words } 
        selectorOptions = { selectorOptions }
        changeVocabularyType = { changeVocabularyType }
        selectedOption = { "removed" } //This value will come from State
      />
    </div>
  )
}


export default VocabularyPage;
