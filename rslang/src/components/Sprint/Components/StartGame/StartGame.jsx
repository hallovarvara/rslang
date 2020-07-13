import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Switcher from '../UI/switch';
import StartGameForm from '../UI/StartGameForm';

import { text } from '../../../../helpers/constants';

import './StartGame.scss';

const StartGame = ({
  handleChangeUserWords, handleCurrentGroup, startGame, updateState, token,
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
      />
    </div>

  );
};

const StartGameUserForm = ({
  handleChangeUserWords, handleCurrentGroup, onSubmitForm, token,
}) => (
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

        <StartGameForm
          classNameForm={'sprint-start__form'}
          handleCurrentGroup={handleCurrentGroup}
          onSubmitForm={onSubmitForm}
        />
      </div>

    </div>
  );

StartGame.propTypes = {
  startGame: PropTypes.func,
  handleChangeUserWords: PropTypes.func,
  checkedUserWords: PropTypes.func,
  handleCurrentGroup: PropTypes.func,
  onSubmitForm: PropTypes.func,
  updateState: PropTypes.func,
  token: PropTypes.string,
};

StartGameUserForm.propTypes = {
  startGame: PropTypes.func,
  handleChangeUserWords: PropTypes.func,
  checkedUserWords: PropTypes.func,
  handleCurrentGroup: PropTypes.func,
  onSubmitForm: PropTypes.func,
  token: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}
export default connect(mapStateToProps)(StartGame);
