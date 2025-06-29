/**
 * Format amount to currect with separators.
 * @author tandiono98@gmail.com
 * @param {Number} value
 * @returns {String}
 * @example
 * // returns '3,000,002.123'
 * format(3000002.123);
 */
export const format = (value: number) => {
  const stringifiedValue = value.toString();

  if (stringifiedValue.length <= 3) {
    return stringifiedValue;
  }

  let stringWithSeparator = stringifiedValue;
  let index = stringifiedValue.indexOf('.') > 0 ? stringifiedValue.indexOf('.'): stringifiedValue.length;

  while (index > 3) {
    const indexToInsertSeparator = index - 3;

    stringWithSeparator = `${stringWithSeparator.slice(0, indexToInsertSeparator)},${stringWithSeparator.slice(indexToInsertSeparator)}`;

    index -= 3;
  }

  return stringWithSeparator;
};