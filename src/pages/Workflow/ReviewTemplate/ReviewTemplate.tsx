/* eslint-disable max-len */
import { Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import AngleLeftIcon from '@assets/icons/svg-icons/AngleLeftIcon';
import ActionButton from '@components/ActionButton/ActionButton';
// import EditTextName from '@components/EditTextName/EditTextName';
import PageWrapper from '@components/PageWrapper';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L } from '@utils/locales/L';
import { ICheckpointNode } from 'types/checkpoint';
import { dataRouteDetails } from '@pages/MultiProposal/ReviewCheckPoint/dataReviewCheckPoint';
import ContentRouterRoute from '@pages/MultiProposal/ReviewCheckPoint/ContentDrawerRoute';
import CheckpointReviewTemplate from './CheckpointReviewTemplate';
import HandleMethod from './component/HandleMethod';
import {
  dataRoutesTemplate,
  detailNodeCheckpointReview,
  DetailNodeType,
  DetailRouteType,
} from './dataReviewTemplate';

const ReviewTemplate = () => {
  const [openDrawerRoute, setOpenDrawerRoute] = useState(false);
  const [nodeInfo, setNodeInfor] = useState<ICheckpointNode>();
  const [activeNode, setActiveNode] = useState<ICheckpointNode | null>(null);
  const [indexNodeActive, setIndexNodeActive] = useState<number | null>();
  const [activeRoute, setActiveRoute] = useState<ICheckpointNode | null>(null);
  const [detailNode, setDetailNode] = useState<DetailNodeType>();
  const [dataRoute, setDataRoute] = useState<DetailRouteType>();

  const { id: wfId } = useParams();

  const routeId = String(activeRoute?.id) + String(activeRoute?.parentId);
  const onNodeClick = (node: ICheckpointNode, index: number) => {
    const nextNode = JSON.parse(JSON.stringify(node));
    setIndexNodeActive(index);
    setNodeInfor(node);
    setActiveNode(nextNode);
  };
  const onCloseCheckpoint = () => {
    setIndexNodeActive(null);
    setActiveNode(null);
  };
  const onCloseRoute = () => {
    setOpenDrawerRoute(false);
    setIndexNodeActive(null);
    setActiveRoute(null);
  };

  const onRouteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    node: ICheckpointNode,
    index: number,
  ) => {
    const nextNode = JSON.parse(JSON.stringify(node));
    setIndexNodeActive(index);
    setActiveRoute(nextNode);
    e.stopPropagation();
    setOpenDrawerRoute(true);
    setNodeInfor(node);
  };

  const blueprintName = localStorage.getItem('BlueprintName');

  const getNodeDetail = (idCheckpoint: string | undefined, idNode: string | number | undefined) => {
    detailNodeCheckpointReview?.map((item) => {
      if (item.idCheckpointsTemplate === idCheckpoint) {
        item.detail?.map((ele) => {
          if (ele.id === idNode) {
            setDetailNode(ele);
          }
          return item;
        });
      }
      return item;
    });
  };

  const getDataRouteDetail = (
    idTemplate: string | undefined,
    endId: string | undefined | number,
  ) => {
    dataRoutesTemplate?.map((value: any) => {
      if (value.templateId === idTemplate) {
        value.config.forEach((item: DetailRouteType) => {
          if (item.endCP === endId) {
            setDataRoute(item);
          }
          return value;
        });
      }
      return value;
    });
  };

  useEffect(() => {
    getNodeDetail(wfId, nodeInfo?.id);
    getDataRouteDetail(wfId, nodeInfo?.id);
  }, [wfId, nodeInfo?.id]);

  return (
    <PageWrapper classes="flex-col h-screen container">
      <div className="drawer-detail">
        <Drawer
          placement="right"
          onClose={onCloseCheckpoint}
          open={indexNodeActive != null}
          closable={false}
        >
          {activeNode && (
            <div>
              <HandleMethod method={nodeInfo?.type} node={nodeInfo} wfId={wfId} />
            </div>
          )}
        </Drawer>
      </div>
      <Drawer onClose={onCloseRoute} closable={false} open={openDrawerRoute}>
        <ContentRouterRoute cpTarget={routeId} dataRouteDetails={dataRouteDetails} typeId={wfId} />
      </Drawer>
      <Link to={`/${PAGE_ROUTES.WORKFLOW.ROOT}/${PAGE_ROUTES.WORKFLOW.WF_TEMPLATES}`}>
        <div className="flex items-center cursor-pointer gap-2 mt-8">
          <AngleLeftIcon color="#5D23BB" />
          <p className="text-[#575655] font-semibold text-[28px]">{L('templates')}</p>
        </div>
      </Link>
      <div className="w-full flex justify-center">
        <div className="flex flex-col justify-center w-[1030px] pt-[70px]">
          <div className="pl-[46px]">
            <div className="text-[34px] leading-[41px] tracking-[0.374px] text-[#252422] font-semibold">
              <span>{blueprintName}</span>
            </div>
          </div>
          <div className="flex justify-center w-[100%] pt-[68px]">
            <CheckpointReviewTemplate
              id={wfId}
              activeNode={activeNode}
              activeRoute={activeRoute}
              onNodeClick={(item, index) => onNodeClick(item, index)}
              onRouteClick={(e: React.MouseEvent<HTMLButtonElement>, item, index) =>
                onRouteClick(e, item, index)
              }
            />
          </div>
          <div className="flex gap-[24px] justify-center pt-[64px]">
            <div>
              <Link
                to={`/${PAGE_ROUTES.WORKFLOW.ROOT}/${wfId}/${PAGE_ROUTES.WORKFLOW.SETUP_CHECKPOINT}`}
              >
                <ActionButton
                  classes="mt-[20px] rounded-8 py-[19px] h-[60px] cursor-pointer"
                  variant="primary"
                >
                  <p className="text-[17px]">{L('continue').toUpperCase()}</p>
                </ActionButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ReviewTemplate;
