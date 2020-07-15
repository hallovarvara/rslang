import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AudioCallView from './AudioCall.jsx';
import { getWords } from '../../helpers/wordsService/wordsApi';
import UserService from '../../helpers/userService';

const userService = new UserService();

const { getUserWordsNoRemoved } = userService;

class AudioCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberLevel: 0,
      numberPage: 0,
      levelAPI: 0,
      countQuestions: 5,
      countAnswers: 5,
      isStart: false,
    };
  }

  getLevel = (group) => {
    this.setState({
      numberLevel: group,
    });
  }

  getPage = (page) => {
    this.setState({
      numberPage: page,
    });
  }

  handleChooseLevel = (e) => {
    const levelAPI = e.target.value;
    this.setState({ levelAPI: +levelAPI });
  }

  setNumberLevel = (e) => {
    const amountQuestions = e.target.value || e.target.defaultValue;
    this.setState({ countQuestions: +amountQuestions });
  }

  setcountAnswers = (e) => {
    const countAnswers = e.target.value || e.target.defaultValue;
    this.setState({ countAnswers: +countAnswers });
  }

  handleSubmitForm = async (e) => {
    const { numberPage, numberLevel, countQuestions } = this.state;
    const { userId, token } = this.props;
    let data = [];
    if (token) {
      data = await getUserWordsNoRemoved(userId);
    }
    if (data.length < countQuestions) {
      const addWords = await getWords(numberPage, numberLevel);
      data = data.concat(addWords).slice(0, countQuestions);
    }
    this.setState({
      data,
      isStart: true
     });
  }

  handleClickNewGame = () => {
    this.setState({ isStart: false });
  }

  render() {
    const {
      countAnswers,
      isStart,
      countQuestions,
      numberLevel,
      numberPage,
      data,
    } = this.state;
    return (
      <AudioCallView
        data={data}
        getLevel={this.getLevel}
        getPage={this.getPage}
        numberPage={numberPage}
        numberLevel={numberLevel}
        handleChooseLevel={this.handleChooseLevel}
        handleClickNewGame={this.handleClickNewGame}
        setNumberLevel={this.setNumberLevel}
        setcountAnswers={this.setcountAnswers}
        handleSubmitForm={this.handleSubmitForm}
        countQuestions={countQuestions}
        countAnswers={countAnswers}
        isStart={isStart}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

AudioCall.propTypes = {
  token: PropTypes.string,
  userId: PropTypes.string,
};

export default connect(mapStateToProps)(AudioCall);

