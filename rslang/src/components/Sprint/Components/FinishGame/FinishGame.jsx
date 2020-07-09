import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
// eslint-disable-next-line import/no-unresolved
import CustomizedTables from '../../UI/Table.jsx';

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FinishGame({
  isFinished, complete, mistake, audioPlay, onReloadGame,
}) {
  return (
    <div>
      <Dialog
        maxWidth={false}
        open={isFinished}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description">
            <CustomizedTables
              complete={complete}
              mistake={mistake}
              audioPlay={audioPlay}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button
              color="primary"
              style={{ fontSize: '1.4rem' }}
            >
              ВЫХОД
          </Button>

          </Link>

          <Button style={{ fontSize: '1.4rem' }} onClick={() => onReloadGame()} color="primary">
            ЕЩЕ РАЗ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FinishGame.propTypes = {
  isFinished: PropTypes.bool,
  complete: PropTypes.object,
  mistake: PropTypes.object,
  audioPlay: PropTypes.func,
  onReloadGame: PropTypes.func,
};
