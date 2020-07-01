import React from 'react';
import PropTypes, { number } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const standartMarks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

const DiscreteSlider = (props) => {
  const classes = {
    root: 'stepper-root',
  };

  const {
    marks = standartMarks,
    label = 'Какой-то label',
    step = 10,
    className = '',
  } = props;

  const {
    defaultValue = marks[0].value,
  } = props;

  return (
    <div className={className}>
      <Typography id="discrete-slider-custom" gutterBottom>
        {label}
      </Typography>
      <Slider classes={classes}
        defaultValue={defaultValue}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={step}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
};

DiscreteSlider.propTypes = {
  marks: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  defaultValue: number,
  step: PropTypes.number,
  className: PropTypes.string,
};

export default DiscreteSlider;
