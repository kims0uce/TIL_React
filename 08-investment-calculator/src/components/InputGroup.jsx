import { useState } from "react";

export default function InputGroup({ labelName, onChangeValue }) {
  const [inputValue, setInputValue] = useState();

  const labelMapper = (item) => {
    return item
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, string) => string.toUpperCase()); // toCamelCase
  };

  const handleVariable = (e) => {
    setInputValue(e.target.value);
    onChangeValue(labelMapper(labelName), inputValue);
  };

  return (
    <p>
      <label>{labelName}</label>
      <input type="number" value={inputValue || ""} onChange={handleVariable} />
    </p>
  );
}
