import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const ButtonView = ({ type = 'primary', value = 'Button', className = '' }) => {
  return <Button
    className={className}
    classes={{ root: `btn btn-${type}` }}
    variant="contained"
    size="large">{value}</Button>;
};

ButtonView.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
};

export default ButtonView;
