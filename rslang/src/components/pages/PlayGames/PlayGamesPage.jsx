import React from 'react';
import Parser from 'html-react-parser';

import {
  gamesData, pagesData,
  text,
} from '../../../helpers/constants';

import GameCard from '../../GameCard';
import {Link} from "react-router-dom";
import {ReactComponent as DottedLineTop} from '../../../assets/icons/dotted-lines/line-top.svg';
import {ReactComponent as DottedLineFourSixths} from '../../../assets/icons/dotted-lines/line-four-sixths.svg';
import {ReactComponent as Spot} from '../../../assets/icons/spot.svg';
import {getPath} from "../../../helpers/functions";
import LiquidButton from "../../../basicComponents/LiquidButton";

const renderGames = (data, index) => <GameCard data={data} key={index} />;

const PlayGamesPage = () => (
    <section className="play-games">
      <h1 className="play-games__title">{text.ru.chooseGame}</h1>
      <p className="play-games__subtitle">
        {Parser(text.ru.everyGameImprove)}
      </p>
      <div className="games-cards-container">
        {
          Object.values(gamesData).map(renderGames)
        }
      </div>
      <Link to={ getPath(pagesData.learnWords.path) }>
        <LiquidButton
          className="margin-top-50"
          text={Parser(text.ru.button.getToLearnWords)}
        />
      </Link>
      <DottedLineTop className="dotted-line dotted-line_top"/>
      <Spot className="spot spot_two-sixths"/>
      <Spot className="spot spot_three-sixths" />
    </section>
);

export default PlayGamesPage;
