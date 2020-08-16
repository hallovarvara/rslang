import React from 'react';
import './App.scss';
import { connect } from 'react-redux';

import Header from './components/Header';
import Main from './components/Main';
import UserService from './helpers/userService';
import { localStorageItems } from './helpers/constants';
import { overwriteSettings } from './redux/actions';
import { localThings } from './helpers/wordsService/storageModel';

const userService = new UserService();

class App extends React.Component {
  componentDidMount() {
    userService.firstEnterOfUser();

    if (localStorage.getItem(localThings.WORDS) === null) {
      localStorage.setItem(localThings.WORDS, JSON.stringify([]));
    }

    userService.getUserSettings(localStorage.getItem(localStorageItems.userId))
      .then((result) => {
        this.props.overwriteSettings({
          wordsPerDay: result.wordsPerDay,
          previewSettings: result.optional.option,
        });
      })
      .catch(() => {
        console.log('can\'t get settings');
      })
  }
  render() {
    return (
    <div className="App">
      <Header />
      <Main />
    </div>
  )
  }
}

const mapDispatchToProps = (dispatch) => ({
  overwriteSettings: (settings) => dispatch(overwriteSettings(settings)),
});

export default connect(null, mapDispatchToProps)(App);
