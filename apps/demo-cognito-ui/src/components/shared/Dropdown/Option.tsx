import React from 'react';
import { components } from 'react-select';
import { Checkbox } from '../index';

import tickIcon from '../../../assets/icons/tickIcon.svg';
import styles from './Dropdown.module.scss';

const Option = (props: any) => {
  const { data, isSelected, isMulti } = props;

  return isMulti ? (
    <components.Option {...props}>
      <Checkbox isChecked={isSelected} label={data.label} onChange={() => null} />
    </components.Option>
  ) : (
    <components.Option {...props}>
      <div className={styles.optionText}>{data.label}</div>
      {isSelected && (
        <div>
          <img src={tickIcon} alt="tickIcon" />
        </div>
      )}
    </components.Option>
  );
};

export default Option;
