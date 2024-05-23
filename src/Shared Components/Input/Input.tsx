import { useState } from 'react';
import './Input.scss';

export const Input = ({ width = '100%', disabled, placeholder, handleBlur,fieldValue,error, ...props }:any) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(fieldValue || '');

  const handleFocus = () => setFocused(true);
  const onBlur = (e:any) => {
    if (!value) setFocused(false);
    if (handleBlur) {
      handleBlur(e);
    }
  };

  const handleChange = (e:any) => setValue(e.target.value);

  return (
    <div className={`input-container ${disabled ? 'disabled' : ""}`} style={{ width }}>
      <div className={`input-wrapper ${focused || value ? 'focused' : ''}`}>
        <label className={`input-label ${focused || value ? 'visible' : ''}`}>
          {placeholder}
        </label>
        <input
          type="text"
          readOnly={disabled}
          value={value}
          onFocus={handleFocus}
          onBlur={onBlur}
          onChange={handleChange}
          {...props}
        />
      </div>
      {error &&  <div className="error">{error}</div>}
    </div>
  );
};
