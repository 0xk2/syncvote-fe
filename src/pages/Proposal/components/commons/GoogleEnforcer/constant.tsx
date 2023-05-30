import { SelectBoxOption } from 'types/common';
import { applicationType } from '@utils/constants/enforcer';
import { DropdownOptionsSendTo } from './dataDropdown';

export const gmailActionType = {
  sendEmail: {
    id: 'sendEmail',
    label: 'Send email',
  },
};

export const gmailActionOptions = [
  {
    id: gmailActionType.sendEmail.id,
    label: gmailActionType.sendEmail.label,
  },
];

export const gmailMockMail = [
  {
    id: 'mock@gmail.com',
    label: 'mock@gmail.com',
  },
];

export const gmailData: {
  application: SelectBoxOption;
  action: SelectBoxOption;
  selectedConnection: SelectBoxOption;
  connectionOptions: SelectBoxOption[];
  sendTo: SelectBoxOption;
  recipientAddress: string;
  title: string;
  isConnectGmail: boolean;
  emailContent: string;
} = {
  application: applicationType.gmail,
  action: gmailActionType.sendEmail,
  selectedConnection: gmailMockMail[0],
  connectionOptions: gmailMockMail,
  sendTo: DropdownOptionsSendTo[0],
  isConnectGmail: false,
  recipientAddress: '',
  title: '',
  emailContent: '',
};
