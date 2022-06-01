import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { ViewTypes } from '../../constants/viewType';
import { useDeleteOjbectMutation } from '../../services/objects';
import { setSnackBarOptions } from '../../utils';

import { CardComponent as Card } from '../../shared/card/Card';
import { useState } from 'react';

interface ObjectsListProps {
  objectsList: IObject[];
  viewType: ViewTypes;
}

const ObjectsList = ({ objectsList, viewType }: ObjectsListProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteObject, { isLoading: isDeleting, isError, isSuccess }] = useDeleteOjbectMutation();

  const [deletingObjectId, setDeletingObjectId] = useState('');

  const deleteObjectHandler = (id: string) => async () => {
    setDeletingObjectId(id);
    await deleteObject(id);
  };

  isError && enqueueSnackbar('error!!!', setSnackBarOptions('error'));
  isSuccess && enqueueSnackbar('success!!!', setSnackBarOptions('success'));

  return (
    <Grid container spacing={2}>
      {objectsList.map(({ name, description, id }) => (
        <Grid item xs={viewType === ViewTypes.LIST ? 12 : 4} md={viewType === ViewTypes.LIST ? 12 : 4} key={id}>
          <Card
            redirectUrl={`/objects/${id}`}
            title={name}
            description={description}
            isDeleting={isDeleting && deletingObjectId === id}
            onDeleteObject={deleteObjectHandler(id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ObjectsList;
