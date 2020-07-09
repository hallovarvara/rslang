import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';

const InputView = ({ placeholder = 'Type', className = '', type = 'text' }) => (
  <Input
    className={className}
    classes={{ input: 'input' }}
    placeholder={placeholder}
    type = {type}
  ></Input>
);

InputView.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default InputView;
