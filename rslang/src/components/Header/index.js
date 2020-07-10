import React from 'react';
import { connect } from 'react-redux';

import HeaderView from './HeaderView.jsx';
import {localStorageItems, pagesData} from '../../helpers/constants';

class Header extends React.Component {
  isToken = Boolean(localStorage.getItem(localStorageItems.token));

  getPagesLinks = () => Object.values(pagesData).reduce((links, item) => {
    const role = (Boolean(this.props.token) || this.isToken) ? 'user' : 'guest';
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
        isUserLogged={(Boolean(this.props.token) || this.isToken)} />
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,

  };
}

export default connect(mapStateToProps)(Header);
