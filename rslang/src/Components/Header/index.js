import React from 'react';

import HeaderView from './HeaderView.jsx';

class Header extends React.Component {
  unloggedHeaderLinkTitles = ['About us', 'Learn words', 'Play games', 'Statistics', 'Vocabulary', 'Sign In'];

  loggedHeaderLinkTitles = ['Learn words', 'Play games', 'About us', 'Statistics', 'Vocabulary', 'Settings'];

  isUserLogged = true; // we will get it from state in the future

  render() {
    return (
      <HeaderView
        linkTitles={this.isUserLogged ? this.loggedHeaderLinkTitles : this.unloggedHeaderLinkTitles}
        isUserLogged={this.isUserLogged} />
    );
  }
}

export default Header;
