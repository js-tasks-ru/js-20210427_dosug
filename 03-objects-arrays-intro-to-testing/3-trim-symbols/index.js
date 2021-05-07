/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (!string.length || size === 0) return '';
  if (!size) return string;

  let newStr = '';

  for (let i = 0, 
           prevSymb = '', 
           currSymb = '', 
           sizeLeft = size; 
           i < string.length; 
           i++
    ) {
    currSymb = string[i];
    prevSymb = string[i - 1] || '';

    if (prevSymb !== currSymb) {
      sizeLeft = size;
    }

    if (sizeLeft) {
      newStr += currSymb;
      sizeLeft--;
    }
  }

  return newStr;
}
