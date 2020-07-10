import React from 'react';
import PropTypes from 'prop-types';
import ResultList from './ResultList/ResultList.jsx';
import classes from './FinishPage.module.scss';

const FinishPage = ({
  complete, mistake, resultTitle, status,
}) => (
    <div className={classes.FinishPage}>
      <div className={classes.finishWrapper}>
        <ResultList
          result={mistake}
          resultTitle={resultTitle.error}
          status={status.error}
        />
        <hr />
        <ResultList
          result={complete}
          resultTitle={resultTitle.error}
          status={status.success}
        />
        <div className={classes.completeWrapper}></div>
      </div>
    </div>);

FinishPage.propTypes = {
  status: PropTypes.array,
  resultTitle: PropTypes.array,
  complete: PropTypes.object,
  mistake: PropTypes.object,
};

FinishPage.defaultProps = {
  status: {},
  resultTitle: [],
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
