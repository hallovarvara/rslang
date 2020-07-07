import React from 'react';
import PropTypes from 'prop-types';
import { resourceUrl } from '../../helpers';
import { buttonsNames } from '../../helpers/constants';

const { SHOW_ANSWER, PREV, NEXT } = buttonsNames;

const SideBar = ({
                   word,
                   image,
                   isShownAnswerButton,
                   isShownImageAssociation,
                   onNextWord,
                   onPrevWord,
                   onChangeProgress,
                 }) => (
  <div>
    <div>
      {isShownImageAssociation && <img src={resourceUrl(image)} alt={word} />}
      {isShownAnswerButton && (
        <button
          onClick={() => onChangeProgress({
            isGuessed: true,
            isShownWord: true,
            isUsedTip: true,
          })}
        >
          {SHOW_ANSWER}
        </button>
      )}
    </div>
    <div>
      <button onClick={() => onPrevWord()}>{PREV}</button>
      <button onClick={() => onNextWord()}>{NEXT}</button>
    </div>
  </div>
);

SideBar.propTypes = {
  word: PropTypes.string,
  image: PropTypes.string,
  isShownAnswerButton: PropTypes.bool,
  isShownImageAssociation: PropTypes.bool,
  onNextWord: PropTypes.func,
  onPrevWord: PropTypes.func,
  onChangeProgress: PropTypes.func,
};

export default SideBar;
