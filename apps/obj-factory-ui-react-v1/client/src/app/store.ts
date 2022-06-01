import { configureStore } from '@reduxjs/toolkit';
import viewTypeReducer from '../features/objects/listViewSlice';
import objectsPaginationReducer from '../features/objects/objectsPaginationSlice';

import { objectsApi } from '../services/objects';

export const store = configureStore({
  reducer: {
    viewType: viewTypeReducer,
    objectsPagination: objectsPaginationReducer,
    [objectsApi.reducerPath]: objectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(objectsApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
