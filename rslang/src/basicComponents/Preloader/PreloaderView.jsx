import React from 'react';
import { SemipolarSpinner } from 'react-epic-spinners';
import { preloaderdefaultSettings } from '../../helpers/constants';

const { size, color } = preloaderdefaultSettings;

const Preloader = () => (
  <div className="preloader__wrapper">
    <SemipolarSpinner size={size} color={color} />
  </div>
);

export default Preloader;
