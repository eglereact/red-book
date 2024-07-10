const Input = ({
  onChange,
  value,
  type,
  name,
  placeholder = null,
  autoComplete = null,
  errors = {},
}) => {
  return (
    <>
      <div className="error-text">
        <span className={errors[name] ? "show" : ""}>{errors[name] ?? ""}</span>
      </div>
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
