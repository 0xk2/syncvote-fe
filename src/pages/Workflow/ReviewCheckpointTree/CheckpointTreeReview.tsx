import { useSelector } from 'react-redux';
import React from 'react';

import CheckpointNodeReview from '@components/CheckpointNodeReview/CheckpointNodeReview';
import { RootState } from '@redux/store';
// import { ECheckpointsType } from '@interfaces/enums/checkpoints';
import { ICheckpointNode } from 'types/checkpoint';

type Props = {
  onNodeClick?: (node: ICheckpointNode) => void;
  onRouteClick?: (node: ICheckpointNode) => void;
};

// const dataCheckpoints: ICheckPointNode[] = [
//   {
//     id: 'cp1',
//     parentId: null,
//     level: 1,
//     name: 'New deal',
//     haveRouteDetail: true,
//     type: ECheckpointsType.polling,
//     iconColor: '#252422',
//     isFirstOfLeaf: true,
//     isLastOfLeaf: false,
//     memberType: 'Members',
//   },
//   {
//     id: 'cp2',
//     parentId: 'cp1',
//     level: 1,
//     name: 'Trending deal',
//     haveRouteDetail: true,
//     type: ECheckpointsType.singleChoice,
//     iconColor: '#252422',
//     isFirstOfLeaf: false,
//     isLastOfLeaf: false,
//     memberType: 'Council',
//   },
//   {
//     id: 'cp3',
//     parentId: 'cp2',
//     level: 1,
//     name: 'IC Reviews',
//     haveRouteDetail: true,
//     type: ECheckpointsType.singleChoice,
//     iconColor: '#252422',
//     isFirstOfLeaf: false,
//     isLastOfLeaf: false,
//     memberType: 'Members',
//   },
//   {
//     id: 'cp4',
//     parentId: 'cp3',
//     level: 1,
//     name: 'Community',
//     haveRouteDetail: true,
//     type: ECheckpointsType.veto,
//     iconColor: '#252422',
//     isFirstOfLeaf: false,
//     isLastOfLeaf: false,
//     memberType: 'Members',
//   },
//   {
//     id: 'cp5',
//     parentId: 'cp4',
//     level: 1,
//     name: 'Enforcer',
//     haveRouteDetail: false,
//     type: ECheckpointsType.enforcer,
//     iconColor: '#252422',
//     isFirstOfLeaf: false,
//     isLastOfLeaf: true,
//   },
// ];

const CheckpointTreeReview = ({ onNodeClick = () => {}, onRouteClick = () => {} }: Props) => {
  const blueprintData = useSelector((state: RootState) => state.blueprint);
  const handleNodeOnClick = (item: ICheckpointNode) => {
    onNodeClick(item);
  };

  const handleRouteOnClick = (item: ICheckpointNode) => {
    onRouteClick(item);
  };

  const renderCheckpoints = () =>
    blueprintData.listCheckpoint.map((item) => (
      <CheckpointNodeReview
        key={item.id}
        parentId={item.parentId}
        haveRouteDetail={item.haveRouteDetail}
        iconColor={item.iconColor}
        type={item.type}
        level={item.level}
        name={item.name}
        isFirstOfLeaf={item.isFirstOfLeaf}
        isLastOfLeaf={item.isLastOfLeaf}
        // memberType={item.memberType}
        onNodeClick={() => handleNodeOnClick(item)}
        onRouteClick={() => handleRouteOnClick(item)}
      />
    ));
  return <>{renderCheckpoints()}</>;
};

export default CheckpointTreeReview;
