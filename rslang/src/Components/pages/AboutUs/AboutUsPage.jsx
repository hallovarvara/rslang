import React from 'react';

import teamPhoto from '../../../assets/images/team-photo.png';
import { teamMembers } from '../../../helpers/constants';
import TeamMember from '../../TeamMember';
import Button from '../../../basicComponents/Button';

const mapTeamMembersToItems = (member, index) => <TeamMember key={index} {...member} />;

const AboutUsPage = () => (
  <div className="about-us-page">
    <section className="about-us">
      <h2 className="about-us__title">About us</h2>
      <p className="about-us__desctiption">We are happy to share the product of our collaborating</p>
      <img src={teamPhoto} alt="team" className="about-us__team-photo"></img>
    </section>
    <section className="team-members">
      {
        teamMembers.map(mapTeamMembersToItems)
      }
    </section>
    <Button className="about-us-page__start-learn-btn" value="Start learn english with us" />
  </div>
);

export default AboutUsPage;
