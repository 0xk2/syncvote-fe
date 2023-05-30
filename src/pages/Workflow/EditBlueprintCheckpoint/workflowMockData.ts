export const workflows = [
  {
    id: '1',
    totalPrimaryCp: 4,
    totalCheckpoints: 6,
    name: 'Investment deals evaluation process for Investment DAO',
    listCheckpoint: [
      {
        id: '1',
        parentId: null,
        level: 1,
        haveRouteDetail: true,
        iconColor: '#252422',
        name: 'Trending deals',
        type: 'up_vote',
        isFirstOfLeaf: true,
        isLastOfLeaf: false,
        config: {
          allowedBy: {
            id: 'token',
            label: 'Token',
          },
          allowedRoles: [],
          rolesOptions: [],
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f9',
          minimumHoldingPeriod: {
            value: '1',
            type: {
              id: 'hour',
              label: 'HOUR(S)',
              value: 'HOUR',
            },
          },
          minimumHoldingQuantity: {
            value: '0',
          },
          thresholdCalculatedBy: {
            id: 'totalVotesMade',
            label: 'Total votes made',
          },
          thresholdValue: {
            0: '0',
            1: '.',
            value: '0.1',
          },
          isComplete: true,
          votingCondition: false,
        },
      },
      {
        id: '2',
        parentId: '1',
        level: 1,
        haveRouteDetail: true,
        iconColor: '#252422',
        name: 'Due dilligence',
        type: 'polling',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        config: {
          allowedBy: {
            id: 'role',
            label: 'Roles',
          },
          allowedRoles: [
            {
              id: 'Council',
              label: 'Council',
              member: [
                {
                  id: 'b56889ed-ea9f-452a-baf3-1d7882609c32',
                  nameTag: 'abc',
                  walletAddress: 'zxcvbnm',
                  roleId: 'Council',
                },
              ],
            },
          ],
          rolesOptions: [
            {
              id: 'Council',
              label: 'Council',
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
          },
          numberOfResults: {
            id: 'all',
            label: 'All',
          },
          inputNumberOfResults: '1',
          votingCondition: true,
          numberOfOptions: '1',
          thresholdCalculatedBy: {
            id: 'totalRoleAssignedMembers',
            label: 'Total role-assigned members',
          },
          thresholdValue: {
            0: '0',
            1: '.',
            value: '0.1',
          },
          isComplete: true,
        },
      },
      {
        id: '3',
        parentId: '2',
        level: 1,
        name: 'IC Decide',
        haveRouteDetail: true,
        type: 'single_choice_vote',
        iconColor: 'unknown',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        config: {
          listOfOptions: [
            {
              id: 1,
              value: 'YES',
              status: null,
              isLoop: true,
            },
            {
              id: 2,
              value: 'NO',
              status: null,
              isLoop: true,
            },
            {
              id: 3,
              value: '0',
              status: null,
              isLoop: false,
            },
          ],
          allowedBy: {
            id: 'role',
            label: 'Roles',
          },
          allowedRoles: [
            {
              id: 'Member',
              label: 'Member',
              member: [
                {
                  id: '8c2ef153-4b1c-4de4-b2ba-0e0bab5c891e',
                  nameTag: 'hgfd',
                  walletAddress: 'hgfd',
                  roleId: 'Member',
                },
              ],
            },
          ],
          rolesOptions: [
            {
              id: 'Member',
              label: 'Member',
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
          },
          votingCondition: true,
          thresholdCalculatedBy: {
            id: 'totalRoleAssignedMembers',
            label: 'Total role-assigned members',
          },
          thresholdValue: {
            0: '0',
            1: '.',
            value: '0.1',
          },
          isComplete: true,
        },
      },
      {
        id: '4',
        parentId: '3',
        level: 1,
        name: 'DAO confirm',
        haveRouteDetail: true,
        type: 'veto',
        iconColor: 'unknown',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        config: {
          listOfOptions: [
            {
              id: 1,
              value: 'Veto',
              status: null,
              isLoop: true,
            },
          ],
          allowedBy: {
            id: 'token',
            label: 'Token',
          },
          allowedRoles: [],
          rolesOptions: [],
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f9',
          minimumHoldingPeriod: {
            value: '1',
            type: {
              id: 'hour',
              label: 'HOUR(S)',
              value: 'HOUR',
            },
          },
          minimumHoldingQuantity: {
            value: '0',
          },
          countedBy: {
            id: 'numberOfTokensUsedToVote',
            label: 'Number of tokens used to vote',
          },
          votingCondition: true,
          thresholdCalculatedBy: {
            id: 'showUpTokensUsedToVote',
            label: 'Show-up tokens used to vote',
          },
          thresholdValue: {
            0: '0',
            1: '.',
            value: '0.1',
          },
          isComplete: true,
        },
      },
      {
        id: '5',
        parentId: '4',
        level: 1,
        haveRouteDetail: false,
        iconColor: '#252422',
        name: 'Send SAFT',
        type: 'enforcer',
        isFirstOfLeaf: false,
        isLastOfLeaf: true,
        config: {
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
          action: 'Transfer',
          assetType: {
            id: 'token',
            label: 'Token',
          },
          placeholder: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          isComplete: true,
        },
      },
      {
        id: '6',
        parentId: '1',
        level: 2,
        name: 'Archive',
        haveRouteDetail: false,
        type: 'enforcer',
        iconColor: 'end',
        isFirstOfLeaf: true,
        isLastOfLeaf: true,
        config: {
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
          action: 'Transfer',
          assetType: {
            id: 'token',
            label: 'Token',
          },
          placeholder: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          isComplete: true,
        },
      },
    ],
  },
  {
    id: '2',
    name: 'DAO contributors recruitment process',
    totalPrimaryCp: 3,
    totalCheckpoints: 5,
    listCheckpoint: [
      {
        id: '1',
        parentId: null,
        level: 1,
        haveRouteDetail: true,
        iconColor: '#252422',
        name: 'Upvote',
        type: 'up_vote',
        isFirstOfLeaf: true,
        isLastOfLeaf: false,
        config: {
          allowedBy: {
            id: 'token',
            label: 'Token',
          },
          allowedRoles: [],
          rolesOptions: [],
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f9',
          minimumHoldingPeriod: {
            value: '1',
            type: {
              id: 'hour',
              label: 'HOUR(S)',
              value: 'HOUR',
            },
          },
          minimumHoldingQuantity: {
            value: '0',
          },
          thresholdCalculatedBy: {
            id: 'totalVotesMade',
            label: 'Total votes made',
          },
          thresholdValue: {
            0: '0',
            1: '.',
            value: '0.1',
          },
          isComplete: true,
          votingCondition: false,
        },
      },
      {
        id: '2',
        parentId: '1',
        level: 1,
        haveRouteDetail: true,
        iconColor: '#252422',
        name: 'Short-list',
        type: 'polling',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        config: {
          allowedBy: {
            id: 'role',
            label: 'Roles',
          },
          allowedRoles: [
            {
              id: 'Council',
              label: 'Council',
              member: [
                {
                  id: '8c2ef153-4b1c-4de4-b2ba-0e0bab5c891e',
                  nameTag: 'hgfd',
                  walletAddress: 'hgfd',
                  roleId: 'Member',
                },
              ],
            },
          ],
          rolesOptions: [
            {
              id: 'Council',
              label: 'Council',
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
          },
          numberOfResults: {
            id: 'all',
            label: 'All',
          },
          inputNumberOfResults: '1',
          votingCondition: true,
          numberOfOptions: '1',
          thresholdCalculatedBy: {
            id: 'totalRoleAssignedMembers',
            label: 'Total role-assigned members',
          },
          thresholdValue: {
            0: '0',
            1: '.',
            value: '0.1',
          },
          isComplete: true,
        },
      },
      {
        id: '3',
        parentId: '2',
        level: 1,
        name: 'Final selection',
        haveRouteDetail: true,
        type: 'single_choice_vote',
        iconColor: 'unknown',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        config: {
          listOfOptions: [
            {
              id: 1,
              value: 'YES',
              status: null,
              isLoop: true,
            },
            {
              id: 2,
              value: 'NO',
              status: null,
              isLoop: true,
            },
            {
              id: 3,
              value: '0',
              status: null,
              isLoop: false,
            },
          ],
          allowedBy: {
            id: 'role',
            label: 'Roles',
          },
          allowedRoles: [
            {
              id: 'Member',
              label: 'Member',
              member: [
                {
                  id: '8c2ef153-4b1c-4de4-b2ba-0e0bab5c891e',
                  nameTag: 'hgfd',
                  walletAddress: 'hgfd',
                  roleId: 'Member',
                },
              ],
            },
          ],
          rolesOptions: [
            {
              id: 'Member',
              label: 'Member',
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
          },
          votingCondition: true,
          thresholdCalculatedBy: {
            id: 'totalRoleAssignedMembers',
            label: 'Total role-assigned members',
          },
          thresholdValue: {
            0: '0',
            1: '.',
            value: '0.1',
          },
          isComplete: true,
        },
      },
      {
        id: '5',
        parentId: '4',
        level: 1,
        haveRouteDetail: false,
        iconColor: '#252422',
        name: 'Move to roadmap',
        type: 'enforcer',
        isFirstOfLeaf: false,
        isLastOfLeaf: true,
        config: {
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
          action: 'Transfer',
          assetType: {
            id: 'token',
            label: 'Token',
          },
          placeholder: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          isComplete: true,
        },
      },
      {
        id: '6',
        parentId: '1',
        level: 2,
        name: 'Move to backlog',
        haveRouteDetail: false,
        type: 'enforcer',
        iconColor: 'end',
        isFirstOfLeaf: true,
        isLastOfLeaf: true,
        config: {
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
          action: 'Transfer',
          assetType: {
            id: 'token',
            label: 'Token',
          },
          placeholder: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          isComplete: true,
        },
      },
    ],
  },
  {
    id: '3',
    totalPrimaryCp: 4,
    totalCheckpoints: 6,
    name: 'Hiring process',
    listCheckpoint: [
      {
        id: '1',
        parentId: null,
        level: 1,
        haveRouteDetail: true,
        iconColor: '#252422',
        name: 'Scan CV',
        type: 'up_vote',
        isFirstOfLeaf: true,
        isLastOfLeaf: false,
        config: {
          allowedBy: {
            id: 'role',
            label: 'Roles',
          },
          allowedRoles: [
            {
              id: 'Members',
              label: 'Members',
              member: [
                {
                  id: '8c2ef153-4b1c-4de4-b2ba-0e0bab5c891e',
                  nameTag: 'hgfd',
                  walletAddress: 'hgfd',
                  roleId: 'Members',
                },
              ],
            },
            {
              id: 'Council',
              label: 'Council',
              member: [
                {
                  id: 'b56889ed-ea9f-452a-baf3-1d7882609c32',
                  nameTag: 'abc',
                  walletAddress: 'zxcvbnm',
                  roleId: 'Council',
                },
                {
                  id: 'b56889ed-ea9f-452a-baf3-1d7882609c32',
                  nameTag: 'xyz',
                  walletAddress: 'zxcvbnmnbvcxz',
                  roleId: 'Council',
                },
              ],
            },
            {
              id: 'Product',
              label: 'Product',
            },
          ],
          rolesOptions: [],
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
          thresholdCalculatedBy: {
            id: 'totalVotesMade',
            label: 'Total votes made',
          },
          thresholdValue: {
            0: '2',
            value: '20',
          },
          isComplete: true,
        },
      },
      {
        id: '2',
        parentId: '1',
        level: 1,
        haveRouteDetail: true,
        iconColor: '#252422',
        name: 'Interview',
        type: 'polling',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        config: {
          allowedBy: {
            id: 'token',
            label: 'Token',
          },
          allowedRoles: [],
          rolesOptions: [],
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f9',
          minimumHoldingPeriod: {
            value: '7',
            type: {
              id: 'hour',
              label: 'HOUR(S)',
              value: 'HOUR',
            },
          },
          minimumHoldingQuantity: {
            value: '1234567890',
          },
          countedBy: {
            id: 'numberOfVotes',
            label: 'Number of votes',
          },
          numberOfResults: {
            id: 'all',
            label: 'All',
          },
          inputNumberOfResults: '1',
          votingCondition: true,
          numberOfOptions: '1',
          thresholdCalculatedBy: {
            id: 'totalVotesMade',
            label: 'Total votes made',
          },
          thresholdValue: {
            0: '4',
            value: '40',
          },
          isComplete: true,
        },
      },
      {
        id: '3',
        parentId: '2',
        level: 1,
        name: 'Cutural fit',
        haveRouteDetail: true,
        type: 'single_choice_vote',
        iconColor: 'unknown',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        config: {
          listOfOptions: [
            {
              id: 1,
              value: 'YES',
              status: null,
              isLoop: true,
            },
            {
              id: 2,
              value: 'NO',
              status: null,
              isLoop: true,
            },
            {
              id: 3,
              value: '0',
              status: null,
              isLoop: false,
            },
          ],
          allowedBy: {
            id: 'role',
            label: 'Roles',
          },
          allowedRoles: [
            {
              id: 'Product',
              label: 'Product',
              member: [
                {
                  id: 'b56889ed-ea9f-452a-baf3-1d7882609c32',
                  nameTag: 'abc',
                  walletAddress: 'zxcvbnm',
                  roleId: 'Product',
                },
              ],
            },
          ],
          rolesOptions: [],
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
          },
          votingCondition: true,
          thresholdCalculatedBy: {
            id: 'showUpMember',
            label: 'Show-up member',
          },
          thresholdValue: {
            id: 'thresholdValue',
            value: '5',
            status: null,
          },
          isComplete: true,
        },
      },
      {
        id: '4',
        parentId: '3',
        level: 1,
        name: 'Making offer',
        haveRouteDetail: true,
        type: 'veto',
        iconColor: 'unknown',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        config: {
          listOfOptions: [
            {
              id: 1,
              value: 'Veto',
              status: null,
              isLoop: true,
            },
          ],
          allowedBy: {
            id: 'token',
            label: 'Token',
          },
          allowedRoles: [],
          rolesOptions: [],
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f9',
          minimumHoldingPeriod: {
            value: '1',
            type: {
              id: 'day',
              label: 'DAY(S)',
              value: 'DAY',
            },
          },
          minimumHoldingQuantity: {
            value: '1234567890987654321',
          },
          countedBy: {
            id: 'numberOfVotes',
            label: 'Number of votes',
          },
          votingCondition: true,
          thresholdCalculatedBy: {
            id: 'totalVotesMade',
            label: 'Total votes made',
          },
          thresholdValue: {
            id: 'thresholdValue',
            value: '9',
            status: null,
          },
          isComplete: true,
        },
      },
      {
        id: '5',
        parentId: '4',
        level: 1,
        haveRouteDetail: false,
        iconColor: '#252422',
        name: 'Enforcer',
        type: 'enforcer',
        isFirstOfLeaf: false,
        isLastOfLeaf: true,
        config: {
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
          action: 'Transfer',
          assetType: {
            id: 'token',
            label: 'Token',
          },
          placeholder: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          isComplete: true,
        },
      },
    ],
  },
];
export const routeWorkflows = [
  {
    id: '1-2',
    optionConnect: {
      id: 'allOption',
      label: 'All option(s)',
    },
    optionTime: [
      {
        id: 1680833985038,
        value: '2',
        option: {
          id: 'month',
          label: 'MONTH(S)',
          value: 'MONTH',
        },
      },
    ],
  },
  {
    id: '2-3',
    optionConnect: {
      id: 'CustomOption',
      label: 'Custom option(s)',
    },
    optionTime: [
      {
        id: 1680834001288,
        value: '1',
        option: {
          id: 'month',
          label: 'MONTH(S)',
          value: 'MONTH',
        },
      },
    ],
  },
  {
    id: '3-4',
    optionConnect: {
      id: 'allFailOption',
      label: 'All fail option(s)',
    },
    optionTime: [
      {
        id: 1680834018072,
        value: '2',
        option: {
          id: 'month',
          label: 'MONTH(S)',
          value: 'MONTH',
        },
      },
    ],
  },
  {
    id: '4-5',
    optionConnect: {
      id: 'allOption',
      label: 'All option(s)',
    },
    optionTime: [
      {
        id: 1680834044772,
        value: '3',
        option: {
          id: 'hour',
          label: 'HOUR(S)',
          value: 'HOUR',
        },
      },
    ],
  },
  {
    id: '1-5',
    optionConnect: {
      id: 'allOption',
      label: 'All option(s)',
    },
    optionTime: [
      {
        id: 1680834059207,
        value: '3',
        option: {
          id: 'hour',
          label: 'HOUR(S)',
          value: 'HOUR',
        },
      },
    ],
  },
  {
    id: '1-6',
    optionConnect: {
      id: 'allOption',
      label: 'All option(s)',
    },
    optionTime: [
      {
        id: 1680834059207,
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
export const rolesMockData = [
  {
    id: 'Council',
    label: 'Council',
  },
  {
    id: 'Member',
    label: 'Member',
  },
  {
    id: 'Members',
    label: 'Members',
  },
  {
    id: 'Product',
    label: 'Product',
  },
];
export const membersMockData = [];
