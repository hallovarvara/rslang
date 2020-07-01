import React from 'react';
import PropTypes from 'prop-types';
import { ImageUrl } from '../../helpers/helpers';

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
        {isShownImageAssociation && <img src={ImageUrl(image)} alt={word} />}
        {
          isShownAnswerButton
          && <button onClick={
            () => onChangeProgress({
              isGuessed: true,
              isShownWord: true,
              isUsedTip: true,
            })
            }>Показать ответ</button>
        }
    </div>
    <div>
        <button onClick={() => onPrevWord()}>Назад</button>
        <button onClick={() => onNextWord()}>Вперед</button>
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
