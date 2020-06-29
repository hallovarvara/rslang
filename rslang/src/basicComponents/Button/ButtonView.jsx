import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const ButtonView = ({ value = 'Button' }) => {
  return <Button
    classes={{ root: 'btn-primary' }}
    variant="contained"
    size="large">{value}</Button>;
};

ButtonView.propTypes = {
  value: PropTypes.string,
};

export default ButtonView;
