import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import TimerIcon from '@material-ui/icons/Timer';
import PetsIcon from '@material-ui/icons/Pets';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Button from '@material-ui/core/Button';

import SimpleCard from '../UI/SimpleCard/SimpleCard.jsx';

import './PlayGame.scss';

class PlayGame extends Component {

  componentDidMount() {
    this.props.updateTimer();
  }

  arr = Array(3).fill(this.props.isAnswerQuiz)

  componentDidUpdate(prevProps) {
    if (prevProps.counterTotal !== this.props.counterTotal) {
      this.arr.unshift(this.props.isAnswerQuiz);
      this.arr.pop();
    }

    if (prevProps.timer !== this.props.timer) {
      this.props.updateTimer()
    }
    /*     if (this.props.isAnswerQuiz === 'error') {
          this.arr = ['default', 'default', 'default']
        } */
  }

  render() {
    const {
      words, activeAnswer, translateWords, onCLick, isAnswerQuiz, counterRang, volume, handleVolume,
      score, timer
    } = this.props;

    const rangs = `sprint-play__${isAnswerQuiz}`;

    const rangClass = classNames(
      'sprint-play__rang-item',
      rangs,
    );

    // arr.unshift(isAnswerQuiz);

    return (
      <div className={'sprint-play__container'}>
        <div className={'sprint-play__header'}>

          <div className={'sprint-play__timer-wrapper'}>
            <TimerIcon />
            <div className={'sprint-play__timer'}>{timer}</div>
          </div>

          <div className={'sprint-play__point-wrapper'}>
            <PetsIcon />
            <div className={'sprint-play__point-score'}>{score}</div>
          </div>

          <IconButton onClick={handleVolume}>
            {volume
              ? <VolumeUpIcon className={'sprint-play__volume'} />
              : <VolumeOffIcon className={'sprint-play__volume'} />}
          </IconButton>
        </div>
        <div className={'sprint-play__board'}>
          <div className={'sprint-play__rangs'}>
            {this.arr.map((value, key) => (
              <div className={`sprint-play__rang-item sprint-play__${value}`} key={key}>
                <i className={`fa fa-${value}`} key={key}></i>
              </div>
            ))}

            {/*           <div className={rangClass}><i className={'fa fa-times'}></i></div>
          <div className={rangClass}><i className={'fa fa-check'}></i></div> */}
          </div>
          <div className={'sprint-play__word'}>{words[0]}</div>

          <div className={'sprint-play__translate'}>{activeAnswer}</div>

        </div>
        <div className={'sprint-play__control'}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={onCLick}
            value={0}
            style={{ width: 120 }}
          >
            НЕВЕРНО
      </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onCLick}
            value={1}
            style={{ width: 120 }}
          >
            ВЕРНО
      </Button>

        </div>
      </div >

    );
  }
}

export default PlayGame;
