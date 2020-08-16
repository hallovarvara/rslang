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
import LiquidButton from '../../../basicComponents/LiquidButton';
import { ReactComponent as Spot } from '../../../assets/icons/spot.svg';
import { ReactComponent as DottedLineTop } from '../../../assets/icons/dotted-lines/line-top.svg';
import { ReactComponent as DottedLineFourSixths } from '../../../assets/icons/dotted-lines/line-four-sixths.svg';

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
      <LiquidButton
        text={Parser(text.ru.button.startLearningWithUs)}
      />
    </Link>
    <DottedLineTop className="dotted-line"/>
    <DottedLineFourSixths className="dotted-line dotted-line_four-sixths" />
    <Spot className="spot spot_top"/>
    <Spot className="spot spot_two-sixths"/>
    <Spot className="spot spot_four-sixths"/>
  </div>
);

export default AboutUsPage;
