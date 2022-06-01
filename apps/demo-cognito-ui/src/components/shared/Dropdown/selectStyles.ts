import variables from '../../../styles/variables.scss';

const selectStyles = {
  indicatorSeparator: () => {},
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? variables.dropdownIndicatorColorDisabled : variables.dropdownIndicatorColor,
    '&:hover': {
      color: variables.dropdownIndicatorColor,
    },
    transition: variables.dropdownIndicatorTransition,
    transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    margin: '0',
    padding: '0 8px',
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    color:
      state.isSelected && !state.isMulti ? variables.dropdownTextSelectedItemColor : variables.dropdownTextItemColor,
    backgroundColor:
      state.isSelected && !state.isMulti ? variables.dropdownItemBgColorOnSelect : variables.dropdownBgColor,
    lineHeight: variables.lineHeightBase,
    letterSpacing: variables.letterSpacing,
    display: 'flex',
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: variables.dropdownItemBgColorOnHover,
    },
  }),
  placeholder: (provided, state) => {
    const {
      hasValue,
      selectProps: { inputValue, movePlaceholder },
    } = state;
    return {
      ...provided,
      position: 'absolute',
      display: movePlaceholder || !(hasValue || inputValue) ? 'block' : 'none',
      top: movePlaceholder && (hasValue || inputValue) ? -25 : 'none',
      left: movePlaceholder && (hasValue || inputValue) ? -5 : 'none',
      backgroundImage: `linear-gradient(transparent 47%, ${variables.dropdownBgColor} 47%)`,
      zIndex: variables.zIndexDropdown,
      fontWeight: 'normal',
      padding: movePlaceholder && (hasValue || inputValue) ? variables.movedPlaceholderPadding : 'none',
      color: hasValue || inputValue ? 'inherit' : variables.dropdownTextPlaceholderColor,
      fontSize: movePlaceholder && (hasValue || inputValue) ? variables.movedPlaceholderFontSize : 'inherit',
    };
  },
  control: (provided, state) => ({
    ...provided,
    padding: state.isFocused ? variables.dropdownTextPaddingOnHover : variables.dropdownTextPadding,
    cursor: 'pointer',
    borderRadius: variables.dropdownBorderRadius,
    borderWidth: state.isFocused ? variables.dropdownControlBorderWidthOnHover : variables.dropdownControlBorderWidth,
    backgroundColor: state.isDisabled ? variables.dropdownControlBgColorDisabled : variables.dropdownBgColor,
    borderColor: state.isDisabled
      ? variables.dropdownControlBorderColorDisabled
      : state.isFocused
      ? variables.dropdownControlBorderColorOnFocus
      : variables.dropdownControlBorderColor,
    boxShadow: 'none',
    fontWeight: 'normal',
    lineHeight: variables.lineHeightBase,
    '&:hover': {
      borderColor: state.isFocused
        ? variables.dropdownControlBorderColorOnFocus
        : variables.dropdownControlBorderColorOnHover,
      borderWidth: variables.dropdownControlBorderWidthOnHover,
      padding: variables.dropdownTextPaddingOnHover,
    },
    minWidth: variables.dropdownMinWidth,
  }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: 'visible',
    padding: 0,
    //for changing placeholder color
    '&:focus-within': {
      color: variables.dropdownControlBorderColorOnFocus,
    },
  }),
  input: (provided) => ({
    ...provided,
    overflow: 'hidden',
    margin: '0',
    padding: '0',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    margin: '0',
    color: state.isDisabled ? variables.dropdownSingleValueDisabledColor : variables.dropdownTextColor,
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '0',
    borderRadius: variables.dropdownMenuBorderRadius,
    zIndex: variables.zIndexDropdown,
  }),
  menuList: (base) => ({
    ...base,
    padding: '0',
    marginRight: variables.dropdownMenuScrollMarginRight,
    '::-webkit-scrollbar': {
      width: variables.dropdownMenuScrollThumbBorderWidth,
    },
    '::-webkit-scrollbar-track': {
      background: variables.dropdownMenuScrollColor,
    },
    '::-webkit-scrollbar-thumb': {
      background: variables.dropdownMenuScrollThumbColor,
      borderRadius: variables.dropdownMenuScrollThumbBorderRadius,
    },
  }),
};

export default selectStyles;
