import React from 'react';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';

import classes from './ResultItem.module.scss';

const ResultItem = ({ word, key, translate }) => {

  return (
    <div className={classes.Item} key={key}>
      <VolumeDownIcon
        className={classes.VolumeDownIcon}
      />
      <span className={classes.Word}>{word}</span>
      <span className={classes.Translate}>{`-${translate}`}</span>
    </div>
  )
}

export default ResultItem