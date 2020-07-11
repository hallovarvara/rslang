import React from 'react';
import PropTypes from 'prop-types';

import noAvatar from '../../assets/images/avatar.jpg';
import { linkedinLink } from '../../helpers/constants';

const TeamMemberView = (props) => {
  const {
    name = 'Безымянный герой',
    surname = '',
    role = 'Сделал всё несделанное',
    image = noAvatar,
    linkedinUsername = '',
  } = props;
  return (
    <div className="team-member">
      <img src={image} alt="team-member" className="team-member__image"/>
      <p className="team-member__full-name">{`${name} ${surname}`}</p>
      <p className="team-member__role">{role}</p>
      {
        linkedinUsername.length > 0
        && <p className="team-member-linked-profile">
          <a target="_blunk" href={linkedinLink + linkedinUsername} className="team-member-linked-profile__link">
            <span className="linkedin-icon"></span>{linkedinUsername}
          </a>
        </p>
      }
    </div>
  );
};

TeamMemberView.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  role: PropTypes.string,
  image: PropTypes.string,
  linkedinUsername: PropTypes.string,
};

export default TeamMemberView;
