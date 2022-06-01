import React, { useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { ViewTypes } from '../../constants/viewType';
import { makeStyles } from '@material-ui/styles';
import { createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

interface ViewTypesTogglerProps {
  /**
   *Toggle View Type Handler
   */
  onChange: (value: ViewTypes) => void;
  /**
   * List of Icons and values
   */
  items: { component: React.ReactNode; value: string }[];
}

/**
 * Toggler Component
 */
export const ViewTypesToggler = ({ onChange, items }: ViewTypesTogglerProps) => {
  const [value, setValue] = useState(ViewTypes.GRID);
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, value: any) => {
    setValue(value);
    onChange(value);
  };
  const { root } = useStyles();

  return (
    <ToggleButtonGroup value={value} exclusive onChange={handleAlignment} className={root}>
      {items.map(({ component, value }) => (
        <ToggleButton value={value} color="primary">
          {component}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
