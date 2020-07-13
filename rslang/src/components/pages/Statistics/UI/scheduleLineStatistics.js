import React from 'react';
import { ResponsiveCalendarCanvas } from '@nivo/calendar';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveCalendarCanvas = ({ data /* see data tab */ }) => (
  <div style={{ height: 'calc(100vh - 260px)' }}>
    <ResponsiveCalendarCanvas
      data={data}
      from="2020-07-13"
      to="2020-07-20"
      emptyColor="#eeeeee"
      colors={['#97e3d5', '#61cdbb', '#e8c1a0', '#f47560']}
      asign={'top'}
      margin={{
        top: 0, right: 40, bottom: 50, left: 40,
      }}
      direction="horizontal"
      monthBorderColor="#ffffff"
      dayBorderWidth={3}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left',
        },
      ]}
    />
  </div>
)
  ;

export default MyResponsiveCalendarCanvas;
