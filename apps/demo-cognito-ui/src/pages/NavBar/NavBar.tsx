import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link className={`${styles.navLink} ${styles.logo}`} to="/">
        Blueprints
      </Link>
      <div>
        <Link className={styles.navLink} to="/users">
          Users Management
        </Link>
        <Link className={styles.navLink} to="/profile">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
