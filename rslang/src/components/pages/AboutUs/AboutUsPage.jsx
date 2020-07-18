import React from 'react';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';

import {
  teamMembers,
  pagesData,
  text,
} from '../../../helpers/constants';

import { getPath } from '../../../helpers/functions';

import TeamMember from '../../TeamMember';
import Button from '../../../basicComponents/Button';

const mapTeamMembersToItems = (member, index) => <TeamMember key={index} {...member} />;

const AboutUsPage = () => (
  <div className="about-us-page">
    <div className="about-us__header">
      <h1>{pagesData.aboutUs.title}</h1>
      <p className="about-us__subtitle">
        {Parser(pagesData.aboutUs.subtitle)}
      </p>
    </div>
    <section className="team-members">
      {
        teamMembers.map(mapTeamMembersToItems)
      }
    </section>
    <Link className="about-us__link-container" to={ getPath(pagesData.learnWords.path) }>
      <Button
        className="team-members__button-learn"
        value={ Parser(text.ru.button.startLearningWithUs) }
      />
    </Link>
  </div>
);

export default AboutUsPage;
