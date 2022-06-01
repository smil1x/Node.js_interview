import { Link } from 'react-router-dom';

import { ReactComponent as NovartisLogo } from '../../assets/images/novartis-logo.svg';

import { Button, createStyles, makeStyles } from '@material-ui/core';

import books from '../../navigation/books';

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      width: '100%',
      height: '4rem',
      boxShadow: '0px 10px 20px rgba(31, 32, 65, 0.05)',
    },
    nav: {
      display: 'flex',
      gap: '2rem',
    },
    container: {
      maxWidth: '1440px',
      height: '100%',
      margin: '0 auto',
      padding: '0 1.25rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
);

const Header = () => {
  const { header, nav, container } = useStyles();

  return (
    <header className={header}>
      <div className={container}>
        <Link to={books.home}>
          <NovartisLogo />
        </Link>
        <nav className={nav}>
          <Button component={Link} color="primary" to={books.home}>
            Home
          </Button>
          <Button component={Link} color="primary" to={books.objects}>
            Objects
          </Button>
          <Button component={Link} color="primary" to={books.createOjbect}>
            Create Object
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
