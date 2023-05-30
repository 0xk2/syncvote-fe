import React from 'react';

import VotingIcon from '@components/CheckpointTree/VotingIcon';
import { ECheckpointsType } from 'types/enums/checkpoints';
import './styles.scss';
import { ICheckpointNode } from 'types/checkpoint';

type Props = {
  type: ECheckpointsType;
  name: string;
  classes?: string;
  iconColor?: string | null;
  haveRouteDetail?: Boolean;
  parentId?: string | number | null;
  isFirstOfLeaf: boolean;
  isLastOfLeaf: boolean;
  currentNode?: ICheckpointNode | null;
  isSelected?: boolean;
  isPreview?: boolean;
  level?: number;
  onNodeClick?: () => void;
  // onNodeConfig?: () => void;
  onRouteClick?: (e: any) => void;
  memberType?: string | string[];
  ableDrawer?: boolean;
  isActiveRoute?: boolean;
};

const CheckpointNodeReview: React.FC<Props> = ({
  type,
  name,
  classes = '',
  parentId = null,
  isFirstOfLeaf = false,
  isLastOfLeaf = false,
  onNodeClick = () => {},
  isSelected = false,
  isPreview = false,
  // onNodeConfig = () => {},
  onRouteClick = () => {},
  memberType = 'Members',
  isActiveRoute = false,
}) => {
  return (
    <div>
      <div className="relative">
        <div>
          {!isLastOfLeaf && (
            <span className="absolute text-sm font-medium py-1 px-2 rounded-lg cursor-pointer bg-tag-active-bg text-tag-active-text">
              {memberType}
            </span>
          )}
        </div>
        <div
          className={`node-and-connector-pro flex flex-col justify-center text-center relative h-[165px]
            ${parentId && isFirstOfLeaf ? 'ml-[214px]' : ''} 
            ${
              !isLastOfLeaf &&
              'after:absolute after:right-0 after:translate-x-full after:w-w_14 after:top-1/2  after:h-[3px] mr-[140px]'
            } `}
        >
          {parentId && isFirstOfLeaf && (
            <div
              className="w-[70px] h-[165px]
              border-l-[3px] border-b-[3px] border-grey-version-3 left-[-100%] absolute bottom-[50%] -z-10"
            />
          )}

          <div
            className={`border-[3px] p-p_5 node_can_config ${
              isSelected ? 'border-violet-version-5 ' : ''
            } relative node hover:cursor-pointer inline-block rounded-1/2 center ${classes} ${
              isLastOfLeaf ? 'bg-grey-version-9' : ''
            } 
              $`}
            onClick={onNodeClick}
          >
            <VotingIcon type={type} isHighlight={isSelected} />

            {/* Route */}
            {((parentId && isPreview) ||
              (!isFirstOfLeaf && !isPreview) ||
              (parentId && isFirstOfLeaf)) && (
              <>
                {/* route */}
                <div
                  className={`checkpoint-node-route border-b-[3px] ${
                    isActiveRoute ? 'border-[#D9C6F5] route_active_icon' : 'border-grey-version-3'
                  } ${
                    parentId && isFirstOfLeaf ? 'w-[70px]' : 'w-[138px]'
                  }  h-[16px] absolute right-[75px] bottom-[50%] ${
                    type !== ECheckpointsType.end && ' route_has_icon'
                  }`}
                  onClick={onRouteClick}
                >
                  {/* route arrow */}
                  {parentId && (
                    <div
                      className={`checkpoint-node-route-arrow border-l-[3px] border-b-[3px] ${
                        isActiveRoute ? 'border-[#D9C6F5]' : 'border-grey-version-3'
                      }  w-[16px] h-[16px] absolute ${
                        parentId && isFirstOfLeaf ? 'left-[75%]' : 'left-[88%]'
                      }  bottom-[-9px] rotate-[230deg]`}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          <span
            className={`${
              isSelected && 'text-violet-version-5'
            } absolute top-[140px] left-1/2 -translate-x-2/4 -translate-y-[10px] w-40 font-semibold whitespace-nowrap text-[20px]`}
          >
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckpointNodeReview;
