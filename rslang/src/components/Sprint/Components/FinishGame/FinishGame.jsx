import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ResultList from './ResultList/ResultList.jsx';
import { text } from '../../../../helpers/constants';

import './FinishGame.scss';

export default function FinishGame({
  complete, mistake, resultTitle, status, onReloadGame,
}) {
  return (
    <div className={'sprint__finish-wrapper'}>
      <div className={'sprint__finish-container'}>
        <ResultList
          result={mistake}
          resultTitle={resultTitle.error}
          status={status.error}
        />
        <ResultList
          result={complete}
          resultTitle={resultTitle.success}
          status={status.success}
        />
      </div>
      <Button
        className="sprint__finish-button"
        variant="contained"
        onClick={onReloadGame}
      >
        {text.ru.button.newGame}
      </Button>

    </div>
  );
}

FinishGame.propTypes = {
  isFinished: PropTypes.bool,
  complete: PropTypes.object,
  mistake: PropTypes.object,
  audioPlay: PropTypes.func,
  onReloadGame: PropTypes.func,
  resultTitle: PropTypes.object,
  status: PropTypes.object,
};
