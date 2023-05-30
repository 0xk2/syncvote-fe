import PlusCircleIcon from '@assets/icons/svg-icons/PlusCircleIcon';
import { ECheckpointsType } from 'types/enums/checkpoints';
// import { ICheckpointNode } from '@interfaces/checkpoint';
import VotingIcon from '@components/CheckpointTree/VotingIcon';
import './styles.scss';
import React from 'react';
import AlertIcon from '@assets/icons/svg-icons/AlertIcon';
import { Tooltip } from 'antd';
import { L } from '@utils/locales/L';
import CustomTooltip from '@components/CustomTooltip';
import { ICheckpointNode } from 'types/checkpoint';
import { MOCK_TOKEN_NAME } from '@constants/checkpoint';

type Props = {
  id: string | number;
  type: ECheckpointsType;
  name: string;
  parentIndex?: number; // to specific margin-left for cp in sub-branch
  branchLevel?: number; // to calculate height for sub-branch
  classes?: string;
  parentId?: string | number | null;
  isFirstOfLeaf: boolean;
  isActiveRoute?: boolean;
  isLastOfLeaf: boolean;
  isSelected?: boolean;
  isPreview?: boolean;
  isAddPrimarySection?: boolean;
  isShowRoleOrToken?: boolean;
  node?: ICheckpointNode;
  isComplete?: boolean;
  // isDisableAddBranch?: boolean;
  isNeedShowAlert?: boolean;
  handleCreateNewBranch?: () => void;
  onNodeClick?: () => void;
  onNodeConfig?: () => void;
  onRouteClick?: (e: any) => void;
  addCheckpoint?: (checkpointId: string | number) => void;
};

