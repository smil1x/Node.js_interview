import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OBjectsPaginationState {
  page: number;
  pageSize: number;
}

const initialState: OBjectsPaginationState = {
  page: 1,
  pageSize: 3,
};

export const objectsSlice = createSlice({
  name: 'objectsPagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<OBjectsPaginationState['page']>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<OBjectsPaginationState['pageSize']>) {
      state.pageSize = action.payload;
    },
  },
});

export const { setPage, setPageSize } = objectsSlice.actions;
export default objectsSlice.reducer;
