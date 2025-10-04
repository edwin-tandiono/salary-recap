import debounce from 'lodash/debounce';
import isNumber from 'lodash/isNumber';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'web/components/common/button';
import NavButton from 'web/components/common/nav-button';
import Navbar from 'web/components/common/navbar';
import { moveToTargetField } from 'web/utils/sheet';
import {
  saveTitle,
  loadTitle,
  saveEmployees,
  loadEmployees,
} from 'web/utils/storage';

import styles from './Sheet.module.scss';
import Table from './table';

import type { ChangeEventAdditionalData } from 'web/interfaces/form.interface';

export default function Sheet() {
  const navigate = useNavigate();
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const [title, setTitle] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employeeIndexToDelete, setEmployeeIndexToDelete] = useState<number|null>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { index, name, value }: ChangeEventAdditionalData & { index: number },
  ) => {
    setEmployees((prev) => {
      const updatedEmployees = [...prev];

      updatedEmployees[index] = {
        ...updatedEmployees[index],
        [name]: isNumber(updatedEmployees[index][name])
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

  const moveEmployee = useCallback(debounce((currentIndex: number, targetIndex: number) => {
     setEmployees((prev) => {
      const updatedEmployees = [...prev];
      updatedEmployees.splice(currentIndex, 1);
      updatedEmployees.splice(targetIndex, 0, prev[currentIndex]);

      return updatedEmployees;
    });
  }, 200), []);

  // On mount
  useEffect(() => {
    setTitle(loadTitle({ fallback: true }));
    setEmployees(loadEmployees({ fallback: true }));
  }, []);

  return (
    <div className={styles['sheet']}>
      <Navbar>
        <div className={styles['title']}>
          Rekap Gaji Bulan:
          &nbsp;&nbsp;
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <NavButton
          onClick={() => {
            saveTitle(title);
            saveEmployees(employees);
            navigate('/slip');
          }}
        >
          LANJUT KE SLIP &nbsp;&nbsp;&rarr;
        </NavButton>
      </Navbar>

      <main>
        <Table
          employees={employees}
          onAdd={addEmployee}
          onChange={handleChange}
          onDelete={confirmDeleteEmployee}
          onDrag={moveEmployee}
        />
      </main>

      <dialog
        ref={deleteDialogRef}
        className={styles['delete-dialog']}
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
