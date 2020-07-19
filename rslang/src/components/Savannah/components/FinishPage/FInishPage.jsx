import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ResultList from './ResultList/ResultList.jsx';
import classes from './FinishPage.module.scss';

import { text } from '../../../../helpers/constants';
import LiquidButton from '../../../../basicComponents/LiquidButton';

const FinishPage = ({
  complete, mistake, resultTitle, status, newStartGameHandle,
}) => (
    <div className={`savannah__finish-game ${classes.FinishPage}`}>
      <div className='savannah__buttons'>
        <LiquidButton
          className="savannah__button"
          onClick={newStartGameHandle}
          text={text.ru.button.newGame}
        />
      </div>
      <div className={classes.finishWrapper}>
        <ResultList
          result={mistake}
          resultTitle={resultTitle.error}
          status={status.error}
          className="savannah__results_unguessed"
        />
        <ResultList
          result={complete}
          resultTitle={resultTitle.success}
          status={status.success}
          className="savannah__results_guessed"
        />
      </div>
    </div>);

FinishPage.propTypes = {
  status: PropTypes.object,
  resultTitle: PropTypes.object,
  complete: PropTypes.object,
  mistake: PropTypes.object,
  newStartGameHandle: PropTypes.func,
};

FinishPage.defaultProps = {
  newStartGameHandle: () => { },
  status: {},
  resultTitle: {},
  complete: {
    total: 0,
    words: [],
    translate: [],
  },
  mistake: {
    total: 0,
    words: [],
    translate: [],
  },
};

export default FinishPage;
