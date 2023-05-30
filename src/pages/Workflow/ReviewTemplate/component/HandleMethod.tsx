import { ICheckpointNode } from 'types/checkpoint';
import { ECheckpointsType } from 'types/enums/checkpoints';
import ReviewEnforcer from './ReviewEnforcer';
import ReviewPolling from './ReviewPolling';
import ReviewSingleChoiceVote from './ReviewSingleChoiceVote';
import ReviewUpvote from './ReviewUpvote';
import ReviewVeto from './ReviewVeto';

type Props = {
  method?: string;
  node?: ICheckpointNode;
  wfId?: string | number;
};
const HandleMethod = ({ method = undefined, node, wfId }: Props) => {
  const handleRenderMethod = (methodName: string | undefined) => {
    if (methodName === ECheckpointsType.polling) {
      return <ReviewPolling node={node} wfId={wfId} />;
    }
    if (methodName === ECheckpointsType.singleChoice) {
      return <ReviewSingleChoiceVote node={node} wfId={wfId} />;
    }
    if (methodName === ECheckpointsType.upvote) {
      return <ReviewUpvote node={node} wfId={wfId} />;
    }
    if (methodName === ECheckpointsType.veto) {
      return <ReviewVeto node={node} wfId={wfId} />;
    }
    if (methodName === ECheckpointsType.enforcer) {
      return <ReviewEnforcer node={node} wfId={wfId} />;
    }
    return '';
  };
  return <div>{handleRenderMethod(method)}</div>;
};

export default HandleMethod;
