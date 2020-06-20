import React from 'react';
import PropTypes from 'prop-types';

const InputView = (props) => {
  const { placeholder = 'Standart placeholder' } = props;
  return <input className='input' placeholder={placeholder}></input>;
};

InputView.propTypes = {
  placeholder: PropTypes.string,
};

export default InputView;
