import React from 'react';
import PropTypes from 'prop-types';
import { resourceUrl } from '../../helpers';
import { buttonsNames } from '../../helpers/constants';

const { SHOW_ANSWER, PREV, NEXT } = buttonsNames;

const SideBar = ({
  progress,
  image,
  isShownAnswerButton,
  isShownImageAssociation,
  onNextWord,
  onPrevWord,
  onShowTip,
}) => (
  <div>
    <div>
        {isShownImageAssociation && <img src={resourceUrl(image)} alt="uknown word" />}
      {isShownAnswerButton && (
        <button
          onClick={() => {
            onShowTip();
          }
          }
          disabled={progress.isGuessed}
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
  progress: PropTypes.object,
  word: PropTypes.string,
  image: PropTypes.string,
  isShownAnswerButton: PropTypes.bool,
  isShownImageAssociation: PropTypes.bool,
  onNextWord: PropTypes.func,
  onPrevWord: PropTypes.func,
  onShowTip: PropTypes.func,
};

export default SideBar;
