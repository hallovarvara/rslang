import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';

const InputView = ({ placeholder = 'Type', className = '' }) => (
  <Input
    className={className}
    classes={{ input: 'input' }}
    placeholder={placeholder}></Input>
);

InputView.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputView;
