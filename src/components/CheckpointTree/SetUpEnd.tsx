import { ECheckpointsType } from 'types/enums/checkpoints';
import React from 'react';
import { ICheckpointNode } from 'types/checkpoint';
import EnforcerIcon from '@assets/icons/svg-icons/EnforcerIcon';
import { CP_NAME } from '@constants/checkpoint';

type Props = {
  setSelectedMethod: (e: string) => void;
  setNodeData: (value: ICheckpointNode) => void;
  nodeData: ICheckpointNode;
  listCheckPoints: ICheckpointNode[];
  setListCheckPoints: React.Dispatch<React.SetStateAction<ICheckpointNode[] | []>>;
};
function SetUpEnd(props: Props) {
  const { setSelectedMethod, setNodeData, nodeData, listCheckPoints, setListCheckPoints } = props;

  const onChangeType = () => {
    const indexCp = listCheckPoints.findIndex((cp) => cp.id === nodeData.id);
    if (indexCp === -1) {
      console.warn('Not found end checkpoint');
      return;
    }

    const newNodeData = {
      ...nodeData,
      name: CP_NAME.enforcer,
      type: ECheckpointsType.enforcer,
    };
    const nextCpTree = [...listCheckPoints];
    nextCpTree[indexCp] = {
      ...newNodeData,
    };

    setSelectedMethod(ECheckpointsType.enforcer);
    setNodeData(newNodeData);
    setListCheckPoints(nextCpTree);
  };

  return (
    <div className="px-[24px]">
      <p className="text-base text-[#575655] my-[24px]">
        An End node marks the end of a process without any action, and it must be the final point.
        Switching it to an Enforcer node can add an automated action after voting.
      </p>
      <p className="font-semibold text-base-2xl text-[#252422] mb-[24px]">Introduce Enforcer</p>
      <div className="flex items-center  border border-solid border-[#E3E3E2] rounded-[8px] p-5">
        <div className="basis-[10%] text-center">
          <p className="leading-[84px] text-[#5D23BB] font-semibold text-[34px]">1</p>
        </div>
        <p className="basis-[90%] text-[13px] text-[#575655]">
          Enforcer only executes a final action according to the voting result. It's like a referee
          waiting for the game to end before enforcing the rules. Once the votes have been counted,
          Enforcer automatically carries out the necessary actions or parameters that the voters
          have approved.
        </p>
      </div>

      <div className="flex items-center  border border-solid border-[#E3E3E2] rounded-[8px] p-5 my-[24px]">
        <div className="basis-[10%] text-center">
          <p className="leading-[84px] text-[#5D23BB] font-semibold text-[34px]">2</p>
        </div>
        <p className="basis-[90%] text-[13px] text-[#575655]">
          Enforcer is like a trusty sidekick that helps you get things done! You can use Enforcer to
          change parameters within the DAO, transfer tokens or NFTs, and even&nbsp;
          <span className="font-semibold">integrate with Web2 services</span>
          &nbsp;to do cool things like post a tweet. It&apos;s so easy to use - just a few clicks
          and Enforcer takes care of everything for you!
        </p>
      </div>
      <button className="bg-[#5D23BB] p-4 w-full rounded-[8px]" onClick={onChangeType}>
        <span className="flex justify-center gap-1">
          <EnforcerIcon color="#fff" />
          <span className=" text-base text-white">Try enforcer</span>
        </span>
      </button>
    </div>
  );
}

export default SetUpEnd;
