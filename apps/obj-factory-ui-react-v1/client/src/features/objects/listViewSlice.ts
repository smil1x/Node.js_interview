import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewTypes } from '../../constants/viewType';

export interface ListViewState {
  viewType: ViewTypes;
}

const initialState: ListViewState = {
  viewType: ViewTypes.GRID,
};

export const objectsSlice = createSlice({
  name: 'listView',
  initialState,
  reducers: {
    switchViewType(state, action: PayloadAction<ListViewState['viewType']>) {
      state.viewType = action.payload;
    },
  },
});

export const { switchViewType } = objectsSlice.actions;
export default objectsSlice.reducer;
