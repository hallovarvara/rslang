import React from 'react';
import { Route, Switch } from 'react-router-dom';

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

import { gamesData, pagesData } from '../../helpers/constants';
import { getPath } from '../../helpers/functions';

const {
  learnWords, settings, statistics, vocabulary,
  aboutUs, promo, play, signIn, register,
} = pagesData;

const {
  audiocall, sprint, savannah,
  unmess, speakit, // englishPuzzle,
} = gamesData;

const Main = () => (
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
  </main>
);

export default Main;
