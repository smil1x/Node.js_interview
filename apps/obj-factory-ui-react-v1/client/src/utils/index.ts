import { VariantType } from 'notistack';
import { snackBarOptions } from '../constants/snackBarOptions';
import * as yup from 'yup';

export const setSnackBarOptions = (variant: VariantType) => ({
  variant,
  snackBarOptions,
});

export const objectValidationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  description: yup.string().required('Required'),
});
