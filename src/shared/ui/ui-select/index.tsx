import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Select, { Props } from 'react-select';
import classNames from 'classnames';
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
  placeholder?: string;
  defaultOptionValue?: any;
  selectOptions?: Props<any>;
  label?: string;
};

export const UISelect: React.FC<UISelectProps> = ({
  control,
  name,
  options,
  defaultOptionValue,
  selectOptions,
  label,
  placeholder = 'Выбрать...',
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
    <>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <div className={classNames(label ? 'mt-1' : '')}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValueController()}
          render={({ field: { onChange } }) => (
            <Select
              id={label}
              defaultValue={defaultValue()}
              options={options}
              onChange={(val) =>
                onChange(selectOptions?.isMulti ? val.map((c: ISelect) => c.id) : val.id)
              }
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
    </>
  );
};
