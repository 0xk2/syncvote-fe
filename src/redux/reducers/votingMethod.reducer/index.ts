import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allowedBy: {
    id: '',
    label: '',
  },
};

export const votingMethod = createSlice({
  name: 'votingMethod',
  initialState,
  reducers: {
    setAllowedBy: (state, action) => ({ ...state, allowedBy: action.payload }),
    resetVotingStore: () => initialState,
  },
});

export const { setAllowedBy, resetVotingStore } = votingMethod.actions;

export default votingMethod.reducer;
