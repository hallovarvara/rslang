import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';

const InputView = ({
  placeholder = 'Type',
  className = '',
  onChange,
  type,
  error,
  required,
}) => (
  <Input
    error={error}
    required={required}
    className={className}
    classes={{ input: 'input' }}
    placeholder={placeholder}
    onChange={onChange}
    type={type}
  />

);

InputView.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
};

export default InputView;
