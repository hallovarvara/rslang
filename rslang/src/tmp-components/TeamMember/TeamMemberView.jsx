import React from 'react';
import PropTypes from 'prop-types';

import standartAvatar from '../../assets/images/avatar.jpg';

const TeamMemberView = (props) => {
  const {
    name = 'Name',
    surname = 'Surname',
    role = 'Role and quite long VKLAD’s text, that includes short marcs from team’s worklog.',
    image = standartAvatar,
    linkedInLink = 'https://www.linkedin.com/in/lebetsky-dmitry-20a80519a/',
  } = props;
  return (
    <div className="team-member">
      <img src={image} alt="team-member" className="team-member__image"/>
      <p className="team-member__full-name">{`${name} ${surname}`}</p>
      <p className="team-member__role">{role}</p>
      <p className="team-member-linked-profile">
        <a target="_blunk" href={linkedInLink} className="team-member-linked-profile__link">
          <span className="linkedin-icon"></span>{name}
        </a>Open for job offer
      </p>
    </div>
  );
};

TeamMemberView.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  role: PropTypes.string,
  image: PropTypes.string,
  linkedInLink: PropTypes.string,
};

export default TeamMemberView;
