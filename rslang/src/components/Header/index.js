import React from 'react';

import HeaderView from './HeaderView.jsx';
import { pagesData } from '../../helpers/constants';

class Header extends React.Component {

  isUserLogged = true;

  getPagesLinks = () => Object.values(pagesData).reduce((links, item) => {
    const role = this.isUserLogged ? 'user' : 'guest';
    const updatedLinks = links;

    if (item[role].isVisible) {
      updatedLinks[item[role].index] = item;
    }

    return updatedLinks;
  }, [])

  render() {
    return (
      <HeaderView
        links={this.getPagesLinks()}
        isUserLogged={this.isUserLogged} />
    );
  }
}

export default Header;
