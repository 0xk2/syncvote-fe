import { ECheckpointsType } from 'types/enums/checkpoints';
import { CP_NAME } from '@constants/checkpoint';

export const defaultListOfOptionsPollingCP2 = [
  {
    id: 1,
    value: '',
    isLoop: true,
    status: null,
  },
  {
    id: 2,
    value: '',
    isLoop: true,
    status: null,
  },
  {
    id: 3,
    value: '',
    isLoop: true,
    status: null,
  },
  {
    id: 4,
    value: '0',
    isLoop: false,
    status: null,
  },
];

export const defaultListOfOptionsVeto = [
  {
    id: 1,
    value: 'Veto',
    isLoop: true,
    status: null,
  },
  {
    id: 2,
    value: '',
    isLoop: false,
    status: null,
  },
];

export const defaultListOfOptionsSingleChoice = [
  {
    id: 1,
    value: 'Yes',
    status: null,
    isLoop: true,
  },
  {
    id: 2,
    value: 'No',
    status: null,
    isLoop: true,
  },
  {
    id: 3,
    value: '0',
    status: null,
    isLoop: false,
  },
];
export const defaultUpvoteOptions = [
  {
    id: 1,
    value: '',
    isLoop: true,
    status: null,
  },
  {
    id: 2,
    value: '',
    isLoop: true,
    status: null,
  },
];
export const dataCheckpoints = [
  {
    id: 'cp1',
    parentId: null,
    level: 1,
    name: 'Scan CV',
    haveRouteDetail: true,
    typeNode: ECheckpointsType.upvote,
    iconColor: '#252422',
    isFirstOfLeaf: true,
    isLastOfLeaf: false,
    memberType: 'Members',
  },
  {
    id: 'cp2',
    parentId: 'cp1',
    level: 1,
    name: 'Interview',
    haveRouteDetail: true,
    typeNode: ECheckpointsType.polling,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: 'Council',
  },
  {
    id: 'cp3',
    parentId: 'cp2',
    level: 1,
    name: 'Cutural fit',
    haveRouteDetail: true,
    typeNode: ECheckpointsType.singleChoice,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: 'Members',
  },
  {
    id: 'cp4',
    parentId: 'cp3',
    level: 1,
    name: 'Making offer',
    haveRouteDetail: true,
    typeNode: ECheckpointsType.veto,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: 'Members',
  },
  {
    id: 'cp5',
    parentId: 'cp4',
    level: 1,
    name: CP_NAME.enforcer,
    haveRouteDetail: false,
    typeNode: ECheckpointsType.enforcer,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: true,
  },
];
