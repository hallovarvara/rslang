import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function mapLinkTitlesToItems(linkTitle, index) {
  const activeLinkTitle = 'About us'; // we will get it from state in the future
  const classes = ['navigation__item'];
  const linkPath = linkTitle.toLowerCase().split(' ').join('-');
  if (linkTitle === activeLinkTitle) {
    classes.push('navigation__item_active');
  }
  return (
    <li key={index} className={classes.join(' ')}><Link to={`/${linkPath}`}>{linkTitle}</Link></li>
  );
}

const HeaderView = (props) => {
  const { linkTitles, isUserLogged } = props;

  return (
      <header className='header'>
        <h1 className='header__title'><Link to="/promo-page">RS Lang</Link></h1>
        <nav>
          <ul className='navigation'>
            {
              linkTitles.map(mapLinkTitlesToItems)
            }
            {
              isUserLogged ? <li className='navigation__item'>
                <Link to='sign-up'>
                  <ExitToAppIcon color='disabled' style={{ fontSize: '3rem' }}/>
                </Link>
              </li> : null
            }
          </ul>
        </nav>
      </header>
  );
};

HeaderView.propTypes = {
  linkTitles: PropTypes.arrayOf(PropTypes.string),
  isUserLogged: PropTypes.bool,
};

export default HeaderView;
