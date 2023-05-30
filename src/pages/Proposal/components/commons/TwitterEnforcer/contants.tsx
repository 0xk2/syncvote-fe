import { SelectBoxOption } from 'types/common';
import { applicationType } from '@utils/constants/enforcer';

export const twitterActionTypes = {
  postATweet: {
    id: 'postATweet',
    label: 'Post a tweet',
  },
};

export const twitterActionsOptions = [
  {
    id: twitterActionTypes.postATweet.id,
    label: twitterActionTypes.postATweet.label,
  },
];

export const mockMail = [
  {
    id: '@mock',
    label: '@mock',
  },
];

export const twitterData: {
  application: SelectBoxOption;
  action: SelectBoxOption;
  selectedConnection: SelectBoxOption;
  connectionOptions: SelectBoxOption[];
  postContent: string;
  isConnectTwitter: boolean;
} = {
  application: applicationType.twitter,
  action: twitterActionTypes.postATweet,
  selectedConnection: mockMail[0],
  connectionOptions: mockMail,
  postContent: '',
  isConnectTwitter: false,
};
