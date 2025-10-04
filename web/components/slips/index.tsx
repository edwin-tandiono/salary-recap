import isNumber from 'lodash/isNumber';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavButton from 'web/components/common/nav-button';
import Navbar from 'web/components/common/navbar';
import {
  saveTitle,
  loadTitle,
  saveEmployees,
  loadEmployees,
} from 'web/utils/storage';

import Slip from './slip';
import styles from './Slips.module.scss';

import type { ChangeEventAdditionalData } from 'web/interfaces/form.interface';

export default function Slips () {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [title, setTitle] = useState('');

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

  // On mount
  useEffect(() => {
    const titleFromStorage = loadTitle();
    const employeesFromStorage = loadEmployees();

    if (titleFromStorage === null || !employeesFromStorage) {
      navigate('/rekap', { replace: true });
    } else {
      setTitle(titleFromStorage);
      setEmployees(employeesFromStorage);
    }

  }, []);

  return (
    <div className={styles['slips']}>
      <Navbar>
        <NavButton
          onClick={() => {
            saveTitle(title);
            saveEmployees(employees);
            navigate('/rekap');
          }}
        >
          &larr;&nbsp;&nbsp; KEMBALI KE REKAP
        </NavButton>
        <NavButton to="#">
          PRINT &nbsp;&nbsp;&rarr;
        </NavButton>
      </Navbar>

      <div className={styles['container']}>
        <div className={styles['grid']}>
          {employees.map((employee, index) => (
            <Slip
              key={index}
              employee={employee}
              index={index}
              onChange={handleChange}
              title={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
