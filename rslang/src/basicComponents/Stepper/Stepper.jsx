import React from 'react';
import PropTypes, { number } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

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

  componentDidMount() {
    if (this.props.stickyLabel) {
      document
        .querySelector(`.${this.props.className}`)
        .style.setProperty('--stickyLabelValue', `"${this.props.currentPage + 1}"`);
    }
  }

  render() {
    const {
      marks = standartMarks,
      label = 'Какой-то label',
      className = '',
      max = 100,
      min = 0,
      onChangeCommitted = null,
      stickyLabel,
    } = this.props;
    const {
      defaultValue = marks[0].value,
      step = max / marks.length,
    } = this.props;

    const indexOfDefaultValue = marks.findIndex((mark) => defaultValue === mark.value);
    this.defaultColor = this.arrayOfColorsForTrack[indexOfDefaultValue];

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
      markLabel: {
        display: stickyLabel ? 'none' : 'block',
      },
    })(Slider);

    const stepperContainerClasses = classNames({
      'stepper-container': true,
      [className]: true,
      'sticky-label': stickyLabel,
    });

    return (
      <div className={stepperContainerClasses}>
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
            document.querySelector(`.${className} .MuiSlider-track`)
              .style.backgroundColor = this.arrayOfColorsForTrack[indexOfNewValue];
            document.querySelector(`.${className} .MuiSlider-thumb`)
              .style.backgroundColor = this.arrayOfColorsForTrack[indexOfNewValue];
            if (stickyLabel) {
              document
                .querySelector(`.${this.props.className}`)
                .style.setProperty('--stickyLabelValue', `"${value}"`);
            }
          }}
          onChangeCommitted={onChangeCommitted}
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
  onChangeCommitted: PropTypes.func,
  stickyLabel: PropTypes.bool,
  currentPage: PropTypes.number,
};

export default DiscreteSlider;
