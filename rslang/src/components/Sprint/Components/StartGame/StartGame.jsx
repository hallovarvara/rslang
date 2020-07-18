import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';
import StartGameForm from '../UI/StartGameForm';
import Stepper from '../../../../basicComponents/Stepper';
import {count, gamesData} from '../../../../helpers/constants';
import { generateStepperMarks } from '../../../../helpers/functions';
import './StartGame.scss';

const { groups } = count;

const StartGame = ({
  handleChangeUserWords, handleCurrentGroup, startGame, updateState, token, currentGroup
}) => {
  const onSubmitForm = (event) => {
    event.preventDefault();
    updateState();
    startGame();
  };

  return (
    <div className="sprint-start__container">
      <StartGameUserForm
        handleChangeUserWords={handleChangeUserWords}
        handleCurrentGroup={handleCurrentGroup}
        onSubmitForm={onSubmitForm}
        token={token}
        startGame={startGame}
        currentGroup={currentGroup}
      />
    </div>

  );
};

const StartGameUserForm = ({
  handleCurrentGroup, onSubmitForm, token, currentGroup,
}) => {
  return (
    <div className={'sprint-start__container'}>

      <div className={'sprint-start__form-container'}>
        {token && (
          <>
            <p className="sprint-start__explanation">
              {Parser(gamesData.sprint.description)}
            </p>
          </>)
        }
        <Stepper
          defaultValue={currentGroup + 1}
          onChangeCommitted={(event, value, ...args) => handleCurrentGroup(value - 1, ...args)}
          step={null}
          max={count.groups}
          marks={generateStepperMarks(groups)}
          className="sprint-levels-stepper"
          label="Выберите уровень:"
          arrayOfColorsForTrack={['#65BC0D', '#98CE00', '#FFF73B', '#F8961E', '#F3722C', '#F94144']}
          stickyLabel={false}
        />
      </div>

      <StartGameForm
        handleCurrentGroup={handleCurrentGroup}
        onSubmitForm={onSubmitForm}
      />
    </div >
  );
};

StartGame.propTypes = {
  startGame: PropTypes.func,
  handleChangeUserWords: PropTypes.func,
  checkedUserWords: PropTypes.func,
  handleCurrentGroup: PropTypes.func,
  onSubmitForm: PropTypes.func,
  updateState: PropTypes.func,
  token: PropTypes.string,
  currentGroup: PropTypes.number,
};

StartGameUserForm.propTypes = {
  startGame: PropTypes.func,
  handleChangeUserWords: PropTypes.func,
  checkedUserWords: PropTypes.func,
  handleCurrentGroup: PropTypes.func,
  onSubmitForm: PropTypes.func,
  token: PropTypes.string,
  currentGroup: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}
export default connect(mapStateToProps)(StartGame);
