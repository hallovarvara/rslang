import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AboutUsPage from '../pages/AboutUs';
import LearnWords from '../pages/LearnWords';
import SettingsPage from '../pages/Settings';
import StatisticPage from '../pages/Statistics';
import PromoPage from '../pages/Promo';
import PlayGamesPage from '../pages/PlayGames';
import VocabularyPage from '../pages/Vocabulary';
import SignInPage from '../pages/SignIn';
import SignUpPage from '../pages/SignUp';
import AudioCallGame from '../AudioCallGame';
import SprintGame from '../Sprint';
import SavannahGame from '../Savannah';
import UnmessGame from '../games/Unmess';
import SpeakitGame from '../games/Speakit';

import Notification from '../../basicComponents/Notification';

import { text, gamesData, pagesData } from '../../helpers/constants';
import { getPath } from '../../helpers/functions';

const {
  learnWords, settings, statistics, vocabulary,
  aboutUs, promo, play, signIn, register,
} = pagesData;

const {
  audiocall, sprint, savannah,
  unmess, speakit, // englishPuzzle,
} = gamesData;

const Main = ({ username, authFailed }) => (
  <main className="main">
    <Switch>
      <Route path={getPath(learnWords.path)} component={LearnWords} />
      <Route path={getPath(settings.path)} component={SettingsPage} />
      <Route path={getPath(statistics.path)} component={StatisticPage} />
      <Route path={getPath(aboutUs.path)} component={AboutUsPage} />
      <Route exact path={getPath() || getPath(promo.path)} component={PromoPage} />
      <Route path={getPath(play.path)} component={PlayGamesPage} />
      <Route path={getPath(vocabulary.path)} component={VocabularyPage} />
      <Route path={getPath(signIn.path)} component={SignInPage} />
      <Route path={getPath(register.path)} component={SignUpPage} />
      <Route path={getPath(audiocall.path)} component={AudioCallGame} />
      <Route path={getPath(sprint.path)} component={SprintGame} />
      <Route path={getPath(savannah.path)} component={SavannahGame} />
      <Route path={getPath(unmess.path)} component={UnmessGame} />
      <Route path={getPath(speakit.path)} component={SpeakitGame} />
      {/*<Route path={getPath(englishPuzzle.path)} component={EnglishPuzzleGame} />*/}
    </Switch>
    {
      Boolean(username)
      && <Notification
        variant="success"
        message={`${text.ru.welcome.replace('{username}', username)}`}
        duration={5000}
        position={{ vertical: 'top', horizontal: 'center' }}/>
    }
    {
      authFailed
      && <Notification
        variant="error"
        message={`${text.ru.incorrectLoginData}`}
        duration={5000}
        position={{ vertical: 'top', horizontal: 'center' }}/>
    }
  </main>
);

Main.propTypes = {
  username: PropTypes.string,
  authFailed: PropTypes.bool,
};

const mapStateToProps = (store) => ({
  username: store.auth.name,
  authFailed: store.auth.failed,
});

export default connect(mapStateToProps)(Main);
