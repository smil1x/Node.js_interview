import { CircularProgress } from '@material-ui/core';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import books from './books';

const HomePage = lazy(() => import('../pages/home/Home'));
const ObjectsPage = lazy(() => import('../pages/objects/Objects'));
const CreateObjectPage = lazy(() => import('../pages/createObject/CreateObject'));
const ObjectPage = lazy(() => import('../pages/object/Object'));
const EditObjectPage = lazy(() => import('../pages/editObject/EditObject'));

const SuspenseFallback = () => <CircularProgress />;

const Routes = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Switch>
        <Route path={books.home} exact>
          <HomePage />
        </Route>
        <Route path={books.objects} exact>
          <ObjectsPage />
        </Route>
        <Route path={books.createOjbect} exact>
          <CreateObjectPage />
        </Route>
        <Route path={books.object} exact>
          <ObjectPage />
        </Route>
        <Route path={books.editObject} exact>
          <EditObjectPage />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
