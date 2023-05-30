import { ICheckPoint } from './interfaces';

const rootCheckPoint: ICheckPoint = {
  id: 'root',
  position: {
    x: 0,
    y: 0,
  },
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
const emptyStage = {
  checkpoints: [
    rootCheckPoint,
    endNode,
  ],
  start: 'root',
};
export default emptyStage;
