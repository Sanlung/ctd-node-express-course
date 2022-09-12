const InputWithLabel = ({name, type, value, onSetValue, children}) => (
  <div>
    <label htmlFor={name}>{children}</label>
    <input type={type} name={name} value={value} onChange={(e) => onSetValue(e.target.value)} />
  </div>
);

export default InputWithLabel;
