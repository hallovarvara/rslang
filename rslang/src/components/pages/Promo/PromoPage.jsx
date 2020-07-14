import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../basicComponents/Button';

import {
  pagesData,
  promoVideoLink,
  text,
} from '../../../helpers/constants';

import feature1 from '../../../assets/images/promo/feature-comfort-safe.png';

const PromoPageView = () => (
  <div className="promo-page">
    <section>
      <h1>{ text.ru.promo.title }</h1>
      <p className='promo-page__subtitle'>{ text.ru.promo.subtitle }</p>
      <video controls>
        <source src={ promoVideoLink }/>
        { text.ru.noVideoSupport }
      </video>
    </section>

    <section className="demonstration-container">
      <p className="demonstration-container__title">Что это и почему понравится пользователю</p>

      <Link to={ pagesData.learnWords.path }>
        <Button
          className="demonstration-container__start-button"
          value={ text.ru.button.learnEnglishWithUs }
        />
      </Link>
    </section>
  </div>
);

export default PromoPageView;
