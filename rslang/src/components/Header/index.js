import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authSuccess } from '../../redux/actions/auth';
import HeaderView from './HeaderView.jsx';
import { pagesData } from '../../helpers/constants';

class Header extends React.Component {
  componentDidMount() {
    this.props.authSuccess(
      localStorage.getItem('rslangName'),
      localStorage.getItem('rslangUserId'),
      localStorage.getItem('rslangToken'),
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
function mapStateToProps(state) {
  return {
    token: state.auth.token,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    authSuccess: (name, email, password) => dispatch(authSuccess(name, email, password)),
  };
}
Header.propTypes = {
  token: PropTypes.string,
  authSuccess: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
