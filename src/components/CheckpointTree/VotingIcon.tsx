import { ECheckpointsType } from 'types/enums/checkpoints';
import BarChartIcon from '@assets/icons/svg-icons/BarChartIconV2';
import CheckCircleIcon from '@assets/icons/svg-icons/CheckCircleIcon';
import LikeIcon from '@assets/icons/svg-icons/LikeIcon';
import ZapOffIcon from '@assets/icons/svg-icons/ZapOffIcon';
import EnforcerIcon from '@assets/icons/svg-icons/EnforcerIcon';
import XOctagonIcon from '@assets/icons/svg-icons/X-OctagonIcon';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';

type Props = {
  type: ECheckpointsType;
  isHighlight?: boolean;
};

function VotingIcon({ type, isHighlight }: Props) {
  const color = isHighlight ? '#5D23BB' : '#0a0a08';

  switch (type) {
    case ECheckpointsType.polling:
      return <BarChartIcon color={color} />;
    case ECheckpointsType.singleChoice:
      return <CheckCircleIcon color={color} />;
    case ECheckpointsType.upvote:
      return <LikeIcon color={color} />;
    case ECheckpointsType.veto:
      return <ZapOffIcon color={color} />;
    case ECheckpointsType.enforcer:
      return <EnforcerIcon color={color} />;
    case ECheckpointsType.end:
      return <XOctagonIcon color={color} />;
    case ECheckpointsType.unknown:
      return <QuestionCircleIcon color={color} />;
    default:
      return <QuestionCircleIcon color={color} />;
  }
}

export default VotingIcon;
