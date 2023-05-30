/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IOrgType, IPresetType } from './interface';

const initialState: {
  loading: boolean,
  orgs: IOrgType[],
  presetIcons: IPresetType[],
  presetBanners: IPresetType[],
  workflows: any[],
  missions: any[],
  templates: any[],
  web2Integrations: any[],
  initialized: boolean,
} = {
  loading: false,
  orgs: [],
  presetIcons: [],
  presetBanners: [],
  workflows: [],
  missions: [],
  templates: [],
  web2Integrations: [],
  initialized: false,
};

const globalUISlice = createSlice({
  name: 'global_ui',
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.loading = true;
    },
    finishLoading: (state, action) => {
      state.loading = false;
    },
    initialize: (state, action) => {
      state.initialized = true;
    },
    addOrg: (state, action) => {
      state.orgs.push(action.payload);
    },
    changeOrg: (state, action) => {
      const index = state.orgs.findIndex((org:IOrgType) => org.id === action.payload.id);
      state.orgs[index] = action.payload;
    },
    setOrgs: (state, action) => {
      state.orgs = action.payload;
    },
    setPresetIcons: (state, action) => {
      state.presetIcons = action.payload;
    },
    setPresetBanners: (state, action) => {
      state.presetBanners = action.payload;
    },
    setWorkflows: (state, action) => {
      state.workflows = action.payload;
    },
    changeWorkflow: (state, action) => {
      const index = state.workflows.findIndex((w:any) => w.id === action.payload.id);
      if (index === -1) {
        state.workflows.push(action.payload);
      } else {
        state.workflows[index] = action.payload;
      }
    },
    setMissions: (state, action) => {
      state.missions = action.payload;
    },
    changeMission: (state, action) => {
      const index = state.missions.findIndex((m:any) => m.id === action.payload.id);
      if (index === -1) {
        state.missions.push(action.payload);
      } else {
        state.missions[index] = action.payload;
      }
    },
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },
    changeTemplate: (state, action) => {
      const index = state.templates.findIndex((t:any) => t.id === action.payload.id);
      if (index === -1) {
        state.templates.push(action.payload);
      } else {
        state.templates[index] = action.payload;
      }
    },
    setWeb2Integrations: (state, action) => {
      state.web2Integrations = action.payload;
    },
    changeWeb2Integration: (state, action) => {
      const index = state.web2Integrations.findIndex((t:any) => t.id === action.payload.id);
      if (index === -1) {
        state.web2Integrations.push(action.payload);
      } else {
        state.web2Integrations[index] = action.payload;
      }
    },
    reset: (state, action) => {
      state.orgs = [];
      state.workflows = [];
      state.missions = [];
      state.templates = [];
      state.web2Integrations = [];
    },
    resetAll: (state, action) => {
      state.orgs = [];
      state.presetIcons = [];
      state.presetBanners = [];
      state.workflows = [];
      state.missions = [];
      state.templates = [];
      state.web2Integrations = [];
    },
  },
});

export const {
  startLoading,
  finishLoading,
  setOrgs,
  setPresetIcons,
  setPresetBanners,
  addOrg,
  changeOrg,
  reset,
  resetAll,
  setWorkflows,
  changeWorkflow,
  setMissions,
  changeMission,
  setTemplates,
  changeTemplate,
  setWeb2Integrations,
  changeWeb2Integration,
  initialize,
} = globalUISlice.actions;
export default globalUISlice.reducer;
