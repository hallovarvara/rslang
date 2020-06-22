import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '../MainPage';
import SettingsPage from '../SettingPage';
import StatisticPage from '../StatisticPage';
import TeamPage from '../TeamPage';
import VocabularyPage from '../VocabularyPage';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/settings' component={SettingsPage} />
      <Route path='/statistic' component={StatisticPage} />
      <Route path='/team' component={TeamPage} />
      <Route path='/vocabulary' component={VocabularyPage} />
    </Switch>
  </main>
);

export default Main;
