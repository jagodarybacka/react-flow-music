import React, {useState, useEffect} from 'react'
import './styles.css'

export default function InputNumber({label, suffix, placeholder, value, setValue, min, max}) {
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid(value && value <= max && value >= min)
  }, [min, max, value])

  return (
    <div className={`InputNumber ${isValid ? '' : 'has-error'}`}>
      <label className="InputNumber__label">{label}</label>
      <input
        type="number"
        className="InputNumber__input"
        placeholder={placeholder}
        onChange={(e => setValue(e.target.value))}
        value={value}></input>
      {suffix && <span className="InputNumber__suffix">{suffix}</span>}
    </div>
  )
}