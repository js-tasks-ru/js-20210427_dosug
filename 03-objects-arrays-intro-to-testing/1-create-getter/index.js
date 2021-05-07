/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arPath = path.split('.');

  return function fn(obj, index = 0) {
    if (obj === undefined) return;

    if (index === arPath.length - 1) {
      return obj[arPath[index]];
    } else {
      return fn(obj[arPath[index]], ++index);
    }
  }
}
