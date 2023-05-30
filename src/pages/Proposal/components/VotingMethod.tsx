import { L } from '@utils/locales/L';
import { useSearchParams } from 'react-router-dom';
import SectionWrapper from './commons/SectionWrapper';
import SetUpVotingMethod from './VotingMethod/SetUpVotingMethod';
import SingleChoiceVote from './VotingMethod/SingleChoiceVote';
import Upvote from './VotingMethod/Upvote';
import VetoVote from './VotingMethod/VetoVote';
import Polling from './VotingMethod/Polling';

const VotingMethod = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get('type');

  const handleNavigate = () => {
    if (type === 'singleChoiceVote') {
      return <SingleChoiceVote />;
    }
    if (type === 'polling') {
      return <Polling />;
    }
    if (type === 'upVote') {
      return <Upvote />;
    }
    if (type === 'vetoVote') {
      return <VetoVote />;
    }
    return <SetUpVotingMethod setSearchParams={setSearchParams} />;
  };

  return (
    <SectionWrapper className="flex flex-col p-24px mt-32px">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-16px mb-7">
          <h3 className="text-emph-large-title text-grey-version-6">{L('setUpVotingMethod')}</h3>
        </div>
        {handleNavigate()}
      </div>
    </SectionWrapper>
  );
};

export default VotingMethod;
