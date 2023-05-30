import { ECheckpointsType } from 'types/enums/checkpoints';

export const dataReviewCheckPoint = [
  {
    id: 'cp1',
    name: 'Scan CV',
    type: ECheckpointsType.upvote,
    allowedBy: {
      id: 'role',
      label: 'Roles',
      title: 'Allowed by',
    },
    allowedRoles: {
      title: 'Allowed roles',
      type: [
        {
          id: 'Members',
          label: 'Members',
        },
        {
          id: 'Council',
          label: 'Council',
        },
        {
          id: 'Product',
          label: 'Product',
        },
      ],
    },
    members: [
      {
        id: 1,
        nameTag: 'abc',
        walletAddress: 'qwertyuio',
        roleId: 'Council',
      },
      {
        id: 2,
        nameTag: 'xyz',
        walletAddress: 'asdfgh',
        roleId: 'Council',
      },
      {
        id: 2,
        nameTag: 'xyz',
        walletAddress: 'bnmkljhgfc',
        roleId: 'Members',
      },
    ],
    rolesOptions: [
      {
        id: 'Members',
        label: 'Members',
      },
      {
        id: 'Council',
        label: 'Council',
      },
      {
        id: 'Product',
        label: 'Product',
      },
    ],
    tokenAddress: '',
    minimumHoldingPeriod: {
      value: '',
      type: {
        id: 'hour',
        label: 'HOUR(S)',
        value: 'HOUR',
      },
    },
    minimumHoldingQuantity: {
      id: 'minHoldingQty',
      value: '',
      status: null,
    },
    countedBy: {
      id: 'numberOfParticipants',
      label: 'Number of participants',
      title: 'Counted by',
    },
    numberOfResults: {
      id: 'custom',
      label: 'Custom',
      title: 'Number of results',
    },
    inputNumberOfResults: {
      value: '32',
      title: 'Input number of results',
    },
    votingCondition: true,
    numberOfOptions: {
      value: '1',
      title: 'Number of options each participant can v...',
    },
    thresholdCalculatedBy: {
      id: 'showUpMember',
      label: 'Show-up member',
      title: 'Threshold calculated by',
    },
    thresholdValue: {
      id: 'thresholdValue',
      title: 'Threshold value for each result (% at least)',
      value: '20',
      status: null,
    },
  },
  {
    id: 'cp2',
    name: 'Interview',
    type: ECheckpointsType.polling,
    allowedBy: {
      id: 'token',
      label: 'Token',
      title: 'Allowed by',
    },
    allowedRoles: [],
    rolesOptions: [],
    tokenAddress: {
      value: '0987654321',
      title: 'Token address',
    },
    minimumHoldingPeriod: {
      value: '7',
      type: {
        id: 'hour',
        label: 'HOUR(S)',
        value: 'HOUR',
      },
      title: 'Minimum holding period',
    },
    minimumHoldingQuantity: {
      id: 'minHoldingQty',
      value: '2345678',
      status: null,
      title: 'Minimum holding quantity ',
    },
    numberOfOptions: {
      value: '4',
      title: 'Number of options each participant can v...',
    },
    thresholdCalculatedBy: {
      id: 'totalVotesMade',
      label: 'Total votes made',
      title: 'Threshold calculated by',
    },
    thresholdValue: {
      id: 'thresholdValue',
      title: 'Threshold value for each result (% at least)',
      value: '40',
      status: null,
    },
    votingCondition: false,
  },
  {
    id: 'cp3',
    name: 'Cutural fit',
    type: ECheckpointsType.singleChoice,
    allowedBy: {
      id: 'role',
      label: 'Roles',
      title: 'Allowed by',
    },
    allowedRoles: {
      title: 'Allowed roles',
      type: [
        {
          id: 'Product',
          label: 'Product',
        },
      ],
    },
    members: [
      {
        id: 1,
        nameTag: 'abc',
        walletAddress: 'qwertyuio',
        roleId: 'Product',
      },
      {
        id: 2,
        nameTag: 'xyz',
        walletAddress: 'asdfgh',
        roleId: 'Product',
      },
    ],
    rolesOptions: [
      {
        id: 'Product',
        label: 'Product',
      },
    ],
    tokenAddress: '',
    minimumHoldingPeriod: {
      value: '',
      type: {
        id: 'hour',
        label: 'HOUR(S)',
        value: 'HOUR',
      },
    },
    minimumHoldingQuantity: {
      id: 'minHoldingQty',
      value: '',
      status: null,
    },
    countedBy: {
      id: 'numberOfParticipants',
      label: 'Number of participants',
      title: 'Counted by',
    },
    numberOfResults: {
      id: 'custom',
      label: 'Custom',
      title: 'Number of results',
    },
    inputNumberOfResults: {
      value: '3',
      title: 'Input number of results',
    },
    votingCondition: true,
    numberOfOptions: {
      value: '7',
      title: 'Number of options each participant can v...',
    },
    thresholdCalculatedBy: {
      id: 'showUpMember',
      label: 'Show-up member',
      title: 'Threshold calculated by',
    },
    thresholdValue: {
      id: 'thresholdValue',
      title: 'Threshold value for each result (% at least)',
      value: '50',
      status: null,
    },
  },
  {
    id: 'cp4',
    name: 'Making offer',
    type: ECheckpointsType.veto,
    allowedBy: {
      id: 'token',
      label: 'Token',
      title: 'Allowed by',
    },
    allowedRoles: [],
    rolesOptions: [],
    tokenAddress: {
      value: '12345676543',
      title: 'Token address',
    },
    minimumHoldingPeriod: {
      value: '1',
      type: {
        id: 'day',
        label: 'DAY(S)',
        value: 'DAY',
      },
      title: 'Minimum holding period',
    },
    minimumHoldingQuantity: {
      id: 'minHoldingQty',
      value: '234564354',
      status: null,
      title: 'Minimum holding quantity ',
    },
    numberOfOptions: {
      value: '15',
      title: 'Number of options each participant can v...',
    },
    thresholdCalculatedBy: {
      id: 'totalVotesMade',
      label: 'Total votes made',
      title: 'Threshold calculated by',
    },
    thresholdValue: {
      id: 'thresholdValue',
      title: 'Threshold value for each result (% at least)',
      value: '9',
      status: null,
    },
    votingCondition: false,
  },
  {
    id: 'cp5',
    name: 'Enforcer',
    type: ECheckpointsType.enforcer,
    action: 'Transfer',
    application: {
      id: 'onChain',
      label: 'On-chain',
      icon: {
        key: null,
        ref: null,
        props: {},
        _owner: null,
        _store: {},
      },
    },
    assetType: {
      id: 'token',
      label: 'Token',
      title: 'Asset Type',
    },
    tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    isComplete: true,
  },
];
export const dataRouteDetails = [
  // {
  //   id: 'cp2cp1',
  //   optionConnect: {
  //     id: 'allOption',
  //     label: 'All option(s)',
  //   },
  //   optionTime: [
  //     {
  //       id: 1680062538174,
  //       value: '2',
  //       option: {
  //         id: 'month',
  //         label: 'MONTH(S)',
  //         value: 'MONTH',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'cp3cp2',
  //   optionConnect: {
  //     id: 'CustomOption',
  //     label: 'Custom option(s)',
  //   },
  //   optionTime: [
  //     {
  //       id: 1680062494439,
  //       value: '1',
  //       option: {
  //         id: 'month',
  //         label: 'MONTH(S)',
  //         value: 'MONTH',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'cp4cp3',
  //   optionConnect: {
  //     id: 'allFailOption',
  //     label: 'All fail option(s)',
  //   },
  //   optionTime: [
  //     {
  //       id: 1680062494439,
  //       value: '2',
  //       option: {
  //         id: 'month',
  //         label: 'MONTH(S)',
  //         value: 'MONTH',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'cp5cp4',
  //   optionConnect: {
  //     id: 'allOption',
  //     label: 'All option(s)',
  //   },
  //   optionTime: [
  //     {
  //       id: 1680062547107,
  //       value: '3',
  //       option: {
  //         id: 'hour',
  //         label: 'HOUR(S)',
  //         value: 'HOUR',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'cp5cp1',
  //   optionConnect: {
  //     id: 'CustomOption',
  //     label: 'Custom option(s)',
  //   },
  //   optionTime: [
  //     {
  //       id: 1680062547107,
  //       value: '3',
  //       option: {
  //         id: 'hour',
  //         label: 'HOUR(S)',
  //         value: 'HOUR',
  //       },
  //     },
  //   ],
  // },
  {
    id: 'cp4cp2',
    optionConnect: {
      id: 'allOption',
      label: 'All option(s)',
    },
    optionTime: [
      {
        id: 1680062547107,
        value: '3',
        option: {
          id: 'hour',
          label: 'HOUR(S)',
          value: 'HOUR',
        },
      },
    ],
  },
];
