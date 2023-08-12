import './Button.css';

const Button = ({ text, disabled, ...rest }) => {
  const buttonClassName = `${
    disabled ? 'button button_disabled' : 'button button:hover'
  }`;
  return (
    <button className={buttonClassName} type='submit' text={text} {...rest}>
      {text}
    </button>
  );
};

export { Button };
