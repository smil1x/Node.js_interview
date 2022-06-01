import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';

import { useParams, Link } from 'react-router-dom';

import { useGetObjectByIdQuery } from '../../services/objects';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ObjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const { data, isLoading, isError } = useGetObjectByIdQuery(id);

  // Hanldled by General ErrorBoundary Component
  if (isError) throw new Error();

  return (
    <Grid container spacing={10}>
      {isLoading ? (
        <Grid item xs={12} md={12} className={classes.spinner}>
          <CircularProgress />
        </Grid>
      ) : (
        data && (
          <>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" component="h2">
                Name: {data.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" component="h2">
                Description: {data.description}
              </Typography>
            </Grid>
            <Grid item>
              <Button color="primary" component={Link} to={`/edit-object/${id}`}>
                Update
              </Button>
            </Grid>
          </>
        )
      )}
    </Grid>
  );
};

export default ObjectPage;
