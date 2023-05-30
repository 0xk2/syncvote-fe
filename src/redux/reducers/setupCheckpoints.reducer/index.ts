import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  isClickCheckpoints: false,
  votingMethod: {
    method: 'singleChoiceVote',
    option: [],
    inputNumberOfResults: '',
    isVotingCondition: false,
    numberOfOptions: 1,
    thresholdValueResult: '0',
    datasource: [],
  },
};

export const setupCheckpoints = createSlice({
  name: 'setupCheckpoints',
  initialState,
  reducers: {
    setType: (state, action) => ({ ...state, type: action.payload }),
    setIsClickCheckpoints: (state, action) => ({ ...state, isClickCheckpoints: action.payload }),
    resetSetUpCheckPointsStore: () => initialState,
  },
});

export const { setType, setIsClickCheckpoints, resetSetUpCheckPointsStore } =
  setupCheckpoints.actions;

export default setupCheckpoints.reducer;
