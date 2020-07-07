import React from 'react';

import { gamesData } from '../../../helpers/constants';

import GameCard from '../../GameCard';

const mapGamesDataToCards = (data, index) => <GameCard data={data} key={index} />;

const PlayGamesPage = () => (
    <section className="play-games">
      <h2 className="play-games__title">Выберите игру</h2>
      <div className="games-cards-container">
        {
          gamesData.map(mapGamesDataToCards)
        }
      </div>
    </section>
);

export default PlayGamesPage;
