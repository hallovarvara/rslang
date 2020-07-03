import React from 'react';
import PropTypes from 'prop-types';

import Popover from '../../../../../../basicComponents/Popover';

class GamePage extends React.Component {
  currentDraggedWord = null;

  preventDefaultFunc = (event) => {
    event.preventDefault();
  }

  componentDidMount() {
    document.addEventListener('dragover', this.preventDefaultFunc);
  }

  componentWillUnmount() {
    document.removeEventListener('dragover', this.preventDefaultFunc);
  }

  render() {
    const {
      currentWords,
      shuffledCurrentWords,
      wordDropped,
      showDefinition,
    } = this.props;

    const untouchedWords = [];
    const untouchedDefinitions = [];
    const guessedWords = [];
    const wrongWords = [];

    currentWords.forEach((wordObj) => {
      if (wordObj.attempt === null) {
        untouchedWords.push({ ...wordObj });
      } else if (wordObj.attempt === true) {
        guessedWords.push({ ...wordObj });
      } else if (wordObj.attempt === false) {
        wrongWords.push({ ...wordObj });
      }
    });

    shuffledCurrentWords.forEach((wordObj) => {
      if (wordObj.hideDefinition === true) {
        untouchedDefinitions.push({ ...wordObj });
      }
    });

    return (
      <div className="game-page">
        <div className="game-title-container">
          <h2 className="game-title-container__title game-title">Unmess</h2>
          <Popover
            className="game-title-container__question"
            descriptionClassName="game-title-container__description"
            title={<span className="question-icon"></span>}
            description={(
              <span>Схватите слово и отпустите над <br></br> его значением</span>
            )} />
        </div>
        <div className="game-container">
          <div className="words-container">
            {
              untouchedWords.map((wordObj) => (
                  <div
                    key={`${wordObj.id}-word`}
                    className="words-container__word flex-div-with-span"
                    draggable="true"
                    onDragStart={(event) => {
                      const { target } = event;
                      this.currentDraggedWord = { ...wordObj };
                      target.style.opacity = 0.5;
                      document.querySelectorAll('.definitions-container__definition').forEach((el) => {
                        el.classList.add('dash-border-animated');
                      });
                    }}
                    onDragEnd={(event) => {
                      const { target } = event;
                      target.style.opacity = '';
                      document.querySelectorAll('.definitions-container__definition').forEach((el) => {
                        el.classList.remove('dash-border-animated');
                      });
                    }}>
                    <span>{wordObj.word}</span>
                  </div>
              ))
            }
          </div>
          <div className="definitions-container">
            {
              untouchedDefinitions.map((wordObj) => (
                <div
                  key={`${wordObj.id}-definition`}
                  className="definitions-container__definition flex-div-with-span"
                  onDragEnter={(event) => {
                    const { currentTarget } = event;
                    currentTarget.classList.add('dragover');
                  }}
                  onDragLeave={(event) => {
                    const { currentTarget } = event;
                    currentTarget.classList.remove('dragover');
                  }}
                  onDrop={() => {
                    wordDropped(this.currentDraggedWord, wordObj);
                    document.querySelectorAll('.definitions-container__definition').forEach((el) => {
                      el.classList.remove('dash-border-animated');
                    });
                  }}
                  >
                  <span>{wordObj.textMeaning.replace(/<i>.*<\/i>/, '…')}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="attempts-container">
          <div className="right-attempts-container">
            {
              guessedWords.map((wordObj) => (
                <div key={wordObj.id} className="right-attempt">
                  <div className="right-attempt__word flex-div-with-span">
                    <span>{wordObj.word}</span>
                  </div>
                  <div className="right-attempt__definition flex-div-with-span">
                    <span>{wordObj.textMeaning}</span>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="wrong-attempts-container">
            {
              wrongWords.map((wordObj) => (
                <div key={wordObj.id} className="wrong-attempt">
                  <div className="wrong-attempt__word flex-div-with-span">
                    <span>{wordObj.word}</span>
                  </div>
                  {wordObj.hideDefinition === true
                    ? (
                      <div
                        className="wront-attempt__show-answer flex-div-with-span">
                        <span onClick={() => showDefinition(wordObj)}>Показать ответ</span>
                      </div>
                    )
                    : (
                      <div className="wrong-attempt__definition flex-div-with-span">
                        <span>{wordObj.textMeaning}</span>
                      </div>
                    )
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

GamePage.propTypes = {
  currentWords: PropTypes.arrayOf(PropTypes.object),
  shuffledCurrentWords: PropTypes.arrayOf(PropTypes.object),
  wordDropped: PropTypes.func,
  showDefinition: PropTypes.func,
};

export default GamePage;
