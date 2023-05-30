/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IOptionDataSource } from 'types/proposal';
import { applicationType } from '@utils/constants/enforcer';

const initialState = {
  isProgress: false,
  completedSteps: [] as number[],
  incompleted: false,
  highestStep: 0,
  basicInfo: {
    decisionTitle: '',
    description: '',
    listOfFiles: [],
  },
  participants: {
    allowedBy: {
      id: 'roles',
      label: 'Roles',
    },
    allowedRoles: [],
    rolesOptions: [],
    totalMembers: 0,
    tokenAddress: '',
    minimumHoldingPeriod: {
      value: '',
      type: {
        id: 'hour',
        label: 'HOUR(S)',
        value: 'HOUR',
      },
    },
    minimumHoldingQuantity: '',
  },
  votingMethod: {
    typeOfMethod: '',
    method: '',
    option: [],
    inputNumberOfResults: '',
    countedBy: {
      id: '',
      label: '',
    },
    numberOfResults: {
      id: 'all',
      label: 'All',
    },
    isVotingCondition: false,
    numberOfOptions: 1,
    thresholdValueResult: {} as any,
    thresholdCalculatedBy: {
      id: '',
      label: '',
    },
    datasource: [],
  },
  duration: {
    startTime: null,
    endTime: null,
    executionTime: null,
  },
  enforcer: {
    application: applicationType.onchain,
    onChain: {
      action: 'Transfer',
      assetType: {
        id: 'token',
        label: 'Token',
      },
      tokenAddress: '',
      file: undefined,
      fileName: '',
      images: [
        {
          id: '1',
          image: '',
        },
        {
          id: '2',
          image: '',
        },
        {
          id: '3',
          image: '',
        },
      ],
      recipientAddress: {
        token: '',
        nft: '',
      },
    },
    twitter: {
      isConnect: false,
      action: '',
      connectionOptions: [{ id: '@mock', label: '@mock' }],
      selectedConnection: '',
      postContent: '',
      selectedDate: '',
    },
    gmail: {
      isConnect: false,
      action: '',
      connectionOptions: [{ id: 'mock@gmail.com', label: 'mock@gmail.com' }],
      details: [
        {
          sendTo: '',
          recipientAddress: '',
          csvFile: [],
          title: '',
          emailContent: '',
        },
      ] as GmailDetail[],
    },
    executionTime: '',
  },
  fileDataSource: {} as IOptionDataSource,
};
interface GmailDetail {
  sendTo: '';
  recipientAddress: '';
  csvFile: [];
  title: '';
  emailContent: '';
}

export const proposal = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    setIsProgress: (state, action) => {
      state.isProgress = action.payload;
    },

    updateHighestStep: (state, action) => {
      if (action.payload > state.highestStep) {
        state.highestStep = action.payload;
      }
    },

    updateCompletedSteps: (state, action) => {
      const data = action.payload;
      const index = state.completedSteps.findIndex((item: number) => item === data);
      if (index === -1) {
        state.completedSteps = [...state.completedSteps, data];
      } else {
        state.completedSteps[index] = data;
      }
    },

    setIncompleted: (state, action) => {
      state.incompleted = action.payload;
    },

    setFileDataSource: (state: any, action: any) => {
      state.fileDataSource = action.payload;
    },
    setBasicInfo: (state, action) => {
      state.basicInfo = action.payload;
    },

    setParticipants: (state, action) => {
      state.participants = action.payload;
    },

    updateRolesOption: (state, action) => {
      state.participants.rolesOptions = action.payload;
    },

    updateTotalMembers: (state, action) => {
      state.participants.totalMembers = action.payload;
    },

    selectParticipantsTime: (state, action) => {
      state.participants.minimumHoldingPeriod = action.payload;
    },

    updateAllowedRoles: (state, action) => {
      state.participants.allowedRoles = action.payload;
    },

    participantsHoldingQuantity: (state, action) => {
      state.participants.minimumHoldingQuantity = action.payload;
    },

    addVotingOption: (state, action) => {
      state.votingMethod.option = action.payload;
    },

    setTypeOfMethod: (state, action) => {
      state.votingMethod.typeOfMethod = action.payload;
    },

    setMethod: (state, action) => {
      state.votingMethod.method = action.payload;
    },

    setInputNumberOfResults: (state, action) => {
      state.votingMethod.inputNumberOfResults = action.payload;
    },

    votingCondition: (state, action) => {
      state.votingMethod.isVotingCondition = action.payload;
    },

    updateCountedBy: (state, action) => {
      state.votingMethod.countedBy = action.payload;
    },

    updateNumberOfResults: (state, action) => {
      state.votingMethod.numberOfResults = action.payload;
    },

    updateThresholdCalculatedBy: (state, action) => {
      state.votingMethod.thresholdCalculatedBy = action.payload;
    },

    NumberOfPollingOptions: (state, action) => {
      state.votingMethod.numberOfOptions = action.payload;
    },

    NumberOfInputResults: (state, action) => {
      state.votingMethod.inputNumberOfResults = action.payload;
    },

    setThresholdValueResult: (state, action) => {
      state.votingMethod.thresholdValueResult = action.payload;
    },

    addDataSource: (state, action) => {
      state.votingMethod.datasource = action.payload;
    },

    setProposalStartTime: (state, action) => {
      state.duration.startTime = action.payload;
    },

    setProposalEndTime: (state, action) => {
      state.duration.endTime = action.payload;
    },

    setProposalExecutionTime: (state, action) => {
      state.duration.executionTime = action.payload;
    },

    updateEnforcer: (state, action) => {
      state.enforcer = { ...state.enforcer, ...action.payload };
    },

    setApplication: (state, action) => {
      state.enforcer.application = action.payload;
    },

    setExecutionTime: (state, action) => {
      state.enforcer.executionTime = action.payload;
    },
    resetProposalStore: () => initialState,
  },
});

export const {
  setIsProgress,
  setBasicInfo,
  setMethod,
  setApplication,
  setIncompleted,
  updateHighestStep,
  updateCountedBy,
  updateCompletedSteps,
  updateNumberOfResults,
  updateAllowedRoles,
  updateThresholdCalculatedBy,
  setParticipants,
  selectParticipantsTime,
  participantsHoldingQuantity,
  updateRolesOption,
  addVotingOption,
  votingCondition,
  updateEnforcer,
  NumberOfInputResults,
  NumberOfPollingOptions,
  setThresholdValueResult,
  addDataSource,
  setProposalStartTime,
  setProposalEndTime,
  setProposalExecutionTime,
  setFileDataSource,
  setExecutionTime,
  resetProposalStore,
  setTypeOfMethod,
} = proposal.actions;

export default proposal.reducer;
