import { L } from '@utils/locales/L';
import { Options, Proposal, VotingResult } from '@utils/mockData/proposal';
import { generateId } from '@utils/helpers';
import ProgressBar from '@pages/Voter/components/ProgressBar/ProgressBar';
import React, { useState } from 'react';
import formatNumber from '@components/FormatNumber';

type Props = {
  proposal: Proposal;
  optionsIdOfProposal: Options[];
  listUserVote?: VotingResult[];
};

function VotingResultReview(props: Props) {
  const { optionsIdOfProposal, listUserVote = [], proposal } = props;
  const [listOptions, setListOptions] = useState<Options[]>(optionsIdOfProposal.slice(0, 3));
  const [isShowLess, setIsShowLess] = useState(true);

  const calculateVotePercent = (optionId: number) => {
    const voteUser = listUserVote?.filter((value: VotingResult) => value.optionedId === optionId);

    return ((voteUser.length / listUserVote.length) * 100).toFixed(2);
  };

  const onClickShow = () => {
    if (listOptions.length === 3) {
      const newList = [...optionsIdOfProposal];
      setListOptions(newList);
    } else {
      const newList = [...optionsIdOfProposal.slice(0, 3)];
      setListOptions(newList);
    }
    setIsShowLess(!isShowLess);
  };

  return (
    <div className="flex flex-col gap-6 my-6 w-full border rounded-lg p-6 transition-all">
      {}
      <div className="flex justify-between items-center">
        <p className="text-grey-version-7 text-text_2 font-semibold">{L('votingResults')}</p>
        <p className="font-medium text-[15px] leading-[20px] text-[#252422]">
          {formatNumber(listUserVote.length)}{' '}
          {proposal.isShowVotes ? 'Voting power' : 'Total votes'}
        </p>
      </div>
      {listOptions.map((value: Options) => {
        if (value.isLoop) {
          return (
            <div key={generateId(8)}>
              <ProgressBar
                option={value.value}
                percent={Number(calculateVotePercent(value.id)) || 0}
              />
            </div>
          );
        }
      })}
      {optionsIdOfProposal.length > 3 && (
        <div className="text-center cursor-pointer text-[#5D23BB] text-base" onClick={onClickShow}>
          {isShowLess
            ? `View all ${optionsIdOfProposal.length - listOptions.length} options`
            : L('viewLessOptions')}
        </div>
      )}
    </div>
  );
}

export default VotingResultReview;
