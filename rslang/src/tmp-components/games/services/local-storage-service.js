import { localStorageItems, maxLatestResultsCount } from '../Speakit/helpers/constants';

export default class LocalStorageService {
  constructor() {
    if (localStorage.getItem(localStorageItems.latestResults) === null) {
      localStorage.setItem(localStorageItems.latestResults, JSON.stringify([]));
    }
  }

  pushToLatestResults = (results) => {
    let currentLatestResults = this.getLatestResults();
    currentLatestResults.unshift(results);
    if (currentLatestResults.length > maxLatestResultsCount) {
      currentLatestResults = currentLatestResults.slice(0, maxLatestResultsCount);
    }
    localStorage.setItem(localStorageItems.latestResults, JSON.stringify(currentLatestResults));
  }

  getLatestResults = () => JSON.parse(localStorage.getItem(localStorageItems.latestResults));
}
