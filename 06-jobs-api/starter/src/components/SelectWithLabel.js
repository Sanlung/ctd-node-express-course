const SelectWithLabel = ({name, value, onSetValue}) => (
  <div>
    <label htmlFor={name}>Status:</label>
    <select
      name={name}
      value={value}
      onChange={(e) => onSetValue(e.target.value)}>
      <option value='pending'>Pending</option>
      <option value='interview'>Interview</option>
      <option value='declined'>Declinded</option>
    </select>
  </div>
);

export default SelectWithLabel;
