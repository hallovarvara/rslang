import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import StarsList from '../../StartsList';
import WordsList from '../../WordsList';
import WordAssociation from '../../WordAssociation';
import SpeakButton from '../../SpeakButton';
import NewGameIcon from '../../NewGameIcon';

import { text, gamesData } from '../../../../../../helpers/constants';
import { getPath } from '../../../../../../helpers/functions';
import PreloaderContainer from '../../PreloaderContainer';

class GamePage extends React.Component {
  componentDidMount() {
    if (this.props.isGameInProcess) {
      this.props.startRecognition();
    }
  }

  componentWillUnmount() {
    if (this.props.isGameInProcess) {
      this.props.abortRecognition();
    }
  }

  render() {
    const {
      loading,
      currentLevel,
      starsCount,
      recognitionResults,
      currentActiveWords,
      isGameInProcess,
      currentWords,
      levelChanged,
      currentActiveWordsChanged,
      abortGame,
      startGame,
      userHasWon,
      userRedirected,
      redirect,
    } = this.props;

    if (redirect) {
      userRedirected();
    }

    if (loading) {
      return <PreloaderContainer />;
    }

    if (!currentWords.length) {
      return <Redirect to={getPath(gamesData.speakit.startPath || gamesData.speakit.path)}/>;
    }

    return (
      <div className="container">
        <div className="navigation">
          <NewGameIcon
            abortGame={abortGame}
            levelChanged={levelChanged}
            currentLevel={currentLevel}/>
          <StarsList userHasWon={userHasWon} starsCount={starsCount} />
        </div>
        <WordAssociation
          recognitionResults={recognitionResults}
          currentActiveWords={currentActiveWords}/>
        <WordsList
          isGameInProcess={isGameInProcess}
          currentActiveWords={currentActiveWords}
          currentActiveWordsChanged={currentActiveWordsChanged}
          words={currentWords}/>
        <div className="buttons-container">
          <div
            onClick={abortGame}
            className="buttons-container__restart"><span>{text.ru.restart}</span></div>
          <SpeakButton onClick={startGame} isGameInProcess={isGameInProcess} />
          <div className="buttons-container__results">
            <Link to="/speakit/current-results" className="link-in-button">
              <span>{text.ru.results}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

GamePage.propTypes = {
  loading: PropTypes.bool,
  currentLevel: PropTypes.number,
  starsCount: PropTypes.number,
  recognitionResults: PropTypes.string,
  currentActiveWords: PropTypes.arrayOf(PropTypes.object),
  isGameInProcess: PropTypes.bool,
  currentWords: PropTypes.arrayOf(PropTypes.object),
  levelChanged: PropTypes.func,
  currentActiveWordsChanged: PropTypes.func,
  abortGame: PropTypes.func,
  startGame: PropTypes.func,
  userHasWon: PropTypes.func,
  userRedirected: PropTypes.func,
  redirect: PropTypes.bool,
  startRecognition: PropTypes.func,
  abortRecognition: PropTypes.func,
};

export default GamePage;
