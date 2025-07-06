import isNumber from 'lodash/isNumber';
import sumBy from 'lodash/sumBy';
import { useEffect, useRef, useState } from 'react';

import Button from 'web/components/common/button';
import Justify from 'web/components/common/justify';
import { format } from 'web/utils/currency';

import Row from './row';
import styles from './Sheet.module.scss';


import type { Employee } from 'web/interfaces/employee.interface';
import type { CustomChangeEventHandler } from 'web/interfaces/form.interface';


export default function Table({
  employees,
  onAdd,
  onDelete,
  onChange,
  onDrag,
}: {
  employees: Array<Employee>,
  onAdd: () => void,
  onDelete: (number) => void,
  onChange: CustomChangeEventHandler,
  onDrag: (currentIndex: number, targetIndex: number) => void,
}) {
  const currentDragIndex = useRef<number|null>(null);

  const [targetDragIndex, setTargetDragIndex] = useState<number|null>();

  const handleDragStart = (index: number) => {
    currentDragIndex.current = index;
  };

  const handleDragOver = (index:number) => {
    if (currentDragIndex.current !== index) {
      onDrag(currentDragIndex.current, index);

      currentDragIndex.current = index;
      setTargetDragIndex(index);
    }
  };

  // On need to reset targetDragIndex
  useEffect(() => {
    const resetTargetDragIndex = () => setTargetDragIndex(null);

    if (isNumber(targetDragIndex)) {
      document.addEventListener('drop', resetTargetDragIndex);
    }

    return () => {
      if (isNumber(targetDragIndex)) {
        document.removeEventListener('drop', resetTargetDragIndex);
      }
    };
  }, [targetDragIndex]);

  return (
    <table className={styles['table']}>
      <thead>
        <tr>
          <td rowSpan={2}>No.</td>
          <td rowSpan={2}>Nama</td>
          <td rowSpan={2}>Gaji Pokok</td>
          <td colSpan={5} rowSpan={2}>Uang Makan</td>
          <td colSpan={5} rowSpan={2}>Lemburan</td>
          <td colSpan={3} rowSpan={2}>Cicilan = Sisa</td>
          <td className={styles['bonus-upper']} colSpan={4}>
            Bonus
          </td>
          <td rowSpan={2}>Jumlah</td>
        </tr>
        <tr>
          <td className={styles['bonus-lower']}>Tunjangan</td>
          <td className={styles['bonus-lower']}>Absensi</td>
          <td className={styles['bonus-lower']}>Transport</td>
          <td className={styles['bonus-lower']}>Bonus</td>
        </tr>
      </thead>

      <tbody>
        {employees.map((employee, index) => (
          <Row
            key={index}
            dragTarget={targetDragIndex === index}
            employee={employee}
            index={index}
            onChange={onChange}
            onDelete={onDelete}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
          />
        ))}

        <tr className={styles['middle-padding']}>
          <td colSpan={2}>&nbsp;</td>
          <td />
          <td colSpan={5} />
          <td colSpan={5} />
          <td colSpan={3} />
          <td colSpan={4} />
          <td />
        </tr>

        <tr className={styles['add-employee']}>
          <td colSpan={21}>
            <Button
              onClick={onAdd}
              type="button"
            >
              <b>Tambah Karyawan</b>
            </Button>
           </td>
        </tr>

        <tr className={styles['bottom-padding']}>
          <td colSpan={2} />
          <td />
          <td colSpan={5} />
          <td colSpan={5} />
          <td colSpan={3} />
          <td colSpan={4} />
          <td />
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={2}><b>TOTAL</b></td>
          <td><b>{format(sumBy(employees, 'baseSalary'))}</b></td>
          <td colSpan={5}>
            <Justify>
              <span>(+)</span>
              <b>{format(sumBy(employees, (employee) => employee.mealAllowance * employee.mealAllowanceCount))}</b>
            </Justify>
          </td>
          <td colSpan={5}>
            <Justify>
              <span>(+)</span>
              <b>{format(sumBy(employees, (employee) => employee.overtimePay * employee.overtimePayCount))}</b>
            </Justify>
          </td>
          <td colSpan={3}>
            <Justify>
              <span>(-)</span>
              <b>{format(sumBy(employees, (employee) => employee.debtPaid))}</b>
            </Justify>
          </td>
          <td colSpan={4}>
            <Justify>
              <span>(+)</span>
              <b>
                {format(sumBy(employees, (employee) => 
                  employee.bonusAllowance + employee.bonusAttendance + employee.bonusTransport + employee.bonus,
                ))}
              </b>
            </Justify>
          </td>
          <td className={styles['align-right']}>
            <b>
               {format(sumBy(employees, (employee) => 
                  employee.baseSalary
                  + employee.mealAllowance * employee.mealAllowanceCount
                  + employee.overtimePay * employee.overtimePayCount
                  - employee.debtPaid
                  + employee.bonusAllowance
                  + employee.bonusAttendance
                  + employee.bonusTransport
                  + employee.bonus,
                ))}
            </b>
          </td>
        </tr>
      </tfoot>
    </table>
  ); 
};
