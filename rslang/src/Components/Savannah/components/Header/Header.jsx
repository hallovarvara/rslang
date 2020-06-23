import React from 'react';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import CloseIcon from '@material-ui/icons/Close';

import classes from './Header.module.scss';

const Header = ({
  // eslint-disable-next-line react/prop-types
  volume, heartCount, handleVolume, mistakeTotal, handleClose,
}) => {
  const arrComplete = Array(heartCount).fill(<FavoriteIcon />);
  const arrMistake = Array(mistakeTotal).fill(<FavoriteBorderIcon />);
  return (
    <div className={classes.Header}>

      {volume ? <VolumeUpIcon
        onClick={handleVolume}
      /> : <VolumeOffIcon
          onClick={handleVolume}
        />}
      <div>
        {arrMistake.map((value) => value)}
        {arrComplete.map((value) => value)}
        <CloseIcon
          onClick={handleClose}
        />
      </div>
    </div>

  );
};

Header.propTypes = {
  volume: PropTypes.bool,
  heartCount: PropTypes.number,
  handleVolume: PropTypes.func,
  mistakeTotal: PropTypes.number,
  handleClose: PropTypes.func,
};

Header.defaultProps = {
  volume: true,
  heartCount: 5,
  handleVolume: () => { },
  mistakeTotal: 0,
  handleClose: () => { },
};

export default Header;
