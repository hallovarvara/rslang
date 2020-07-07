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

import { pagesData } from '../../helpers/constants';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path={`/` || pagesData.settings.path} component={LearnWords} />
      <Route path={`/${pagesData.settings.path}`} component={SettingsPage} />
      <Route path={`/${pagesData.statistics.path}`} component={StatisticPage} />
      <Route path={`/${pagesData.aboutUs.path}`} component={AboutUsPage} />
      <Route path={`/${pagesData.promo.path}`} component={PromoPage} />
      <Route path={`/${pagesData.play.path}`} component={PlayGamesPage} />
      <Route path={`/${pagesData.vocabulary.path}`} component={VocabularyPage} />
      <Route path={`/${pagesData.signIn.path}`} component={SignInPage} />
      <Route path={`/${pagesData.register.path}`} component={SignUpPage} />
    </Switch>
  </main>
);

export default Main;
