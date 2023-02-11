import { FormControl, Input, InputLabel } from '@mui/material'
import React from 'react'

const CustomInput = (props) => {
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    name,
    value,
    handleChange,
    type,
  } = props
  return (
    <FormControl {...formControlProps}>
      {labelText && (
        <InputLabel htmlFor={id} {...labelProps}>
          {labelText}
        </InputLabel>
      )}
      <Input
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
        {...inputProps}
        type={type}
      />
    </FormControl>
  )
}

export default CustomInput
