import React from 'react'
import Styles from './ActionAgGridCell.module.scss';

const ActionAgGridCell = ({ content, icon = null, handler, ...props }) => {
  console.log({ props });
  const actionHandler = () => {
    console.log(props.data.username);
    handler(props.data);
  };
  return (
    <div className={Styles.container} onClick={actionHandler}>
      {icon}
      <p>{content}</p>
    </div>
  );
};

export default ActionAgGridCell;
