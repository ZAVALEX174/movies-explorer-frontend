import React from 'react';
import { useFormAndValidation } from '../Hooks/useFormAndValidation';
import { AuthorizationForm } from '../AuthorizationForm/AuthorizationForm';
import { AuthorizationField } from '../AuthorizationField/AuthorizationField';
import { FormWindow } from '../FormWindow/FormWindow';

const Register = (props) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormAndValidation();

  function toggleHeader() {
    props.header(false);
  }
  function toggleFooter() {
    props.footer(false);
  }
  React.useEffect(() => {
    toggleHeader();
    toggleFooter();
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.password || !values.email || !values.name) {
      return;
    }
    props.onRegister(values);
    resetForm();
  }

  return (
    <AuthorizationForm
      title='Добро пожаловать!'
      subtitle='Уже зарегистрированы?'
      route='/signin'
      link='Войти'>
      <FormWindow
        onSubmit={handleSubmit}
        errorMessage={props.errorMessage || ''}
        text='Зарегистрироваться'
        disabled={!isValid}>
        <AuthorizationField
          id='name'
          label='Имя'
          name='name'
          type='text'
          minLength='2'
          maxLength='30'
          required
          pettern='/[A-Za-zа-яА-ЯёЁ0-9-\s]*/gm'
          autoComplete='name'
          value={values.name || ''}
          error={errors.name || ''}
          onChange={handleChange}
        />

        <AuthorizationField
          id='email'
          label='E-mail'
          name='email'
          type='text'
          minLength='6'
          maxLength='40'
          required
          autoComplete='email'
          value={values.email || ''}
          error={errors.email || ''}
          onChange={handleChange}
          // pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
          // psttern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          pattern='^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$'          
        />

        <AuthorizationField
          id='password'
          label='Пароль'
          name='password'
          type='password'
          required
          autoComplete='password'
          value={values.password || ''}
          error={errors.password || ''}
          onChange={handleChange}
          pattern='.{8,}'
        />
      </FormWindow>
    </AuthorizationForm>
  );
};

export { Register };
