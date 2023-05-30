import MultiProposalProgress from '@components/MultiProposalProgress';
import React from 'react';
import { useParams } from 'react-router-dom';
import { multiProposalMockData } from '@utils/mockData/proposal';
import CommentDetail from '@pages/Voter/components/CommentDetail';
import { L } from '@utils/locales/L';

function MultiProposal() {
  const { id } = useParams();
  const multiProposal = multiProposalMockData.find((item) => item.id === Number(id));

  if (!multiProposal) {
    return <h3>Not Found!!!</h3>;
  }
  return (
    <div className="my-10 max-w-[700px]">
      <p className="font-semibold text-3xl text-[#252422] mb-[32px]">{L('results')}</p>
      <div className="w-full">
        <div className="mb-[80px]">
          <MultiProposalProgress
            order={Number(multiProposal.currentStep)}
            multiProposalId={Number(multiProposal.id)}
          />
        </div>
        <CommentDetail />
      </div>
    </div>
  );
}

export default MultiProposal;
