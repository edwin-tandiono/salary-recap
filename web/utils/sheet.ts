/**
 * Create new employee.
 * @author <tandiono98@gmail.com>
 * @returns {Array<Employee>}
 */
export const createEmplotee = () => {
  return {
    name: '',
    baseSalary: 0,
    mealAllowance: 0,
    mealAllowanceCount: 0,
    overtimePay: 0,
    overtimePayCount: 0,
    debtPaid: 0,
    remainingDebt: 0,
    bonusAllowance: 0,
    bonusAttendance: 0,
    bonusTransport: 0,
    bonus: 0,
  };
};

/**
 * Focus on specific target field
 * @author <tandiono98@gmail.com>
 * @param {Number} col 
 * @param {Number} row 
 */
export const moveToTargetField = (col: number, row: number) => {
  const targetField = document.querySelector<HTMLInputElement>(
    `[data-indexed-input-col="${col}"][data-indexed-input-row="${row}"]`,
  );

  if (targetField) {
    targetField.focus();
    targetField.select();
  }
};