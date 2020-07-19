import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../../basicComponents/Select';
import { text } from '../../../../helpers/constants';

const SelectView = (props) => {
  const {
    useUserWords = true,
    isUserLogged,
    showNotifications = () => {},
    setUsingOfUserWords = () => {},
  } = props;
  const defaultValue = text.ru.selectOptionsForUsedWord[Number(!useUserWords)];
  return (
    <Select
    {...props}
    selectTitles={text.ru.selectOptionsForUsedWord}
    defaultValue={defaultValue}
    value={isUserLogged ? null : defaultValue}
    onChange={isUserLogged
      ? (event) => {
        setUsingOfUserWords(!text.ru.selectOptionsForUsedWord.indexOf(event.target.value));
      }
      : (event) => {
        if (event.target.value !== defaultValue) {
          showNotifications([{ type: 'error', message: text.ru.loginPleaseToUseThisFeature }]);
        }
      }}
    />
  );
};

SelectView.propTypes = {
  useUserWords: PropTypes.bool,
  isUserLogged: PropTypes.bool,
  showNotifications: PropTypes.func,
  setUsingOfUserWords: PropTypes.func,
};

export default SelectView;
