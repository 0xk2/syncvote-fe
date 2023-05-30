/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IMemberType } from './interface';

const initialState: {
  memberList: IMemberType[];
} = {
  memberList: [],
};

export const memberList = createSlice({
  name: 'memberList',
  initialState,
  reducers: {
    addMemberList: (state, action) => {
      state.memberList = action.payload;
    },
  },
});

export const { addMemberList } = memberList.actions;

export default memberList.reducer;
