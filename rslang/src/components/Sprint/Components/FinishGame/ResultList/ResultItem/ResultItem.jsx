import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';

import {
  playAudio,
  getFilePath,
} from '../../../../../../helpers/functions';

import classes from './ResultItem.module.scss';

const ResultItem = ({
  word, keyItem, translate, audio,
}) => (
    <div className={classes.Item} key={keyItem}>
      <IconButton onClick={() => playAudio(getFilePath(audio))}>
        <VolumeDownIcon className={classes.VolumeDownIcon} style={{ fontSize: 20 }} />
      </IconButton>
      <span className={classes.Word}>{word}</span>
      <span className={classes.Translate}>{`${translate}`}</span>
    </div>);

ResultItem.propTypes = {
  word: PropTypes.string,
  keyItem: PropTypes.number,
  translate: PropTypes.string,
  audio: PropTypes.string,
};

ResultItem.defaultProps = {
  word: '',
  keyItem: 0,
  translate: '',
  audio: '',
};

export default ResultItem;
