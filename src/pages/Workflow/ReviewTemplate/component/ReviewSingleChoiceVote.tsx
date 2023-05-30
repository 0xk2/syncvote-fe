import { ICheckpointNode } from 'types/checkpoint';
import { ICON_LIST_V2 } from '@utils/constants/iconList';
import ContentDrawerTemplate from './ContentDrawerTemplate';

type Props = {
  node?: ICheckpointNode;
  wfId?: number | string;
};
const dataParticipantsRole = [
  {
    id: '1',
    title: 'Allowed by',
    value: 'Role',
  },
  {
    id: '2',
    title: 'Allowed role',
    value: 'Member',
  },
];
const dataVotingCondition = [
  {
    id: '1',
    title: 'Counted by',
    value: 'Number of votes',
  },
  {
    id: '2',
    title: 'Number of results',
    value: 'Custom',
  },
  {
    id: '3',
    title: 'Input number of results',
    value: '1',
  },
];
const dataVotingResult = [
  {
    id: '1',
    title: 'Number of options each participant can v...',
    value: '1',
  },
  {
    id: '2',
    title: 'Threshold calculated by',
    value: 'Total votes made',
  },
  {
    id: '3',
    title: 'Threshold value for each result (% at least)  ',
    value: '0.1',
  },
];
const rolesOptions = [
  {
    allowedRoles: {
      title: 'Allowed roles',
      type: [
        {
          id: 'Member',
          label: 'Member',
        },
      ],
    },
  },
];
const members = [
  {
    id: 1,
    nameTag: 'xyz',
    walletAddress: 'zxcvbnm',
    roleId: 'Member',
  },
];
const ReviewSingleChoiceVote = ({ node, wfId }: Props) => {
  return (
    <ContentDrawerTemplate
      iconProps={node && ICON_LIST_V2[node?.type as keyof typeof ICON_LIST_V2].icon}
      titleProps={node && ICON_LIST_V2[node?.type as keyof typeof ICON_LIST_V2].type}
      nameProps={node?.name}
      dataParticipants={dataParticipantsRole}
      dataVotingCondition={dataVotingCondition}
      dataVotingResult={dataVotingResult}
      wfId={wfId}
      memberId={members}
      rolesOptions={rolesOptions}
    />
  );
};

export default ReviewSingleChoiceVote;
