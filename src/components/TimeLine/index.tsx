import React from 'react';
import { Proposal } from '@utils/mockData/proposal';
import dayjs from 'dayjs';

type Props = {
  proposal: Proposal;
  votingMethodData?: any;
};

function TimeLine(props: Props) {
  const { proposal, votingMethodData } = props;

  return (
    <div className="flex flex-col gap-3 my-6 w-full border rounded-lg p-6">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-grey-version-7 text-text_2 font-medium">Start time</p>
          <p
            className="text-grey-version-7 text-text_2 font-semibold"
            style={{ wordSpacing: '3px' }}
          >
            {dayjs(proposal.startTime).format('MMM DD[st] hh:mm A')}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-grey-version-7 text-text_2 font-medium">End time</p>
          <p
            className="text-grey-version-7 text-text_2 font-semibold"
            style={{ wordSpacing: '3px' }}
          >
            {dayjs(proposal.endTime).format('MMM DD[th] hh:mm A')}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-grey-version-7 text-text_2 font-medium">Threshold</p>
          <p
            className="text-grey-version-7 text-text_2 font-semibold"
            style={{ wordSpacing: '3px' }}
          >
            {votingMethodData ? votingMethodData.thresholdValueResult?.value : proposal.threshold}
            &nbsp;
            {proposal.isShowVotes ? '% Voting power' : 'Total votes'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;
