import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className='header'>
    <h1 className='logo'>Logo</h1>
    <nav>
      <ul className='navigation'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/settings'>Settings</Link></li>
        <li><Link to='/statistic'>Statistic</Link></li>
        <li><Link to='/team'>Our Team</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
