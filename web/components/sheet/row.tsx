import compact from 'lodash/compact';
import sum from 'lodash/sum';
import { useRef } from 'react';

import { format } from 'web/utils/currency';

import Input from './input';
import styles from './Sheet.module.scss';

import type { Employee } from 'web/interfaces/employee.interface';
import type { CustomChangeEventHandler } from 'web/interfaces/form.interface';

function ClickableCell(
  { children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>
    & { children?: React.ReactNode },
) {  const cellRef = useRef<HTMLTableCellElement>(null);

  const handleClick = () => {
    if (cellRef.current) {
      // Focus on the input element within the cell
      cellRef.current.querySelector('input')?.focus();
    }
  };

  return (
    <td ref={cellRef} onClick={handleClick} {...props}>
      {children}
    </td>
  );
};

export default function Row({
  employee,
  row,
  onChange,
}: {
  employee: Employee,
  row: number,
  onChange: CustomChangeEventHandler,
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
  } = employee;

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

  const renderInput = ({
    col,
    format,
    name,
    value,
  }: {
    col: number
    format?: boolean,
    name: string,
    value: string | number,
  }) => (
    <Input
      col={col + 1}
      format={format}
      name={name}
      onChange={onChange}
      row={row}
      value={value}
    />
  );

  const renderRowContentWithInput = () => {
    let initialCol = 0;

    return (
      <>
        <ClickableCell className={styles['align-left']}>
          {renderInput({ col: initialCol++, name: 'name', value: name })}
        </ClickableCell>
        <ClickableCell>
          {renderInput({ col: initialCol++, format: true, name: 'baseSalary', value: baseSalary })}
        </ClickableCell>
        <ClickableCell className={`${styles['align-right']} ${styles['merged']}`}>
          {renderInput({ col: initialCol++, format: true, name: 'mealAllowance', value: mealAllowance })}
        </ClickableCell>
        <td className={styles['merged']}>X</td>
        <ClickableCell className={styles['merged']}>
          {renderInput({ col: initialCol++, name: 'mealAllowanceCount', value: mealAllowanceCount })}
        </ClickableCell>
        <td className={styles['merged']}>=</td>
        <td className={styles['align-right']}>{format((mealAllowance || 0) * (mealAllowanceCount || 0))}</td>
        <ClickableCell className={`${styles['align-right']} ${styles['merged']}`}>
          {renderInput({ col: initialCol++, format: true, name: 'overtimePay', value: overtimePay })}
        </ClickableCell>
        <td className={styles['merged']}>X</td>
        <ClickableCell className={styles['merged']}>
          {renderInput({ col: initialCol++, name: 'overtimePayCount', value: overtimePayCount })}
        </ClickableCell>
        <td className={styles['merged']}>=</td>
        <td className={styles['align-right']}>{format((overtimePay || 0) * (overtimePayCount || 0))}</td>
        <ClickableCell className={styles['merged']}>
          {renderInput({ col: initialCol++, format: true, name: 'debtPaid', value: debtPaid })}
        </ClickableCell>
        <td className={styles['merged']}>=</td>
        <ClickableCell>
          {renderInput({ col: initialCol++, format: true, name: 'remainingDebt', value: remainingDebt })}
        </ClickableCell>
        <ClickableCell>
          {renderInput({ col: initialCol++, format: true, name: 'bonusAllowance', value: bonusAllowance })}
        </ClickableCell>
        <ClickableCell>
          {renderInput({ col: initialCol++, format: true, name: 'bonusAttendance', value: bonusAttendance })}
        </ClickableCell>
        <ClickableCell>
          {renderInput({ col: initialCol++, format: true, name: 'bonusTransport', value: bonusTransport })}
        </ClickableCell>
        <ClickableCell>
          {renderInput({ col: initialCol++, format: true, name: 'bonus', value: bonus })}
        </ClickableCell>
        <td className={styles['align-right']}>{format(total)}</td>
      </>
    );
  };

  return (
    <tr className={styles['selectable']} ref={rowRef}>
      <td>{row + 1}</td>
      {renderRowContentWithInput()}
    </tr>
  );
};
