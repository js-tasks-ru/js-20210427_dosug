/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  if (param === 'asc') {
    return arr.slice().sort((a, b) => {

      // Проверка на идентичность строк в одном регистре для
      // выставления вперёд строк с заглавной.
      if (a.toUpperCase() === b.toUpperCase() &&
          a.localeCompare(b) === 1
        ) {
          return -1;
      }

      return a.localeCompare(b);
    });
  }

  if (param === 'desc') {
    return arr.slice().sort((a, b) => {

      // нет необходимости делать туже проверку, т.к.
      // системно прописные и так тяжелее заглавных.
      return b.localeCompare(a);
    });
  }
}
