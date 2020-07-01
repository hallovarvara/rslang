import React from 'react';
import PropTypes, { number } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

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

class DiscreteSlider extends React.Component {
  constructor(props) {
    super(props);
    const { marks = standartMarks } = props;
    const { defaultValue = marks[0].value } = props;
    this.arrayOfColorsForTrack = props.arrayOfColorsForTrack || (new Array(marks.length)).fill('#000');
    const indexOfDefaultValue = marks.findIndex((mark) => defaultValue === mark.value);
    this.defaultColor = this.arrayOfColorsForTrack[indexOfDefaultValue];
  }

  render() {
    const {
      marks = standartMarks,
      label = 'Какой-то label',
      className = '',
      max = 100,
      min = 0,
    } = this.props;
    const {
      defaultValue = marks[0].value,
      step = max / marks.length,
    } = this.props;

    const StyledSlider = withStyles({
      root: {
        width: 300,
      },
      track: {
        backgroundColor: this.defaultColor,
      },
      thumb: {
        backgroundColor: this.defaultColor,
      },
    })(Slider);

    return (
      <div className={className}>
        <Typography id="discrete-slider-custom" gutterBottom>
          {label}
        </Typography>
        <StyledSlider
          defaultValue={defaultValue}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={step}
          valueLabelDisplay="off"
          marks={marks}
          max={max}
          min={min}
          onChange={(event, value) => {
            const indexOfNewValue = marks.findIndex((mark) => value === mark.value);
            document.querySelector('.unmess-game-container .MuiSlider-track')
              .style.backgroundColor = this.arrayOfColorsForTrack[indexOfNewValue];
            document.querySelector('.unmess-game-container .MuiSlider-thumb')
              .style.backgroundColor = this.arrayOfColorsForTrack[indexOfNewValue];
          }}
          onChangeCommitted={(event, value) => console.log(value)}
        />
      </div>
    );
  }
}

DiscreteSlider.propTypes = {
  marks: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  defaultValue: number,
  step: PropTypes.number,
  className: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  arrayOfColorsForTrack: PropTypes.arrayOf(PropTypes.string),
};

export default DiscreteSlider;
