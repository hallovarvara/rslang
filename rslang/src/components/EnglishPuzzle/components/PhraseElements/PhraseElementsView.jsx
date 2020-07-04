import React from 'react';
import PropTypes from 'prop-types';
import { shuffle } from '../../helpers';
import style from './PhraseElementsView.module.scss';

const PhraseElementsView = ({ phrase }) => (
  <div className={style.container}>
    {shuffle(phrase).map((word, index) => (
        <div className={style.item} key={index}>{word}</div>
    ))}
  </div>
);

PhraseElementsView.propTypes = {
  phrase: PropTypes.array,
};

export default PhraseElementsView;
