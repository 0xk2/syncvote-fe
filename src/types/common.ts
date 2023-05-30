import { IMemberRoles } from '@redux/reducers/memberList.reducer/interface';

export type AlertMessage = {
  type: 'ERROR' | 'WARN' | 'SUCCESS';
  message?: string;
};

export type SelectBoxOption = {
  id: string;
  label: string | undefined;
  value?: string | number | undefined;
  disabled?: boolean | undefined;
  member?: IMemberRoles[];
  cpId?: string;
};
