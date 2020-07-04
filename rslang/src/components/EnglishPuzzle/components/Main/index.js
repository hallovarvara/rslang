import React from 'react';
import MainView from './MainView.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
    };
  }

  handleClickButtonStart = () => {
    this.setState({ isStart: true });
  }

  render() {
    const {
      isStart,
    } = this.state;
    return (
      <MainView
        isStart={isStart}
        handleClickButtonStart={this.handleClickButtonStart}
      />
    );
  }
}

export default Main;
