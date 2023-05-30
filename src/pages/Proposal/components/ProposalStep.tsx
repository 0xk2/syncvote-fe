import { useNavigate } from 'react-router-dom';
import CheckIcon from '@assets/icons/svg-icons/CheckIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { ProposalStepType } from '../../../types/proposal';

type Props = {
  steps: Array<any>;
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

type ChangeStepType = {
  type: 'NEXT' | 'PREV' | 'PASS';
  step: ProposalStepType;
};

const ProposalStep = ({ steps, currentStep = 1, setCurrentStep }: Props) => {
  const navigate = useNavigate();
  const completedSteps = useSelector((state: RootState) => state.proposal.completedSteps);
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);
  const incompleted = useSelector((state: RootState) => state.proposal.incompleted);
  const highestStep = useSelector((state: RootState) => state.proposal.highestStep);

  const handleChangeStep = ({ type, step }: ChangeStepType) => {
    if ((!completedSteps.includes(step.id) && step.id > highestStep) || incompleted) return;
    if (step.id === 3) {
      setCurrentStep(step.id);
      navigate(
        `/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}?type=${votingMethodData.method}`,
      );
    } else if (type === 'PASS') {
      setCurrentStep(step.id);
      navigate(step.param);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {steps.map((step) => (
        <div
          className={`flex flex-col w-full mt-6px ${currentStep === step.id ? 'mb-0' : 'mb-12px'}`}
          key={step.id}
          // Enable to skip steps in proposal for testing
          onClick={() => handleChangeStep({ type: 'PASS', step })}
        >
          <div className="w-full flex justify-start items-center gap-3">
            <span
              className={`w-32px h-32px rounded-full border-2 text-center cursor-pointer flex justify-center items-center select-none
              ${
                step.id === currentStep || !completedSteps.includes(step.id) || step.id === 6
                  ? ''
                  : 'bg-violet-version-5'
              } 
                ${
                  currentStep === step.id
                    ? 'border-violet-version-5 text-[#252422]'
                    : `${
                        step.id === highestStep
                          ? 'border-[1px] border-grey-version-3 text-grey-version-4'
                          : 'bg-grey-version-3 text-grey-version-4'
                      }`
                }`}
            >
              {step.id === currentStep || !completedSteps.includes(step.id) || step.id === 6 ? (
                step.id
              ) : (
                <CheckIcon />
              )}
            </span>
            <span
              className={`tracking-0.5px text-emph-body font-medium ${
                currentStep === step.id
                  ? 'text-grey-version-7 font-semibold'
                  : `text-grey-version-4 ${
                      (step.id === currentStep || !completedSteps.includes(step.id)) &&
                      step.id !== highestStep
                        ? ''
                        : 'cursor-pointer'
                    }`
              }`}
            >
              {step.label}
            </span>
          </div>
          {currentStep === step.id && step.id !== steps.length && (
            <span className="w-32px h-32px flex justify-center items-center p-1">
              <span className="w-1px h-full bg-grey-version-3" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProposalStep;
