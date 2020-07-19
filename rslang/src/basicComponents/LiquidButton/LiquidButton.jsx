import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LiquidButton = ({
  text = 'Your text',
  onClick = () => {},
  className = '',
  calm = false,
}) => {
  const luqidContainerClasses = classNames({
    'liquid-button-container': true,
    [className]: true,
    'liquid-button-container_calm': calm,
  });
  const liquidClasses = classNames({
    liquid: true,
    liquid_calm: calm,
  });
  return (
    <button onClick={onClick} className={luqidContainerClasses}>
      <span className="liquid-button-container__text">{text}</span>
      <div className={liquidClasses}></div>
    </button>
  );
};

LiquidButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  calm: PropTypes.bool,
};

export default LiquidButton;
