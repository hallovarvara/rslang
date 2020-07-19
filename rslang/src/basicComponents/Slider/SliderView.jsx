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

const SliderView = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(20);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
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
