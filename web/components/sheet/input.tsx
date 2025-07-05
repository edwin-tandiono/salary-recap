import isNumber from 'lodash/isNumber';
import { useEffect, useRef, useState } from 'react';

import { format } from 'web/utils/currency';

import type { CustomChangeEventHandler } from 'web/interfaces/form.interface';

interface InputProps {
  col: number,
  format?: boolean
  name: string,
  onChange: CustomChangeEventHandler,
  row: number,
  value: string | number,
};

const moveToTargetField = (col: number, row: number) => {
  const targetField = document.querySelector<HTMLInputElement>(
    `[data-indexed-input-col="${col}"][data-indexed-input-row="${row}"]`,
  );

  if (targetField) {
    targetField.focus();
    targetField.select();
  }
};

export default function Input({
  col,
  format: shouldFormat,
  name,
  onChange,
  row,
  value,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [localValue, setLocalValue] = useState<string>(value.toString());
  const [isFocused, setIsFocused] = useState(false);

  const displayedValue = typeof value === 'number' && shouldFormat
    ? format(localValue)
    : value;

  const handleFocus = () => {
    setIsFocused(true);

    // setTimeout to ensure it runs after the focus event
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value;

    if (isNumber(value)) {
      formattedValue = formattedValue.replace(/[^0-9.]+/g, '');
    }

    setLocalValue(formattedValue);
    console.log('Input value changed:', formattedValue);

    console.log('onChange', {...e})

    onChange(e, {
      name,
      row,
      value: formattedValue,
    });
  }

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        inputRef.current?.blur();
        moveToTargetField(col, row + 1);
        break;

      case 'ArrowDown':
        e.preventDefault();
        moveToTargetField(col, row + 1);
        break;

      case 'ArrowUp':
        e.preventDefault();
        moveToTargetField(col, row - 1);
        break;

      case 'Tab':
      case 'ArrowLeft':
        e.preventDefault();
        moveToTargetField(col - 1, row);
        break;

      case 'ArrowRight':
        e.preventDefault();
        moveToTargetField(col + 1, row);
        break;

      case 'Escape':
        e.preventDefault();
        inputRef.current?.blur();
        break;

      default:
    }
  };

  // Adjust input width on displayed value change
  useEffect(() => {
    if (inputRef.current) {
      console.log('Adjusting input width:', localValue, displayedValue);
      inputRef.current.style.width = `${Math.max(displayedValue.toString().length, 1)}ch`;
    }
  }, [displayedValue]);

  useEffect(() => {
    console.log('localvalue change', localValue)
  }, [localValue]);

  // Sync local value with prop value
  useEffect(() => {
    if (Number(value) !== Number(localValue)) {
      setLocalValue(value.toString());
    }
  }, [value]);

  return (
    <>
      <input
        autoComplete="off"
        ref={inputRef}
        data-indexed-input-col={col}
        data-indexed-input-row={row}
        name={name}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeydown}
        type="text"
        value={isFocused ? localValue : displayedValue}
      />
    </>
  );
};
