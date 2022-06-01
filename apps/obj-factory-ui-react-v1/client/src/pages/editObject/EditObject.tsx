import { useParams } from 'react-router-dom';
import { objectsApi, useUpdateOjbectMutation } from '../../services/objects';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@material-ui/core';
import { setSnackBarOptions } from '../../utils';
import { Form } from '../../shared/form/Form';
import { objectValidationSchema } from '../../utils';

const EditObjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = objectsApi.useGetObjectByIdQuery(id);
  const [updateObject, { isLoading: isUpdating, isError, isSuccess }] = useUpdateOjbectMutation();
  const { enqueueSnackbar } = useSnackbar();

  const updateObjectHandler = async (values: IObjectUpdate) => {
    await updateObject({ id, body: values });
  };

  isError && enqueueSnackbar('error!!!', setSnackBarOptions('error'));
  isSuccess && enqueueSnackbar('success!!!', setSnackBarOptions('success'));

  return (
    <>
      {isLoading && <CircularProgress color="secondary" />}
      {data && (
        <Form
          isLoading={isUpdating}
          initialValues={{ name: data.name, description: data.description }}
          onSubmit={updateObjectHandler}
          validationSchema={objectValidationSchema}
        />
      )}
    </>
  );
};

export default EditObjectPage;
