import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({
  baseUrl,
  image,
  isShownAnswerButton,
  isShownImageAssociation,
}) => (
  <div>
    <div>
        {isShownImageAssociation && <img src={`${baseUrl}${image}`} alt="" />}
        {isShownAnswerButton && <button>Show answer</button>}
    </div>
    <div>
      <button>prev</button>
      <button>next</button>
    </div>
  </div>
);

SideBar.propTypes = {
  baseUrl: PropTypes.string,
  image: PropTypes.string,
  isShownAnswerButton: PropTypes.bool,
  isShownImageAssociation: PropTypes.bool,
};

SideBar.defaultProps = {
  baseUrl: '',
  image: '',
  isShownAnswerButton: true,
  isShownImageAssociation: true,
};

export default SideBar;
