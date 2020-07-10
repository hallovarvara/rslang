import React from 'react';
import {pagesData} from "../../../helpers/constants";

const StatisticsPage = () => (
  <div>
    <h1>{pagesData.statistics.title}</h1>
    <ul>
      <li className="text">1</li>
      <li className="text">2</li>
      <li className="text">3</li>
    </ul>
  </div>
);
export default StatisticsPage;
