import React from 'react';

import {
  pagesData,
  gamesData,
} from '../../../helpers/constants';

import GameCard from '../../GameCard';

const renderGames = (data, index) => <GameCard data={data} key={index} />;

const PlayGamesPage = () => (
    <section className="play-games">
      <h2 className="play-games__title">{ pagesData.play.title }</h2>
      <div className="games-cards-container">
        {
          Object.values(gamesData).map(renderGames)
        }
      </div>
    </section>
);

export default PlayGamesPage;
