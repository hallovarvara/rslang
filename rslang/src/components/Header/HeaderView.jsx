import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

const HeaderView = ({ links, isUserLogged }) => (
  <header className="header">
    <h1 className="header__title"><NavLink activeClassName="navigation__item_active" to="/promo">RS Lang</NavLink></h1>
    <nav>
      <ul className="navigation">
        {
          links.map(addLinksToHeader)
        }
        {
          isUserLogged && <li className="navigation__item exit-icon">
            <NavLink activeClassName="navigation__item_active" to={pagesData.register.path}>
              <ExitToAppIcon color="disabled" style={{ fontSize: '3rem' }}/>
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

export default HeaderView;
