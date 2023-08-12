import './FormWindow.css';
import { Button } from '../Button/Button';

const FormWindow = (props) => {
  return (
    <form className='form' onSubmit={props.onSubmit}>
      <div className='form__container'>
        {props.children}
        <span className='form__error'>{props.errorMessage}</span>
      </div>
      <Button type='submit' text={props.text} disabled={props.disabled} />
    </form>
  );
};

export { FormWindow };
