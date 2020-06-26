import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../basicComponents/Button';
import Select from '../../../basicComponents/Select';

const PromoPageView = () => (
    <div className="promo-page">
      <section className="demonstration-container">
        <p className="demonstration-container__title">What is it and why user will like it</p>
        <video className="demonstration-container__video" controls>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4"></source>
          Your browser does not support the video tag.
        </video>
        <Link to="learn-words">
          <Button className="demonstration-container__start-button" value="Start learn English with us" />
        </Link>
        <Select />
      </section>
    </div>
);

export default PromoPageView;
