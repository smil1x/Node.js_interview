import React from 'react';
import styles from './GroupTableNavigation.module.scss'
import { Button } from '../../shared';
import { useNavigate } from 'react-router-dom';


const GroupTableNavigation = ({handleRefreshTable}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.bar}>
      <div className={styles.buttons}>
        <Button onClick={handleRefreshTable} color="primary">
          refresh
        </Button>
        <button className={styles.btn} onClick={() => navigate('creategroup')}>Create Group</button>
      </div>
    </div>
  )
}

export default GroupTableNavigation