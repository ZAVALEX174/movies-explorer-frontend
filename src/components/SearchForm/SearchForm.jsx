import './SearchForm.css';
import icon from '../../Images/search-blue.svg';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ onCheckbox, checked }) => {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__form-wrapper'>
          <input
            className='search__input'
            id='movie'
            name='movie'
            type='text'
            placeholder='Фильм'
            minLength='1'
            maxLength='20'
            required
          />
          <span className='search__form-error'></span>
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
