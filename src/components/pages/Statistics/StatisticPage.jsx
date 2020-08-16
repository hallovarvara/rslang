import React from 'react';
import TabPanel from './UI/TabPanel.jsx';
import ScheduleStatistics from './UI/scheduleLine';
import data from './statData';
import './StatisticsPage.scss';
// import { getStatistics } from '../../../helpers/wordsService';

// import Preloader from '../../../basicComponents/Preloader';
import { localThings } from '../../../helpers/wordsService/storageModel';
import NoWordsFound from '../LearnWords/Views/NoWordsFound';
import { text /* applicationThings */ } from '../../../helpers/constants';
import { prepareStatsToGraph } from '../../../helpers/wordsService';

const dataPanel = ['За все время', 'Сегодня'];

class StatisticsPage extends React.Component {
  state = {
    loading: true,
    todayStatisticTitles: [
      'Карточек завершено',
      'Изучаемые',
      'Изученные наполовину',
      'Сложные',
      'Удалённые',
    ],
    todayStatisticValues: ['59', '75%', '46', '4', '12'],
    noStats: false,
    graphData: data,
  };

  componentDidMount() {
    let stats = localStorage.getItem(localThings.STATISTICS);
    if (stats === null) {
      this.setState({
        noStats: true,
      });
      return;
    }
    stats = JSON.parse(stats);
    if (!Object.keys(stats?.optional?.learnWords).length) {
      this.setState({
        noStats: true,
      });
      return;
    }
    const statsForGraph = prepareStatsToGraph().map((graphStatObj) => {
      const [[id, newData]] = Object.entries(graphStatObj);
      return {
        id: text.ru.statsTitles[id],
        newData,
      };
    });
    let cardsCompleted = 0;
    let cardsLearning = 0;
    let cardsLearnedPartly = 0;
    let cardsComplicated = 0;
    let cardsRemoved = 0;
    Object.entries(stats.optional.learnWords).forEach(
      ([, /* yearStr */ monthObj]) => {
        Object.entries(monthObj).forEach(([, /* monthStr */ dayObj]) => {
          Object.entries(dayObj).forEach(([, /* dayStr */ dayStatsObj]) => {
            const dayStatsArr = dayStatsObj.split('-').map((el) => Number(el));
            cardsCompleted += dayStatsArr[0];
            cardsLearning += dayStatsArr[1];
            cardsLearnedPartly += dayStatsArr[2];
            cardsComplicated += dayStatsArr[3];
            cardsRemoved += dayStatsArr[4];
          });
        });
      },
    );
    this.setState({
      todayStatisticValues: [
        cardsCompleted,
        cardsLearning,
        cardsLearnedPartly,
        cardsComplicated,
        cardsRemoved,
      ],
      graphData: statsForGraph,
    });
  }

  render() {
    const {
      todayStatisticTitles,
      todayStatisticValues,
      noStats,
      graphData,
    } = this.state;

    if (noStats) {
      return (
        <div className="statistics-no-words-container">
          <NoWordsFound note={text.ru.noStats} />
        </div>
      );
    }

    const DataToday = () => (
      <div className="statistics__wrapp">
        <div className="statistics__content">
          {todayStatisticTitles.map((item, key) => (
            <div className="statistics__item" key={key}>
              <div className="statistics__item-name">{`${item}:`}</div>
              <div className="statistics__item-total">
                {todayStatisticValues[key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className={'statistics__container'}>
        <TabPanel
          dataToday={<DataToday />}
          dataPanel={dataPanel}
          ScheduleStatistics={<ScheduleStatistics data={graphData} />}
        />
      </div>
    );
  }
}

export default StatisticsPage;
