import React from 'react';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { Control, useController } from 'react-hook-form';

type UICheckboxProps = {
  control: Control;
  name: string;
  checked?: boolean;
};

export const UICheckbox: React.FC<UICheckboxProps> = ({
  control,
  name,
  checked = false,
  children,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue: checked,
  });

  return (
    <Switch.Group as='div' className='flex items-center'>
      <Switch
        checked={value}
        onChange={onChange}
        className={classNames(
          value ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
        )}
      >
        <span
          aria-hidden='true'
          className={classNames(
            value ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      <Switch.Label as='span' className='ml-3'>
        {children}
      </Switch.Label>
    </Switch.Group>
  );
};
