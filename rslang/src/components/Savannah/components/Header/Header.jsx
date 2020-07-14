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
  const arrComplete = Array(heartCount).fill('');
  const arrMistake = Array(mistakeTotal).fill('');
  return (
    <div className={classes.Header}>
      <IconButton onClick={handleVolume}>
        {volume
          ? <VolumeUpIcon className={classes.Icon} style={{ fontSize: 20 }} />
          : <VolumeOffIcon className={classes.Icon} style={{ fontSize: 20 }} />}
      </IconButton>
      <div>
        {arrMistake.map((value, key) => <FavoriteBorderIcon key={key} style={{ fontSize: 20 }} />)}
        {arrComplete.map((value, key) => <FavoriteIcon key={key} style={{ fontSize: 20 }} />)}
        <IconButton
          onClick={handleClose}
          className={classes.CloseButton}>
          <CloseIcon className={classes.Icon} style={{ fontSize: 20 }} />
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
