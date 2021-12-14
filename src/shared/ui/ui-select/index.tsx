import React from 'react';
import classNames from 'classnames';
import Select, { Props } from 'react-select';
import { Control, Controller, UseFormClearErrors } from 'react-hook-form';

import styles from './index.module.css';

type ISelect = {
  id: number | string;
  title?: string;
  [key: string]: any;
};

type UISelectProps = {
  options: ISelect[];
  name: string;
  control: Control;
  clearErrors: UseFormClearErrors<any>;
  placeholder?: string;
  defaultOptionValue?: any;
  selectOptions?: Props<any>;
  label?: string;
  errorMessage?: string;
};

export const UISelect: React.FC<UISelectProps> = ({
  control,
  name,
  options,
  defaultOptionValue,
  selectOptions,
  label,
  placeholder = 'Выбрать...',
  errorMessage,
  clearErrors,
}) => {
  const defaultValue = () => {
    if (selectOptions?.isMulti === true) {
      if (defaultOptionValue) {
        return options.filter((option) => defaultOptionValue.includes(option.id));
      }

      return [];
    } else {
      if (defaultOptionValue) {
        return options.filter((option) => option.id == defaultOptionValue)[0];
      }

      return null;
    }
  };

  const defaultValueController = () => {
    if (selectOptions?.isMulti === true) {
      if (defaultOptionValue) {
        return options
          .filter((option) => defaultOptionValue.includes(option.id))
          .map((option) => option.id);
      }

      return [];
    } else {
      if (defaultOptionValue) {
        return options.filter((option) => option.id == defaultOptionValue)[0].id;
      }

      return null;
    }
  };

  return (
    <div>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <div className={classNames(label ? 'mt-1' : '')}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValueController()}
          render={({ field: { onChange }, fieldState: { error }, formState: {} }) => (
            <Select
              id={label}
              defaultValue={defaultValue()}
              options={options}
              onChange={(val) => {
                onChange(selectOptions?.isMulti ? val.map((c: ISelect) => c.id) : val.id);
                clearErrors(name);
              }}
              getOptionLabel={(option) => option.title || option.title_ru || option.title_uz}
              getOptionValue={(option) => option.id}
              styles={styles}
              placeholder={placeholder}
              className={styles.field}
              components={{
                IndicatorSeparator: () => null,
              }}
              {...selectOptions}
            />
          )}
        />
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};
