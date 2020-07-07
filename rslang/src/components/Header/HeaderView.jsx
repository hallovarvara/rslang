import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MenuList from '../../basicComponents/MenuList';

import { gamesData } from '../../helpers/constants';

const mapLinkTitlesToItems = (linkTitle, index) => {
  const linkPath = linkTitle.toLowerCase().split(' ').join('-');
  return (
    <li key={index} className="navigation__item">
      {
        linkTitle === 'Play games'
          ? <MenuList
            menuTitle={<NavLink activeClassName="navigation__item_active" to={`/${linkPath}`}>{linkTitle}</NavLink>}
            menuItems={gamesData.map((gameObj, i) => (
              <NavLink
                className="menu-list-item__link"
                activeClassName="navigation__item_active"
                key={i}
                to={gameObj.link}>{gameObj.title}</NavLink>
            ))}
          />
          : <NavLink activeClassName="navigation__item_active" to={`/${linkPath}`}>{linkTitle}</NavLink>
      }
    </li>
  );
};

const HeaderView = ({ linkTitles, isUserLogged }) => (
  <header className="header">
    <h1 className="header__title"><NavLink activeClassName="navigation__item_active" to="/promo">RS Lang</NavLink></h1>
    <nav>
      <ul className="navigation">
        {
          linkTitles.map(mapLinkTitlesToItems)
        }
        {
          isUserLogged && <li className="navigation__item exit-icon">
            <NavLink activeClassName="navigation__item_active" to="sign-up">
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
};

export default HeaderView;
