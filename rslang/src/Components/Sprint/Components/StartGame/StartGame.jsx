import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Switcher from '../UI/switch';
import StartGameForm from '../UI/StartGameForm';

import './StartGame.scss';

const StartGame = ({
  handleChangeUserWords, handleCurrentGroup, startGame, updateState, token,
}) => {
  const [isTimer, setIsTimer] = React.useState(false);

  const onSubmitForm = (event) => {
    event.preventDefault();
    setIsTimer(true);
    updateState();
  };

  return (
    <div className={'sprint-start__container'}>
      {!isTimer
        ? <StartGameUserForm
          handleChangeUserWords={handleChangeUserWords}
          handleCurrentGroup={handleCurrentGroup}
          onSubmitForm={onSubmitForm}
          token={token}
        />
        : <StartTimer startGame={startGame} />
      }

    </div>

  );
};

const StartGameUserForm = ({
  handleChangeUserWords, handleCurrentGroup, onSubmitForm, token,
}) => (
    <div className={'sprint-start__container'}>
      <span className={'sprint-start__explanation'}>
        *если в словаре слов не достаточно для игры,
        то слова будут появляться из выбранного уровня
    </span>
      <div className={'sprint-start__form-container'}>
        {token || localStorage.getItem('rslangToken')
          ? (<Switcher
            handleChangeUserWords={handleChangeUserWords}
          />)
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

const StartTimer = ({ startGame }) => {
  const [timer, setTimer] = React.useState(3);

  React.useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setTimer((time) => time - 1);
      }, 1000);
    }
  }, [timer]);

  React.useEffect(() => {
    setTimeout(() => {
      startGame();
    }, 3000);
  }, []);

  return (

    <div className={'sprint-start__timer'}>{timer}</div>

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
};

StartGameUserForm.propTypes = {
  startGame: PropTypes.func,
  handleChangeUserWords: PropTypes.func,
  checkedUserWords: PropTypes.func,
  handleCurrentGroup: PropTypes.func,
  onSubmitForm: PropTypes.func,
  token: PropTypes.string,
};

StartTimer.propTypes = {
  startGame: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}
export default connect(mapStateToProps)(StartGame);
