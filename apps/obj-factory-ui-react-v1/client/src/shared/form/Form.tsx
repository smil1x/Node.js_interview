import { TextField, Button, CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';

interface ObjectFormProps {
  /**
   * Initial Values
   */
  initialValues: IObjectCreate | IObjectUpdate;
  /**
   * Is Loading
   */
  isLoading: boolean;
  /**
   * On Submit Handler
   */
  onSubmit: (values: any) => void;
  /**
   * Validation Schema
   */
  validationSchema: object;
}

/**
 * Object Form
 */
const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      width: '40%',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
    },
  }),
);

export const Form = ({ initialValues, isLoading, onSubmit, validationSchema }: ObjectFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { form } = useStyles();

  return (
    <form onSubmit={formik.handleSubmit} className={form}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="object's name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        id="description"
        name="description"
        label="object's description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        {isLoading ? <CircularProgress color="secondary" /> : 'Submit'}
      </Button>
    </form>
  );
};
