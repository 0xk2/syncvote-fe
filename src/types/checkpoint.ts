import { ECheckpointsType } from 'types/enums/checkpoints';

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

export interface ICheckpointNodePreview extends ICheckpointNode {
  memberType: string | string[];
}

export interface IVoteMethod {
  id: ECheckpointsType;
  name: string;
  detail: string;
  icon: JSX.Element | null;
  type: ECheckpointsType;
}

export interface IValueOptions {
  id: string | number;
  value: string;
}
