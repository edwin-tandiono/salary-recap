import { format } from 'web/utils/currency';

import styles from './Slips.module.scss';

import type { Employee } from 'web/interfaces/employee.interface';
import type { CustomChangeEventHandler } from 'web/interfaces/form.interface';

export default function Slip ({
  employee,
  index,
  onChange,
  title,
}: {
  title: string,
  index: number,
  onChange: CustomChangeEventHandler,
  employee: Employee
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
    note,
  } = employee;

  return (
    <div className={styles['slip']}>
      <div className={styles['slip__title']}>
        TANDA TERIMA GAJI BULAN:
        {' '}
        <b>{title}</b>
      </div>
      <div className={styles['slip__name']}>
        <b>{name}</b>
      </div>
      <div className={styles['slip__calculation']}>
        <div className={styles['slip__calculation__row']}>
          <span>Gaji Pokok</span>
          <span />
          <span>{format(baseSalary)}</span>
        </div>

        <div className={styles['slip__calculation__row']}>
          <span>Uang Makan</span>
          <span>
            {`${format(mealAllowance)} X ${mealAllowanceCount} =`}
          </span>
          <span>{format(mealAllowance * mealAllowanceCount)}</span>
        </div>

        <div className={styles['slip__calculation__row']}>
          <span>Uang Lembur</span>
          <span>
            {`${format(overtimePay)} X ${overtimePayCount} =`}
          </span>
          <span>{format(overtimePay * overtimePayCount)}</span>
        </div>

        <div className={styles['slip__calculation__row']}>
          <span>Tunjangan</span>
          <span />
          <span>{format(bonusAllowance)}</span>
        </div>

        <div className={styles['slip__calculation__row']}>
          <span>Uang Absensi</span>
          <span />
          <span>{format(bonusAttendance)}</span>
        </div>

        <div className={styles['slip__calculation__row']}>
          <span>Uang Transport</span>
          <span />
          <span>{format(bonusTransport)}</span>
        </div>

        <div className={styles['slip__calculation__row']}>
          <span>Bonus</span>
          <span />
          <span>{format(bonus)}</span>
        </div>

        <div className={styles['slip__calculation__row']}>
          <span>Cicilan</span>
          <span>{debtPaid ? '-' : ''}</span>
          <span>{debtPaid ? format(debtPaid) : ''}</span>
        </div>
      </div>
    </div>
  );
}