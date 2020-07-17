import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ResultList from './ResultList/ResultList.jsx';
import classes from './FinishPage.module.scss';

import { text } from '../../../../helpers/constants';

const FinishPage = ({
  complete, mistake, resultTitle, status, newStartGameHandle,
}) => (
    <div className={classes.FinishPage}>
      <div className='savannah__buttons'>
        <Button
          className="savannah__button"
          variant="contained"
          color="primary"
          onClick={newStartGameHandle}
          style={{
            background: 'rgba(130, 115, 228, 1)',
          }}
        >
          {text.ru.button.newGame}
        </Button>
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
