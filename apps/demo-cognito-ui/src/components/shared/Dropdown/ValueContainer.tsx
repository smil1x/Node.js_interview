import React from 'react';
import { components } from 'react-select';

const ValueContainer = (props: any) => {
  const {
    children,
    isFocused,
    selectProps: { placeholder },
  } = props;
  return (
    <components.ValueContainer {...props}>
      <components.Placeholder {...props} isFocused={isFocused}>
        {placeholder}
      </components.Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== components.Placeholder ? child : null))}
    </components.ValueContainer>
  );
};

export default ValueContainer;
