import React, { useState } from 'react';
import BarChartIcon from '@assets/icons/svg-icons/BarChartIcon';
import XButton from '@assets/icons/svg-icons/XButton';
import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L } from '@utils/locales/L';
import { useLocation } from 'react-router-dom';
import CheckPointUI from './checkPointNodeReview/checkpointUI';
import ProgressBar from './ProgressBar/ProgressBar';

const InitiativeProcess = () => {
  const location = useLocation();

  const [isModalActiveProposal, setIsModalActiveProposal] = useState<boolean>(false);
  const [isModalProcessMap, setIsModalProcessMap] = useState<boolean>(false);

  const handleModalActiveProcess = () => {
    setIsModalActiveProposal(!isModalActiveProposal);
  };

  const handleModalProcessMap = () => {
    setIsModalProcessMap(!isModalProcessMap);
  };

  return (
    <>
      {location.pathname === `/${PAGE_ROUTES.INITIATIVE_DETAIL}` ? (
        <>
          <Modal isOpen={isModalActiveProposal} onClose={handleModalActiveProcess}>
            <div className="w-[240px] md:w-[350px] lg:w-[500px]">
              <div className="flex flex-col gap-4 my-2">
                <div className="flex justify-between items-center">
                  <p className="text-grey-version-7 text-2xl font-semibold">
                    <span className="text-[#5048BC]">2 </span>
                    {L('activeProposal')}
                  </p>
                  <Button
                    variant="outline"
                    className="w-[40.71px] h-[40.71px] rounded-[113.087px] flex items-center justify-center"
                    onClick={handleModalActiveProcess}
                  >
                    <XButton />
                  </Button>
                </div>
                <div className="flex flex-col gap-4 my-2 w-full border rounded-lg p-6">
                  <p className="text-grey-version-7 text-[22px] font-semibold flex items-center">
                    <BarChartIcon color="#252422" />
                    <span>New deal</span>
                  </p>
                  <p className="text-sm font-medium py-1 px-2 rounded-lg cursor-pointer bg-tag-active-bg text-tag-active-text w-[75px]">
                    Member
                  </p>

                  <p className="text-[15px] text-grey-version-6 font-medium">
                    Evermoon is a Web3 company offering an innovative platform for decentralized
                    finance (DeFi) and secure asset trading. The company is looking for an
                    investment to...
                  </p>
                  <p className="text-grey-version-7 font-semibold text-[15px]">3 days left</p>
                </div>
                <div className="flex flex-col gap-4 my-2 w-full border rounded-lg p-6">
                  <p className="text-grey-version-7 text-[22px] font-semibold flex items-center">
                    <BarChartIcon color="#252422" />
                    <span>New deal</span>
                  </p>
                  <p className="text-sm font-medium py-1 px-2 rounded-lg cursor-pointer bg-tag-active-bg text-tag-active-text w-[75px]">
                    Member
                  </p>

                  <p className="text-[15px] text-grey-version-6 font-medium">
                    Evermoon is a Web3 company offering an innovative platform for decentralized
                    finance (DeFi) and secure asset trading. The company is looking for an
                    investment to...
                  </p>
                  <p className="text-grey-version-7 font-semibold text-[15px]">3 days left</p>
                </div>
              </div>
            </div>
          </Modal>
          <Modal isOpen={isModalProcessMap} onClose={handleModalProcessMap}>
            <div className="w-[240px] md:w-[350px] lg:w-full">
              <div className="flex flex-col gap-4 my-2">
                <div className="flex justify-between items-center">
                  <p className="text-grey-version-7 text-2xl font-semibold">{L('processMap')}</p>
                  <Button
                    variant="outline"
                    className="w-[40.71px] h-[40.71px] rounded-[113.087px] flex items-center justify-center"
                    onClick={handleModalProcessMap}
                  >
                    <XButton />
                  </Button>
                </div>
                <div className="overflow-scroll">
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-grey-version-6">Process</span>
                    <span className="text-base font-medium text-grey-version-6">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-violet-version-5 h-2.5 rounded-full w-[60%]" />
                  </div>
                </div>
                <div className="overflow-x-scroll md:overflow-auto h-[150px]">
                  <CheckPointUI />
                </div>
              </div>
            </div>
          </Modal>
          <div
            className="flex flex-col gap-6 my-2 w-full border rounded-lg p-6"
            onClick={handleModalProcessMap}
          >
            <p className="text-grey-version-7 text-text_2 font-semibold">2 Active Proposals</p>
            <ProgressBar option="Investment Process" percent={60} />

            <Button
              variant="outline"
              className="w-full h-[60px] text-[17px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleModalActiveProcess();
              }}
            >
              View progress
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default InitiativeProcess;
