import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
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
        <DialogTitle id="alert-dialog-slide-title">{'Статистика слов:'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <CustomizedTables
              complete={complete}
              mistake={mistake}
              audioPlay={audioPlay}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onReloadGame()} color="primary">
            ВЫХОД
          </Button>
          <Button onClick={() => onReloadGame()} color="primary">
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
