import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const mapLinkTitlesToItems = (linkTitle, index) => {
  const linkPath = linkTitle.toLowerCase().split(' ').join('-');
  return (
    <li key={index} className="navigation__item">
      <NavLink activeClassName="navigation__item_active" to={`/${linkPath}`}>{linkTitle}</NavLink>
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
              isUserLogged && <li className="navigation__item">
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
