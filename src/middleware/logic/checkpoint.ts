import { ICheckPoint } from '../types/checkpoint';

export const changeVersion = ({
  versionData, selectedNodeId, changedCheckPointData,
}: {
  versionData: any;
  selectedNodeId: string;
  changedCheckPointData: ICheckPoint;
}) => {
  const newData = structuredClone(versionData);
  const index = newData.checkpoints.findIndex((item: any) => item.id === selectedNodeId);
  if (changedCheckPointData.data) {
    newData.checkpoints[index].data = {
      ...changedCheckPointData.data,
    };
  }
  if (changedCheckPointData.children) {
    newData.checkpoints[index].children = changedCheckPointData.children;
  }
  if (changedCheckPointData.title) {
    newData.checkpoints[index].title = changedCheckPointData.title;
  }
  if (changedCheckPointData.description) {
    newData.checkpoints[index].description = changedCheckPointData.description;
  }
  if (changedCheckPointData.locked) {
    newData.checkpoints[index].locked = changedCheckPointData.locked;
  }
  if (changedCheckPointData.triggers) {
    newData.checkpoints[index].triggers = changedCheckPointData.triggers;
  }
  if (changedCheckPointData.duration) {
    newData.checkpoints[index].duration = changedCheckPointData.duration;
  }
  newData.checkpoints[index].isEnd = changedCheckPointData.isEnd === true;
  if (changedCheckPointData.isEnd === true) {
    newData.checkpoints[index].children = [];
    delete newData.checkpoints[index].vote_machine_type;
    delete newData.checkpoints[index].data;
  }
  if (changedCheckPointData.vote_machine_type) {
    newData.checkpoints[index].vote_machine_type
    = changedCheckPointData.vote_machine_type;
    newData.checkpoints[index].data = changedCheckPointData.data;
  }
  if (changedCheckPointData.participation) {
    newData.checkpoints[index].participation = changedCheckPointData.participation;
  }
  return newData;
};
