import React from 'react';
import { L } from '@utils/locales/L';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import moment from 'moment';
import InitiativeProcess from './InitiativeProcess';
import ProgressBar from './ProgressBar/ProgressBar';

const dataVotingResult = [
  { id: 1, option: 'Option 1', percent: 10 },
  { id: 2, option: 'Option 2', percent: 60 },
  { id: 3, option: 'Option 3', percent: 30 },
];

const Timeline = () => {
  const durationData = useSelector((state: RootState) => state.proposal.duration);
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);

  const dataTimeline = [
    {
      id: 1,
      title: 'Start time',
      value: durationData.startTime
        ? moment(durationData.startTime).format('MMM Do LT')
        : 'Jan 1st 12:00 AM',
    },
    {
      id: 2,
      title: 'End time',
      value: durationData.endTime
        ? moment(durationData.endTime).format('MMM Do LT')
        : 'Jan 5st 12:00 AM',
    },
    {
      id: 3,
      title: 'Threhold',
      value: votingMethodData.thresholdValueResult
        ? `${votingMethodData.thresholdValueResult}% voting power`
        : '30% voting power',
    },
  ];
  const renderTimeline = () =>
    dataTimeline.map((ele) => (
      <div key={ele.id} className="flex justify-between">
        <p className="text-grey-version-7 text-text_2 font-medium">{ele.title}</p>
        <p className="text-grey-version-7 text-text_2 font-semibold">{ele.value}</p>
      </div>
    ));

  return (
    <>
      <div className="hidden md:block">
        <InitiativeProcess />
      </div>
      <div className="flex flex-col gap-3 my-2 w-full border rounded-lg p-6">
        {renderTimeline()}
      </div>

      <div className="flex flex-col gap-6 my-2 w-full border rounded-lg p-6">
        <p className="text-grey-version-7 text-text_2 font-semibold">{L('votingResults')}</p>
        {dataVotingResult.map((vote) => (
          <ProgressBar key={vote.id} option={vote.option} percent={vote.percent} />
        ))}
      </div>
    </>
  );
};

export default Timeline;
