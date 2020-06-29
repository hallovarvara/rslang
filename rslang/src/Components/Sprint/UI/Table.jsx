import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import IconButton from '@material-ui/core/IconButton';

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '4px 4px 4px 10px',
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({ complete, mistake, audioPlay }) {
  function createData(name, calories, fat, carbs, protein) {
    return {
      name, calories, fat, carbs, protein,
    };
  }

  const words = complete.words.concat(mistake.words);
  const translate = complete.translate.concat(mistake.translate);
  const audio = complete.audio.concat(mistake.audio);
  const arr = [];
  words.forEach((value, key) => {
    arr.push({
      word: value,
      translate: translate[key],
      audio: <IconButton onClick={() => audioPlay(audio[key])}><PlayCircleFilledIcon /></IconButton>
      ,
    });
  });

  const rows = arr.map((value, key) => createData(value.word, value.translate, value.audio, complete.total > key ? 'угадал' : 'не угадал'));

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Слово</StyledTableCell>
            <StyledTableCell align="right">Перевод</StyledTableCell>
            <StyledTableCell align="right">Аудио</StyledTableCell>
            <StyledTableCell align="right">Статус</StyledTableCell>
            <StyledTableCell align="right">Статистика</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CustomizedTables.propTypes = {
  complete: PropTypes.object,
  mistake: PropTypes.object,
  audioPlay: PropTypes.func,
};
