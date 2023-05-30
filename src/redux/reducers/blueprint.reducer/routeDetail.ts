/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  routeData: any[];
  listOfValidRoutes: Set<string>;
} = {
  routeData: [],
  listOfValidRoutes: new Set(),
};
export const routeDetail = createSlice({
  name: 'routeDetail',
  initialState,
  reducers: {
    setRouteDetail: (state: any, action: any) => {
      const data = action.payload;
      const index = state.routeData.findIndex((item: any) => item.id === data.id);
      if (index === -1) {
        state.routeData = [...state.routeData, data];
      } else {
        state.routeData[index] = data;
      }
    },
    updateListOfValidRoutes: (state, action) => {
      state.listOfValidRoutes = action.payload;
    },
    resetRouteStore: () => initialState,
  },
});
export const { setRouteDetail, updateListOfValidRoutes, resetRouteStore } = routeDetail.actions;
export default routeDetail.reducer;
