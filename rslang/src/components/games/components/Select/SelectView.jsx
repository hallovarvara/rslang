import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../../basicComponents/Select';
import { text } from '../../../../helpers/constants';

const SelectView = (props) => {
  const {
    useRepeatingWords = true,
    isUserLogged,
    showNotifications = () => {},
  } = props;
  const defaultValue = text.ru.selectOptionsForUsedWord[Number(!useRepeatingWords)];
  return (
    <Select
    {...props}
    selectTitles={text.ru.selectOptionsForUsedWord}
    defaultValue={defaultValue}
    value={isUserLogged ? null : defaultValue}
    onChange={isUserLogged ? () => {} : (event) => {
      if (event.target.value !== defaultValue) {
        showNotifications([{ type: 'error' }]);
      }
    }}
    />
  );
};

SelectView.propTypes = {
  useRepeatingWords: PropTypes.bool,
  isUserLogged: PropTypes.bool,
  showNotifications: PropTypes.func,
};

export default SelectView;
