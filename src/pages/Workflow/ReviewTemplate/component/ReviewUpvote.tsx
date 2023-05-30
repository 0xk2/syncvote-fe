import { ICheckpointNode } from 'types/checkpoint';
import { ICON_LIST_V2 } from '@utils/constants/iconList';
import ContentDrawerTemplate from './ContentDrawerTemplate';

const dataParticipantsToken = [
  {
    id: '1',
    title: 'Allowed by',
    value: 'Token',
  },
  {
    id: '2',
    title: 'Token address',
    value: '0x2170ed0880ac9a755fd29b2688956bd959f9',
  },
  {
    id: '3',
    title: 'Minimum holding period',
    value: '1',
    type: {
      id: 'hour',
      label: 'HOUR(S)',
      value: 'HOUR',
    },
  },
  {
    id: '4',
    title: 'Minimum holding quantity',
    value: '0',
  },
];
const dataVotingCondition = [
  {
    id: '1',
    title: 'Counted by',
    value: 'Number of votes',
  },
];
const dataVotingResult = [
  {
    id: '1',
    title: 'Threshold calculated by',
    value: 'Total votes made',
  },
  {
    id: '2',
    title: 'Threshold value for each result (% at least)  ',
    value: '0,1',
  },
];
type Props = {
  node?: ICheckpointNode;
  wfId?: number | string;
};

const ReviewUpvote = ({ node, wfId }: Props) => {
  return (
    <ContentDrawerTemplate
      iconProps={node && ICON_LIST_V2[node?.type as keyof typeof ICON_LIST_V2].icon}
      titleProps={node && ICON_LIST_V2[node?.type as keyof typeof ICON_LIST_V2].type}
      nameProps={node?.name}
      dataParticipants={dataParticipantsToken}
      dataVotingCondition={dataVotingCondition}
      dataVotingResult={dataVotingResult}
      wfId={wfId}
    />
  );
};
export default ReviewUpvote;
