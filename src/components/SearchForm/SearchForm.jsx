import './SearchForm.css';
import icon from '../../Images/search-blue.svg';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

import { useState, useEffect } from 'react';

const SearchForm = ({ onCheckbox, checked, onSubmit, defaultValue }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setKeyword(defaultValue);
  }, [defaultValue]);

  const handleChange = (evt) => {
    setKeyword(evt.target.value);
    setIsFormValid(evt.target.closest('form').checkValidity());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (keyword) {
      onSubmit(keyword);
    } else {
      return setErrorText('Нужно ввести ключевое слово');
    }
  };

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit}>
        <div className='search__form-wrapper'>
          <input
            className='search__input'
            id='movie'
            name='movie'
            type='text'
            placeholder='Фильм'
            onChange={handleChange}
            value={keyword || ''}
            minLength='1'
            maxLength='20'
            required
          />
          <span className='search__form-error'>
            {!isFormValid && errorText}
          </span>
          <button className='search__button' type='submit'>
            <img className='search__icon' src={icon} alt='Иконка стрелка' />
          </button>
        </div>
        <FilterCheckbox onCheckbox={onCheckbox} checked={checked} />
      </form>
    </section>
  );
};

export { SearchForm };
