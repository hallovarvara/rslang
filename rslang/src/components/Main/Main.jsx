import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '../pages/Main';
import SettingsPage from '../pages/Settings';
import StatisticPage from '../pages/Statistic';
import AboutUsPage from '../pages/AboutUs';
import PromoPage from '../pages/Promo';
import PlayGamesPage from '../pages/PlayGames';
import SignInPage from '../pages/SignIn';
import SignUpPage from '../pages/SignUp';
import Unmess from '../games/Unmess';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/statistic" component={StatisticPage} />
      <Route path="/about-us" component={AboutUsPage} />
      <Route path="/promo" component={PromoPage} />
      <Route path="/play-games" component={PlayGamesPage} />
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/unmess" component={Unmess} />
    </Switch>
  </main>
);

export default Main;
