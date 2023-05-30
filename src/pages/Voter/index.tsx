import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import ActiveAndShare from '@components/ActiveAndShare';
import DetailProposal from '@components/TitleProposal';
import { L } from '@utils/locales/L';
import RenderVote from '@components/RenderVote';
import CheckTypeVote from '@components/CheckTypeVote';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Options } from '@utils/mockData/proposal';
import { sliceAddressToken, generateId } from '@utils/helpers';
import RenderVoteTitle from '@components/RenderVoteTitle';
import TimeLine from '@components/TimeLine';
import VotingResultReview from '@components/VotingResult';
import CommentDetail from './components/CommentDetail';

const userInfo = {
  id: 1,
  urlAvatar: '/assets/images/temp/avatar-vote-5.png',
  vote: '1 Vote',
};
function ProposalDetail() {
  const {
    votingMethod: votingMethodData,
    basicInfo: basicData,
    duration: durationData,
  }: any = useSelector((state: RootState) => state.proposal);
  const { isAuth, setIsAuth } = useOutletContext<any>();
  const navigate = useNavigate();

  const [selectedVote, setSelectVote] = useState<number>(0);
  const [isSubmitVote, setIsSubmitVote] = useState<boolean>(false);
  const [listVote, setListVote] = useState<any[]>(votingMethodData.option);
  const [listUserVote, setListUserVote] = useState<any[]>([]);

  const handleSubmitVote = () => {
    setIsSubmitVote(true);
    const newListVote = listVote.map((item: Options) => {
      if (item.id === selectedVote) return { ...item, isChoice: true };
      return item;
    });
    setListVote(newListVote);
    if (selectedVote) {
      const newUserVote = {
        proposalId: userInfo.id,
        optionedId: selectedVote,
        urlAvatar: userInfo.urlAvatar,
        token: sliceAddressToken(generateId(24)),
        vote: userInfo.vote,
      };
      const newListUser = [newUserVote];
      setListUserVote(newListUser);
    }
  };

  useEffect(() => {
    if (!durationData.startTime || !basicData.decisionTitle) {
      navigate('1');
    }
  }, []);

  return (
    <div className="container my-10 px-4 md:px-0">
      <div className="block md:flex gap-10 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-[66.666667%]">
          <div className="hidden md:flex items-center gap-2">
            <ActiveAndShare />
          </div>
          <DetailProposal proposal={basicData} />
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
            <RenderVoteTitle optionsIdOfProposal={listVote} listUserVote={listUserVote} />
          </div>
        </div>
        <div className="w-full md:w-[33.333333%] overflow-hidden">
          <TimeLine proposal={durationData} votingMethodData={votingMethodData} />
          <VotingResultReview
            proposal={durationData}
            optionsIdOfProposal={listVote}
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
export default ProposalDetail;
