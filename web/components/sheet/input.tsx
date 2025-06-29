import { useEffect, useRef, useState } from 'react';

import { format } from 'web/utils/currency';

interface InputProps {
  col: number,
  format?: boolean
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  row: number,
  type: string,
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
  type,
  value,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const displayedValue = !isFocused && typeof value === 'number' && shouldFormat
    ? format(value)
    : value;

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
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
        return;
    }
  };

  // Adjust input width on displayed value change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${displayedValue.toString().length}ch`;
    }
  }, [displayedValue]);

  return (
    <input
      ref={inputRef}
      data-indexed-input-col={col}
      data-indexed-input-row={row}
      name={name}
      onChange={onChange}
      onFocus={() => {
        setIsFocused(true);

        setTimeout(() => {
          // Ensure the input is focused after the state update
          inputRef.current?.select();
        }, 0);
      }}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeydown}
      type={type}
      value={displayedValue}
    />
  );
};
