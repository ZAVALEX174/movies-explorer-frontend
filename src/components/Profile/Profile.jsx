import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { Button } from '../Button/Button';
import { useFormAndValidation } from '../Hooks/useFormAndValidation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';

const Profile = (props) => {
  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [isSuccessfully, setIsSuccessfully] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  const BlockedButton =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUserData({
      name: values.name,
      email: values.email,
    });
    setTimeout(() => {
      setIsDisabledInput((state) => !state);
      setIsSuccessfully((state) => !state);
    }, 2000);
    resetForm();
  }

  function handleUpdatProfile() {
    setIsDisabledInput((state) => !state);
  }

  function handleSave() {
    setIsSuccessfully((state) => !state);
  }

  function toggleHeader() {
    props.header(true);
  }
  function toggleFooter() {
    props.footer(false);
  }
  React.useEffect(() => {
    toggleHeader();
    toggleFooter();
  }, []);

  // const defaultName = 'Александр';
  // const defaultEmail = 'zav01@ya.ru';

  return (
    <>
      <section className='profile'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='profile__field'>
            <label className='profile__label'>Имя</label>
            <input
              id='profile-name'
              className='profile__input'
              name='name'
              type='text'
              minLength='2'
              maxLength='30'
              required
              disabled={isDisabledInput}
              value={values?.name ?? currentUser.name}
              onChange={handleChange}
              // defaultValue={defaultName}
              pettern='/[A-Za-zа-яА-ЯёЁ0-9-\s]*/gm'
            />
          </div>
          {errors?.name && (
            <span className='profile__input-error'>{errors.name}</span>
          )}
          <div className='profile__line'></div>
          <div className='profile__field'>
            <label className='profile__label'>E-mail</label>
            <input
              id='profile-email'
              className='profile__input'
              name='email'
              type='text'
              required
              disabled={isDisabledInput}
              value={values?.email ?? currentUser.email}
              onChange={handleChange}
              // pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
              // pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              pattern='^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$'
              // defaultValue={defaultEmail}
            />
          </div>
          {errors?.email && (
            <span className='profile__input-error'>{errors.email}</span>
          )}
          {isSuccessfully && (
            <p className='profile__form-status'>
              {props.isUserDataUpdateStatus}
            </p>
          )}
          <div className='profile__button-container'>
            {isDisabledInput ? (
              <>
                <button
                  className='profile__button profile__button_type_edit'
                  type='button'
                  onClick={handleUpdatProfile}>
                  Редактировать
                </button>
                <Link
                  to='/'
                  className='profile__link-exit'
                  onClick={props.signOut}>
                  Выйти из аккаунта
                </Link>
              </>
            ) : (
              <Button
                type='submit'
                text='Сохранить'
                disabled={BlockedButton}
                onClick={handleSave}
              />
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export { Profile };
