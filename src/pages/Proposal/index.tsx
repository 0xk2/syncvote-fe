import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L } from '@utils/locales/L';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ProposalStepType } from 'types/proposal';
import CircularProgress from './components/CircularProgress';
import ProposalStep from './components/ProposalStep';

const defaultSteps: Array<ProposalStepType> = [
  {
    id: 1,
    label: L('addBasicInfo'),
    isPassed: false,
    param: PAGE_ROUTES.ADD_BASIC_INFO,
  },
  {
    id: 2,
    label: L('setUpParticipants'),
    isPassed: false,
    param: PAGE_ROUTES.PARTICIPANTS,
  },
  {
    id: 3,
    label: L('setupVotingMethod'),
    isPassed: false,
    param: PAGE_ROUTES.VOTING_METHOD,
  },
  {
    id: 4,
    label: L('setUpDuration'),
    isPassed: false,
    param: PAGE_ROUTES.DURATION,
  },
  {
    id: 5,
    label: L('setUpEnForcer'),
    isPassed: false,
    param: PAGE_ROUTES.ENFORCE,
  },
  {
    id: 6,
    label: L('reviewSingleProposal'),
    isPassed: false,
    param: PAGE_ROUTES.REVIEW_PROPOSAL,
  },
];

const Proposal = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="container flex justify-start h-screen">
      <div className="basis-1/5 min-w-368px h-full flex items-start justify-center pt-56px border-version-3 border-r-1px">
        <div className="flex flex-col items-center p-0 w-250px gap-56px">
          <CircularProgress defaultStepsLength={defaultSteps.length} />
          <ProposalStep
            steps={defaultSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>

        <div />
      </div>
      <div className="basis-4/5">
        <Outlet
          context={{
            setCurrentStep,
            currentStep,
          }}
        />
      </div>
    </div>
  );
};

export default Proposal;
