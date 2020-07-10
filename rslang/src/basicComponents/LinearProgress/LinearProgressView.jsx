import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LinearProgressView = ({ done = 25, all = 100, className = '' }) => {
  const filledWidth = Math.round((done / all) * 100);
  const classes = classNames({
    'linear-progress': true,
    [className]: true,
  });

  return (
    <div className={classes}>
      <div style={ { width: `${filledWidth}%` } } className="linear-progress__filled"></div>
    </div>
  );
};

LinearProgressView.propTypes = {
  done: PropTypes.number,
  all: PropTypes.number,
  className: PropTypes.string,
};

export default LinearProgressView;
