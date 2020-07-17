import React from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem/ResultItem.jsx';

import classes from './ResultList.module.scss';

const ResultList = ({
  result, resultTitle,
  status, className,
}) => {
  const {
    words, translate, total, audio,
  } = result;
  const cls = [classes.Total];
  cls.push(classes[status]);
  return (
    <div className={`${classes.Wrapper} ${className}`}>
      <div className={classes.Title}>
        {resultTitle}
        <span className={cls.join(' ')}>{total}</span>
      </div>
      <div className={classes.Content}>
        {words.map((word, key) => (
          <ResultItem
            key={key}
            keyItem={key}
            word={word}
            translate={translate[key]}
            result={result}
            audio={audio[key]}
          />
        ))}
      </div>
    </div>
  );
};

ResultList.propTypes = {
  result: PropTypes.object,
  resultTitle: PropTypes.string,
  status: PropTypes.string,
  className: PropTypes.string,
};

ResultList.defaultProps = {
  result: {
    total: 0,
    words: [],
    translate: [],
    audio: [],
  },
  resultTitle: '',
  status: '',
};

export default ResultList;
