import React from 'react';
import { useFormAndValidation } from '../Hooks/useFormAndValidation';
import { AuthorizationForm } from '../AuthorizationForm/AuthorizationForm';
import { AuthorizationField } from '../AuthorizationField/AuthorizationField';
import { FormWindow } from '../FormWindow/FormWindow';

const Login = (props) => {
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
    if (!values.password || !values.email) {
      return;
    }
    // props.onLogin(values);
    resetForm();
  }

  return (
    <AuthorizationForm
      title='Рады видеть!'
      subtitle='Ещё не зарегистрированы?'
      route='/signup'
      link='Регистрация'>
      <FormWindow
        onSubmit={handleSubmit}
        errorMessage={props.errorMessage || ''}
        text='Войти'
        disabled={!isValid}>
        <AuthorizationField
          id='email'
          label='E-mail'
          name='email'
          type='email'
          required
          autoComplete='email'
          value={values.email || ''}
          error={errors.email || ''}
          onChange={handleChange}
          pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
        />
        <AuthorizationField
          id='password'
          label='Пароль'
          name='password'
          type='password'
          minLength='8'
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

export { Login };
