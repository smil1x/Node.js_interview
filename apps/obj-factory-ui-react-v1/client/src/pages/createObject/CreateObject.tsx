import { useCreateObjectMutation } from '../../services/objects';
import { useSnackbar } from 'notistack';
import { setSnackBarOptions } from '../../utils';
import { Form } from '../../shared/form/Form';
import { objectValidationSchema } from '../../utils';

const CreateObjectPage = () => {
  const [createObject, { isLoading: isCreating, isError, isSuccess }] = useCreateObjectMutation();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues: IObjectCreate = {
    name: 'name',
    description: 'descripiton',
  };

  isError && enqueueSnackbar('error!!!', setSnackBarOptions('error'));
  isSuccess && enqueueSnackbar('success!!!', setSnackBarOptions('success'));

  return (
    <Form
      isLoading={isCreating}
      initialValues={initialValues}
      onSubmit={createObject}
      validationSchema={objectValidationSchema}
    />
  );
};

export default CreateObjectPage;
