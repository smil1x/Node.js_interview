import {
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Card,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface CardProps {
  /**
   * Title of Card
   */
  title: string;
  /**
   * Description of Card
   */
  description: string;
  /**
   * Url for redirection on particular object page
   */
  redirectUrl: string;
  /**
   * Is Object deleting?
   */
  isDeleting: boolean;
  /**
   * Delete Object Callback
   */
  onDeleteObject: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minWidth: 275,
      position: 'relative',
    },
    spinner: {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  }),
);

/**
 * Object Card
 */
export const CardComponent = ({ title, description, redirectUrl, isDeleting, onDeleteObject }: CardProps) => {
  const { root, spinner } = useStyles();
  return (
    <Card className={root}>
      <CardContent>
        <Typography component="h3" variant="h4">
          {title}
        </Typography>
        <Typography component="p" variant="body1">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" component={Link} to={redirectUrl} size="small" disabled={isDeleting}>
          Show More
        </Button>
        <Button size="small" color="secondary" onClick={onDeleteObject} disabled={isDeleting}>
          Delete
        </Button>
      </CardActions>
      {isDeleting && (
        <div className={spinner}>
          <CircularProgress />
        </div>
      )}
    </Card>
  );
};
