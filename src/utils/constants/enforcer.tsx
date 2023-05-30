import GoogleIcon from '@assets/icons/svg-icons/GoogleIcon';
import OnChainIcon from '@assets/icons/svg-icons/OnChainIcon';
import TwitterIcon from '@assets/icons/svg-icons/TwitterIcon';

export const applicationType = {
  onchain: {
    id: 'onChain',
    label: 'On-chain',
    icon: <OnChainIcon />,
  },
  twitter: {
    id: 'twitter',
    label: 'Twitter',
    icon: <TwitterIcon />,
  },
  gmail: {
    id: 'gmail',
    label: 'Gmail',
    icon: <GoogleIcon />,
  },
  moreWillBeUpdated: {
    id: 'moreWillBeUpdated',
    label: 'More will be updated',
    disabled: true,
  },
};

export const enforcerApplication = [
  {
    id: applicationType.onchain.id,
    label: applicationType.onchain.label,
    icon: applicationType.onchain.icon,
  },
  {
    id: applicationType.twitter.id,
    label: applicationType.twitter.label,
    icon: applicationType.twitter.icon,
  },
  {
    id: applicationType.gmail.id,
    label: applicationType.gmail.label,
    icon: applicationType.gmail.icon,
  },
  {
    id: applicationType.moreWillBeUpdated.id,
    label: applicationType.moreWillBeUpdated.label,
    disabled: applicationType.moreWillBeUpdated.disabled,
  },
];
