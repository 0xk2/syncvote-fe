import React, { useEffect, useMemo, useState } from 'react';
import { Drawer } from 'antd';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import CheckpointNode from '@components/CheckpointNode/CheckpointNode';
import { setListCheckpoint } from '@redux/reducers/blueprint.reducer';
import { ECheckpointsType } from 'types/enums/checkpoints';
import { ICheckpointNode } from 'types/checkpoint';
import { CP_NAME, MAX_SUB_BRANCHES } from '@constants/checkpoint';
import './styles.scss';
import '../StyleDrawer/style.scss';
import ContentDrawerReviewCheckpoint from '@pages/MultiProposal/ReviewCheckPoint/ContentDrawerReviewCheckpoint';
import { ICON_LIST3 } from '@utils/constants/iconList';
import { useParams } from 'react-router-dom';
import RouteConfig from '@components/CheckpointTree/RouteConfig';
import AlignModal from './AlignModal';
import { votingMethods } from './tempData';

type Props = {
  dispatch: any;
  primaryCheckPoints: any[];
  routeDetails: any[];
  className?: string;
  isNeedShowAlert?: boolean;
  isPreview?: boolean;
  isCreateWf?: boolean;
  isShowRoleOrToken?: boolean;
};

const CheckpointTree = (props: Props) => {
  const {
    dispatch,
    primaryCheckPoints,
    className,
    routeDetails,
    isNeedShowAlert = false,
    isPreview = false,
    isCreateWf,
    isShowRoleOrToken = false,
  } = props;
  const [listCheckPoints, setListCheckPoints] = useState<Array<ICheckpointNode> | []>(
    primaryCheckPoints,
  );
  const [highestNumber, setHighestNumber] = useState<number>(listCheckPoints.length);
  const [activeNode, setActiveNode] = useState<ICheckpointNode | null>(null);
  const [activeRoute, setActiveRoute] = useState<ICheckpointNode | null>(null);
  const [open, setOpen] = useState(false);
  const [indexNodeActive, setIndexNodeActive] = useState<number | null>();
  const [itemRoute, setItemRoute] = useState<any>();

  const { id } = useParams();
  const typeId: any = id;

  useEffect(() => {
    dispatch(setListCheckpoint(listCheckPoints));
  }, [listCheckPoints]);

  useEffect(() => {
    setListCheckPoints(primaryCheckPoints);
  }, [primaryCheckPoints]);

  const allNodeLevels = useMemo(() => {
    const results: Array<number> = [];
    listCheckPoints.forEach((item: ICheckpointNode) => {
      if (!results.includes(item.level)) {
        results.push(item.level);
      }
    });
    return results.sort((a, b) => a - b);
  }, [listCheckPoints]);

  const onClose = () => {
    setOpen(false);
    setActiveRoute(null);
    setIndexNodeActive(null);
  };

  const onCloseCheckpoint = () => {
    setIndexNodeActive(null);
    setActiveNode(null);
  };

  const handleCreateNewBranch = (node: ICheckpointNode, currentIndex: number) => {
    if (node.isMaxSubBranch) {
      console.warn('Maximum branch');
      return;
    }

    let nextListCheckpoints = [...listCheckPoints];

    // find total cps in root branch have sub-branch
    // and has index greater than current index
    const totalCpHasSubBranch = nextListCheckpoints.filter((item) => {
      return item.parentIndex && item.level !== 1 && currentIndex <= item.parentIndex;
    });
    const nextLevel = totalCpHasSubBranch.length + 2;

    const newEnforcer: ICheckpointNode = {
      id: uuidv4(),
      parentId: node.id,
      level: nextLevel,
      parentIndex: currentIndex, // to calculate location for child when create new branch.
      name: CP_NAME.enforcer,
      haveRouteDetail: false,
      type: ECheckpointsType.enforcer,
      iconColor: ECheckpointsType.enforcer,
      isFirstOfLeaf: true,
      isLastOfLeaf: true,
      config: {},
    };

    const totalChildren = nextListCheckpoints.filter((item) => {
      return item.parentId === node.id;
    });

    const newListCp = nextListCheckpoints.map((item) => {
      if (totalChildren.length === MAX_SUB_BRANCHES && item.id === node.id) {
        return { ...item, isMaxSubBranch: true };
      }

      if (item.level < nextLevel) {
        return item;
      }

      // increase branch level for before branch.
      return {
        ...item,
        level: item.level + 1,
      };
    });
    nextListCheckpoints = [...newListCp, newEnforcer];
    setListCheckPoints(nextListCheckpoints);
    onCloseCheckpoint();
    dispatch(setListCheckpoint(nextListCheckpoints));
  };

  const addCheckpoint = (checkpointId: string | number) => {
    setHighestNumber(highestNumber + 1);
    const indexCp = listCheckPoints.findIndex((item) => item.id === checkpointId);
    if (indexCp === -1) {
      console.warn('Checkpoint not found', checkpointId);
      return;
    }

    const foundCp = listCheckPoints[indexCp];
    const isCp = ![ECheckpointsType.enforcer, ECheckpointsType.end].includes(foundCp.type);

    const newNode: ICheckpointNode = {
      id: uuidv4(),
      parentId: isCp ? foundCp.id : foundCp.parentId, // else is case for enforcer
      level: foundCp.level,
      name: `CP${highestNumber}`,
      haveRouteDetail: true,
      type: ECheckpointsType.unknown,
      iconColor: ECheckpointsType.unknown,
      isFirstOfLeaf: !isCp ? foundCp.isFirstOfLeaf : false,
      parentIndex: foundCp.parentIndex, // to specific location for child when create new branch.
      isLastOfLeaf: false,
      config: {},
    };

    let newListCp = null;

    // is enforcer or end checkpoint
    if ([ECheckpointsType.enforcer, ECheckpointsType.end].includes(foundCp.type)) {
      const nextEnforcer: ICheckpointNode = {
        ...foundCp,
        parentId: newNode.id,
        parentIndex: undefined,
        isFirstOfLeaf: false,
      };

      newListCp = [
        ...listCheckPoints.filter((item) => item.id !== checkpointId),
        newNode,
        nextEnforcer,
      ];
    } else {
      const indexCpChild = listCheckPoints.findIndex((item) => {
        return item.parentId === foundCp.id;
      });
      if (indexCpChild === -1) {
        console.warn('Child Checkpoint child not found', checkpointId);
        return;
      }
      const foundCpChild = listCheckPoints[indexCpChild];

      newListCp = [
        ...listCheckPoints.slice(0, indexCp + 1),
        newNode,
        {
          ...foundCpChild,
          parentId: newNode.id,
        },
        ...listCheckPoints.slice(indexCpChild + 1),
      ];
    }

    let nextListCheckpoints = [...newListCp];
    // is root level
    if (foundCp.level === 1) {
      nextListCheckpoints = newListCp.map((item) => {
        if (!item.parentIndex || item.parentIndex <= indexCp) {
          return item;
        }
        return {
          ...item,
          parentIndex: item.parentIndex + 1,
        };
      });
    }

    setListCheckPoints(nextListCheckpoints);
    onCloseCheckpoint();
    dispatch(setListCheckpoint(nextListCheckpoints));
  };

  const deleteCheckpoint = (checkpointId: string | number) => {
    const cpIndex = listCheckPoints.findIndex((item) => item.id === checkpointId);
    if (cpIndex === -1) {
      console.warn('Checkpoint not found', checkpointId);
      return;
    }
    const foundCheckpoint = listCheckPoints[cpIndex];
    if (!foundCheckpoint) {
      console.warn('Checkpoint not found', checkpointId);
      return;
    }
    if (foundCheckpoint.parentId === null) {
      alert('Cannot delete root checkpoint');
      return;
    }

    if (listCheckPoints.length === 3 && foundCheckpoint.type !== ECheckpointsType.enforcer) {
      alert("Can't delete! Because must have min 2 checkpoint and one enforcer");
      return;
    }

    function handleDeleteEnforcer(cpId: string | number, checkpointTree: ICheckpointNode[]) {
      const nextCpTree = [...checkpointTree];
      const indexEnforcer = checkpointTree.findIndex((cp) => cp.id === cpId);
      nextCpTree[indexEnforcer] = {
        ...nextCpTree[indexEnforcer],
        type: ECheckpointsType.end,
        name: 'END',
        config: { isComplete: false },
      };

      setListCheckPoints(nextCpTree);
      onCloseCheckpoint();
      dispatch(setListCheckpoint(nextCpTree));

      return nextCpTree;
    }

    function handleDeleteCheckpoint(
      cpId: string | number,
      nextProperties: { parentId: string | number; isFirstOfLeaf?: boolean; parentIndex?: number },
      checkpointTree: ICheckpointNode[],
      isCpInRootBranch?: boolean,
    ) {
      const cpIdWillRemove = [cpId];
      // find cpId in sub-branch
      if (isCpInRootBranch) {
        const levelBranchWillRemove = checkpointTree
          .filter((cp) => cp.parentId === cpId && cp.level !== 1)
          .map((cp) => cp.level);

        const ids = checkpointTree
          .filter((cp) => levelBranchWillRemove.includes(cp.level) && cp.level !== -1)
          .map((cp) => cp.id);
        cpIdWillRemove.push(...ids);
      }

      let nextCpTree = checkpointTree.filter((cp) => !cpIdWillRemove.includes(cp.id));

      if (isCpInRootBranch) {
        nextCpTree = nextCpTree.map((cp) => {
          if (cp.parentIndex && cp.parentIndex > cpIndex) {
            return {
              ...cp,
              parentIndex: cp.parentIndex - 1,
            };
          }
          return cp;
        });
      }

      const indexCpChild = nextCpTree.findIndex((item) => item.parentId === cpId);
      if (indexCpChild !== -1) {
        nextCpTree[indexCpChild] = {
          ...nextCpTree[indexCpChild],
          ...nextProperties,
        };
      }

      setListCheckPoints(nextCpTree);
      onCloseCheckpoint();
      dispatch(setListCheckpoint(nextCpTree));

      return nextCpTree;
    }

    if (foundCheckpoint.level === 1) {
      if (foundCheckpoint.type === ECheckpointsType.enforcer) {
        handleDeleteEnforcer(checkpointId, listCheckPoints);
        return;
      }

      handleDeleteCheckpoint(
        checkpointId,
        { parentId: foundCheckpoint.parentId },
        listCheckPoints,
        true,
      );

      return;
    }

    const checkpointOtherLevel: ICheckpointNode[] = [];
    const checkpointInLevel: ICheckpointNode[] = [];
    listCheckPoints.forEach((cp) => {
      if (cp.level !== foundCheckpoint.level) {
        checkpointOtherLevel.push(cp);
      } else {
        checkpointInLevel.push(cp);
      }
    });
    const totalCheckpointInLevel = listCheckPoints.length - checkpointOtherLevel.length;
    const hasEndCp = checkpointInLevel.some((item) => item.type === ECheckpointsType.end);

    // Remove branch
    if (totalCheckpointInLevel === 1 || (totalCheckpointInLevel === 2 && hasEndCp)) {
      setListCheckPoints(checkpointOtherLevel);
      onCloseCheckpoint();
      dispatch(setListCheckpoint(checkpointOtherLevel));
      return;
    }

    if (foundCheckpoint.type === ECheckpointsType.enforcer) {
      handleDeleteEnforcer(checkpointId, listCheckPoints);
      return;
    }

    handleDeleteCheckpoint(
      checkpointId,
      {
        parentId: foundCheckpoint.parentId,
        isFirstOfLeaf: foundCheckpoint.isFirstOfLeaf,
        parentIndex: foundCheckpoint.parentIndex,
      },
      listCheckPoints,
    );
  };
  const handleNodeClick = (node: ICheckpointNode, index: number) => {
    if (isPreview && node.type === ECheckpointsType.end) return;

    const nextNode = JSON.parse(JSON.stringify(node));
    setIndexNodeActive(index);
    setActiveNode(nextNode);
  };

  const handleRouteClick = (e: React.MouseEvent<HTMLButtonElement>, item: any, index: number) => {
    const nextNode = JSON.parse(JSON.stringify(item));
    setIndexNodeActive(index);
    setActiveRoute(nextNode);
    e.stopPropagation();
    setItemRoute(item);
    setOpen(true);
  };

  // todo separate route component
  return (
    <>
      {open && (
        <Drawer
          placement="right"
          onClose={onClose}
          open={open}
          closable={false}
          width={650}
          bodyStyle={{
            paddingTop: '24px',
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <RouteConfig
            isPreview={isPreview}
            parentCp={listCheckPoints.find((cp) => cp.id === itemRoute.parentId)}
            activeRoute={activeRoute}
            routeDetails={routeDetails}
            typeId={typeId}
            itemRoute={itemRoute}
            setActiveRoute={setActiveRoute}
            setIndexNodeActive={setIndexNodeActive}
            setOpen={setOpen}
            onClose={onClose}
          />
        </Drawer>
      )}

      <div className={clsx('', className)}>
        <div className="h-fit w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            {listCheckPoints.length > 0 &&
              allNodeLevels.map((level: number, levelIndex: number) => (
                <div className="flex w-full max-w-full px-3" key={String(level)}>
                  {listCheckPoints
                    .filter((cp: ICheckpointNode) => cp.level === level)
                    .map((item: ICheckpointNode, index: number) => (
                      <CheckpointNode
                        key={item.id}
                        id={item.id}
                        parentId={item.parentId}
                        type={item.type}
                        name={item.name}
                        parentIndex={item.parentIndex}
                        isPreview={isPreview}
                        isShowRoleOrToken={isShowRoleOrToken}
                        isFirstOfLeaf={item.isFirstOfLeaf}
                        node={item}
                        isComplete={item.config.isComplete}
                        isNeedShowAlert={isNeedShowAlert}
                        handleCreateNewBranch={() => handleCreateNewBranch(item, index)}
                        branchLevel={levelIndex}
                        isLastOfLeaf={item.isLastOfLeaf}
                        isSelected={activeNode?.id === item.id}
                        isActiveRoute={activeRoute?.id === item.id}
                        onNodeClick={() => handleNodeClick(item, index)}
                        onRouteClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleRouteClick(e, item, index)
                        }
                        addCheckpoint={addCheckpoint}
                      />
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      <Drawer
        placement="right"
        onClose={onCloseCheckpoint}
        open={indexNodeActive != null}
        closable={false}
        bodyStyle={{
          paddingTop: '24px',
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {activeNode && (
          <>
            {isPreview ? (
              <ContentDrawerReviewCheckpoint
                dataArrayCheckpoint={listCheckPoints}
                iconProps={ICON_LIST3}
                nodeInfo={activeNode}
                isCreateWf={isCreateWf}
                typeId={typeId}
              />
            ) : (
              <AlignModal
                node={activeNode}
                setListCheckPoints={setListCheckPoints}
                listCheckPoints={listCheckPoints}
                voteMethods={votingMethods}
                setIcon={(type: ECheckpointsType) => {
                  setActiveNode({ ...activeNode, type });
                }}
                handleDeleteCheckpoint={deleteCheckpoint}
                onCloseCheckpoint={onCloseCheckpoint}
              />
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default CheckpointTree;
