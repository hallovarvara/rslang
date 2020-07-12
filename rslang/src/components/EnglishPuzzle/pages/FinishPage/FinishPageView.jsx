import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { text } from '../../../../helpers/constants';
import style from './FinishPageView.module.scss';

const FinishPageView = ({
  handleClickNewGame,
  errorCount,
  paintingInfo,
  isBackground,
  backgroundUrl,
}) => {
  const { ru: { button: { newGame }, answersMistaken } } = text;
  return (
    <div className={style.container}>
      {isBackground
        ? (<>
            <p className={style.text}>
              <span>{paintingInfo.name}</span>,
               {paintingInfo.author}, {paintingInfo.year}
            </p>
            <img src={backgroundUrl} alt="" className={style.picture}/>
          </>)
        : ''
      }
      <div className={style.title}>{answersMistaken}:
        <span className={style.wrong}>{errorCount }</span>
      фраз</div>
      <Button
        className={style.button}
        variant="contained"
        size="large"
        onClick={() => handleClickNewGame()}
      >
        {newGame}
      </Button>
    </div>
  );
};

FinishPageView.propTypes = {
  handleClickNewGame: PropTypes.func,
  errorCount: PropTypes.number,
  paintingInfo: PropTypes.object,
  isBackground: PropTypes.bool,
  backgroundUrl: PropTypes.string,
};

export default FinishPageView;
