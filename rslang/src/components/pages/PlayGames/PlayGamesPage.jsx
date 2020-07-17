import React from 'react';

import {
  gamesData,
  text,
} from '../../../helpers/constants';

import GameCard from '../../GameCard';

const renderGames = (data, index) => <GameCard data={data} key={index} />;

const PlayGamesPage = () => (
    <section className="play-games">
      <h1 className="play-games__title">{text.ru.chooseGame}</h1>
      <p className="play-games__subtitle">{text.ru.everyGameImprove}</p>
      <div className="games-cards-container">
        {
          Object.values(gamesData).map(renderGames)
        }
      </div>
    </section>
);

export default PlayGamesPage;
