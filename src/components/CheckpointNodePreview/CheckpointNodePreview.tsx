import { ECheckpointsType } from 'types/enums/checkpoints';
import VotingIcon from '@components/CheckpointTree/VotingIcon';
import React, { useEffect, useState } from 'react';
import { ICheckpointNode } from 'types/checkpoint';
import { getRouteId } from '@utils/helpers';
import { MOCK_TOKEN_NAME } from '@constants/checkpoint';
import style from './styles.module.scss';

type Props = {
  id: string | number;
  type: ECheckpointsType;
  name: string;
  parentIndex?: number; // to specific margin-left for cp in sub-branch
  branchLevel?: number; // to calculate height for sub-branch
  classes?: string;
  parentId?: string | number | null;
  isFirstOfLeaf: boolean;
  isLastOfLeaf: boolean;
  isSelected?: boolean;
  isPreview?: boolean;
  isAddPrimarySection?: boolean;
  isShowRoleOrToken?: boolean;
  node?: ICheckpointNode;
  routeDetails?: any[];
  listValidRoutes?: Set<string>;
  isComplete?: boolean;
  isNeedShowAlert?: boolean;
  onNodeClick?: () => void;
  onNodeConfig?: () => void;
  onRouteClick?: (e: any) => void;
};

const CheckpointNodePreview: React.FC<Props> = ({
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
  onNodeConfig = () => {},
  onRouteClick = () => {},
  listValidRoutes = new Set(),
  routeDetails = [],
}) => {
  const invalidType = [ECheckpointsType.end, ECheckpointsType.unknown, ECheckpointsType.enforcer];
  const isHighlight = isSelected || !invalidType.includes(type);
  const isEndNode = type === ECheckpointsType.end;
  const isEnforcer = type === ECheckpointsType.enforcer;

  const [isAlertRoute, setIsAlertRoute] = useState(true);

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

  useEffect(() => {
    const routeKey = getRouteId({ parentId, id });
    const hasBeenSetUp = listValidRoutes.has(routeKey);
    setIsAlertRoute(!hasBeenSetUp);
  }, [routeDetails, listValidRoutes.size]);

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
          className={`w-[1px] h-[165px] ${
            !isAlertRoute && 'route__active'
          } sub-route border-l-[3px] border-b-[3px] border-grey-version-3 left-[-100%] absolute bottom-[50%] -z-10`}
          style={{ height: `${height}px` }}
        />
      )}

      {/* start checkpoint */}
      <div
        className={`border-[3px] p-p_5 node_can_config ${
          isAddPrimarySection ? 'add-primary-section' : ''
        } ${
          isHighlight ? 'border-violet-version-5' : ''
        } relative node hover:cursor-pointer inline-block rounded-1/2 center ${classes} ${
          isLastOfLeaf ? 'bg-grey-version-9' : ''
        } ${(isEndNode || isEnforcer) && 'node_enforcer'} ${isEndNode && 'border-dashed'} ${
          isPreview && isEndNode ? 'end-node-preview' : ''
        }`}
        onClick={onNodeClick}
      >
        {/* Icon in checkpoint */}
        <VotingIcon type={type} isHighlight={isHighlight || isComplete} />

        {/* Route */}
        {((parentId && isPreview) ||
          (!isFirstOfLeaf && !isPreview) ||
          (parentId && isFirstOfLeaf)) && (
          <>
            {/* route */}
            <div
              className={`checkpoint-node-route border-b-[3px]  ${
                isHighlight ? 'border-[#5D23BB]' : 'border-grey-version-3'
              } ${
                parentId && isFirstOfLeaf ? 'w-[76px]' : 'w-[140px]'
              }  h-[16px] absolute right-[76px] bottom-[50%] ${
                !isEndNode &&
                (isNeedShowAlert && isAlertRoute ? 'route_has_alert' : 'route_has_icon')
              } ${!isEndNode ? 'cursor-pointer' : 'cursor-auto'} ${
                !isAlertRoute && 'route__active'
              } ${style.routeContent}`}
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
                    isHighlight ? 'border-[#5D23BB]' : 'border-grey-version-3'
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
          isHighlight ? 'text-violet-version-5' : 'text-grey-version-5'
        } absolute bottom-0 left-1/2 -translate-x-2/4 -translate-y-[10px]`}
      >
        {name}
      </span>
    </div>
  );
};

export default CheckpointNodePreview;
