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
        <ResultList
          result={complete}
          resultTitle={resultTitle.success}
          status={status.success}
        />
      </div>
    </div>);

FinishPage.propTypes = {
  status: PropTypes.object,
  resultTitle: PropTypes.object,
  complete: PropTypes.object,
  mistake: PropTypes.object,
};

FinishPage.defaultProps = {
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
