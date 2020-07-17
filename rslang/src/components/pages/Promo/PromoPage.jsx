import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../basicComponents/Button';

import {
  pagesData,
  promoVideoLink,
  text,
} from '../../../helpers/constants';

import tmpFeatures from '../../../assets/images/promo/tmp-features.jpg';
import tmpSpacingRepetition from '../../../assets/images/promo/tmp-spacing-repetition.jpg';

const PromoPageView = () => (
  <div className="promo-page">
    <section>
      <h1>{ text.ru.promo.title }</h1>
      <p className='promo-page__subtitle'>{ text.ru.promo.subtitle }</p>
      <video controls>
        <source src={ promoVideoLink }/>
        { text.ru.noVideoSupport }
      </video>
      <Link to={ pagesData.learnWords.path }>
        <Button
          className="promo-page__start-button"
          value={ text.ru.button.startLearningWithUs }
        />
      </Link>
    </section>
    <section className='promo-page__features'>
      <img src={tmpFeatures} alt="Временная заглушка фич"/>
    </section>
    <section className='promo-page__spacing-repetition'>
      <img src={tmpSpacingRepetition} alt="Временная заглушка интервального повторения"/>
    </section>
  </div>
);

export default PromoPageView;
