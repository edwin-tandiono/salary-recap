import isNumber from 'lodash/isNumber';
import range from 'lodash/range';
import { useState } from 'react';


import styles from './Sheet.module.scss';
import Table from './table';

import type { ChangeEventAdditionalData } from 'web/interfaces/form.interface';

const DUMMY_DATA = range(2).map(() => ({
  name: 'Andy McAndyFace',
  baseSalary: 1570000,
  mealAllowance: 30000,
  mealAllowanceCount: 24,
  overtimePay: 50000,
  overtimePayCount: 26,
  debtPaid: 125000,
  remainingDebt: 500000,
  bonusAllowance: 5000,
  bonusAttendance: 10000,
  bonusTransport: 0,
  bonus: 0,
}));

export function Sheet() {
  const [employees, setEmployees] = useState(DUMMY_DATA);

  const handleChange = (e: React.ChangeEvent, {
    name,
    row,
    value,
  }: ChangeEventAdditionalData & { row: number }) => {
    console.log('handleChange', row, name, value);

    setEmployees((prev) => {
      const updatedEmployees = [...prev];

      updatedEmployees[row] = {
        ...updatedEmployees[row],
        [name]: isNumber(updatedEmployees[row][name])
          ? Number(value)
          : value,
      };

      return updatedEmployees;
    });
  };

  return (
    <div className={styles['sheet']}>
      <nav>
        <span>
          <small>Rekap Gaji Bulan:</small>
          &nbsp;
          <h3><b>JUNI 2025</b></h3>
        </span>
      </nav>
      <main>
        <Table employees={employees} onChange={handleChange} />
      </main>
    </div>
  );
}
