/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ICheckpointNode } from 'types/checkpoint';
import { IMember, IRole } from 'types/member';

const initialState: {
  name: string;
  totalPrimaryCp: number;
  totalCheckpoints: number;
  listCheckpoint: ICheckpointNode[];
  roles: IRole[];
  members: IMember[];
  route: any[];
} = {
  name: '',
  totalPrimaryCp: 2,
  totalCheckpoints: 3,
  listCheckpoint: [],
  roles: [],
  members: [],
  route: [],
};

export const blueprint = createSlice({
  name: 'blueprint',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },

    setTotalPrimaryCp: (state, action) => {
      state.totalPrimaryCp = action.payload;
    },

    setListCheckpoint: (state, action) => {
      state.listCheckpoint = action.payload;
      state.totalCheckpoints = action.payload.length;
    },

    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    resetBlueprint: (state, action) => {
      if (action.payload.keepName) {
        return {
          ...initialState,
          name: state.name,
        };
      }
      return initialState;
    },
  },
});

export const {
  setName,
  setTotalPrimaryCp,
  setListCheckpoint,
  resetBlueprint,
  setRoles,
  setMembers,
} = blueprint.actions;

export default blueprint.reducer;
