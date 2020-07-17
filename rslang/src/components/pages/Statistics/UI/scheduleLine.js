import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

const ScheduleStatistics = ({ data }) => (
  <div className='statistics__chart'>
    <ResponsiveLine
      data={data}
      margin={{
        top: 40, right: 50, bottom: 50, left: 50,
      }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear', stacked: true, min: 0,
      }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: '.2s',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      enableGridX
      gridXValues={'string'}
      lineWidth={2}
      pointSize={6}
      pointColor={{ from: 'color', modifiers: [] }}
      pointBorderWidth={1}
      pointBorderColor={{ from: 'serieColor' }}
      enablePointLabel={false}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 140,
          translateY: 49,
          itemsSpacing: 2,
          itemDirection: 'left-to-right',
          itemWidth: 180,
          itemHeight: 12,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </div>
);
ScheduleStatistics.propTypes = {
  data: PropTypes.array,
};

export default ScheduleStatistics;
