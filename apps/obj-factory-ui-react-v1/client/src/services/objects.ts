import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL, endpoints } from '../constants/endpoints';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/pageQueryParams';

interface IObjectsResponse {
  data: IObject[];
  total: number;
  pageSize: number;
  page: number;
}

export const objectsApi = createApi({
  reducerPath: 'objectsApi',
  tagTypes: ['Objects'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getObjects: builder.query<IObjectsResponse, { page: number; pageSize: number }>({
      query: ({ page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE }) => endpoints.getObjectsPath(page, pageSize),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Objects' as const, id })), { type: 'Objects', id: 'LIST' }]
          : [{ type: 'Objects', id: 'LIST' }],
    }),
    getObjectById: builder.query<IObject, string>({
      query: (id: string) => endpoints.getObjectByIdPath(id),
    }),
    createObject: builder.mutation({
      query: (body) => ({
        url: endpoints.createObjectPath,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Objects', id: 'LIST' }],
    }),
    deleteOjbect: builder.mutation({
      query: (id: string) => ({
        url: endpoints.deleteObjectByIdPath(id),
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Objects', id: 'LIST' }],
    }),
    updateOjbect: builder.mutation({
      query: ({ id, body }) => ({
        url: endpoints.updateObjectByIdPath(id),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Objects', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetObjectsQuery,
  useCreateObjectMutation,
  useDeleteOjbectMutation,
  useGetObjectByIdQuery,
  useUpdateOjbectMutation,
} = objectsApi;
