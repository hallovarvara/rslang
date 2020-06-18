import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { createStore } from 'redux';

const reducer = (state = 0, action) => state;

const store = createStore(reducer);
console.log(store.getState());

const MainPage = () => (
  <h2 className="title">Main Page</h2>
);

const SettingsPage = () => (
  <h2 className="title">Settings</h2>
);

const StatisticPage = () => (
  <div>
    <h2 className="title">Statistic</h2>
    <ul>
      <li className="text">1</li>
      <li className="text">2</li>
      <li className="text">3</li>
    </ul>
  </div>
);

const TeamPage = () => (
  <div>
    <h2 className="title">Our Team</h2>
    <ul>
      <li className="text">Варя</li>
      <li className="text">Максим</li>
      <li className="text">Дима</li>
      <li className="text">Артем</li>
      <li className="text">Леша</li>
      <li className="text">Ксюша</li>
    </ul>
  </div>
);

const Header = () => (
  <header>
    <nav>
      <ul className='navigation'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/settings'>Settings</Link></li>
        <li><Link to='/statistic'>Statistic</Link></li>
        <li><Link to='/team'>Our Team</Link></li>
      </ul>
    </nav>
  </header>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/settings' component={SettingsPage} />
      <Route path='/statistic' component={StatisticPage} />
      <Route path='/team' component={TeamPage} />
    </Switch>
  </main>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Main />
      </div>
    </Router>
  );
}

export default App;
