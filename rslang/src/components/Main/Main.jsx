import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '../pages/Main';
import SettingsPage from '../pages/Settings';
import StatisticPage from '../pages/Statistic';
import PromoPage from '../pages/Promo';
import TeamPage from '../pages/Team';
import VocabularyPage from '../pages/Vocabulary';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/statistic" component={StatisticPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/promo" component={PromoPage} />
      <Route path="/vocabulary" component={VocabularyPage} />
    </Switch>
  </main>
);

export default Main;
