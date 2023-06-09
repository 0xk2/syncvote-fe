import { ECheckpointsType } from 'types/enums/checkpoints';
// deprecated; would delete in the future
export interface ICheckpointNode {
  id: string | number;
  parentId: string | number | null;
  level: number;
  parentIndex?: number;
  haveRouteDetail: boolean;
  iconColor: string | null;
  type: ECheckpointsType;
  name: string;
  isFirstOfLeaf: boolean;
  isLastOfLeaf: boolean;
  isMaxSubBranch?: boolean;
  config?: any;
}
// deprecated; would delete in the future
export interface ICheckpointNodePreview extends ICheckpointNode {
  memberType: string | string[];
}
// deprecated; would delete in the future
export interface IVoteMethod {
  id: ECheckpointsType;
  name: string;
  detail: string;
  icon: JSX.Element | null;
  type: ECheckpointsType;
}
// deprecated; would delete in the future
export interface IValueOptions {
  id: string | number;
  value: string;
}

export * from '../middleware/types/checkpoint';
