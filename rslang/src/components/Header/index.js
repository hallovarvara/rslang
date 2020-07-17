import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authSuccess } from '../../redux/actions/auth';
import HeaderView from './HeaderView.jsx';
import UserService from '../../helpers/userService'
import {
  pagesData,
  localStorageItems,
} from '../../helpers/constants';

const userService = new UserService();
const { createUserStatistics, getUserStatistics } = userService;
const option = {
  "learnedWords": 1,
  "optional": {
    "learnWords": { "": "" },
    "savannah": { "": "" },
    "sprint": { "": "" },
    "audiocall": { "": "" },
    "speakIt": { "": "" },
    "puzzle": { "": "" },
    "unmess": { "": "" },
  }
}

const option1 = {}
class Header extends React.Component {
  componentDidMount() {
    this.props.authSuccess(
      localStorage.getItem(localStorageItems.username),
      localStorage.getItem(localStorageItems.userId),
      localStorage.getItem(localStorageItems.token),
    );
    this.data = {
      userId: localStorage.getItem(localStorageItems.userId),
      option1,
    };
    /*   if (!getUserStatistics(localStorage.getItem(localStorageItems.userId))) {
        createUserStatistics(this.data);
      } */
    getUserStatistics(localStorage.getItem(localStorageItems.userId))

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
