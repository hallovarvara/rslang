import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import GameCard from '../../GameCard';
import LiquidButton from '../../../basicComponents/LiquidButton';

import { ReactComponent as Spot } from '../../../assets/icons/spot.svg';
import { ReactComponent as DottedLineTop } from '../../../assets/icons/dotted-lines/line-top.svg';
import { ReactComponent as DottedLineTwoSixths } from '../../../assets/icons/dotted-lines/line-two-sixths.svg';
import { ReactComponent as DottedLineThreeSixths } from '../../../assets/icons/dotted-lines/line-three-sixths.svg';
import { ReactComponent as DottedLineFourSixths } from '../../../assets/icons/dotted-lines/line-four-sixths.svg';
import { ReactComponent as DottedLineFiveSixths } from '../../../assets/icons/dotted-lines/line-five-sixths.svg';
import { ReactComponent as GithubIcon } from '../../../assets/icons/icon-github.svg';

import {
  pagesData,
  gamesData,
  promoVideoLink,
  text,
  projectRepositoryLink,
} from '../../../helpers/constants';
import {
  getPath,
} from '../../../helpers/functions';

import graduateImg from '../../../assets/images/promo/promo-photo1.png';
import busImage from '../../../assets/images/promo/promo-photo2.png';
import lionImage from '../../../assets/images/promo/savannah-big-lion.svg';

const renderGames = (data, index) => <GameCard data={data} key={index} />;

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
        text={Parser(text.ru.button.startLearningWithUs)}
        onClick={() => history.push(getPath(pagesData.learnWords.path))}
        className="promo-page__start-button"
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
      <div className="games-cards-container">
        {
          Object
            .values(gamesData)
            .map((data, index) => (
              data.title !== gamesData.savannah.title && renderGames(data, index)
            ))
        }
      </div>
      <DottedLineThreeSixths className="dotted-line" />
    </section>
    <section className="promo-repeating">
      <p className="promo-repeating__subtitle">{text.ru.spacingRepeatition.youStudyEffectively}</p>
      <h2 className="promo-repeating__title">{text.ru.spacingRepeatition.title}</h2>
      <p className="promo-repeating__description">{Parser(text.ru.spacingRepeatition.subtitle)}</p>
      <div className="promo-repeating-factors-container">
        {
          text.ru.spacingRepeatition.factors.map((factor, index) => (
            <div key={index} className="factor-container">
              <div className="factor-title-wrapper">
                <span className="factor-title-wrapper__order">{index + 1}</span>
                <p className="factor-title-wrapper__title">{Parser(factor.title)}</p>
              </div>
              <div className="algorithms-container">
                {
                  factor.algorithm.map((algorithm, i) => (
                    <div key={i} className="algorithm">
                      <div className="algorithm-main-info">
                        <img
                          src={algorithm.image}
                          alt={algorithm.alt}
                          className={`algorithm-main-info__image algorithm-main-info__image_${algorithm.modificator}`}/>
                        <p className="algorithm-main-info__subtitle">{Parser(algorithm.target)}</p>
                        <p className="algorithm-main-info__title">{Parser(algorithm.result)}</p>
                      </div>
                      <p className="algorithm__action">{Parser(algorithm.action)}</p>
                    </div>
                  ))
                }
              </div>
              <div className={`factor-container__dots factor-container__dots_${factor.className}`}></div>
            </div>
          ))
        }
      </div>
      <LiquidButton
        text={Parser(text.ru.button.startLearningWithUs)}
        onClick={() => history.push(getPath(pagesData.learnWords.path))}
        className="promo-repeating__start-button"
      />
      <div className="github-link-container">
        <a target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          href={projectRepositoryLink}>
          <GithubIcon className="github-link__icon"/>{text.ru.projectRepository}
        </a>
      </div>
    </section>
    <DottedLineTop className="dotted-line dotted-line_top"/>
    <DottedLineTwoSixths className="dotted-line dotted-line_two-sixths" />
    <DottedLineFourSixths className="dotted-line dotted-line_four-sixths" />
    <DottedLineFiveSixths className="dotted-line dotted-line_five-sixths" />
    <Spot className="spot spot_top"/>
    <Spot className="spot spot_two-sixths"/>
    <Spot className="spot spot_three-sixths" />
    <Spot className="spot spot_four-sixths" />
    <Spot className="spot spot_five-sixths" />
  </div>
);

PromoPageView.propTypes = {
  history: PropTypes.object,
};

export default PromoPageView;
