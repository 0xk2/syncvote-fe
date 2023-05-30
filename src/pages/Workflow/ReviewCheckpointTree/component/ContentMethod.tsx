import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import { Tooltip } from 'antd';
import React from 'react';

const ContentMethod = () => (
  <>
    <div className="flex flex-col gap-4 my-3">
      <div>
        <div className="flex gap-[10px] items-center">
          <span className="font-[600] text-[20px] tracking-[0.38px]">Vote on-chain</span>
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-text_1.5 font-medium text-grey-version-6">Input number of results</p>
          <div className="flex justify-center rounded-8 p-4 border-1.5 border-grey-version-3 h-14 w-full">
            <span className="text-[20px] text-[#252422] flex items-center">1</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-[6px]">
          <div className="flex flex-col gap-6">
            <p className="text-[#252422] font-semibold text-[20px]">Voting Participants</p>
            <div className="flex gap-3 w-full border rounded-lg p-6 items-center justify-between">
              <p className="text-[#252422] text-[17px]">Finance Team</p>
              <p className="text-[#5D23BB] text-[15px] cursor-pointer">View member list</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[10px] items-center">
        <span className="font-[600] text-[20px] tracking-[0.38px]">Voting results</span>
        <Tooltip placement="right" title="Some text here">
          <span className="cursor-pointer">
            <QuestionCircleIcon color="#898988" w="24px" h="24px" />
          </span>
        </Tooltip>
      </div>
      <div className="flex flex-col gap-[6px]">
        <p className="text-text_1.5 font-medium text-grey-version-6">Number of results</p>
        <div className="flex rounded-8 p-4 border-1.5 border-grey-version-3 h-14 w-full">
          <span className="text-[20px] text-[#252422] flex items-center">All</span>
        </div>
      </div>
      <div className="flex flex-col gap-[6px]">
        <p className="text-text_1.5 font-medium text-grey-version-6">Result ranking</p>
        <div className="flex rounded-8 p-4 border-1.5 border-grey-version-3 h-14 w-full">
          <span className="text-[20px] text-[#252422] flex items-center">
            Calculated by total voting power
          </span>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-[16px]">
      <div className="flex justify-between gap-[10px] items-center">
        <div className="flex gap-[10px] items-center">
          <span className="font-[600] text-[20px] tracking-[0.38px]">Voting condition</span>
          <Tooltip placement="right" title="Some text here">
            <span className="cursor-pointer">
              <QuestionCircleIcon color="#898988" w="24px" h="24px" />
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col w-full gap-[6px] mb-[24px]">
        <p className="flex text-text_1.5 font-medium text-grey-version-6">
          Threshold value for each result (%)
        </p>
        <input className="basic-info-input" type="text" placeholder="0" value="20" />
      </div>
    </div>
  </>
);

export default ContentMethod;
