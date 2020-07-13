import React from 'react';
import TabPanel from './UI/TabPanel.jsx';
import { pagesData } from '../../../helpers/constants';
import MyResponsiveCalendarCanvas from './UI/scheduleLineStatistics'
import MyResponsiveLine from './UI/scheduleLine'
import data from './statData'
import './StatisticsPage.scss';

const statisticsTodayData = {
  name: ['Карточек завершено', 'Правильные ответы', 'Новые слова', 'Слова на повторение', 'Самая длинная серия правильных ответов'],
  total: ['50', '75%', '46', '4', '12'],
};

const dataPanel = ['Сегодня', 'За все время'];

const { name, total } = statisticsTodayData;

const StatisticsPage = () => (
  <div className={'statistics__container'} >
    <TabPanel
      dataToday={<DataToday />}
      dataPanel={dataPanel}
      myResponsiveCalendarCanvas={<MyResponsiveLine data={data} />}
    />

  </div >
);
export default StatisticsPage;

const DataToday = () => (
  <div className={'statistics__wrapp'}>
    <div className={'statistics__title'}>Серия завершена</div>
    <div className={'statistics__content'}>
      {name.map((item, key) => (
        <div className={'statistics__item'} key={key}>
          <div className={'statistics__item-name'}>{`${item}:`}</div>
          <div className={'statistics__item-total'}>{total[key]}</div>
        </div>
      ))}
    </div>
  </div>
);
