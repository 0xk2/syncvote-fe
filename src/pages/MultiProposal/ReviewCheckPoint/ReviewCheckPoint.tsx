/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Button from '@components/Button/Button';
import { ICON_LIST3 } from '@utils/constants/iconList';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { createRootLink } from '@utils/helpers';
import { L } from '@utils/locales/L';
import { Drawer } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ICheckpointNode } from 'types/checkpoint';
// import { dataRouteDetails } from '@pages/MultiProposal/ReviewCheckPoint/dataReviewCheckPoint';
import CheckPointReview from '../CheckPointReview';
import { dataReviewCheckPoint, dataRouteDetails } from './dataReviewCheckPoint';
import ContentDrawerReviewCheckpoint from './ContentDrawerReviewCheckpoint';
import ContentRouterRoute from './ContentDrawerRoute';

const ReviewCheckPoint = () => {
  const [openDrawerRoute, setOpenDrawerRoute] = useState(false);
  const [activeRoute, setActiveRoute] = useState<ICheckpointNode | null>(null);
  const [nodeInfo, setNodeInfo] = useState<ICheckpointNode | null | undefined>();
  const [activeNode, setActiveNode] = useState<ICheckpointNode | null>(null);
  const [indexNodeActive, setIndexNodeActive] = useState<number | null>();

  const location = useLocation();
  const { pathname } = location;
  const path = pathname;
  const routeId = String(activeRoute?.id) + String(activeRoute?.parentId);
  const onCloseDrawer = () => {
    setIndexNodeActive(null);
    setActiveNode(null);
  };
  const onCloseRoute = () => {
    setOpenDrawerRoute(false);
    setIndexNodeActive(null);
    setActiveRoute(null);
  };

  const onNodeClick = (ele: ICheckpointNode, index: number) => {
    setNodeInfo(ele);
    const nextNode = JSON.parse(JSON.stringify(ele));
    setIndexNodeActive(index);
    setActiveNode(nextNode);
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
    setNodeInfo(node);
  };

  return (
    <>
      <Drawer
        placement="right"
        onClose={onCloseDrawer}
        open={indexNodeActive != null}
        closable={false}
      >
        {activeNode && (
          <ContentDrawerReviewCheckpoint
            iconProps={ICON_LIST3}
            dataArray={dataReviewCheckPoint}
            nodeInfo={nodeInfo}
            path={path}
          />
        )}
      </Drawer>
      <Drawer onClose={onCloseRoute} open={openDrawerRoute} closable={false}>
        <ContentRouterRoute cpTarget={routeId} dataRouteDetails={dataRouteDetails} path={path} />
      </Drawer>

      <div className="container flex justify-center mt-[5%]">
        <div className="flex flex-col gap-[60px] w-full lg:w-[85%]">
          <div>
            <p className="text-[28px] text-grey-version-7 font-semibold pb-2">
              {L('reviewCheckpoints')}
            </p>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold text-[#575655]">Details</p>
              <div className="flex gap-2 items-center">
                <p className="text-[#575655] text-base">Name</p>
                <p className="font-semibold pt-[0.9px]">Hiring process</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-[#575655] text-base">Created on</p>
                <p className="font-semibold pt-[0.9px]">Jan 22th, 2023</p>
              </div>
              <div className="border-b border-primary_logo w-full" />
            </div>
          </div>
          <div className="flex justify-center w-[100%]">
            <CheckPointReview
              onNodeClick={(item, index) => onNodeClick(item, index)}
              activeNode={activeNode}
              activeRoute={activeRoute}
              onRouteClick={(e: React.MouseEvent<HTMLButtonElement>, item, index) =>
                onRouteClick(e, item, index)
              }
            />
          </div>
          <div className="flex justify-between">
            <div>
              <Link to={`/${PAGE_ROUTES.INITIATIVE.ROOT}`}>
                <Button
                  variant="text"
                  className="border-1.5 border-grey-version-3 text-xl py-5 px-4 w-40 cursor-pointer"
                >
                  <p>{L('back')}</p>
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-7">
              <Link to={`/${PAGE_ROUTES.BASIC_INFO_FOR_INITIATIVES}`}>
                <p className="cursor-pointer text-violet-version-5 text-xl">
                  {L('createMultipleMultiLinkedProposals')}
                </p>
              </Link>
              <div>
                <Link
                  to={createRootLink([
                    PAGE_ROUTES.INITIATIVE.ROOT,
                    PAGE_ROUTES.INITIATIVE.ADD_INITIATIVE,
                  ])}
                >
                  <Button className="py-5 px-4 w-full text-xl cursor-pointer">
                    <p>{L('createInitiative')}</p>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReviewCheckPoint;
