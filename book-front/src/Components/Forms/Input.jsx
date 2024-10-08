const Input = ({
  onChange,
  value,
  type,
  name,
  placeholder = null,
  autoComplete = null,
  errors = {},
  label = null,
}) => {
  return (
    <>
      <div className="error-text">
        <span className={errors[name] ? "show" : ""}>{errors[name] ?? ""}</span>
      </div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={errors[name] ? "error" : ""}
      />
    </>
  );
};
export default Input;
