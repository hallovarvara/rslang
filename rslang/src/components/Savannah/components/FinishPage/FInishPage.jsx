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
      <div className={classes.finishWrapper}>
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
        variant="contained"
        color="primary"
        size="large"
        onClick={newStartGameHandle}
        style={{
          background: 'rgba(130, 115, 228, 1)',
          position: 'absolute',
          bottom: 50,
        }}
      >
        {text.ru.button.newGame}
      </Button>
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
