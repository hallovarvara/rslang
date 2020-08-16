import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Slider, Input } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 410,
    padding: '0px',
  },
  colorSecondary: {
    color: '#000',
  },
  input: {
    width: 42,
    fontSize: '2rem',
  },
});

const SliderView = ({
  value = 20,
  onInputChange = () => {},
  onSliderChange = () => {},
}) => {
  const classes = useStyles();

  const handleInputChange = (event) => {
    onInputChange(Number(event.target.value));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            onChange = {(event, value) => onSliderChange(value)}
            value={typeof value === 'number' ? value : 0}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SliderView;
