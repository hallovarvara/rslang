import React from 'react';
import TabPanel from './UI/TabPanel.jsx';
import ScheduleStatistics from './UI/scheduleLine';
import data from './statData';
import './StatisticsPage.scss';
import { getStatistics } from '../../../helpers/wordsService';

import Preloader from '../../../basicComponents/Preloader';

const dataPanel = ['За все время', 'Сегодня'];

class StatisticsPage extends React.Component {
  state = {
    loading: true,
    todayStatisticTitles: ['Карточек завершено', 'Правильные ответы', 'Новые слова', 'Слова на повторение', 'Самая длинная серия правильных ответов'],
    todayStatisticValues: ['59', '75%', '46', '4', '12'],
  }

  render() {
    const {
      todayStatisticTitles,
      todayStatisticValues,
    } = this.state;

    const DataToday = () => (
      <div className="statistics__wrapp">
        <div className="statistics__content">
          {todayStatisticTitles.map((item, key) => (
            <div className="statistics__item" key={key}>
              <div className="statistics__item-name">{`${item}:`}</div>
              <div className="statistics__item-total">{todayStatisticValues[key]}</div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className={'statistics__container'} >
        <TabPanel
          dataToday={<DataToday />}
          dataPanel={dataPanel}
          ScheduleStatistics={<ScheduleStatistics data={data} />}
        />
      </div >
    );
  }
}

export default StatisticsPage;
