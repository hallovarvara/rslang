import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const ButtonView = ({ value = 'Button' }) => {
  const StyledButton = withStyles({
    root: {
      fontSize: '5rem',
      textTransform: 'none',
      backgroundColor: 'black',
      color: 'white',
      '&:hover': {
        backgroundColor: 'white',
        color: 'black',
      },
    },
  })(Button);

  return (
    <StyledButton variant="contained" size="large">{value}</StyledButton>
  );
};

ButtonView.propTypes = {
  value: PropTypes.string,
};

export default ButtonView;
