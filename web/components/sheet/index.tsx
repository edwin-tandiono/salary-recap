import isNumber from 'lodash/isNumber';
import { useRef, useState } from 'react';

import Button from 'web/components/common/button';
import { DEMO_EMPLOYEES } from 'web/constants/demo';
import { moveToTargetField } from 'web/utils/sheet';

import styles from './Sheet.module.scss';
import Table from './table';

import type { ChangeEventAdditionalData } from 'web/interfaces/form.interface';

export function Sheet() {
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const [title, setTitle] = useState('JUNI 2025');
  const [employees, setEmployees] = useState(DEMO_EMPLOYEES);
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

    setTimeout(() => moveToTargetField(1, employees.length), 0);
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
