import { SelectBoxOption } from 'types/common';
import { TwitterDetail } from 'types/proposal';

export interface EnforcerDetail {
  application:
    | {
        id: string;
        label: string;
        icon?: JSX.Element;
        disabled?: undefined;
      }
    | {
        id: string;
        label: string;
        disabled: boolean;
        icon?: undefined;
      };
  action: string;
  twitterData: TwitterDetail;
}

export interface SetupTwitterType {
  isConnect: boolean;
  action: string;
  connectionOptions: SelectBoxOption[];
  selectedConnection: SelectBoxOption;
}

export interface SetupGmailType {
  isConnect: boolean;
  action: string;
  connectionOptions: SelectBoxOption[];
  selectedConnection: SelectBoxOption;
}
