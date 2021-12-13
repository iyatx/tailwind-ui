import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

import styles from './index.module.css';

type UIInputProps = {
  label: string;
  type?: 'text' | 'email' | 'password';
  name: string;
  placeholder?: string;
  errorMessage?: string;
  register: UseFormRegister<any>;
  defaultValue?: string;
};

export const UIInput: React.FC<UIInputProps> = ({
  label,
  type = 'text',
  name,
  errorMessage,
  placeholder,
  register,
  defaultValue,
}) => {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.fieldWrapper}>
        <input
          defaultValue={defaultValue}
          id={name}
          type={type}
          className={classNames(
            styles.field,
            errorMessage
              ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
          )}
          placeholder={placeholder}
          {...register(name)}
        />
        {errorMessage && (
          <div className={styles.icon}>
            <ExclamationCircleIcon className='w-5 h-5' />
          </div>
        )}
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};
