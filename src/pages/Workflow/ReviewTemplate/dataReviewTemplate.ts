import { ICheckpointNodePreview } from 'types/checkpoint';
import { ECheckpointsType } from 'types/enums/checkpoints';

export interface DetailNodeType {
  id: string;
  votingParticipant: string;
  votingResult: string;
  votingCondition: string;
}

export interface DetailRouteType {
  startCP: string;
  endCP: string;
  option: string;
}

const dataCheckpointsTemplate: Array<{ id: string; data: ICheckpointNodePreview[] }> = [
  {
    id: '1',
    data: [
      {
        id: 'cp1',
        parentId: null,
        level: 1,
        name: 'Trending deals',
        haveRouteDetail: true,
        type: ECheckpointsType.upvote,
        iconColor: '#252422',
        isFirstOfLeaf: true,
        isLastOfLeaf: false,
        memberType: 'Member',
      },
      {
        id: 'cp2',
        parentId: 'cp1',
        level: 1,
        name: 'Due dilligence',
        haveRouteDetail: true,
        type: ECheckpointsType.polling,
        iconColor: '#252422',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        memberType: 'Council',
      },
      {
        id: 'cp3',
        parentId: 'cp2',
        level: 1,
        name: 'IC Decide',
        haveRouteDetail: true,
        type: ECheckpointsType.singleChoice,
        iconColor: '#252422',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        memberType: 'Member',
      },
      {
        id: 'cp4',
        parentId: 'cp3',
        level: 1,
        name: 'DAO confirm',
        haveRouteDetail: true,
        type: ECheckpointsType.veto,
        iconColor: '#252422',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        memberType: 'Member',
      },
      {
        id: 'cp5',
        parentId: 'cp4',
        level: 1,
        name: 'Send SAFT',
        haveRouteDetail: false,
        type: ECheckpointsType.enforcer,
        iconColor: '#252422',
        isFirstOfLeaf: false,
        isLastOfLeaf: true,
        memberType: [],
      },
      {
        id: 'cp6',
        parentId: 'cp1',
        level: 2,
        name: 'Archive',
        haveRouteDetail: true,
        type: ECheckpointsType.enforcer,
        iconColor: '#252422',
        isFirstOfLeaf: true,
        isLastOfLeaf: true,
        memberType: [],
      },
    ],
  },
  {
    id: '2',
    data: [
      {
        id: 'cp1',
        parentId: null,
        level: 1,
        name: 'Upvote',
        haveRouteDetail: true,
        type: ECheckpointsType.upvote,
        iconColor: '#252422',
        isFirstOfLeaf: true,
        isLastOfLeaf: false,
        memberType: 'Member',
      },
      {
        id: 'cp2',
        parentId: 'cp1',
        level: 1,
        name: 'Short-list',
        haveRouteDetail: true,
        type: ECheckpointsType.polling,
        iconColor: '#252422',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        memberType: 'Council',
      },
      {
        id: 'cp3',
        parentId: 'cp2',
        level: 1,
        name: 'Final selection',
        haveRouteDetail: true,
        type: ECheckpointsType.singleChoice,
        iconColor: '#252422',
        isFirstOfLeaf: false,
        isLastOfLeaf: false,
        memberType: 'Member',
      },
      {
        id: 'cp4',
        parentId: 'cp3',
        level: 1,
        name: 'Move to roadmap',
        haveRouteDetail: false,
        type: ECheckpointsType.enforcer,
        iconColor: '#252422',
        isFirstOfLeaf: false,
        isLastOfLeaf: true,
        memberType: [],
      },
      {
        id: 'cp5',
        parentId: 'cp1',
        level: 2,
        name: 'Move to backlog',
        haveRouteDetail: true,
        type: ECheckpointsType.enforcer,
        iconColor: '#252422',
        isFirstOfLeaf: true,
        isLastOfLeaf: true,
        memberType: [],
      },
    ],
  },
];

const dataRoutesTemplate = [
  {
    templateId: '1',
    config: [
      {
        startCP: 'cp1',
        endCP: 'cp2',
        option: 'All pass option(s)',
      },
      {
        startCP: 'cp2',
        endCP: 'cp3',
        option: 'All pass option(s)',
      },
      {
        startCP: 'cp3',
        endCP: 'cp4',
        option: 'All pass option(s)',
      },
      {
        startCP: 'cp4',
        endCP: 'cp5',
        option: 'All pass option(s)',
      },
      {
        startCP: 'cp1',
        endCP: 'cp6',
        option: 'All option(s)',
      },
    ],
  },
  {
    templateId: '2',
    config: [
      {
        startCP: 'cp1',
        endCP: 'cp2',
        option: 'All pass option(s)',
      },
      {
        startCP: 'cp2',
        endCP: 'cp3',
        option: 'All pass option(s)',
      },
      {
        startCP: 'cp3',
        endCP: 'cp4',
        option: 'All pass option(s)',
      },
      {
        startCP: 'cp4',
        endCP: 'cp5',
        option: 'All option(s)',
      },
    ],
  },
];

const detailNodeCheckpointReview = [
  {
    idCheckpointsTemplate: '1',
    detail: [
      {
        id: 'cp1',
        votingParticipant: 'Token',
        votingResult: 'Number of votes',
        votingCondition: 'Total votes made',
      },
      {
        id: 'cp2',
        votingParticipant: 'Role',
        votingResult: 'Number of votes',
        votingCondition: 'Total votes made',
      },
      {
        id: 'cp3',
        votingParticipant: 'Role',
        votingResult: 'Number of votes',
        votingCondition: 'Total votes made',
      },
      {
        id: 'cp4',
        votingParticipant: 'Token',
        votingResult: 'Number of tokens used to vote',
        votingCondition: 'Show-up tokens used to vote',
      },
    ],
  },
  {
    idCheckpointsTemplate: '2',
    detail: [
      {
        id: 'cp1',
        votingParticipant: 'Token',
        votingResult: 'Number of votes',
        votingCondition: 'Total votes made',
      },
      {
        id: 'cp2',
        votingParticipant: 'Role',
        votingResult: 'Number of votes',
        votingCondition: 'Total votes made',
      },
      {
        id: 'cp3',
        votingParticipant: 'Role',
        votingResult: 'Number of votes',
        votingCondition: 'Total votes made',
      },
    ],
  },
];

export { dataCheckpointsTemplate, detailNodeCheckpointReview, dataRoutesTemplate };
