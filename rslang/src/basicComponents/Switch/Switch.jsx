import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Switch = ({
  className = '',
  onChange = () => {},
  defaultChecked = false,
}) => {
  const switchContainerClasses = classNames({
    'switch-container': true,
    [`switch-container_${className}`]: Boolean(className),
  });
  const inputClasses = classNames({
    'switch-container__input': true,
    [`switch-container__input_${className}`]: Boolean(className),
  });
  const sliderClasses = classNames({
    'switch-container__slider': true,
    [`switch-container__slider_${className}`]: Boolean(className),
  });
  return (
    <label className={switchContainerClasses}>
      <input defaultChecked={defaultChecked} onChange={onChange} type="checkbox" className={inputClasses}></input>
      <div className={sliderClasses}></div>
    </label>
  );
};

Switch.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
};

export default Switch;
