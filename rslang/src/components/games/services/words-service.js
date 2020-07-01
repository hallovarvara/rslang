export default class WordsService {
  getAllWords = async (pageCount, groupsCount) => {
    const allWords = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    };
    async function wordsRequest(page, group) {
      const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
      const result = await fetch(url);
      const json = await result.json();
      allWords[`${group}`] = allWords[`${group}`].concat(json);
    }
    const allRequests = [];
    for (let group = 0; group < groupsCount; group += 1) {
      for (let page = 0; page < pageCount; page += 1) {
        allRequests.push(wordsRequest(page, group));
      }
    }
    await Promise.all(allRequests);
    return allWords;
  }
}
