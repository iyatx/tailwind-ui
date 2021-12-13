import React from 'react';
import { UIButton, UIInput } from '../shared/ui';
import { useForm } from 'react-hook-form';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CreditCardIcon } from '@heroicons/react/solid';
import { UISelect } from '../shared/ui/ui-select';
import { UICheckbox } from '../shared/ui/ui-checkbox';

export const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const submit = (data: any) => {
    console.log(data);
    setError('name', { message: 'Что-то пошло не так, измените поле!' });
  };

  const options = [
    { id: 1, title: 'Продажа' },
    { id: 2, title: 'Посуточно' },
    { id: 3, title: 'Аренда' },
    { id: 4, title: 'Новостройки' },
  ];

  return (
    <div className='app'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <form
              className='grid grid-cols-12 gap-4 container mx-auto mt-8'
              onSubmit={handleSubmit(submit)}
            >
              <div className='col-span-6'>
                <UIInput
                  defaultValue='Name'
                  label='Name'
                  name='name'
                  register={register}
                  errorMessage={errors?.name && errors.name.message}
                />
              </div>
              <div className='col-span-6'>
                <UIInput
                  label='Email'
                  name='email'
                  defaultValue='Hello world'
                  register={register}
                />
              </div>
              <div className='col-span-6'>
                <UIInput label='Phone' name='phone' register={register} />
              </div>
              <div className='col-span-6'>
                <UIInput label='Password' name='password' register={register} />
              </div>
              <div className='col-span-6'>
                <UICheckbox name='typeChecked' control={control} />
              </div>
              <div className='col-span-6'>
                <UISelect
                  options={options}
                  name='Something'
                  control={control}
                  selectOptions={{
                    isMulti: true,
                  }}
                  defaultOptionValue={[1, 2]}
                />
              </div>
              <div className='col-span-6'>
                <UIButton type='submit' size='xs' variant='secondary'>
                  Save
                </UIButton>
                <UIButton size='md' variant='danger'>
                  Delete
                </UIButton>
                <UIButton to='/create' size='xl' variant='primary'>
                  Edit
                  <CreditCardIcon className='w-5 h-5' />
                </UIButton>
              </div>
            </form>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
