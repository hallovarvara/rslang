import React from 'react';
import PropTypes from 'prop-types';

import StarItem from '../StarItem';

import { amountOfWordsOnOnePage } from '../../helpers/constants';

const mapStarsArrayToItems = (index) => <StarItem key={index} />;

class StarsList extends React.Component {
  componentDidUpdate() {
    const { starsCount, userHasWon } = this.props;
    if (starsCount === amountOfWordsOnOnePage) {
      userHasWon();
    }
  }

  render() {
    const { starsCount } = this.props;
    return (
      <div className="stars-container">
      {
        (new Array(starsCount))
          .fill('star')
          .map((item, index) => mapStarsArrayToItems(index))
      }
    </div>
    );
  }
}

StarsList.propTypes = {
  starsCount: PropTypes.number,
  userHasWon: PropTypes.func,
};

export default StarsList;
