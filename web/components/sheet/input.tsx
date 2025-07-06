import isNumber from 'lodash/isNumber';
import { useEffect, useRef, useState } from 'react';

import { format } from 'web/utils/currency';
import { moveToTargetField } from 'web/utils/sheet';

import type { CustomChangeEventHandler } from 'web/interfaces/form.interface';

interface InputProps {
  col: number,
  format?: boolean
  index: number,
  name: string,
  onChange: CustomChangeEventHandler,
  value: string | number,
};

export default function Input({
  col,
  format: shouldFormat,
  index,
  name,
  onChange,
  value,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [localValue, setLocalValue] = useState<string>(value.toString());
  const [isFocused, setIsFocused] = useState(false);

  const displayedValue = typeof value === 'number' && shouldFormat
    ? format(localValue) === '0' ? '' : format(localValue)
    : value || '';

  const handleFocus = () => {
    setIsFocused(true);

    // setTimeout to ensure it runs after the focus event
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value;

    if (isNumber(value)) {
      formattedValue = formattedValue.replace(/[^0-9.]+/g, '');
    }

    setLocalValue(formattedValue);

    onChange(e, {
      name,
      index,
      value: formattedValue,
    });
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        inputRef.current?.blur();
        moveToTargetField(col, index + 1);
        break;

      case 'ArrowDown':
        e.preventDefault();
        moveToTargetField(col, index + 1);
        break;

      case 'ArrowUp':
        e.preventDefault();
        moveToTargetField(col, index - 1);
        break;

      case 'ArrowLeft':
        e.preventDefault();
        moveToTargetField(col - 1, index);
        break;
        
      case 'Tab':
      case 'ArrowRight':
        e.preventDefault();
        moveToTargetField(col + 1, index);
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
      inputRef.current.style.width = `${Math.max(displayedValue.toString().length + 0.5, 1)}ch`;
    }
  }, [displayedValue]);

  // Sync local value with prop value
  useEffect(() => {
    if (Number(value) !== Number(localValue)) {
      setLocalValue(value.toString());
    }
  }, [value]);

  return (
    <>
      <input
        ref={inputRef}
        autoComplete="off"
        data-indexed-input-col={col}
        data-indexed-input-row={index}
        draggable={false}
        name={name}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onDragStart={(e) => e.preventDefault()}
        onFocus={handleFocus}
        onKeyDown={handleKeydown}
        type="text"
        value={isFocused ? localValue : displayedValue}
      />
    </>
  );
};
