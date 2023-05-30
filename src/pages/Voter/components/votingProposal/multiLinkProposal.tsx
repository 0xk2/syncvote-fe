import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

function MultiLinkProposal() {
  const basicInfo = useSelector((state: RootState) => state.proposal.basicInfo);

  return <div>ThoThang1</div>;
}

export default MultiLinkProposal;
