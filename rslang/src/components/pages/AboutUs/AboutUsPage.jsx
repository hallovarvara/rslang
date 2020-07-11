import React from 'react';
import { Link } from "react-router-dom";
import teamPhoto from '../../../assets/images/team-photo.png';
import { teamMembers, pagesData } from '../../../helpers/constants';
import TeamMember from '../../TeamMember';
import Button from '../../../basicComponents/Button';

const mapTeamMembersToItems = (member, index) => <TeamMember key={index} {...member} />;

const AboutUsPage = () => (
  <div className="about-us-page">
    <section className="about-us">
      <h1>{pagesData.aboutUs.title}</h1>
      <p className="about-us__desctiption">Привет! Мы рады представить продукт нашей совместной работы — приложение по изучению английского языка</p>
      <img src={teamPhoto} alt="team" className="about-us__team-photo"></img>
    </section>
    <section className="team-members">
      {
        teamMembers.map(mapTeamMembersToItems)
      }
    </section>
    <Link to={ pagesData.learnWords.path }>
      <Button className="demonstration-container__start-button" value="Учите английский с нами" />
    </Link>
  </div>
);

export default AboutUsPage;
