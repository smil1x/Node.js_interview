import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Select } from '@material-ui/core';
import { useState } from 'react';

interface SelectProps {
  /**
   * Select Value Handler
   */
  onChange: (value: number) => void;
  /**
   * Selected Value
   */
  value: number | string;
  /**
   * Select Label
   */
  label: string;
  /**
   * List of Select Item values
   */
  items: (number | string)[];
}

/**
 * Select Component
 */
export const SelectComponent = ({ onChange, value, label, items }: SelectProps) => {
  const [selectValue, setSelectValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number;
    setSelectValue(value);
    onChange(value);
  };

  return (
    <Box sx={{ width: 80 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={selectValue} label={label} onChange={handleChange}>
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
