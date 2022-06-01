import React from 'react'
import { useFormHook } from '../../../hooks';
import { Dropdown } from '../../shared';

const SelectAgGridCell = ({ options, handler, ...props }) => {
  const { formState: selectState } = useFormHook({ selectedItem: '' });

  const selectHandler = async (value) => {
    if (value === props.data.enabled) return;
    await handler({ data: props.data, value });
  };

  const placeholder = props.data ? props.data.enabled : '';

  return (
    <Dropdown
      options={options}
      placeholder={placeholder}
      onChange={selectHandler}
      selectedValue={Array(options.find((item) => item.value === selectState.selectedItem))}
      movePlaceholder={false}
    />
  );
};

export default SelectAgGridCell;
