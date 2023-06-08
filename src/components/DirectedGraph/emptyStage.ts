import { ICheckPoint } from '../../types';

const rootCheckPoint: ICheckPoint = {
  id: 'root',
  position: {
    x: 0,
    y: 0,
  },
  isEnd: true,
  data: {},
};
const endNode: ICheckPoint = {
  id: 'end',
  position: {
    x: 200,
    y: 0,
  },
  data: {},
  isEnd: true,
};
export const emptyStage = {
  checkpoints: [
    rootCheckPoint,
    endNode,
  ],
  start: 'root',
};
