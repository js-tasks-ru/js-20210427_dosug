/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr = []) {
  const newArr = [];
  const set = new Set(arr);
  
  set.forEach(item => {
    newArr.push(item);
  })
  
  return newArr;
}
