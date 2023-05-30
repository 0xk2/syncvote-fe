import { useParams } from 'react-router-dom';
import SingleProposal from '@pages/Voter/components/votingProposal/singleProposal';
import { options, Proposal, proposals, votingResult } from '@utils/mockData/proposal';

function VotingProposal() {
  const { id } = useParams();
  const proposal = proposals.find((value: Proposal) => value.id === Number(id));
  const optionsIdOfProposal = options.filter((ele) => ele.proposalId === Number(id));
  const totalUserVote = votingResult.filter((value) => value.proposalId === Number(id));

  if (!proposal) {
    return <h3>Not Found.</h3>;
  }

  return (
    <SingleProposal
      proposal={proposal}
      optionsIdOfProposal={optionsIdOfProposal}
      totalUserVote={totalUserVote}
    />
  );
}

export default VotingProposal;
