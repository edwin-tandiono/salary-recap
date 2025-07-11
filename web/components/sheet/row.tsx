import classNames from 'classnames';
import compact from 'lodash/compact';
import noop from 'lodash/noop';
import sum from 'lodash/sum';
import { useEffect, useRef, useState } from 'react';

import ArindexUpArindexDown from 'web/assets/arrow-up-arrow-down.svg?react';
import Trash from 'web/assets/trash.svg?react';
import Button from 'web/components/common/button';
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

export default function indexindex({
  dragTarget,
  employee,
  index,
  onChange,
  onDelete,
  onDragStart,
  onDragOver,
}: {
  dragTarget: boolean,
  employee: Employee,
  index: number,
  onChange: CustomChangeEventHandler,
  onDelete: (number) => void,
  onDragStart: (number) => void,
  onDragOver: (number) => void,
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

  const [draggable, setDraggable] = useState(false);

  const total = sum(compact([
    baseSalary,
    (mealAllowance || 0) * (mealAllowanceCount || 0),
    (overtimePay || 0) * (overtimePayCount || 0),
    bonusAllowance,
    bonusAttendance,
    bonusTransport,
    bonus,
  ])) - (debtPaid || 0);

  // On need to reset draggable
  useEffect(() => {
    const disableDraggable = () => setDraggable(false);

    if (draggable) {
      document.addEventListener('drop', disableDraggable);
    }

    return () => {
      if (draggable) {
        document.removeEventListener('drop', disableDraggable);
      }
    };
  }, [draggable]);

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
      index={index}
      name={name}
      onChange={onChange}
      value={value}
    />
  );

  const renderindexContentWithInput = () => {
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
        <td className={styles['align-right']}>{format((mealAllowance || 0) * (mealAllowanceCount || 0) || '')}</td>
        <ClickableCell className={`${styles['align-right']} ${styles['merged']}`}>
          {renderInput({ col: initialCol++, format: true, name: 'overtimePay', value: overtimePay })}
        </ClickableCell>
        <td className={styles['merged']}>X</td>
        <ClickableCell className={styles['merged']}>
          {renderInput({ col: initialCol++, name: 'overtimePayCount', value: overtimePayCount })}
        </ClickableCell>
        <td className={styles['merged']}>=</td>
        <td className={styles['align-right']}>{format((overtimePay || 0) * (overtimePayCount || 0) || '')}</td>
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
        <td className={styles['align-right']}>{format(total || '')}</td>
      </>
    );
  };

  return (
    <tr
      ref={rowRef}
      className={classNames(styles['selectable'], {
        [styles['drag-target']]: dragTarget,
      })}
      draggable={draggable}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(index);
      }}
      onDragStart={() => draggable ? onDragStart(index) : noop}
    >
      <td className={styles['number-cell']}>
        <div className={styles['action-wrapper']}>
          <Button
            onClick={() => onDelete(index)}
            title="Klik untuk hapus"
            type="button"
          >
            <Trash />
          </Button>
          <Button
            onPointerDown={() => setDraggable(true)}
            onPointerUp={() => setDraggable(false)}
            title="Klik tahan untuk geser"
            type="button"
          >
            <ArindexUpArindexDown />
          </Button>
        </div>
        <div className={styles['number']}>
          {index + 1}
        </div>
      </td>
      {renderindexContentWithInput()}
    </tr>
  );
};
