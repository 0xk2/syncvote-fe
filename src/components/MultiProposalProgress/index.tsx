import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MultiProposalMockData,
  multiProposalMockData,
  Proposal,
  proposals,
} from '@utils/mockData/proposal';
import ModalProcess from '@components/ModalProcess';
import Modal from '@components/Modal/Modal';
import ActiveProposal from '@components/ActiveProposal';
import CustomProgressBar from '@components/CustomProgressBar';
import './style.scss';

type Props = {
  order: number | undefined;
  multiProposalId?: number | undefined;
};

function MultiProposalProgress(props: Props) {
  const { order, multiProposalId } = props;
  const { id } = useParams();
  const proposal = proposals.filter((value: Proposal) => value.id !== Number(id) && value.isMulti);
  const [isModalProcessMap, setIsModalProcessMap] = useState<boolean>(false);
  const [isModalActiveProposal, setIsModalActiveProposal] = useState<boolean>(false);

  const handleModalProcessMap = () => {
    setIsModalProcessMap(!isModalProcessMap);
  };
  const handleModalActiveProposal = () => {
    setIsModalActiveProposal(!isModalActiveProposal);
  };

  const calculateProgressPercent = (): number => {
    const foundMultiProposal = multiProposalMockData.find(
      (item: MultiProposalMockData) => item.id === multiProposalId,
    );
    if (!foundMultiProposal) {
      return 0;
    }
    return +((Number(order) / foundMultiProposal.totalCheckpoint) * 100).toFixed();
  };

  const percent = calculateProgressPercent();
  return (
    <div className="flex flex-col gap-3 my-6 w-full border rounded-lg p-6">
      <span
        className="text-[16px] text-[#5D23BB] font-medium cursor-pointer"
        onClick={handleModalActiveProposal}
      >
        {proposal.length} Active Single Proposals
      </span>
      <div className="mb-[16px]">
        <div className="flex justify-between text-[17px] text-[#575655] mb-[6px] font-semibold ">
          <div className="">
            <span className="">New Feature Release Process</span>
          </div>
          <div className="tracking-0.5px leading-[22px]">
            <span>{`${percent}%`}</span>
          </div>
        </div>

        <CustomProgressBar className="bg-[#5D23BB] h-10px" percent={percent} />
      </div>
      <button
        className="w-full border-1.5 border-grey-version-3 rounded-lg p-3 text-center cursor-pointer focus:outline-none"
        onClick={handleModalProcessMap}
      >
        <p className="text-[#252422] text-base">View progress</p>
      </button>
      <Modal isOpen={isModalProcessMap} onClose={handleModalProcessMap}>
        <ModalProcess handleModalProcessMap={handleModalProcessMap} percent={percent} />
      </Modal>
      <Modal
        isOpen={isModalActiveProposal}
        onClose={handleModalActiveProposal}
        className="max-h-[90vh] md:max-h-[90vh] overflow-hidden md:overflow-y-hidden active-proposal-modal"
      >
        <ActiveProposal proposal={proposal} handleModalActiveProposal={handleModalActiveProposal} />
      </Modal>
    </div>
  );
}

export default MultiProposalProgress;
