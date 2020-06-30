import React from 'react';
import PropTypes from 'prop-types';

import Preloader from '../../Preloader';
import StartButton from '../../StartButton';

class HomePage extends React.Component {
  render() {
    const { loading } = this.props;

    return (
      <div className="home-page-container">
        <h1 className="home-page-container__title">SPEAKIT</h1>
        <p className="home-page-container__description">Click on the words to hear them sound.<br></br>Click on the button and speak the words into the microphone</p>
        {loading ? <Preloader /> : <StartButton />}
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
};

export default HomePage;
