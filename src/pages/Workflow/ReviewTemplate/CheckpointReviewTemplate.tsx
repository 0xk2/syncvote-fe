/* eslint-disable max-len */
import CheckpointNodeReview from '@components/CheckpointNodeReview/CheckpointNodeReview';
import React, { useEffect, useMemo, useState } from 'react';
import { ICheckpointNode, ICheckpointNodePreview } from 'types/checkpoint';
import { dataCheckpointsTemplate } from './dataReviewTemplate';

type Props = {
  id?: string;
  onNodeClick?: (item: ICheckpointNode, index: number) => void;
  onRouteClick?: (e: any, item: ICheckpointNode, index: number) => void;
  activeNode?: any;
  activeRoute?: any;
};

const CheckpointReviewTemplate = ({
  id = '1',
  onNodeClick = () => {},
  onRouteClick = () => {},
  activeNode,
  activeRoute,
}: Props) => {
  const [dataCheckpoint, setDataCheckpoint] = useState<ICheckpointNodePreview[]>([]);

  const getCheckpointDetail = (idCheckpoint: string) => {
    dataCheckpointsTemplate.forEach((item) => {
      if (item.id === idCheckpoint) {
        setDataCheckpoint(item.data);
        // break
      }
    });
  };

  useEffect(() => {
    getCheckpointDetail(id);
  }, [id]);

  const allNodeLevels = useMemo(() => {
    const results: Array<number> = [];
    dataCheckpoint?.map((item: ICheckpointNode) => {
      if (!results.includes(item.level)) {
        results.push(item.level);
      }
      return item;
    });
    return results;
  }, [dataCheckpoint]);

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
    <div className="flex flex-col">
      <div className="flex flex-col">
        {dataCheckpoint.length > 0 &&
          allNodeLevels?.map((level: Number) => (
            <div className="flex" key={String(level)}>
              {dataCheckpoint
                .filter((cp: ICheckpointNodePreview) => cp.level === level)
                ?.map((item: ICheckpointNodePreview, index: number) => (
                  <CheckpointNodeReview
                    key={item.id}
                    parentId={item.parentId}
                    haveRouteDetail={item.haveRouteDetail}
                    iconColor={item.iconColor}
                    type={item.type}
                    level={item.level}
                    name={item.name}
                    isActiveRoute={activeRoute?.id === item.id}
                    isSelected={activeNode?.id === item.id}
                    isFirstOfLeaf={item.isFirstOfLeaf}
                    isLastOfLeaf={item.isLastOfLeaf}
                    memberType={item.memberType}
                    onNodeClick={() => handleNodeOnClick(item, index)}
                    onRouteClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleRouteClick(e, item, index)
                    }
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CheckpointReviewTemplate;
