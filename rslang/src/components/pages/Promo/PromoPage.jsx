import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../basicComponents/Button';

import {
  pagesData,
  text,
} from '../../../helpers/constants';

import feature1 from '../../../assets/images/promo/feature-comfort-safe.png';

const PromoPageView = () => (
  <div className="promo-page">
    <section className="demonstration-container">
      <p className="demonstration-container__title">Что это и почему понравится пользователю</p>
      <video className="demonstration-container__video" controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4"/>
        Извините, ваш браузер не поддерживает встроенное видео
      </video>
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
