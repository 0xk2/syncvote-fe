import React, { useState } from 'react';
import clsx from 'clsx';

import EditTextName from '@components/EditTextName/EditTextName';
import { ECheckpointsType } from 'types/enums/checkpoints';
import { ICheckpointNode, IVoteMethod } from 'types/checkpoint';
import TrashCan from '@assets/icons/svg-icons/TrashCan';
import { L } from '@utils/locales/L';
import SetUpEnd from '@components/CheckpointTree/SetUpEnd';
import SetUpUpVetoVote from './SettingVetoVote';
import SetUpEnforcer from './SetUpEnforcer';
import SetUpPolling from './SetUpPolling';
import SetUpSingleChoiceVote from './SetUpSingleChoiceVote';
import SetUpUpvote from './SetUpUpvote';

type AlignModalProps = {
  node: ICheckpointNode;
  voteMethods: Array<IVoteMethod>;
  listCheckPoints?: ICheckpointNode[];
  setListCheckPoints?: React.Dispatch<React.SetStateAction<ICheckpointNode[] | []>>;
  setIcon?: (type: ECheckpointsType) => void;
  handleDeleteCheckpoint?: (id: string | number) => void;
  onCloseCheckpoint?: () => void;
};

const AlignModal = ({
  node,
  voteMethods,
  setListCheckPoints = () => {},
  listCheckPoints = [],
  setIcon = () => {},
  handleDeleteCheckpoint = () => {},
  onCloseCheckpoint = () => {},
}: AlignModalProps) => {
  const [nodeData, setNodeData] = useState<ICheckpointNode>(node);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(nodeData.type);
  const renderVotingMethodById = (method: string) => {
    if (method === ECheckpointsType.enforcer) {
      return (
        <SetUpEnforcer
          node={nodeData}
          listCheckPoints={listCheckPoints}
          setListCheckPoints={setListCheckPoints}
          onCloseCheckpoint={onCloseCheckpoint}
        />
      );
    }
    if (method === ECheckpointsType.end) {
      return (
        <SetUpEnd
          nodeData={nodeData}
          setNodeData={setNodeData}
          setSelectedMethod={setSelectedMethod}
          listCheckPoints={listCheckPoints}
          setListCheckPoints={setListCheckPoints}
        />
      );
    }
    let VotingMethod;
    switch (method) {
      case ECheckpointsType.polling:
        VotingMethod = SetUpPolling;
        break;
      case ECheckpointsType.upvote:
        VotingMethod = SetUpUpvote;
        break;
      case ECheckpointsType.singleChoice:
        VotingMethod = SetUpSingleChoiceVote;
        break;
      case ECheckpointsType.veto:
        VotingMethod = SetUpUpVetoVote;
        break;
      default:
        throw new Error('Method not found');
    }

    return (
      <VotingMethod
        node={nodeData}
        onChangeMethod={() => setSelectedMethod(null)}
        setListCheckPoints={setListCheckPoints}
        listCheckPoints={listCheckPoints}
        onCloseCheckpoint={onCloseCheckpoint}
      />
    );
  };

  // todo separate new component
  const renderMethods = (
    <>
      <div className="flex flex-col gap-[16px] px-[24px]">
        <span className="font-[600] text-[20px] tracking-[0.38px] text-grey-version-7">
          Select voting method
        </span>
        {voteMethods.map((method) => (
          <div
            className="flex flex-col border-[1px] rounded-[12px] p-24px cursor-pointer"
            key={method.id}
            onClick={() => {
              const updatedCheckPoints: ICheckpointNode[] = listCheckPoints.map(
                (checkpoint: ICheckpointNode) => {
                  if (checkpoint.id === nodeData.id) {
                    const updatedCheckpoint: ICheckpointNode = {
                      ...checkpoint,
                      type: method.id || ECheckpointsType.unknown,
                    };
                    setSelectedMethod(method.id);
                    setIcon(method.id);
                    return updatedCheckpoint;
                  }
                  return checkpoint;
                },
              );
              setListCheckPoints(updatedCheckPoints);
            }}
          >
            <div className="flex items-center gap-[10px] mb-[12px]">
              <span className="w-[24px] h-[24px]">{method.icon}</span>
              <span className="text-[20px] font-semibold tracking-[0.38px]">{method.name}</span>
            </div>
            <span className="text-[17px] tracking-0.5px">{method.detail}</span>
          </div>
        ))}
      </div>
    </>
  );

  function getModalContent() {
    if (selectedMethod && selectedMethod !== ECheckpointsType.unknown) {
      return renderVotingMethodById(selectedMethod);
    }

    return renderMethods;
  }

  const onClickDelete = () => {
    if (nodeData.type === ECheckpointsType.end) {
      return;
    }
    handleDeleteCheckpoint(nodeData.id);
  };

  const handleSaveName = (value: string) => {
    const foundCpIndex = listCheckPoints.findIndex((item: ICheckpointNode) => item.id === node.id);
    if (foundCpIndex === -1) {
      return;
    }

    const nextListCheckpoint = [...listCheckPoints];
    nextListCheckpoint[foundCpIndex] = {
      ...nextListCheckpoint[foundCpIndex],
      name: value,
    };
    setListCheckPoints(nextListCheckpoint);
  };

  return (
    <div className="h-screen bg-white custom-scroll-bar-v ">
      <div className="flex justify-between items-center mb-[40px] mt-[24px] px-[24px]">
        <div className="grow max-w-[75%]">
          <EditTextName title={nodeData.name} classes="" handleSaveValue={handleSaveName} />
        </div>
        <div
          className={clsx(
            'flex items-center text-[#A22C29] text-[16px] cursor-pointer',
            nodeData.type === ECheckpointsType.end && 'hidden',
          )}
          onClick={onClickDelete}
        >
          <span className="w-[14px] h-[20px] mr-[10px]">
            <TrashCan />
          </span>
          <span>{L('delete')}</span>
        </div>
      </div>
      <div className="flex flex-col gap-[40px]">{getModalContent()}</div>
    </div>
  );
};

export default AlignModal;
