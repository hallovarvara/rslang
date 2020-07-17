import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import { logout } from '../../redux/actions/auth';
import MenuList from '../../basicComponents/MenuList';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

import {
  gamesData,
  pagesData,
} from '../../helpers/constants';

import { getPath } from '../../helpers/functions';

const addLinksToHeader = (link, index) => {
  const { title, path } = link;
  return (
    <li key={index} className="navigation__item">
      {
        path === pagesData.play.path
          ? <MenuList
            menuTitle={<NavLink activeClassName="navigation__item_active" to={getPath(path)}>{title}</NavLink>}
            menuItems={Object.values(gamesData).map((gameObj, i) => (
              <NavLink
                replace
                className="menu-list-item__link"
                activeClassName="navigation__item_active"
                key={i}
                to={ getPath(gameObj.startPath ?? gameObj.path) }>
                { gameObj.title }
              </NavLink>
            ))}
          />
          : <NavLink
            activeClassName="navigation__item_active"
            exact to={getPath(path)}
          >
            {title}
          </NavLink>
      }
    </li>
  );
};

class HeaderView extends React.Component {
  state = {
    currentGame: null,
    menu: false,
  }

  componentDidMount() {
    this.updateLogoAccordingToCurrentGame();
    window.addEventListener('hashchange', this.updateLogoAccordingToCurrentGame);
  }

  toggleMenu = () => {
    this.setState((state) => ({
      menu: !state.menu,
    }));
  }

  closeMenu = (event) => {
    if (!event.target.closest('.menu-hamburger')
    && ((event.target.tagName === 'A' && event.target.closest('.navigation__item'))
      || (!event.target.closest('.navigation-container')))) {
      this.setState({ menu: false });
    }
  }

  componentDidUpdate() {
    if (this.state.menu) {
      document.body.addEventListener('click', this.closeMenu);
    } else {
      document.body.removeEventListener('click', this.closeMenu);
    }
  }

  updateLogoAccordingToCurrentGame = () => {
    this.setCurrentGame(this.getCurrentGame());
  }

  getCurrentGame = () => {
    const {
      path: currentGame,
    } = Object.values(gamesData).find((gameObj) => (
      window.location.href.includes(gameObj.path)
    )) || { path: null };
    return currentGame;
  }

  setCurrentGame = (currentGame) => {
    this.setState({
      currentGame,
    });
  }

  render() {
    const {
      links,
      isUserLogged,
      logout: logoutUser,
    } = this.props;
    console.log(links);

    const { currentGame, menu } = this.state;

    const logoClasses = classNames({
      logo: true,
      [`logo_${currentGame}`]: Boolean(currentGame),
    });

    const menuHamburgerClasses = classNames({
      'menu-hamburger': true,
      active: menu,
      [`menu-hamburger_${currentGame}`]: Boolean(currentGame),
    });

    const menuHamburgerLineClasses = classNames({
      'menu-hamburger__line': true,
      [`menu-hamburger_${currentGame}__line`]: Boolean(currentGame),
    });

    const navClasses = classNames({
      'navigation-container': true,
      [`navigation-container_${currentGame}`]: Boolean(currentGame),
    });

    return (
      <header className="header">
      <NavLink activeClassName="navigation__item_active" to={getPath()}>
        <Logo className={logoClasses} />
      </NavLink>
      <div onClick={this.toggleMenu} className={menuHamburgerClasses}>
        <span className={menuHamburgerLineClasses}></span>
      </div>
      <nav className={navClasses}>
        <ul className="navigation">
          {
            links.map(addLinksToHeader)
          }
          {
            !isUserLogged && <li className="navigation__item navigation-icon">
              <NavLink activeClassName="navigation__item_active" to={getPath(pagesData.signIn.path)}>
                <IconButton
                  onClick={logoutUser}>
                  <MeetingRoomIcon
                    color="disabled"
                    style={{ fontSize: '3rem' }}
                  />
                </IconButton>
              </NavLink>
            </li>
          }
          {
            isUserLogged && <>
              <li className="navigation__item navigation-icon">
                <NavLink activeClassName="navigation__item_active" to={getPath(pagesData.settings.path)}>
                  <IconButton
                    onClick={logoutUser}>
                    <SettingsIcon
                      color="disabled"
                      style={{ fontSize: '3rem' }}
                    />
                  </IconButton>
                </NavLink>
              </li>
              <li className="navigation__item navigation-icon">
                <NavLink exact activeClassName="navigation__item_active" to={getPath()}>
                  <IconButton
                    onClick={logoutUser}>
                    <ExitToAppIcon
                      color="disabled"
                      style={{ fontSize: '3rem' }}
                    />
                  </IconButton>
                </NavLink>
              </li>
            </>
          }
        </ul>
      </nav>
    </header>
    );
  }
}

HeaderView.propTypes = {
  linkTitles: PropTypes.arrayOf(PropTypes.string),
  isUserLogged: PropTypes.bool,
  links: PropTypes.array,
  logout: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(HeaderView);
