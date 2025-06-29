import range from 'lodash/range';

import Row from './row';
import styles from './Sheet.module.scss';
import type { Employee } from 'web/interfaces/employee.interface';

export default function Table({
  employees,
  onChange,
}: {
  employees: Array<Employee>,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}) {
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
          <td className={styles['bonus__upper']} colSpan={4}>
            Bonus
          </td>
          <td rowSpan={2}>Jumlah</td>
        </tr>
        <tr>
          <td className={styles['bonus__lower']}>Tunjangan</td>
          <td className={styles['bonus__lower']}>Absensi</td>
          <td className={styles['bonus__lower']}>Transport</td>
          <td className={styles['bonus__lower']}>Bonus</td>
        </tr>
      </thead>

      <tbody className={styles['table__body']}>
        {employees.map((employee, row) => (
          <Row
            key={employee.name}
            employee={employee}
            onChange={onChange}
            row={row}
          />
        ))}
      </tbody>
    </table>
  ); 
};
