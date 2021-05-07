/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (!obj) return;

  const arEntries = Object.entries(obj);
  if (!arEntries.length) return {};
  
  return Object.fromEntries(arEntries.map(item => {
      return item.reverse();
    })
  )
}
