export const ROWS_PER_PAGE_OPTIONS = [
  { value: 1, label: '1' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
];

export const PAGINATION_SELECT_CUSTOM_STYLES = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#C8FFF4;' : 'white',
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '14px',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};
