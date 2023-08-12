import './AuthorizationField.css';

const AuthorizationField = ({ label, error, name, type, ...rest }) => {
  return (
    <div className='auth-field'>
      <label className='auth-field__label'>{label}</label>
      <input className='auth-field__input' name={name} type={type} {...rest} />
      <span className='auth-field__error'>{error}</span>
    </div>
  );
};

export { AuthorizationField };
