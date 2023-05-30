import { SelectBoxOption } from 'types/common';

export const ALLOW_OPTION = {
  ROLE: 'role',
  TOKEN: 'token',
};

export const OptionsTime: SelectBoxOption[] = [
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
