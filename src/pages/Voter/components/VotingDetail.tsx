import React, { useState } from 'react';
import Button from '@components/Button/Button';
import { useOutletContext } from 'react-router-dom';
import { L } from '@utils/locales/L';
import SingleChoiceIcon from '@assets/icons/svg-icons/SingleChoiceIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { MethodVoteOptionChoiceType } from 'types/proposal';
import TabsVote from './tabsVote/TabsVote';

const VotingDetail = () => {
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);
  const [listVote, setListVote] = useState<MethodVoteOptionChoiceType[]>(votingMethodData.option);
  const [selectedVote, setSelectVote] = useState<string>('');
  const [isSubmitVote, setIsSubmitVote] = useState<boolean>(false);
  const { isAuth, setIsAuth } = useOutletContext<any>();
  const handleSelectVote = (vote: string) => {
    setSelectVote(vote);
  };

  const handleSubmitVote = () => {
    setIsSubmitVote(true);
    const newList = listVote.map((item: MethodVoteOptionChoiceType) => {
      if (item.id.toString() === selectedVote) return { ...item, isChoice: true };
      return item;
    });
    setListVote(newList);
  };

  const renderVote = () =>
    listVote.map((ele: MethodVoteOptionChoiceType) => {
      if (ele.isLoop) {
        return (
          <div key={ele.id} className="relative">
            <Button
              disabled={!isAuth}
              onClick={() => {
                handleSelectVote(ele.id.toString());
              }}
              variant="outline"
              className={`w-full h-[60px] leading-[0.5em] tracking-0.5px
            py-[24px] px-[16px] rounded-xl !text-grey-version-7 bg-white
            hover:bg-white focus:outline-violet-version-5 ${
              ele.isChoice && 'border-[2px] border-violet-version-5'
            } ${isSubmitVote && 'pointer-events-none'}`}
            >
              <div className="absolute left-4">
                <span className="font-semibold text-[17px]">{ele.id}.</span>
              </div>
              <div>
                <span className="text-[17px]">{ele.value}</span>
              </div>
              {ele.isChoice && (
                <div className="absolute right-4 w-6 h-6 text-violet-version-5">
                  <SingleChoiceIcon />
                </div>
              )}
            </Button>
          </div>
        );
      }
      return null;
    });

  const checkTypeVoteBotton = () => {
    if (isAuth) {
      if (selectedVote === '') {
        return (
          <Button className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl text-white bg-violet-light">
            <p className="text-[17px] text-violet-version-2">{L('selectAnOption')}</p>
          </Button>
        );
      }
      if (!isSubmitVote) {
        return (
          <Button
            className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl text-white"
            onClick={handleSubmitVote}
          >
            <p className="text-[17px]">{L('vote')}</p>
          </Button>
        );
      }
      return (
        <Button
          className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl text-white bg-violet-light"
          disabled
        >
          <p className="text-[17px] text-violet-version-2">{L('voted')}</p>
        </Button>
      );
    }
    return (
      <Button
        className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl text-white"
        onClick={() => {
          setIsAuth(!isAuth);
        }}
      >
        <p className="text-[17px]">{L('connectWalletToVote')}</p>
      </Button>
    );
  };

  return (
    <>
      <div className="pt-[35.5px] flex flex-col gap-[20px]">
        <p className="text-xl font-semibold">{L('voteOnChain')}</p>
        {renderVote()}
        {checkTypeVoteBotton()}
      </div>
      <div className="my-10">
        <p className="text-xl font-semibold">{L('votes')}</p>
        <div className="my-[30px]">
          <TabsVote />
        </div>
      </div>
    </>
  );
};

export default VotingDetail;
