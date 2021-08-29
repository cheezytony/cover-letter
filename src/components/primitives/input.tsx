/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { InputHTMLAttributes, useEffect, useState } from 'react';

export type InputSelectOption = {
  title: string
  value: InputValue
}

export interface InputSelectInterface {
  options?: InputSelectOption[]
  placeholder?: string
  name?: string
  id?: string
  className?: string
  value?: InputValue
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: InputValue) => void
}

export type InputValue = string | number | boolean | null;

export function Input({
  type = 'text', className = '', ...otherProps
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={`form__input ${className}`}
      {...otherProps}
    />
  );
}

export function InputSelect({
  className = '', id, placeholder, value, options = [], onChange = () => { },
}: InputSelectInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<InputSelectOption>();
  const selectOption = (option: InputSelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option?.value);
  };

  useEffect(() => {
    const option = options.find((op) => op.value === value);
    setSelectedOption(option);
  }, [value]);

  return (
    <div
      className={
        'form__input form__input__select'
        + `${isOpen ? ' form__input--is-focused form__input__select--is-open' : ''}`
        + `${selectedOption ? ' form__input__select--has-value' : ''}`
        + ` ${className}`
      }
    >
      <label>
        <input type="checkbox" id={id} onChange={() => setIsOpen(!isOpen)} />
        <span>{selectedOption?.title || placeholder}</span>
      </label>
      <ul className="form__input__select__options">
        {options.map((option: InputSelectOption) => (
          <li key={option.title} className={option === selectedOption ? 'selected' : ''}>
            <span
              role="listitem"
              onClick={() => selectOption(option)}
              onKeyDown={() => { }}
            >
              {option.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InputCheckbox({
  checked, children, id, name, onChange = () => { },
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="form__input__checkbox" htmlFor={id}>
      <input type="checkbox" name={name} id={id} checked={checked} onChange={onChange} />
      <span>
        <span>
          <span />
        </span>
        <span>
          {children}
        </span>
      </span>
    </label>
  );
}
