import moment from 'moment';

const data = [
  {
    id: 'Выученные',
    data: [
      {
        x: moment().format('MMM DD'),
        y: 12,
      },
      {
        x: moment().add(1, 'd').format('MMM DD'),
        y: 15,
      },
      {
        x: moment().add(2, 'd').format('MMM DD'),
        y: 4,
      },
      {
        x: moment().add(3, 'd').format('MMM DD'),
        y: 21,
      },
      {
        x: moment().add(4, 'd').format('MMM DD'),
        y: 11,
      },
      {
        x: moment().add(5, 'd').format('MMM DD'),
        y: 7,
      },
    ],
  },
  {
    id: 'Изучаемые',
    data: [
      {
        x: moment().format('MMM DD'),
        y: 65,
      },
      {
        x: moment().add(1, 'd').format('MMM DD'),
        y: 49,
      },
      {
        x: moment().add(2, 'd').format('MMM DD'),
        y: 89,
      },
      {
        x: moment().add(3, 'd').format('MMM DD'),
        y: 32,
      },
      {
        x: moment().add(4, 'd').format('MMM DD'),
        y: 77,
      },
      {
        x: moment().add(5, 'd').format('MMM DD'),
        y: 99,
      },
    ],
  },
  {
    id: 'Наполовину выученные',
    data: [
      {
        x: moment().format('MMM DD'),
        y: 5,
      },
      {
        x: moment().add(1, 'd').format('MMM DD'),
        y: 4,
      },
      {
        x: moment().add(2, 'd').format('MMM DD'),
        y: 32,
      },
      {
        x: moment().add(3, 'd').format('MMM DD'),
        y: 12,
      },
      {
        x: moment().add(4, 'd').format('MMM DD'),
        y: 11,
      },
      {
        x: moment().add(5, 'd').format('MMM DD'),
        y: 21,
      },
    ],
  },
  {
    id: 'Сложные',
    data: [
      {
        x: moment().format('MMM DD'),
        y: 3,
      },
      {
        x: moment().add(1, 'd').format('MMM DD'),
        y: 5,
      },
      {
        x: moment().add(2, 'd').format('MMM DD'),
        y: 6,
      },
      {
        x: moment().add(3, 'd').format('MMM DD'),
        y: 9,
      },
      {
        x: moment().add(4, 'd').format('MMM DD'),
        y: 11,
      },
      {
        x: moment().add(5, 'd').format('MMM DD'),
        y: 13,
      },
    ],
  },
  {
    id: 'Удаленные',
    data: [
      {
        x: moment().format('MMM DD'),
        y: 12,
      },
      {
        x: moment().add(1, 'd').format('MMM DD'),
        y: 14,
      },
      {
        x: moment().add(2, 'd').format('MMM DD'),
        y: 17,
      },
      {
        x: moment().add(3, 'd').format('MMM DD'),
        y: 24,
      },
      {
        x: moment().add(4, 'd').format('MMM DD'),
        y: 6,
      },
      {
        x: moment().add(5, 'd').format('MMM DD'),
        y: 8,
      },
    ],
  },
];

export default data;
