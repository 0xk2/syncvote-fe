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
    value: 'Product',
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
    value: '0.1',
  },
];
const rolesOptions = [
  {
    allowedRoles: {
      title: 'Allowed roles',
      type: [
        {
          id: 'Product',
          label: 'Product',
        },
      ],
    },
  },
];
const members = [
  {
    id: 1,
    nameTag: 'abc',
    walletAddress: 'cvbnmxcvbn',
    roleId: 'Product',
  },
];
const ReviewPolling = ({ node, wfId }: Props) => {
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

export default ReviewPolling;
