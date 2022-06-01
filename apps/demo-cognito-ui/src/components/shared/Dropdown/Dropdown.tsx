import React, { useState, useCallback } from 'react';
import Select from 'react-select';
import Option from './Option';
import Menu from './Menu';
import ValueContainer from './ValueContainer';
import selectStyles from './selectStyles';

const Dropdown = ({
  options,
  movePlaceholder,
  placeholder,
  placeholderPlural,
  onChange,
  selectedValue,
  selectedValues,
  isMulti,
  onBlur,
  deselectAll,
  sortValuesFunc,
  isDisabled,
  customStyles,
}: any) => {
  const [isShowSelected, setIsShowSelected] = useState(false);

  const handleChange = useCallback((e) => onChange(isMulti ? e : e.value), []);

  const currentOptions = isShowSelected ? selectedValues : options;

  const changeOptionsData = (checked) => {
    setIsShowSelected(checked);
  };

  const getPlaceholder = useCallback(() => {
    if (selectedValues.length) {
      const currPlaceholder = selectedValues.length === 1 ? placeholder : placeholderPlural;
      return `${selectedValues.length} ${currPlaceholder.toLowerCase()} selected`;
    }
    return placeholder;
  }, [selectedValues, placeholder, placeholderPlural]);
  // @ts-ignore
  return isMulti ? (
    <Select
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ indicatorSeparator: () => void; dropdownIn... Remove this comment to see the full error message
      styles={selectStyles}
      placeholder={getPlaceholder()}
      onChange={handleChange}
      components={{ Menu, Option }}
      deselectAll={deselectAll}
      options={sortValuesFunc ? sortValuesFunc(currentOptions) : currentOptions}
      isMulti
      onBlur={onBlur}
      value={selectedValues}
      controlShouldRenderValue={false}
      closeMenuOnSelect={false}
      isClearable={false}
      changeOptionsData={changeOptionsData}
      hideSelectedOptions={false}
      movePlaceholder={false}
      isShowSelected={isShowSelected}
      maxMenuHeight={220}
      isDisabled={isDisabled}
    />
  ) : (
    <Select
      //@ts-ignore
      movePlaceholder={movePlaceholder}
      styles={customStyles || selectStyles}
      placeholder={placeholder}
      onChange={handleChange}
      components={{ Option, ValueContainer }}
      options={sortValuesFunc ? sortValuesFunc(options) : options}
      value={selectedValue.value !== '' ? selectedValue : null}
      isDisabled={isDisabled}
    />
  );
};

export default Dropdown;
