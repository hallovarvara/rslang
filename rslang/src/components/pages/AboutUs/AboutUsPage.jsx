import React from 'react';
import { Link } from 'react-router-dom';
import {teamMembers, pagesData, text} from '../../../helpers/constants';
import TeamMember from '../../TeamMember';
import Button from '../../../basicComponents/Button';
import { getPath } from '../../../helpers/functions';

const mapTeamMembersToItems = (member, index) => <TeamMember key={index} {...member} />;

const AboutUsPage = () => (
  <div className="about-us-page">
    <section className="about-us">
      <h1>{pagesData.aboutUs.title}</h1>
      <p className="about-us__desctiption">Привет! Мы рады представить продукт нашей совместной работы — приложение по изучению английского языка</p>
    </section>
    <section className="team-members">
      {
        teamMembers.map(mapTeamMembersToItems)
      }
    </section>
    <Link to={ getPath(pagesData.learnWords.path) }>
      <Button
        className="demonstration-container__start-button"
        value={ text.ru.button.learnEnglishWithUs }
      />
    </Link>
  </div>
);

export default AboutUsPage;
