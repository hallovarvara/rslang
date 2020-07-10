import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authSuccess } from '../../redux/actions/auth';
import HeaderView from './HeaderView.jsx';
import { pagesData, localStorageItems } from '../../helpers/constants';

class Header extends React.Component {
  componentDidMount() {
    this.props.authSuccess(
      localStorage.getItem(localStorageItems.nickname),
      localStorage.getItem(localStorageItems.userId),
      localStorage.getItem(localStorageItems.token),
    );
  }

  getPagesLinks = () => Object.values(pagesData).reduce((links, item) => {
    const role = this.props.token ? 'user' : 'guest';
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
        isUserLogged={(Boolean(this.props.token))} />
    );
  }
}

Header.propTypes = {
  authSuccess: PropTypes.func,
  token: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    authSuccess: (name, email, password) => dispatch(
      authSuccess(name, email, password),
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
