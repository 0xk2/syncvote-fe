import React from 'react';
import { MethodVoteOptionType } from 'types/proposal';
import { ECheckpointsType } from 'types/enums/checkpoints';
import VetoOptions from '@pages/MultiProposal/SetupInitiative/Options/Veto';
import PollingOptions from '@pages/MultiProposal/SetupInitiative/Options/Polling';
import UpvoteOptions from '@pages/MultiProposal/SetupInitiative/Options/Upvote';
import SingleChoiceOptions from '@pages/MultiProposal/SetupInitiative/Options/SingleChoice';

type Props = {
  listOptions?: MethodVoteOptionType[];
  foundCp: any;
  setListOptions(options: any): void;
};

function Options(props: Props) {
  const { listOptions, foundCp, setListOptions } = props;

  const option = {
    [ECheckpointsType.veto]: <VetoOptions />,
    [ECheckpointsType.polling]: (
      <PollingOptions listOptions={listOptions} setListOptions={setListOptions} />
    ),
    [ECheckpointsType.upvote]: (
      <UpvoteOptions listOptions={listOptions} setListOptions={setListOptions} />
    ),
    [ECheckpointsType.singleChoice]: (
      <SingleChoiceOptions listOptions={listOptions} setListOptions={setListOptions} />
    ),
  };
  // @ts-ignore
  const OptionComponent = option[foundCp.typeNode];

  return <>{OptionComponent}</>;
}

export default Options;
