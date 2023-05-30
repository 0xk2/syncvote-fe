import { multiProposalMockData, Proposal } from '@utils/mockData/proposal';
import React, { useState } from 'react';
import ActiveAndShare from '@components/ActiveAndShare';
import './styles.scss';
import clsx from 'clsx';

type Props = {
  proposal: Proposal;
};

function DetailProposal(props: Props) {
  const { proposal } = props;
  const [isShowLess, setIsShowLess] = useState(false);

  let foundMultiProposal;
  if (proposal.isMulti) {
    foundMultiProposal = multiProposalMockData.find((item) => item.id === proposal.multiProposalId);
  }

  const onClickChangeHeight = () => {
    setIsShowLess(!isShowLess);
  };

  return (
    <div>
      {proposal.isMulti && (
        <div className="mt-[1.25rem] mb-[1.5rem] font-medium text-[#575655]">
          {foundMultiProposal?.title}
        </div>
      )}
      <div className="mt-[1.25rem] md:mb-[1.5rem] mb-[11px] font-semibold text-[#252422] title">
        {proposal.decisionTitle}
      </div>
      <div className="md:hidden flex items-center gap-2 mt-3 mb-[11px]">
        <ActiveAndShare />
      </div>{' '}
      <div
        dangerouslySetInnerHTML={{ __html: proposal.description }}
        className={clsx(
          'md:text-2xl text-[17px] leading-[28px] preview-block',
          'md:max-h-full overflow-hidden  md:mb-[3.75rem]',
          !isShowLess ? 'max-h-[300px]' : 'max-h-full',
        )}
      ></div>
      <button
        className="my-10 md:hidden block w-full h-[63px] bg-[#fff] border-2 border-[#E3E3E2] border-solid rounded-2xl"
        onClick={onClickChangeHeight}
      >
        <span className="text-base">{!isShowLess ? 'View more' : 'View less'}</span>
      </button>
    </div>
  );
}

export default DetailProposal;
