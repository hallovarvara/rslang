import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import MenuList from '../../basicComponents/MenuList';
import { gamesData, pagesData } from '../../helpers/constants';

const addLinksToHeader = (link, index) => {
  const { title, path } = link;
  return (
    <li key={index} className="navigation__item">
      {
        path === pagesData.play.path
          ? <MenuList
            menuTitle={<NavLink activeClassName="navigation__item_active" to={`/${path}`}>{title}</NavLink>}
            menuItems={Object.values(gamesData).map((gameObj, i) => (
              <NavLink
                className="menu-list-item__link"
                activeClassName="navigation__item_active"
                key={i}
                to={gameObj.path}>{gameObj.title}
              </NavLink>
            ))}
          />
          : <NavLink activeClassName="navigation__item_active" exact to={`/${path}`}>{title}</NavLink>
      }
    </li>
  );
};

const HeaderView = ({ links, isUserLogged, logout }) => (
    <header className="header">
      <h1 className="header__title"><NavLink activeClassName="navigation__item_active" to="/promo">RS Lang</NavLink></h1>
      <nav>
        <ul className="navigation">
          {
            links.map(addLinksToHeader)
          }
          {
            isUserLogged && <li className="navigation__item exit-icon">
              <NavLink activeClassName="navigation__item_active" to="/">
                <IconButton
                  onClick={logout}>
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
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(HeaderView);
