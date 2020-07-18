import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import LiquidButton from '../../../basicComponents/LiquidButton';

import {
  pagesData,
  gamesData,
  promoVideoLink,
  text,
} from '../../../helpers/constants';
import {
  getPath,
} from '../../../helpers/functions';

import graduateImg from '../../../assets/images/promo/promo-photo1.png';
import busImage from '../../../assets/images/promo/promo-photo2.png';
import lionImage from '../../../assets/images/promo/savannah-big-lion.svg';

const PromoPageView = ({
  history,
}) => (
  <div className="promo-page">
    <section className="promo-presentation">
      <h1 className="promo-presentation__title">{ text.ru.promo.title }</h1>
      <p className="promo-presentation__subtitle">{ text.ru.promo.subtitle }</p>
      <div className="promo-presentation-media">
        <img src={graduateImg} alt="graduate" className="promo-presentation-media__graduate-image"/>
        <video controls className="promo-presentation-media__video">
          <source src={ promoVideoLink }/>
          { text.ru.noVideoSupport }
        </video>
        <img src={busImage} alt="bus" className="promo-presentation-media__bus-image"/>
      </div>
      <LiquidButton
        text={text.ru.button.startLearningWithUs}
        onClick={() => history.push(getPath(pagesData.learnWords.path))}
        className="promo-page__start-button"
        value={ text.ru.button.startLearningWithUs }
      />
    </section>
    <section className='promo-features'>
      <div className="promo-features-container">
         {
           text.ru.promo.features.map((feature, index) => (
            <div key={index} className={`promo-feature promo-feature_${feature.className}`}>
              <img src={feature.image} alt="icons" className={`promo-feature__icons promo-feature__icons_${feature.className}`}/>
              <div className="promo-feature-description">
                <p className="promo-feature-description__title">{Parser(feature.title)}</p>
                <p className="promo-feature-description__subtitle">{Parser(feature.description)}</p>
              </div>
            </div>
           ))
         }
      </div>
    </section>
    <section className="promo-games">
      <div className="promo-savannah-presentation-wrapper">
        <div className="promo-savannah-presentation">
          <img src={lionImage} alt="lion" className="promo-savannah-description__icon"/>
          <div className="promo-savannah-description">
            <p className="promo-savannah-description__title">{`${text.ru.game} ${gamesData.savannah.title}`}</p>
            <p className="promo-savannah-description__subtitle">{Parser(gamesData.savannah.description)}</p>
          </div>
        </div>
        <LiquidButton
          calm={true}
          onClick={() => history.push(getPath(gamesData.savannah.path))}
          className="promo-savannah-presentation-wrapper__play-now-button"
          text={text.ru.button.playRightNow} />
      </div>
      <p className="promo-page__subtitle">{text.ru.promo.chooseAnotherGame}</p>
    </section>
  </div>
);

PromoPageView.propTypes = {
  history: PropTypes.object,
};

export default PromoPageView;