const CheckpointNode: React.FC<Props> = ({
  id,
  type,
  name,
  parentIndex = 0,
  branchLevel = 0,
  classes = '',
  parentId = null,
  isAddPrimarySection = false,
  node,
  isFirstOfLeaf = false,
  isComplete = false,
  isLastOfLeaf = false,
  onNodeClick = () => {},
  isSelected = false,
  isPreview = false,
  isShowRoleOrToken = false,
  isNeedShowAlert = false,
  handleCreateNewBranch = () => {},
  onNodeConfig = () => {},
  onRouteClick = () => {},
  isActiveRoute = false,
  addCheckpoint = () => {},
}) => {
  const invalidType = [ECheckpointsType.end, ECheckpointsType.unknown, ECheckpointsType.enforcer];
  const isHighlight = isSelected || !invalidType.includes(type);
  const isEndNode = type === ECheckpointsType.end;
  const isEnforcer = type === ECheckpointsType.enforcer;
  const isRootBranch = node?.level === 1;

  function handleAddNewCheckpoint(
    e: React.MouseEvent<SVGSVGElement>,
    checkpointId: string | number,
  ) {
    e.stopPropagation();
    addCheckpoint(checkpointId);
  }

  const handleAddNewBranch = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    handleCreateNewBranch();
  };

  const renderAllowedRoles = () => {
    if (node?.config?.allowedBy?.id === 'token') {
      return `${MOCK_TOKEN_NAME} holders`;
    }
    return node?.config.allowedRoles.length > 1
      ? `${node?.config.allowedRoles[0]?.label} (+ ${
          Number(node?.config.allowedRoles.length) - 1
        } other roles)`
      : node?.config.allowedRoles[0]?.label;
  };

  // calculate location for sub-branches
  const marginLeft = (parentIndex + 1) * 216;
  const height = branchLevel * 165;

  return (
    <div
      className={`node-and-connector-pro flex flex-col justify-center text-center relative h-[165px]
          ${parentId && isFirstOfLeaf ? 'sub-branch' : ''} 
          ${
            !isLastOfLeaf &&
            'after:absolute after:right-0 after:translate-x-full after:w-w_14 after:top-1/2  after:h-[3px] mr-mr_1'
          } `}
      style={{ '--margin-left': `${marginLeft}px` } as React.CSSProperties}
      onClick={onNodeConfig}
    >
      {/* Show role or token holder in page review page */}
      {isShowRoleOrToken && !isEnforcer && !isEndNode && (
        <div className="absolute top-0 w-[200px] left-[-65px] flex justify-center items-center">
          <p className="text-violet-version-5 font-medium leading-[21px] text-[16px] p-[4px] rounded-8 bg-violet-version-1 truncate">
            {renderAllowedRoles()}
          </p>
        </div>
      )}
      {/* route turn to bottom */}
      {parentId && isFirstOfLeaf && (
        <div
          className={`w-[1px] h-[165px] 
           sub-route border-l-[3px] border-b-[3px] border-grey-version-3 left-[-100%] absolute bottom-[50%] -z-10`}
          style={{ height: `${height}px` }}
        />
      )}

      {/* start checkpoint */}
      <div
        className={`border-[3px] p-p_5 node_can_config ${
          isAddPrimarySection ? 'add-primary-section' : ''
        } ${
          isHighlight || isComplete ? 'border-violet-version-5' : ''
        } relative node hover:cursor-pointer inline-block rounded-1/2 center ${classes} ${
          isLastOfLeaf ? 'bg-grey-version-9' : ''
        } ${(isEndNode || isEnforcer) && 'node_enforcer'} ${isEndNode && 'border-dashed'} ${
          isPreview && isEndNode ? 'end-node-preview' : ''
        } ${isRootBranch && !isEndNode && !isEnforcer ? 'node_root' : ''}`}
        onClick={onNodeClick}
      >
        {!isEndNode && !isEnforcer && !isPreview && isRootBranch && (
          <>
            {node.isMaxSubBranch ? (
              <CustomTooltip classes="plus-icon plus-icon__new-route" text="No more option to link">
                <PlusCircleIcon onClick={handleAddNewBranch} />
              </CustomTooltip>
            ) : (
              <PlusCircleIcon
                className="plus-icon plus-icon__new-route"
                onClick={handleAddNewBranch}
              />
            )}
          </>
        )}

        {/* plus icon to create new cp */}
        {!isPreview && (
          <>
            <PlusCircleIcon
              className="plus-icon plus-icon__new-cp"
              onClick={(e) => handleAddNewCheckpoint(e, id)}
            />
          </>
        )}
        {isNeedShowAlert && !isComplete && !isPreview && !isEndNode && (
          <Tooltip
            placement="top"
            title={L('thisCheckpointHasNotBeenSetUp')}
            zIndex={50}
            color="#D89531"
            overlayClassName="min-w-[280px]"
            overlayInnerStyle={{ textAlign: 'center' }}
          >
            <div className="absolute text-yellow-version-5 top-0">
              <AlertIcon />
            </div>
          </Tooltip>
        )}
        {/* Icon in checkpoint */}
        <VotingIcon type={type} isHighlight={isHighlight || isComplete} />

        {/* Route */}
        {((parentId && isPreview) ||
          (!isFirstOfLeaf && !isPreview) ||
          (parentId && isFirstOfLeaf)) && (
          <>
            {/* route */}
            <div
              className={`checkpoint-node-route border-b-[3px] route_has_icon ${
                isAddPrimarySection ? 'add-primary-section' : ''
              } ${isActiveRoute ? 'border-[#D9C6F5]' : 'border-grey-version-3'} ${
                parentId && isFirstOfLeaf ? 'w-[76px]' : 'w-[140px]'
              }  h-[16px] absolute right-[73px] bottom-[50%]  ${
                !isEndNode ? 'cursor-pointer' : 'cursor-auto'
              }`}
              onClick={(e) => {
                if (!isEndNode) {
                  onRouteClick(e);
                } else {
                  e.stopPropagation();
                }
              }}
            >
              {/* route arrow */}
              {parentId && (
                <div
                  className={`checkpoint-node-route-arrow ${
                    isAddPrimarySection ? 'add-primary-section' : ''
                  } border-r-[3px] border-b-[3px] ${
                    isActiveRoute ? 'border-[#D9C6F5]' : 'border-grey-version-3'
                  }  w-[10px] h-[10px] absolute ${
                    parentId && isFirstOfLeaf ? 'left-[85%]' : 'left-[92%]'
                  }  bottom-[-6px] rotate-[-45deg] z-10`}
                />
              )}
            </div>
          </>
        )}
      </div>
      {/* end checkpoint */}

      {/* checkpoint name */}
      <span
        className={`nameCp truncate ${isPreview ? 'preview' : ''}  ${
          isHighlight || isComplete ? 'text-violet-version-5' : 'text-grey-version-5'
        } absolute bottom-0 left-1/2 -translate-x-2/4 -translate-y-[10px]`}
      >
        {name}
      </span>
    </div>
  );
};

export default CheckpointNode;
