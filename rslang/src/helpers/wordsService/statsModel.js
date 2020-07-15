import moment from 'moment';
import { applicationThings } from '../constants';

export const statsTemplate = {
  learnedWords: 0,
  optional: {
    learnWords: {},
    savannah: {},
    sprint: {},
    audiocall: {},
    speakIt: {},
    puzzle: {},
    unmess: {},
  },
};

export const statsThingNames = {
  LEARNED: 'learned',
  IN_SCOPE: 'inScope',
  SEMI_LEARNED: 'semiLearned',
  COMPLICATED: 'complicated',
  REMOVED: 'removed',
  GAMES: 'games',
  WRONG: 'wrong',
  RIGHT: 'right',
};

export const statsGameObjTemplate = {
  games: 0,
  wrong: 0,
  right: 0,
};

export const statsLearnObjTemplate = {
  learned: 0,
  inScope: 0,
  semiLearned: 0,
  complicated: 0,
  removed: 0,
};

export const statsGameStringTemplate = '0-0-0';
export const statsLearnStringTemplate = '0-0-0-0-0';

export const gameResultsEncodeMap = {
  games: 0,
  wrong: 1,
  right: 2,
};

export const gameResultsDecodeMap = ['games', 'wrong', 'right'];

export const learnResultsEncodeMap = {
  learned: 0,
  inScope: 1,
  semiLearned: 2,
  complicated: 3,
  removed: 4,
};

export const learnResultsDecodeMap = [
  'learned',
  'inScope',
  'semiLearned',
  'complicated',
  'removed',
];

export const encodeStatsToString = (resultsObject, encodeMap) => {
  const result = [];
  Object.entries(resultsObject).forEach((el) => {
    const currentKey = encodeMap[el[0]];
    [, result[currentKey]] = el;
  });
  return result.join('-') || '';
};

export const decodeStatsFromString = (statsString, decodeMap) => {
  const result = {};
  statsString.split('-').forEach((el, i) => {
    const currentKey = decodeMap[i];
    result[currentKey] = Number(el);
  });
  return result || {};
};

export const getToday = () => {
  const year = moment().format('YYYY');
  const month = moment().format('MM');
  const day = moment().format('DD');
  return { year, month, day };
};

export const sumObjectsProperties = (object1, object2) => {
  let result = {};
  if (object1 || object2) {
    Object.keys(object1).forEach((el) => {
      result[el] = object1[el] + object2[el];
    });
  } else {
    result = { ...object1 };
  }
  return result;
};

export const updateStatsByThing = (
  thingName,
  newResults,
  statsObject,
  decodeMap,
  encodeMap,
  decodedTemplate,
) => {
  console.log(thingName,
    newResults,
    statsObject,
    decodeMap,
    encodeMap,
    decodedTemplate,
  );
  let dayKey = {};
  let decodedCurrent = decodedTemplate;
  const { year, month, day } = getToday();
  const updatedStats = { ...statsObject };
  const thingStats = updatedStats.optional[thingName];
  const yearKey = thingStats[year] ? thingStats[year] : {};
  const monthKey = yearKey[month] ? yearKey[month] : {};
  if (monthKey[day]) {
    dayKey = monthKey[day] ? monthKey[day] : decodedTemplate;
    decodedCurrent = decodeStatsFromString(dayKey, decodeMap);
  }
  const updated = sumObjectsProperties(decodedCurrent, newResults);
  const ecodedCurrent = encodeStatsToString(updated, encodeMap);
  console.log(updated, ecodedCurrent);
  monthKey[day] = ecodedCurrent;
  yearKey[month] = monthKey;
  thingStats[year] = yearKey;
  updatedStats.optional[thingName] = thingStats;
  return { ...updatedStats };
};

export const updateLearnStats = (
  thingName,
  newResults,
  statsObject,
  decodeMap = learnResultsDecodeMap,
  encodeMap = learnResultsEncodeMap,
  decodedTemplate = statsLearnObjTemplate,
) => (
  updateStatsByThing(
    thingName,
    newResults,
    statsObject,
    decodeMap,
    encodeMap,
    decodedTemplate,
  )
);

export const updateGameStats = (
  thingName,
  newResults,
  statsObject,
  decodeMap = gameResultsDecodeMap,
  encodeMap = gameResultsEncodeMap,
  decodedTemplate = statsGameObjTemplate,
) => (
  updateStatsByThing(
    thingName,
    newResults,
    statsObject,
    decodeMap,
    encodeMap,
    decodedTemplate,
  )
);

export const changeStats = (
  thingName,
  newResults,
  statsObject,
) => (
  thingName === applicationThings.LEARN_WORDS
    ? updateLearnStats(thingName, newResults, statsObject)
    : updateGameStats(thingName, newResults, statsObject)
);

export const decodesStatsToGraph = (
  statsThingObject,
  decodeMapArray,
) => {
  const result = [];
  let param;
  let index;
  let paramData;
  decodeMapArray.forEach((name, i) => {
    index = i;
    Object.entries(statsThingObject).forEach((year) => {
      Object.entries(year[1]).forEach((months) => {
        paramData = [];
        Object.entries(months[1]).forEach((days) => {
          param = {
            x: `${year[0]}-${months[0]}-${days[0]}`,
            y: Number(days[1].split('-')[index]),
          };
          paramData.push(param);
        });
      });
    });
    result.push({ [name]: paramData });
  });

  return result;
};
// ---------------------------------------------------
export const changeSessionStatsObject = (statsObject, keyName, keyValue) => {
  const result = { ...statsObject };
  result[keyName] += keyValue;
  return result;
};
