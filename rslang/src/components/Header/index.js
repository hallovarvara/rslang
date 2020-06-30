import React from 'react';

import HeaderView from './HeaderView.jsx';
import { loggedHeaderLinkTitles, unloggedHeaderLinkTitles } from '../../helpers/constants';

class Header extends React.Component {
  isUserLogged = false; // TODO: unmock isUserLogged

  render() {
    const linkTitles = this.isUserLogged ? loggedHeaderLinkTitles : unloggedHeaderLinkTitles;
    return (
      <HeaderView
        linkTitles={linkTitles}
        isUserLogged={this.isUserLogged} />
    );
  }
}

export default Header;
