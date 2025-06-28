import range from 'lodash/range';

import Row from './row';
import styles from '../Sheet.module.scss';

const DUMMY_DATA = {
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
  bonusTransport: undefined,
  bonus: undefined,
};

export default function Table() {
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
        {range(50).map((data, index) => (
          <Row key={DUMMY_DATA.name} data={DUMMY_DATA} index={index} />
        ))}
      </tbody>
    </table>
  ); 
};
