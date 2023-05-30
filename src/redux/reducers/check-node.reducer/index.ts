/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IOptionDataSource } from 'types/proposal';

const initialState: {
  name: string;
  checkpointConfig: any[];
  datasource: IOptionDataSource[];
  basicInfoInitiative: any[];
  createInfo: any[];
} = {
  name: '',
  checkpointConfig: [],
  datasource: [],
  basicInfoInitiative: [
    { id: 1, title: 'Scan CV' },
    { id: 2, title: 'Interview' },
    { id: 3, title: 'Cultural Fit' },
    { id: 4, title: 'Making offer' },
  ].map((item: any) => {
    return {
      id: item.id,
      title_number: `#${item.id}`,
      title_string: item.title,
      option: (item.id === 1 && { label: 'Options (column)', value: '' }) || null,
      description: { label: 'Description (column)', value: '' },
      attachedLinks: { label: 'Attached document links (column)', value: '' },
      startTime: { label: 'Start time (column)', value: null },
      endTime: { label: 'End time (column)', value: null },
      isShow: (item.id === 1 || item.id === 2) && true,
    };
  }),
  createInfo: [],
};
export const checkNode = createSlice({
  name: 'checkNode',
  initialState,
  reducers: {
    setMultiLinkProposalName: (state: any, action: any) => {
      state.name = action.payload;
    },
    setConfigCheckpoints: (state: any, action: any) => {
      const data = action.payload;
      const index = state.checkpointConfig.findIndex((item: any) => item.cpId === data.cpId);
      if (index === -1) {
        state.checkpointConfig = [...state.checkpointConfig, data];
      } else {
        state.checkpointConfig[index] = data;
      }
    },
    setDataSource: (state: any, action: any) => {
      const data = action.payload;
      const index = state.datasource.findIndex((item: any) => item.cpId === data.cpId);
      if (index === -1) {
        state.datasource = [...state.datasource, data];
      } else {
        state.datasource[index] = data;
      }
    },
    setBasicInfoInitiative: (state: any, action: any) => {
      state.basicInfoInitiative = action.payload;
    },
    setCreateInfo: (state: any, action: any) => {
      state.createInfo = action.payload;
    },
    resetStore: () => initialState,
  },
});
export const {
  setMultiLinkProposalName,
  setConfigCheckpoints,
  setDataSource,
  setBasicInfoInitiative,
  setCreateInfo,
  resetStore,
} = checkNode.actions;
export default checkNode.reducer;
