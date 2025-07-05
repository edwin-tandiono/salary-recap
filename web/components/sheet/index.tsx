import isNumber from 'lodash/isNumber';
import range from 'lodash/range';
import { useRef, useState } from 'react';

import Button from 'web/components/common/button';

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
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const [title, setTitle] = useState('JUNI 2025');
  const [employees, setEmployees] = useState(DUMMY_DATA);
  const [employeeIndexToDelete, setEmployeeIndexToDelete] = useState<number|null>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, row, value }: ChangeEventAdditionalData & { row: number },
  ) => {
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
  
  const addEmployee = () => {
    setEmployees((prev) => [
      ...prev,
      {
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
      },
    ]);
  };

  const confirmDeleteEmployee = (index) => {
    setEmployeeIndexToDelete(index);
    deleteDialogRef.current.showModal();
  };

  const deleteEmployee = () => {
    setEmployees((prev) => {
      const updatedEmployees = [...prev];
      updatedEmployees.splice(employeeIndexToDelete, 1);

      return updatedEmployees;
    });
    setEmployeeIndexToDelete(null);
  };

  return (
    <div className={styles['sheet']}>
      <nav>
        <div className={styles['title']}>
          Rekap Gaji Bulan:
          &nbsp;&nbsp;
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
      </nav>

      <main>
        <Table
          employees={employees}
          onAdd={addEmployee}
          onDelete={confirmDeleteEmployee}
          onChange={handleChange}
        />
      </main>

      <dialog
        ref={deleteDialogRef}
        className={styles['delete-dialog']}
        closedBy="any"
      >
        {`Hapus ${employees[employeeIndexToDelete]?.name || employeeIndexToDelete + 1}?`}
        <br />
        <br />
        <div className={styles['actions']}>
          <Button
            onClick={() => {
              deleteDialogRef.current.close();
              deleteEmployee();
            }}
            type="button"
          >
            Hapus
          </Button>
          <Button onClick={() => deleteDialogRef.current.close()} type="button">
            Batal
          </Button>
        </div>
      </dialog>
    </div>
  );
}
