import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import classNames from 'classnames';

const mapLinkTitlesToItems = (linkTitle, index) => {
  const activeLinkTitle = 'About us'; // TODO: get active link from redux
  const classes = classNames({
    navigation__item: true,
    navigation__item_active: linkTitle === activeLinkTitle,
  });
  const linkPath = linkTitle.toLowerCase().split(' ').join('-');
  return (
    <li key={index} className={classes}><Link to={`/${linkPath}`}>{linkTitle}</Link></li>
  );
};

const HeaderView = ({ linkTitles, isUserLogged }) => (
      <header className="header">
        <h1 className="header__title"><Link to="/promo">RS Lang</Link></h1>
        <nav>
          <ul className="navigation">
            {
              linkTitles.map(mapLinkTitlesToItems)
            }
            {
              isUserLogged && <li className="navigation__item">
                <Link to="sign-up">
                  <ExitToAppIcon color="disabled" style={{ fontSize: '3rem' }}/>
                </Link>
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
