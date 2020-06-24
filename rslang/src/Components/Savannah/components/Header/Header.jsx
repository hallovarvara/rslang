import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import CloseIcon from '@material-ui/icons/Close';

import classes from './Header.module.scss';

const Header = ({
  volume, heartCount, handleVolume, mistakeTotal, handleClose,
}) => {
  const arrComplete = Array(heartCount).fill(<FavoriteIcon />);
  const arrMistake = Array(mistakeTotal).fill(<FavoriteBorderIcon />);
  return (
    <div className={classes.Header}>
      <IconButton onClick={handleVolume}>
        {volume
          ? <VolumeUpIcon className={classes.Icon} />
          : <VolumeOffIcon className={classes.Icon} />}
      </IconButton>
      <div>
        {arrMistake.map((value) => value)}
        {arrComplete.map((value) => value)}
        <IconButton
          onClick={handleClose}
          className={classes.CloseButton}>
          <CloseIcon className={classes.Icon} />
        </IconButton>
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
