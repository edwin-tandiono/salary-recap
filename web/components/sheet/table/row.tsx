import compact from 'lodash/compact';
import sum from 'lodash/sum';
import { useRef } from 'react';

import { format } from '../../../utils/currency';
import styles from '../Sheet.module.scss';

export default function Row({
  data,
  index,
}: {
  data: {
    name: string,
    baseSalary?: number,
    mealAllowance?: number,
    mealAllowanceCount?: number,
    overtimePay?: number,
    overtimePayCount?: number,
    debtPaid?: number,
    remainingDebt?: number,
    bonusAllowance?: number,
    bonusAttendance?: number,
    bonusTransport?: number,
    bonus?: number,
  },
  index: number,
}) {
  const {
    name,
    baseSalary,
    mealAllowance,
    mealAllowanceCount,
    overtimePay,
    overtimePayCount,
    debtPaid,
    remainingDebt,
    bonusAllowance,
    bonusAttendance,
    bonusTransport,
    bonus,
  } = data;

  const rowRef = useRef<HTMLTableRowElement>(null);
  const total = sum(compact([
    baseSalary,
    (mealAllowance || 0) * (mealAllowanceCount || 0),
    (overtimePay || 0) * (overtimePayCount || 0),
    bonusAllowance,
    bonusAttendance,
    bonusTransport,
    bonus,
  ])) - (debtPaid || 0);

  return (
    <tr ref={rowRef}>
      <td>{index + 1}</td>
      <td className={styles['align-left']}>{name}</td>
      <td>{baseSalary && format(baseSalary)}</td>
      <td className={`${styles['align-right']} ${styles['merged']}`}>{mealAllowance && format(mealAllowance)}</td>
      <td className={styles['merged']}>X</td>
      <td className={styles['merged']}>{mealAllowanceCount}</td>
      <td className={styles['merged']}>=</td>
      <td className={styles['align-right']}>{format((mealAllowance || 0) * (mealAllowanceCount || 0))}</td>
      <td className={`${styles['align-right']} ${styles['merged']}`}>{overtimePay && format(overtimePay)}</td>
      <td className={styles['merged']}>X</td>
      <td className={styles['merged']}>{overtimePayCount}</td>
      <td className={styles['merged']}>=</td>
      <td className={styles['align-right']}>{format((overtimePay || 0) * (overtimePayCount || 0))}</td>
      <td className={styles['merged']}>{debtPaid && format(debtPaid)}</td>
      <td className={styles['merged']}>=</td>
      <td>{remainingDebt && format(remainingDebt)}</td>
      <td>{bonusAllowance && format(bonusAllowance)}</td>
      <td>{bonusAttendance && format(bonusAttendance)}</td>
      <td>{bonusTransport && format(bonusTransport)}</td>
      <td>{bonus && format(bonus)}</td>
      <td className={styles['align-right']}>{format(total)}</td>
    </tr>
  );
};
