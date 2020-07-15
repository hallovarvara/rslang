import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replaseUrlBackground, paintingObj } from './helpers';
import EnglishPuzzleView from './EnglishPuzzleView.jsx';
import { getWords } from '../../helpers/wordsService/wordsApi';
import UserService from '../../helpers/userService';

const userService = new UserService();

const { getUserWordsNoRemoved } = userService;

class EnglishPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUserWords: false,
      numberLevel: 0,
      numberPage: 0,
      paintingInfo: paintingObj(),
      isStart: false,
      backgroundUrl: '',
      isBackground: true,
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

  handleClickButtonBackground = () => {
    const { isBackground } = this.state;
    this.setState({ isBackground: !isBackground });
  }

  handleClickButtonStart = async () => {
    const {
      isBackground,
      paintingInfo,
      numberLevel,
      numberPage,
    } = this.state;
    const { userId, token } = this.props;
    let data = [];
    if (token) {
      data = await getUserWordsNoRemoved(userId);
    }
    if (data.length < 10) {
      const addWords = await getWords(numberPage, numberLevel);
      data = data.concat(addWords).slice(0, 10);
    }
    this.setState({
      data,
      isStart: true,
      paintingInfo: paintingObj(numberLevel),
      backgroundUrl: replaseUrlBackground(paintingInfo, isBackground),
    });
  }

  handleClickNewGame = () => {
    this.setState({ isStart: false });
  }

  render() {
    const {
      data,
      isStart,
      backgroundUrl,
      isBackground,
      paintingInfo,
      numberLevel,
      numberPage,
    } = this.state;
    return (
      <EnglishPuzzleView
        data={data}
        paintingInfo={paintingInfo}
        backgroundUrl={backgroundUrl}
        isStart={isStart}
        isBackground={isBackground}
        handleClickButtonStart={this.handleClickButtonStart}
        handleClickButtonBackground={this.handleClickButtonBackground}
        handleClickNewGame={this.handleClickNewGame}
        getLevel={this.getLevel}
        numberLevel={numberLevel}
        getPage={this.getPage}
        numberPage={numberPage}
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

EnglishPuzzle.propTypes = {
  token: PropTypes.string,
  userId: PropTypes.string,
};

export default connect(mapStateToProps)(EnglishPuzzle);
