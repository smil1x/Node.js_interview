import { createStyles, makeStyles } from '@material-ui/core';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import Routes from '../../navigation';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      width: '100%',
    },
    container: {
      maxWidth: '1440px',
      height: '100%',
      margin: '0 auto',
      padding: '1.25rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column',
    },
  }),
);

const Content = () => {
  const { main, container } = useStyles();

  return (
    <main className={main}>
      <div className={container}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default Content;
