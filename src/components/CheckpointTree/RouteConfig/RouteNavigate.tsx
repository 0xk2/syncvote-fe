import { ECheckpointsType } from 'types/enums/checkpoints';
import React from 'react';
import CheckpointNodePreview from '@components/CheckpointNodePreview/CheckpointNodePreview';
import { ICheckpointNode } from 'types/checkpoint';

type Props = {
  startCp: ICheckpointNode;
  endCp: ICheckpointNode;
};

function RouteNavigate({ startCp, endCp }: Props) {
  return (
    <div className="flex container justify-center w-full overflow-x-auto custom-scroll-bar border rounded-[12px] border-[#E3E3E2]">
      {[startCp, endCp].map((cp, index) => (
        <CheckpointNodePreview
          key={cp.id}
          id={cp.id}
          isFirstOfLeaf={index === 0}
          isLastOfLeaf={index === 1}
          type={cp.type as ECheckpointsType}
          name={cp.name}
          isSelected
          isPreview
          parentId={index === 0 ? null : 1}
        />
      ))}
    </div>
  );
}

export default RouteNavigate;
