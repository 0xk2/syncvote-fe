import React, { useState } from 'react';
import CommentDetail from '@pages/Voter/components/CommentDetail';
import TimeLine from '@components/TimeLine';
import { Options, Proposal, VotingResult } from '@utils/mockData/proposal';
import ActiveAndShare from '@components/ActiveAndShare';
import { useOutletContext } from 'react-router-dom';
import { L } from '@utils/locales/L';
import { generateId, sliceAddressToken } from '@utils/helpers';
import RenderVote from '@components/RenderVote';
import CheckTypeVote from '@components/CheckTypeVote';
import VotingResultReview from '@components/VotingResult';
import DetailProposal from '@components/TitleProposal';
import MultiProposalProgress from '@components/MultiProposalProgress';
import RenderVoteTitle from '@components/RenderVoteTitle';

const userInfo = {
  id: 3,
  urlAvatar: '/assets/images/temp/avatar-vote-5.png',
  vote: '1 Vote',
};

type Props = {
  proposal: Proposal;
  optionsIdOfProposal: Options[];
  totalUserVote: VotingResult[];
};

function SingleProposal(props: Props) {
  const { proposal, optionsIdOfProposal, totalUserVote } = props;

  const [selectedVote, setSelectVote] = useState<number>(0);
  const [isSubmitVote, setIsSubmitVote] = useState<boolean>(false);
  const [listUserVote, setListUserVote] = useState<VotingResult[]>(totalUserVote);
  const [listVote, setListVote] = useState<Options[]>(optionsIdOfProposal);

  const { isAuth, setIsAuth } = useOutletContext<any>();

  const handleSubmitVote = () => {
    setIsSubmitVote(true);
    const newListVote = listVote.map((item: Options) => {
      if (item.id === selectedVote) return { ...item, isChoice: true };
      return item;
    });
    setListVote(newListVote);
    if (selectedVote) {
      const newUserVote = {
        proposalId: proposal.id,
        optionedId: selectedVote,
        urlAvatar: userInfo.urlAvatar,
        token: sliceAddressToken(generateId(24)),
        vote: userInfo.vote,
      };
      const newListUser = [newUserVote, ...listUserVote];
      setListUserVote(newListUser);
    }
  };

  return (
    <div className="container my-10 px-4 md:px-0">
      <div className="block md:flex gap-[48px] flex-wrap md:flex-nowrap">
        <div className="w-full md:w-[66.666667%]">
          <div className="hidden md:flex items-center gap-2">
            <ActiveAndShare />
          </div>
          <DetailProposal proposal={proposal} />
          <div className="flex flex-col gap-[20px]">
            <p className="text-xl font-semibold text-[#252422]">{L('voteOnChain')}</p>
            <RenderVote
              optionsIdOfProposal={listVote}
              isSubmitVote={isSubmitVote}
              isAuth={isAuth}
              setSelectVote={setSelectVote}
              selectedVote={selectedVote}
            />
            <CheckTypeVote
              isAuth={isAuth}
              selectedVote={selectedVote}
              isSubmitVote={isSubmitVote}
              setIsAuth={setIsAuth}
              handleSubmitVote={handleSubmitVote}
            />
          </div>
          <div className="my-10">
            <div className="text-xl font-semibold text-[#252422]">{L('votes')}</div>
            <RenderVoteTitle
              optionsIdOfProposal={optionsIdOfProposal}
              listUserVote={listUserVote}
            />
          </div>
        </div>
        <div className="w-full md:w-[33.333333%] overflow-hidden">
          {proposal.isMulti && (
            <MultiProposalProgress
              order={Number(proposal.order) - 1}
              multiProposalId={Number(proposal.multiProposalId)}
            />
          )}
          <TimeLine proposal={proposal} />
          <VotingResultReview
            proposal={proposal}
            optionsIdOfProposal={optionsIdOfProposal}
            listUserVote={listUserVote}
          />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="basic-full md:basis-2/3">
          <CommentDetail />
        </div>
      </div>
    </div>
  );
}

export default SingleProposal;
