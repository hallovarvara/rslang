import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import TimerIcon from '@material-ui/icons/Timer';
import PetsIcon from '@material-ui/icons/Pets';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Button from '@material-ui/core/Button';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { text } from '../../../../helpers/constants';

import './PlayGame.scss';

class PlayGame extends Component {
  componentDidMount() {
    this.props.updateTimer();
    document.addEventListener('keyup', this.props.onCLick);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.props.onCLick);
  }

  arr = Array(3).fill(this.props.isAnswerQuiz)

  componentDidUpdate(prevProps) {
    if (prevProps.counterTotal !== this.props.counterTotal) {
      this.arr.unshift(this.props.isAnswerQuiz);
      this.arr.pop();
    }

    if (prevProps.timer !== this.props.timer) {
      this.props.updateTimer();
    }
  }

  render() {
    const {
      words, activeAnswer, onCLick,
      volume, handleVolume, score, timer,
    } = this.props;

    return (
      <div className={'sprint-play__container'}>
        <div className={'sprint-play__header'}>

          <div className={'sprint-play__timer-wrapper'}>
            <TimerIcon style={{ fontSize: '2.4rem' }} />
            <div className={'sprint-play__timer'}>{timer}</div>
          </div>

          <div className={'sprint-play__point-wrapper'}>
            <PetsIcon style={{ fontSize: '2.4rem' }} />
            <div className={'sprint-play__point-score'}>{score}</div>
          </div>

          <IconButton onClick={handleVolume}>
            {volume
              ? <VolumeUpIcon className={'sprint-play__volume'} style={{ fontSize: '2.4rem' }} />
              : <VolumeOffIcon className={'sprint-play__volume'} style={{ fontSize: '2.4rem' }} />}
          </IconButton>
        </div>
        <div className={'sprint-play__board'}>
          <div className={'sprint-play__rangs'}>
            {this.arr.map((value, key) => (
              <div className={`sprint-play__rang-item sprint-play__${value}`} key={key}>

                {value
                  ? <CheckCircleRoundedIcon style={{ fontSize: '36px' }} key={key} />
                  : <CancelRoundedIcon style={{ fontSize: '36px' }} key={key} />
                }
              </div>
            ))}
          </div>
          <div className={'sprint-play__word'}>{words[0]}</div>

          <div className={'sprint-play__translate'}>
            {`${text.ru.sprint.translatedAs} «${activeAnswer}»`}
          </div>

        </div>
        <div className={'sprint-play__control'}>
          <Button
            variant="contained"
            onClick={onCLick}
            value={0}
            className="sprint__button_wrong"
          >
            {text.ru.button.wrong}
      </Button>
          <Button
            variant="contained"
            onClick={onCLick}
            value={1}
            className="sprint__button_right"
          >
            {text.ru.button.right}
      </Button>

        </div>
      </div >

    );
  }
}

PlayGame.propTypes = {
  words: PropTypes.array,
  activeAnswer: PropTypes.string,
  volume: PropTypes.bool,
  handleClose: PropTypes.func,
  handleVolume: PropTypes.func,
  score: PropTypes.number,
  timer: PropTypes.number,
  onCLick: PropTypes.func,
  updateTimer: PropTypes.func,
  counterTotal: PropTypes.number,
  isAnswerQuiz: PropTypes.number,
};

export default PlayGame;
