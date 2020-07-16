import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Switcher from '../UI/switch';
import StartGameForm from '../UI/StartGameForm';
import Stepper from '../../../../basicComponents/Stepper';
import { text, count } from '../../../../helpers/constants';
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
    <div className={'sprint-start__container'}>
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
  handleChangeUserWords, handleCurrentGroup, onSubmitForm, token, currentGroup,
}) => {
  console.log(currentGroup)
  return (
    <div className={'sprint-start__container'}>

      <div className={'sprint-start__form-container'}>
        {token
          ? (<React.Fragment>
            <span className={'sprint-start__explanation'}>
              {text.ru.notEnoughWords}
            </span>
            <Switcher
              handleChangeUserWords={handleChangeUserWords}
            />
          </React.Fragment>)
          : null
        }
        <Stepper
          defaultValue={currentGroup + 1}
          onChangeCommitted={(event, value, ...args) => handleCurrentGroup(value - 1, ...args)}
          step={null}
          max={count.groups}
          marks={generateStepperMarks(groups)}
          className="sprint-levels-stepper"
          label="Выберите уровень:"
          arrayOfColorsForTrack={['#7CCBB3', '#90BE6D', '#F9C74F', '#F8961E', '#F3722C', '#F94144']}
          stickyLabel={false}
        />
      </div>

      <StartGameForm
        classNameForm={'sprint-start__form'}
        handleCurrentGroup={handleCurrentGroup}
        onSubmitForm={onSubmitForm}
      />


    </div >
  )
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
