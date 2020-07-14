import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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

const HeaderView = ({ links, isUserLogged, logout: logoutUser }) => (
  <header className="header">
    <NavLink activeClassName="navigation__item_active" to={getPath()}>
      <h1><span className="visually-hidden">RS Lang</span></h1>
      <Logo className='logo' />
    </NavLink>
    <nav>
      <ul className="navigation">
        {
          links.map(addLinksToHeader)
        }
        {
          isUserLogged && <li className="navigation__item exit-icon">
            <NavLink activeClassName="navigation__item_active" to="/">
              <IconButton
                onClick={logoutUser}>
                <ExitToAppIcon
                  color="disabled"
                  style={{ fontSize: '3rem' }}
                />
              </IconButton>
             </NavLink>
          </li>
        }
      </ul>
    </nav>
  </header>
);

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
