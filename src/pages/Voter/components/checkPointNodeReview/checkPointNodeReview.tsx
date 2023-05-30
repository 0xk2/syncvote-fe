import AngleRightIcon from '@assets/icons/svg-icons/AngleRightIcon';
import BarChartIcon from '@assets/icons/svg-icons/BarChartIcon';
import CheckCircleIcon from '@assets/icons/svg-icons/CheckCircleIcon';
import EnforcerIcon from '@assets/icons/svg-icons/EnforcerIcon';
import LikeIcon from '@assets/icons/svg-icons/LikeIcon';
import PlusCircleIcon from '@assets/icons/svg-icons/PlusCircleIcon';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import XOctagonIcon from '@assets/icons/svg-icons/X-OctagonIcon';
import ZapOffIcon from '@assets/icons/svg-icons/ZapOffIcon';
import { ECheckpointsType } from 'types/enums/checkpoints';
import './styles.scss';

type Props = {
  type: string;
  name: string;
  classes?: string;
  value: number;
  totalItem: number;
  iconColor?: string;
  haveRouteDetail?: Boolean;
  isParent?: Boolean;
};

const CheckpointNodeReview: React.FC<Props> = ({
  iconColor = '#898988',
  type,
  name,
  value,
  totalItem,
  classes = '',
  isParent = false,
}) => {
  const svgProps = {
    color: iconColor,
    // classes: 'absolute w-full h-full top-0 left-0',
    // svgClasses: 'absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4',
  };

  const ICON_LIST = {
    UNKNOWN: {
      id: 'unknown',
      icon: <QuestionCircleIcon {...svgProps} />,
    },
    ENFORCER: {
      id: 'enforcer',
      icon: <EnforcerIcon {...svgProps} />,
    },
    POLLING: {
      id: 'polling',
      icon: <BarChartIcon {...svgProps} />,
    },
    SINGLE_CHOICE_VOTE: {
      id: 'single-choice-void',
      icon: <CheckCircleIcon {...svgProps} />,
    },
    UP_VOTE: {
      id: 'up-vote',
      icon: <LikeIcon {...svgProps} />,
    },
    VETO: {
      id: 'veto',
      icon: <ZapOffIcon {...svgProps} />,
    },
    END: {
      id: 'end',
      icon: <XOctagonIcon {...svgProps} />,
    },
  };

  const getConnectorPath = (value: number, totalItem: number) => {
    if (value !== 0 && value !== totalItem) {
      return 'after:absolute after:right-0 after:translate-x-full after:w-w_14 after:top-1/2 after:bg-grey-version-3 after:h-h_1.5 mr-mr_1';
    }
    return '';
  };

  return (
    <div
      className={`node-and-connector flex flex-col text-center relative ${getConnectorPath(
        value,
        totalItem,
      )} `}
    >
      {value !== 0 && value !== totalItem && <AngleRightIcon color="#e5e7eb" />}
      {isParent && <PlusCircleIcon />}
      {/* {haveRouteDetail && (
        <span className="tool-icon
        hover:cursor-pointer
        hover:text-violet-version-3
        absolute top-2/4 right-1
        -translate-x-200
        -translate-y-10 z-10">
          <ToolIcon />
        </span>
      )} */}
      <span
        className={`node hover:cursor-pointer inline-block border-1.5 rounded-1/2 p-p_5 center ${classes} ${
          type === ECheckpointsType.enforcer ? 'bg-grey-version-9' : ''
        }`}
      >
        <div className="icon">{ICON_LIST[type as keyof typeof ICON_LIST].icon}</div>
      </span>
      <span className="text-grey-version-5 absolute bottom-0 left-1/2 -translate-x-2/4 translate-y-full">
        {name}
      </span>
    </div>
  );
};

export default CheckpointNodeReview;
