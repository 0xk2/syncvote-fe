import EnforcerIcon from '@assets/icons/svg-icons/EnforcerIcon';
import PoolingIcon from '@assets/icons/svg-icons/Pooling';
import UpVoteIcon from '@assets/icons/svg-icons/UpVoteIcon';
import VetoIcon from '@assets/icons/svg-icons/VetoIcon';
import CheckCircleIcon from '@assets/icons/svg-icons/CheckCircleIcon';
import { ECheckpointsType } from 'types/enums/checkpoints';
import { IVoteMethod } from 'types/checkpoint';
import { CP_NAME } from '@constants/checkpoint';
import { SelectBoxOption } from 'types/common';

export const votingMethods: Array<IVoteMethod> = [
  {
    id: ECheckpointsType.polling,
    name: 'Polling',
    detail:
      'Users can choose more than 1 option. The voting result can include 1 option or a list of options based on the voting condition setting.',
    icon: <PoolingIcon />,
    type: ECheckpointsType.polling,
  },
  {
    id: ECheckpointsType.singleChoice,
    name: 'Single choice vote',
    detail:
      'Users can choose 1 of 2 options. The option which has voting result is equivalent to or bigger than the threshold value will be passed.',
    icon: <CheckCircleIcon />,
    type: ECheckpointsType.singleChoice,
  },
  {
    id: ECheckpointsType.upvote,
    name: 'Upvote ',
    detail:
      'This type of voting contains only 1 option. As long as  the voting result is equivalent to or bigger than the threshold value, this proposal will be passed.',
    icon: <UpVoteIcon />,
    type: ECheckpointsType.upvote,
  },
  {
    id: ECheckpointsType.veto,
    name: 'Veto vote',
    detail:
      'This type of voting contains only 1 option is Veto. If the VETO voting result is smaller than the threshold value, this proposal will be passed.',
    icon: <VetoIcon />,
    type: ECheckpointsType.veto,
  },
];

export const enforcerData = {
  id: ECheckpointsType.enforcer,
  name: CP_NAME.enforcer,
  detail:
    'Enforcer acts as the execution of the final decision in one path, this includes actions like transferring, moving or changing one or more parameters within the DAO.',
  icon: <EnforcerIcon />,
  type: ECheckpointsType.enforcer,
};

export const dropdownOptionsConnect = [
  {
    id: 'allPassOption',
    label: 'All pass option(s)',
  },
  {
    id: 'allFailOption',
    label: 'All fail option(s)',
  },
  {
    id: 'allOption',
    label: 'All option(s)',
  },
];

export const optionsTime: SelectBoxOption[] = [
  {
    id: 'hour',
    label: 'HOUR(S)',
    value: 'HOUR',
  },
  {
    id: 'day',
    label: 'DAY(S)',
    value: 'DAY',
  },
  {
    id: 'month',
    label: 'MONTH(S)',
    value: 'MONTH',
  },
];
