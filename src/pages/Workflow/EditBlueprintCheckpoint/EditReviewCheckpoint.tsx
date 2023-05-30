/* eslint-disable max-len */
import PageWrapper from '@components/PageWrapper';
import { L } from '@utils/locales/L';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PAGE_ROUTES } from '@utils/constants/pageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import CheckpointTree from '@components/CheckpointTree';
import { RootState } from '@redux/store';
import EditTextName from '@components/EditTextName/EditTextName';
import { resetBlueprint } from '@redux/reducers/blueprint.reducer';
import Modal from '@components/Modal/Modal';
import PopupPublish from '@components/PopupPublish/PopupPublish';
import AngleLeftIcon from '@assets/icons/svg-icons/AngleLeftIcon';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { createRootLink } from '@utils/helpers';
import {
  routeWorkflows,
  workflows,
} from '@pages/Workflow/EditBlueprintCheckpoint/workflowMockData';

const PreviewEditCheckpointTree = () => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const { id } = useParams();
  const location = useLocation();

  const typeId: any = id;
  const dispatch = useDispatch();
  const foundWf = workflows.find((item) => item.id === typeId);
  if (!foundWf) {
    return <h2>Not found checkpoint</h2>;
  }

  const listOfValidRoutes = useSelector((state: RootState) => state.routerDetail.listOfValidRoutes);
  const { listCheckpoint, name: blueprintName } = foundWf;

  const routeDetails = [...routeWorkflows];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePublish = () => {
    setIsModalOpen(true);
  };

  const handleGoBack = () => {
    const { pathname } = location;
    if (pathname.split('/')[1] === 'edit-blueprint') {
      navigate(
        `/${PAGE_ROUTES.EDIT_BLUEPRINT.ROOT}/${PAGE_ROUTES.EDIT_BLUEPRINT.PARTICIPANT_DETAIL}/${typeId}`,
      );
    } else {
      navigate(createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.REVIEW_CP_TREE]));
    }
  };

  // useEffect(
  //   () => () => {
  //     if (!bluePrint || !bluePrint?.countCheckPoints || !bluePrint?.name) {
  //       navigate(createRootLink([PAGE_ROUTES.BLUEPRINT.ROOT, PAGE_ROUTES.BLUEPRINT.ADD_BLUEPRINT]));
  //     }
  //   },
  //   [bluePrint, bluePrint?.countCheckPoints, bluePrint?.name],
  // );

  // useEffect(() => {
  //   dispatch(setIsReview(true));
  //
  //   return () => {
  //     dispatch(setIsReview(false));
  //   };
  // }, []);
  let width = 0;
  useEffect(() => {
    width = window.innerWidth;
  }, []);

  return (
    <PageWrapper classes="mx-[41px] flex flex-col h-content-full ">
      <div className="breadcrumbs flex items-center pt-4 ">
        <div className="cursor-pointer">
          <AngleLeftIcon color="#575655" onClick={handleGoBack} />
        </div>
        <span className="text-emph-title-1 ml-4">{L('editingParticipants')}</span>
      </div>
      <div className="basis-[100px] ml-[10px]">
        <EditTextName
          classes="basis-[100px] pt-[80px] px-[120px]"
          textClass="text-[#252422] text-[34px] leading-[41px] tracking-[0.374px]"
          title={blueprintName}
          isPreview
        />
      </div>
      <TransformWrapper
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
        wheel={{ step: 0.05 }}
      >
        {() => (
          <>
            <div className="px-[32px] md:px-p_1">
              <TransformComponent>
                <CheckpointTree
                  className="basis-full mb-[2rem] "
                  dispatch={dispatch}
                  primaryCheckPoints={listCheckpoint}
                  routeDetails={routeDetails}
                  isPreview
                  isShowRoleOrToken
                />
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>

      <div className="basis-[200px]">
        <div className="flex justify-center items-center mb-20">
          <div
            className="border-1.5 rounded-8 py-[19px] h-[60px] text-center w-w_13 hover:cursor-pointer hover:text-violet-version-5 bg-violet-version-1 flex justify-center items-center"
            onClick={handlePublish}
          >
            <span className="text-[17px] text-violet-version-5">{L('publish').toUpperCase()}</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeClickOverlay={false}>
        <PopupPublish
          publishText="You can go to Governance to view see your list of created workflows"
          textInPublishBtn="Go to Governance"
          isShareToMembers={false}
          containerClassName="!justify-center"
          className="mb-[32px] gap-0"
          // wrapperClassName="max-h-[70vh]"
          navigateTo="/"
          publishTextClassName="text-[20px] font-medium text-center"
          onClickNavigate={() => dispatch(resetBlueprint({ keepName: false }))}
        />
      </Modal>
    </PageWrapper>
  );
};

export default PreviewEditCheckpointTree;
