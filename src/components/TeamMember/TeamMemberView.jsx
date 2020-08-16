import React from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';

import noAvatar from '../../assets/images/avatar.jpg';
import { linkedinLink, githubLink } from '../../helpers/constants';

const TeamMemberView = (props) => {
  const {
    name = 'Безымянный герой',
    surname = '',
    role = 'Сделал всё несделанное',
    image = noAvatar,
    linkedinUsername = '',
    githubUsername = '',
  } = props;
  return (
    <div className="team-member">
      <img src={image} alt="team-member" className="team-member__photo"/>
      <h2 className="team-member__name">{`${name} ${surname}`}</h2>
      <p className="team-member__role">{Parser(role)}</p>
      <div className="team-member__links">
      {
        linkedinUsername.length > 0
        && <div className="team-member-link">
          <a target="_blunk" href={linkedinLink + linkedinUsername} className="team-member-link__text">
            <span className="team-member-link__icon team-member-link__icon_linkedin"></span>
          </a>
        </div>
      }
      {
        githubUsername.length > 0
        && <div className="team-member-link">
          <a target="_blunk" href={githubLink + githubUsername} className="team-member-link__text">
            <span className="team-member-link__icon team-member-link__icon_github"></span>
          </a>
        </div>
      }
      </div>
    </div>
  );
};

TeamMemberView.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  role: PropTypes.string,
  image: PropTypes.string,
  linkedinUsername: PropTypes.string,
  githubUsername: PropTypes.string,
};

export default TeamMemberView;
