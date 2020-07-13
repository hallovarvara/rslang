import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ResultList from './ResultList/ResultList.jsx';
import { text } from '../../../../helpers/constants';

import './FinishGame.scss'

export default function FinishGame({ complete, mistake, resultTitle, status, onReloadGame,
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
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onReloadGame}
          style={{
            background: 'rgba(130, 115, 228, 1)',
            position: 'absolute',
            bottom: 50,
          }}
        >
          {text.ru.button.newGame}
        </Button>
      </div>

    </div>
  );
}

FinishGame.propTypes = {
  isFinished: PropTypes.bool,
  complete: PropTypes.object,
  mistake: PropTypes.object,
  audioPlay: PropTypes.func,
  onReloadGame: PropTypes.func,
  resultTitle: PropTypes.string,
  status: PropTypes.object,
};
