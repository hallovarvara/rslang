import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';

const InputView = ({ placeholder = 'Type' }) => (
  <Input
    classes={{ input: 'input' }}
    placeholder={placeholder}></Input>
);

InputView.propTypes = {
  placeholder: PropTypes.string,
};

export default InputView;
