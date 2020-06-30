import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CheckboxView = ({ checked = false, onChange, className = '' }) => {
  const classes = classNames({
    checkbox: true,
    [className]: true,
  });

  return (
    <input
      onChange={onChange}
      defaultChecked={checked}
      className={classes}
      type="checkbox"/>
  );
};

CheckboxView.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default CheckboxView;
