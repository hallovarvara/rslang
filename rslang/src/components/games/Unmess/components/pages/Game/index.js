import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import GamePageView from './GamePage.jsx';
import { localStorageItems } from '../../../helpers/contants';

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

  dragStart = (event, wordObj) => {
    const { target } = event;
    this.currentDraggedWord = { ...wordObj };
    target.style.opacity = 0.5;
    document.querySelectorAll('.definitions-container__definition').forEach((el) => {
      el.classList.add('dash-border-animated');
    });
  }

  touchStart = (event, wordObj) => {
    let currentDragoveredElement = null;
    let isPageScrollingUp = false;
    let isPageScrollingDown = false;
    let scrollUpInterval;
    let scrollDownInterval;
    const currentCursorPosition = {
      pageX: event.targetTouches[0].pageX,
      pageY: event.targetTouches[0].pageY,
      clientX: event.targetTouches[0].clientX,
      clientY: event.targetTouches[0].clientY,
    };

    this.currentDraggedWord = { ...wordObj };
    const { currentTarget } = event;
    const cloneNode = currentTarget.cloneNode(true);

    function moveAt() {
      if ((currentCursorPosition.pageX + cloneNode.offsetWidth / 2 <= window.innerWidth)
      && (currentCursorPosition.pageX - cloneNode.offsetWidth / 2 >= 0)) {
        cloneNode.style.left = `${currentCursorPosition.pageX - cloneNode.offsetWidth / 2}px`;
      }
      cloneNode.style.top = `${currentCursorPosition.pageY - cloneNode.offsetHeight / 2}px`;
    }

    function setCurrentDragoveredElement() {
      document.querySelectorAll('.definitions-container__definition').forEach((el) => {
        el.classList.remove('dragover');
      });
      const currentDisplay = cloneNode.style.display;
      cloneNode.style.display = 'none';
      currentDragoveredElement = document.elementFromPoint(
        currentCursorPosition.clientX,
        currentCursorPosition.clientY,
      );
      cloneNode.style.display = currentDisplay;
      if (currentDragoveredElement
        && currentDragoveredElement.closest
        && currentDragoveredElement.closest('.definitions-container__definition')) {
        currentDragoveredElement.classList.add('dragover');
      }
    }

    function onTouchMove(touchEvent) {
      currentCursorPosition.pageX = touchEvent.targetTouches[0].pageX;
      currentCursorPosition.pageY = touchEvent.targetTouches[0].pageY;
      currentCursorPosition.clientX = touchEvent.targetTouches[0].clientX;
      currentCursorPosition.clientY = touchEvent.targetTouches[0].clientY;
      if (touchEvent.cancelable) {
        touchEvent.preventDefault();
      }

      setCurrentDragoveredElement();

      if (Math.round(
        100 * (touchEvent.targetTouches[0].clientY / (window.innerHeight - 110)),
      ) < 40) {
        if (!isPageScrollingUp) {
          isPageScrollingUp = true;
          scrollUpInterval = setInterval(
            () => {
              if (window.scrollY - 1 >= 0) {
                window.scroll(0, window.scrollY - 1);
                currentCursorPosition.pageY -= 1;
              } else {
                window.scroll(0, 0);
              }
              moveAt();
              setCurrentDragoveredElement();
            },
            10,
          );
        }
      } else if (Math.round(
        100 * (touchEvent.targetTouches[0].clientY / (window.innerHeight)),
      ) > 80) {
        if (!isPageScrollingDown) {
          isPageScrollingDown = true;
          scrollDownInterval = setInterval(
            () => {
              const maxScrollDown = document.body.offsetHeight - window.innerHeight;
              if (window.scrollY + 1 <= maxScrollDown) {
                window.scroll(0, window.scrollY + 1);
                currentCursorPosition.pageY += 1;
              } else {
                window.scroll(0, maxScrollDown);
              }
              moveAt();
              setCurrentDragoveredElement();
            },
            10,
          );
        }
      } else {
        clearInterval(scrollUpInterval);
        clearInterval(scrollDownInterval);
        isPageScrollingUp = false;
        isPageScrollingDown = false;
      }

      moveAt();
    }

    const copiedStyles = Object.entries(window.getComputedStyle(currentTarget))
      .reduce((acc, currentValue) => {
        const [key, value] = currentValue;
        if (!/\d/.test(key)) {
          return `${acc}
            ${key}: ${value};
          `;
        }
        return acc;
      }, '');
    cloneNode.style.cssText = copiedStyles;
    currentTarget.style.opacity = '0.5';
    cloneNode.style.position = 'absolute';
    cloneNode.style.zIndex = '1000';
    document.body.appendChild(cloneNode);

    document.querySelectorAll('.definitions-container__definition').forEach((el) => {
      el.classList.add('dash-border-animated');
    });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    currentTarget.ontouchend = () => {
      clearInterval(scrollUpInterval);
      clearInterval(scrollDownInterval);
      isPageScrollingUp = false;
      isPageScrollingDown = false;

      if (currentDragoveredElement
        && currentDragoveredElement.closest
        && currentDragoveredElement.closest('.definitions-container__definition')) {
        this.drop(
          { currentTarget: currentDragoveredElement },
          this.props.shuffledCurrentWords.find((word) => (
            word.id === currentDragoveredElement.dataset.id
          )),
        );
      } else {
        this.dragEnd({ target: currentTarget });
      }
      cloneNode.parentNode.removeChild(cloneNode);
      document.removeEventListener('touchmove', onTouchMove);
      currentTarget.ontouchend = null;
    };
  }

  dragEnd = (event) => {
    const { target } = event;
    target.style.opacity = '';
    document.querySelectorAll('.definitions-container__definition').forEach((el) => {
      el.classList.remove('dash-border-animated');
    });
  }

  dragEnter = (event) => {
    const { currentTarget } = event;
    currentTarget.classList.add('dragover');
  }

  dragLeave = (event) => {
    const { currentTarget } = event;
    currentTarget.classList.remove('dragover');
  }

  drop = (event, wordObj) => {
    const { currentTarget } = event;
    currentTarget.classList.remove('dragover');
    this.props.wordDropped(this.currentDraggedWord, wordObj);
    document.querySelectorAll('.definitions-container__definition').forEach((el) => {
      el.classList.remove('dash-border-animated');
    });
  }

  render() {
    const {
      currentWords,
      shuffledCurrentWords,
    } = this.props;

    const untouchedWords = [];
    const untouchedDefinitions = [];
    const guessedWords = [];
    const wrongWords = [];

    if (currentWords === null) {
      return <Redirect to="/unmess/home" />;
    }

    currentWords.forEach((wordObj) => {
      if (wordObj.attempt === null) {
        untouchedWords.push({ ...wordObj });
      } else if (wordObj.attempt === true) {
        guessedWords.push({ ...wordObj });
      } else if (wordObj.attempt === false) {
        wrongWords.push({ ...wordObj });
      }
    });

    if (untouchedWords.length === 0) {
      const currentLatestResults = JSON.parse(
        localStorage.getItem(localStorageItems.latestResults),
      );
      currentLatestResults.unshift({
        results: currentWords,
        date: (new Date()).toLocaleString('ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      });
      localStorage.setItem(
        localStorageItems.latestResults,
        JSON.stringify(currentLatestResults.slice(0, 10)),
      );

      setTimeout(() => {
        this.props.history.push('/unmess/results');
      }, 1500);
    }

    shuffledCurrentWords.forEach((wordObj) => {
      if (wordObj.hideDefinition === true) {
        untouchedDefinitions.push({ ...wordObj });
      }
    });

    return <GamePageView
      {...this.props}
      untouchedWords={untouchedWords}
      dragStart={this.dragStart}
      touchStart={this.touchStart}
      dragEnd={this.dragEnd}
      dragEnter={this.dragEnter}
      dragLeave={this.dragLeave}
      drop={this.drop}
      untouchedDefinitions={untouchedDefinitions}
      guessedWords={guessedWords}
      wrongWords={wrongWords} />;
  }
}

GamePage.propTypes = {
  wordDropped: PropTypes.func,
  shuffledCurrentWords: PropTypes.arrayOf(PropTypes.object),
  currentWords: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
};

export default GamePage;
