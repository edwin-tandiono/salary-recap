import { DEMO_EMPLOYEES } from 'web/constants/demo';

import type { Employee } from 'web/interfaces/employee.interface';

const STORAGE_KEY = {
  TITLE: 'sheetTitle',
  EMPLOYEES: 'sheetEmployees',
};

/**
 * Save title to local storage
 * @author <tandiono98@gmail.com>
 * @param {String} title 
 */
export const saveTitle = (title: string) => {
  window.localStorage.setItem(STORAGE_KEY.TITLE, title);
};

/**
 * Get title from storage
 * @author <tandiono98@gmail.com>
 * @param {Object} [options]
 * @param {Boolean} [options.fallback=false]
 * @returns {String|null} 
 */
export const loadTitle = ({
  fallback = false,
}: {
  fallback?: boolean
} = {}): string | null => {
  const title = window.localStorage.getItem(STORAGE_KEY.TITLE);

  if (title !== null || !fallback) {
    return title;
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString('id', { month: 'long' });

  return `${month.toUpperCase()} ${year}`;
};

/**
 * Save title to local storage
 * @author <tandiono98@gmail.com>
 * @param {Array<Employee>} employees 
 */
export const saveEmployees = (employees: Array<Employee>) => {
  window.localStorage.setItem(
    STORAGE_KEY.EMPLOYEES,
    JSON.stringify(employees.filter((employee) => employee.name)),
  );
};

/**
 * Get title from storage
 * @author <tandiono98@gmail.com>
 * @param {Object} [options]
 * @param {Boolean} [options.fallback=false]
 * @returns {Array<Employee>|null} 
 */
export const loadEmployees = ({
  fallback = false,
}: {
  fallback?: boolean
} = {}): Array<Employee> | null => {
  const employees = window.localStorage.getItem(STORAGE_KEY.EMPLOYEES);

  if (!employees) {
    if (fallback) {
      return DEMO_EMPLOYEES;
    } else {
      return null;
    }
  }

  let parsedEmployees = fallback ? DEMO_EMPLOYEES : undefined;
   
  try {
    parsedEmployees = JSON.parse(employees);
  } catch (e) {
    console.error(e);
  }

  return parsedEmployees;
};
