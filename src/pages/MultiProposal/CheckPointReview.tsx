/* eslint-disable max-len */
import CheckpointNodeReview from '@components/CheckpointNodeReview/CheckpointNodeReview';
import { ECheckpointsType } from 'types/enums/checkpoints';
import { ICheckpointNode, ICheckpointNodePreview } from 'types/checkpoint';
import { CP_NAME } from '@constants/checkpoint';

type Props = {
  onNodeClick?: (item: ICheckpointNode, index: number) => void;
  activeNode?: any;
  activeRoute?: any;
  onRouteClick?: (e: any, item: ICheckpointNode, index: number) => void;
};

const dataCheckpoints: ICheckpointNodePreview[] = [
  {
    id: 'cp1',
    parentId: null,
    level: 1,
    name: 'Scan CV',
    haveRouteDetail: true,
    type: ECheckpointsType.upvote,
    iconColor: '#252422',
    isFirstOfLeaf: true,
    isLastOfLeaf: false,
    memberType: ['Members'],
  },
  {
    id: 'cp2',
    parentId: 'cp1',
    level: 1,
    name: 'Interview',
    haveRouteDetail: true,
    type: ECheckpointsType.polling,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: ['$MOCK holder'],
  },
  {
    id: 'cp3',
    parentId: 'cp2',
    level: 1,
    name: 'Cutural fit',
    haveRouteDetail: true,
    type: ECheckpointsType.singleChoice,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: 'Product',
  },
  {
    id: 'cp4',
    parentId: 'cp3',
    level: 1,
    name: 'Making offer',
    haveRouteDetail: true,
    type: ECheckpointsType.veto,
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
    type: ECheckpointsType.enforcer,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: true,
    memberType: [],
  },
];

const CheckPointReview = ({
  onNodeClick = () => {},
  activeNode,
  activeRoute,
  onRouteClick = () => {},
}: Props) => {
  const handleNodeOnClick = (item: ICheckpointNode, index: number) => {
    onNodeClick(item, index);
  };
  const handleRouteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: ICheckpointNode,
    index: number,
  ) => {
    e.stopPropagation();
    onRouteClick(e, item, index);
  };

  return (
    <>
      {dataCheckpoints.map((item, index: number) => (
        <CheckpointNodeReview
          key={item.id}
          parentId={item.parentId}
          haveRouteDetail={item.haveRouteDetail}
          iconColor={item.iconColor}
          type={item.type}
          level={item.level}
          isActiveRoute={activeRoute?.id === item.id}
          isSelected={activeNode?.id === item.id}
          name={item.name}
          isFirstOfLeaf={item.isFirstOfLeaf}
          isLastOfLeaf={item.isLastOfLeaf}
          memberType={item.memberType}
          onNodeClick={() => handleNodeOnClick(item, index)}
          onRouteClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleRouteClick(e, item, index)
          }
        />
      ))}
    </>
  );
};

export default CheckPointReview;
