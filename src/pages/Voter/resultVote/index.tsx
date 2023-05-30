import React from 'react';
import EnforcerIcon from '@assets/icons/svg-icons/EnforcerIcon';
import ExternalLinkIcon from '@assets/icons/svg-icons/ExternalLinkIcon';
import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';
import CommentDetail from '@pages/Voter/components/CommentDetail';

const ResultVote = () => (
  <div className="container w-1/2 flex flex-col gap-8">
    <p className="text-[#252422] text-[28px] font-semibold">{L('result')}</p>
    <div className="flex flex-col gap-4 my-2 w-full border rounded-lg p-6">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-grey-version-6">Investment Process</span>
          <span className="text-base font-medium text-grey-version-6">100%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-violet-version-5 h-2.5 rounded-full w-[100%]" />
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full h-[60px] text-[17px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl cursor-pointer"
      >
        {L('viewPastProgress')}
      </Button>
    </div>
    <div className="flex flex-col gap-4 my-2 w-full border rounded-lg p-6">
      <div className="flex items-center gap-2">
        <EnforcerIcon color="#252422" width={18} height={18} />
        <p className="text-[#252422] text-[22px]">{L('transfer')}</p>
      </div>
      <div className="flex justify-between text-[#29A259] text-[17px]">
        <p>Successfully transfer to 0x23...23A</p>
        <p className="font-semibold">1000 $MOCK</p>
      </div>
      <div className="flex items-center gap-2 cursor-pointer">
        <ExternalLinkIcon />
        <div className="text-[17px] text-violet-version-5">{L('viewRecord')}</div>
      </div>
    </div>
    <div className="flex flex-col gap-4 my-2 w-full border rounded-lg p-6">
      <div className="flex items-center gap-2">
        <EnforcerIcon color="#252422" width={18} height={18} />
        <p className="text-[#252422] text-[22px]">{L('transfer')}</p>
      </div>
      <div className="flex justify-between text-[#29A259] text-[17px]">
        <p>Successfully transfer to 0x23...23A</p>
        <p className="font-semibold">Tiger Tribe #223</p>
      </div>
      <div className="flex items-center gap-2 cursor-pointer">
        <ExternalLinkIcon />
        <div className="text-[17px] text-violet-version-5">{L('viewRecord')}</div>
      </div>
    </div>
    <CommentDetail />
  </div>
);

export default ResultVote;
