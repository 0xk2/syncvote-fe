import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import SaveIcon from '@assets/icons/svg-icons/SaveIcon';
import PageWrapper from '@components/PageWrapper';
import { L } from '@utils/locales/L';
import { PAGE_ROUTES } from '@utils/constants/pageRoutes';
import { createRootLink } from '@utils/helpers';
import CheckpointTree from '@components/CheckpointTree';
import EditTextName from '@components/EditTextName/EditTextName';
import { RootState } from '@redux/store';
import { ECheckpointsType } from 'types/enums/checkpoints';
import { v4 as uuidv4 } from 'uuid';
import { ICheckpointNode } from 'types/checkpoint';
import {
  setListCheckpoint,
  setMembers,
  setName,
  setRoles,
  setTotalPrimaryCp,
} from '@redux/reducers/blueprint.reducer';
import { CP_NAME } from '@constants/checkpoint';
import { membersMockData, rolesMockData, routeWorkflows, workflows } from './workflowMockData';

const EditCheckpointsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const typeId: any = id;

  const dispatch = useDispatch();
  const foundWf = workflows.find((item) => item.id === typeId);
  if (!foundWf) {
    return <h2>Not found checkpoint</h2>;
  }

  const { listCheckpoint, name, totalPrimaryCp, totalCheckpoints } = foundWf;

  const routeDetails = [...routeWorkflows];

  const { listOfValidRoutes } = useSelector((state: RootState) => state.routerDetail);

  const [zoom, setZoom] = useState(1);
  const [zoomRatio, setZoomRatio] = useState<string | number>(zoom);
  const [isFocus, setIsFocus] = useState(false);
  const [incompleteConfig, setIncompleteConfig] = useState(false);
  const [hasRouteNotSetup, setHasRouteNotSetup] = useState(false);
  const [isNeedShowAlert, setIsNeedShowAlert] = useState(false);

  const ref = useRef<any>(null);

  const primaryCheckPoints = useMemo(() => {
    if (totalPrimaryCp) {
      const counts = totalPrimaryCp + 1;
      let parentId: string | number | null = null;
      return Array(counts)
        .fill(null)
        .map((item, index) => {
          const cp: ICheckpointNode = {
            id: uuidv4(),
            parentId,
            level: 1,
            haveRouteDetail: index !== counts - 1,
            iconColor: '#252422',
            name: index !== counts - 1 ? `${CP_NAME.cp}${index + 1}` : CP_NAME.end,
            type: index !== counts - 1 ? ECheckpointsType.unknown : ECheckpointsType.end,
            isFirstOfLeaf: index === 0,
            isLastOfLeaf: index === counts - 1,
            config: {},
          };
          parentId = cp.id;
          return cp;
        });
    }
    return [];
  }, [totalCheckpoints]);

  let selectedPrimaryCheckpoints: any[] = [];
  if (listCheckpoint.length === 0) {
    selectedPrimaryCheckpoints = primaryCheckPoints;
  } else {
    selectedPrimaryCheckpoints = listCheckpoint;
  }

  const handleAddNewCheckpoint = () => {
    const listCheckPoints: any[] = [...listCheckpoint];
    const enforcerLevel1 = listCheckPoints.find(
      (item: any) =>
        item.level === 1 && [ECheckpointsType.enforcer, ECheckpointsType.end].includes(item.type),
    );
    if (!enforcerLevel1) {
      console.warn('Enforcer not found');
      return;
    }

    const newNode: ICheckpointNode = {
      id: uuidv4(),
      parentId: enforcerLevel1.parentId,
      level: enforcerLevel1.level,
      name: `CP${listCheckPoints.length + 1}`,
      haveRouteDetail: true,
      type: ECheckpointsType.unknown,
      iconColor: ECheckpointsType.unknown,
      isFirstOfLeaf: false,
      isLastOfLeaf: false,
      config: {},
    };
    const nextEnforcer = {
      ...enforcerLevel1,
      parentId: newNode.id,
    };

    const nextListCheckpoints = [
      ...listCheckPoints.filter((item) => item.id !== enforcerLevel1.id),
      newNode,
      nextEnforcer,
    ];
    dispatch(setTotalPrimaryCp(totalPrimaryCp + 1));
    dispatch(setListCheckpoint(nextListCheckpoints));
  };

  const handleChangeRatioScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = e.target.value.replace('%', '');
    if (Number.isNaN(parseFloat(percent))) {
      setZoomRatio('');
      return;
    }
    const targetScale = parseFloat(percent) / 100;
    if (isFocus) {
      setZoomRatio(targetScale);
      return;
    }

    const { zoomIn, zoomOut } = ref.current;

    const factor = targetScale - zoom;
    if (targetScale > zoom) {
      zoomIn(factor, 0);
    } else {
      zoomOut(-factor, 0);
    }
    setZoom(targetScale);
    setZoomRatio(targetScale);
  };
  const handleUpdateScale = () => {
    const { zoomIn, zoomOut } = ref.current;
    let nextZoomRatio = zoomRatio;
    if (nextZoomRatio > 2) {
      nextZoomRatio = 2;
    } else if (nextZoomRatio < 0.5) {
      nextZoomRatio = 0.5;
    }

    const factor = +nextZoomRatio - zoom;
    if (nextZoomRatio > zoom) {
      zoomIn(factor, 0);
    } else {
      zoomOut(-factor, 0);
    }
    setZoom(+nextZoomRatio);
    setZoomRatio(nextZoomRatio);
    setIsFocus(false);
  };
  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };
  const handleOnFocus = () => {
    setIsFocus(true);
    setZoomRatio(zoom);
  };

  const handleZoomIn = () => {
    const { zoomIn } = ref.current;
    zoomIn(0.2, 0);
    setZoom(Math.min(zoom + 0.2, 2));
    setZoomRatio(Math.min(zoom + 0.2, 2));
  };
  const handleZoomOut = () => {
    const { zoomOut } = ref.current;
    zoomOut(0.2, 0);
    setZoom(Math.max(zoom - 0.2, 0.5));
    setZoomRatio(Math.max(zoom - 0.2, 0.5));
  };

  const handleContinue = () => {
    const { pathname } = location;
    if (incompleteConfig || hasRouteNotSetup) {
      setIsNeedShowAlert(true);
      return;
    }
    if (pathname.split('/')[1] === 'edit-blueprint') {
      navigate(
        createRootLink([
          PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
          PAGE_ROUTES.EDIT_BLUEPRINT.PARTICIPANT_DETAIL,
          typeId,
        ]),
      );
    } else {
      navigate(
        createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.PARTICIPANT_DETAIL]),
      );
    }
  };

  const handleSaveBlueprintName = (blueprintName: string) => {
    dispatch(setName(blueprintName));
  };

  useEffect(() => {
    setIncompleteConfig(
      listCheckpoint.some(
        (cp: any) =>
          !cp.config.isComplete &&
          cp.type !== ECheckpointsType.end &&
          cp.type !== ECheckpointsType.enforcer,
      ),
    );
  }, [listCheckpoint]);

  // useEffect(() => {
  //   if (!bluePrint || !bluePrint?.countCheckPoints || !bluePrint?.name) {
  //     navigate(createRootLink([
  //        PAGE_ROUTES.BLUEPRINT.ROOT,
  //        PAGE_ROUTES.BLUEPRINT.ADD_BLUEPRINT
  //     ]));
  //   }
  // }, [bluePrint, bluePrint?.countCheckPoints, bluePrint?.name]);

  let width = 0;
  useEffect(() => {
    width = window.innerWidth;
  }, []);

  useEffect(() => {
    setZoomRatio(zoom);
  }, [zoom]);

  useEffect(() => {
    dispatch(setRoles(rolesMockData));
    dispatch(setMembers(membersMockData));
  }, []);

  return (
    <PageWrapper classes="flex flex-col h-content-full">
      <TransformWrapper
        ref={ref}
        initialScale={zoom}
        initialPositionX={width / 2}
        initialPositionY={width / 2}
        minScale={0.5}
        maxScale={2}
        centerZoomedOut
        centerOnInit
        doubleClick={{ disabled: true }}
        onZoomStop={(ref) => {
          setZoom(ref.state.scale);
        }}
        onZoom={(ref) => {
          setZoom(ref.state.scale);
        }}
      >
        {() => (
          <>
            <div className="flex justify-between items-center pt-[25px] px-[32px] md:px-p_1 w-full mb-[20px]">
              <div className="grow basis-[100px] max-w-[80%]">
                <EditTextName
                  classes="w-fix"
                  title={name}
                  handleSaveValue={handleSaveBlueprintName}
                />
              </div>
              <div className="w-[192px] h-[48px] flex items-center">
                <button
                  className="bg-white flex items-center justify-center text-[30px] leading-[48px] text-[#252422] text-sm rounded-l-[8px] border-[1.5px] border-solid border-[#E3E3E2] w-[56px] h-full"
                  onClick={handleZoomOut}
                >
                  <img src="/assets/images/minus_icon.png" alt="-" />
                </button>
                <input
                  className="focus:outline-none text-center bg-white text-[#252422] text-sm w-[77px] h-full border-y-[1.5px] border-solid border-y-[#E3E3E2]"
                  onChange={handleChangeRatioScale}
                  onBlur={handleUpdateScale}
                  onKeyDown={handleOnEnter}
                  onFocus={handleOnFocus}
                  value={`${(+zoomRatio * 100).toFixed(0)}%`}
                />
                <button
                  className="bg-white flex items-center justify-center text-[#252422] text-sm rounded-r-[8px]  border-[1.5px] border-solid border-[#E3E3E2] w-[56px] h-full"
                  onClick={handleZoomIn}
                >
                  <img src="/assets/images/plus_icon.png" alt="+" />
                </button>
              </div>
            </div>
            <div className="px-[32px] md:px-p_1">
              <TransformComponent>
                <CheckpointTree
                  className=" basis-full mb-[2rem]"
                  dispatch={dispatch}
                  primaryCheckPoints={selectedPrimaryCheckpoints}
                  routeDetails={routeDetails}
                  isNeedShowAlert={isNeedShowAlert}
                />
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
      <div className="px-[32px] md:px-p_1 basis-[200px]">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4 w-full h-[86px]">
            <div
              className="border-1.5 rounded-8 hover:text-violet-version-5 hover:border-violet-version-5 hover:cursor-pointer flex items-center py-[19px] text-[#252422] h-[60px] px-[16px]"
              onClick={handleAddNewCheckpoint}
            >
              <button className=" flex ">
                <PlusIcon />
                <span className="text-[17px] ml-1">{L('newCheckpoint').toUpperCase()}</span>
              </button>
            </div>
            <div className="border-1.5 rounded-8 flex hover:text-violet-version-5 hover:border-violet-version-5 hover:cursor-pointer items-center py-[19px] text-[#252422] h-[60px] px-[16px]">
              <button className="flex items-center" onClick={() => navigate('/')}>
                <SaveIcon />
                <span className="flex items-center text-[17px] ml-1">
                  {L('save').toUpperCase()}
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-end items-center  gap-4 w-full h-[86px]">
            <div
              className="text-center rounded-8 hover:cursor-pointer text-violet-version-5 border-[#5D23BB] border-[1.5px] py-[18px] h-[58px] px-[16px]"
              onClick={handleContinue}
            >
              <span className=" text-[17px] leading-[22px] tracking-[0.5px]">{L('continue')}</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditCheckpointsPage;
