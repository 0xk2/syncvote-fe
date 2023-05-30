import { useEffect, useState } from 'react';
import { L, LF } from '@utils/locales/L';
import PencilIcon from '@assets/icons/svg-icons/PencilIcon';
import Input from '@components/Input/Input';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import Button from '@components/Button/Button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AlertMessage, SelectBoxOption } from 'types/common';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import NoFlashIcon from '@assets/icons/svg-icons/NoFlashIcon';
import CommonSelectBox from '@components/SelectBox';
import Toggle from '@components/Toggle/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import {
  addVotingOption,
  setMethod,
  setThresholdValueResult,
  updateCompletedSteps,
  updateCountedBy,
  updateThresholdCalculatedBy,
  votingCondition,
} from '@redux/reducers/proposal.reducer';
import {
  COUNTED_BY_ROLES_OPTIONS,
  COUNTED_BY_TOKEN_OPTIONS,
  NUMBER_OF_PARTICIPANTS_OPTIONS,
  NUMBER_OF_TOKENS_USED_TO_VOTE_OPTIONS,
  NUMBER_OF_VOTES_OPTIONS,
} from '@constants/proposal';
import { EVotingMethod } from 'types/enums/votingMethodProposal';
import { v4 as uuidv4 } from 'uuid';
import { MethodVoteOptionType, OptionType, VotingValidateInterface } from 'types/proposal';
import { initValidates } from '@utils/mockData/proposal';
import CustomInput from '../commons/CustomInput';

const defaultListOfOptions = [
  {
    id: 1,
    value: 'Veto',
    isLoop: true,
    status: null,
  },
];

const VetoVote = () => {
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);
  const allowedBy = useSelector((state: RootState) => state.votingMethod.allowedBy);
  const isProgress = useSelector((state: RootState) => state.proposal.isProgress);
  const dispatch = useDispatch();

  const { currentStep, setCurrentStep } = useOutletContext<any>();
  const navigate = useNavigate();

  const [listOfOptions, setListOfOptions] = useState<MethodVoteOptionType[]>(defaultListOfOptions);
  const [thresholdValue, setThresholdValue] = useState({
    id: uuidv4(),
    value: votingMethodData.thresholdValueResult?.value || '',
    status: null,
  });
  const [isVotingCondition, setIsVotingCondition] = useState(votingMethodData.isVotingCondition);
  const [countedBy, setCountedBy] = useState('');
  const [validates, setValidates] = useState<VotingValidateInterface>(initValidates);
  const currentValidateStates = { ...validates };

  let countedByOptions: SelectBoxOption[] = [];
  if (allowedBy.id === 'roles') {
    countedByOptions = COUNTED_BY_ROLES_OPTIONS;
  } else if (allowedBy.id === 'token') {
    countedByOptions = COUNTED_BY_TOKEN_OPTIONS;
  }

  const handleValidatesThresholdValue = () => {
    const regex = /^-?\d*(\.\d{1,3})?$/;
    if (+thresholdValue.value === 0) {
      return {
        ...thresholdValue,
        status: {
          type: 'WARN',
          message: L('thisFieldIsRequiredPleaseFillIn'),
        } as AlertMessage | null | undefined,
      };
    }

    if (regex.test(thresholdValue.value)) {
      return {
        ...thresholdValue,
        status: null,
      };
    }
    return {
      ...thresholdValue,
      status: {
        type: 'WARN',
        message: L('IntegerOrDecimalNumberWithNoMoreThan3Decimal'),
      } as AlertMessage | null | undefined,
    };
  };

  const handleValidates = () => {
    let hasError = false;
    let check = false;
    const nextListOption = listOfOptions.map((option) => {
      return { ...option };
    });

    const thresholdValueResult: any = handleValidatesThresholdValue();
    if (isVotingCondition) {
      setThresholdValue(thresholdValueResult);
      if (thresholdValueResult?.status) {
        hasError = true;
      }
    }
    if (+thresholdValue.value >= 100 || +thresholdValue.value < 0.01) {
      check = true;
      currentValidateStates.allowedBy = {
        type: 'WARN',
        message: L('valueMustBeGreater'),
      };
    } else {
      currentValidateStates.allowedBy = null;
    }

    if (!hasError && !check) {
      dispatch(addVotingOption(nextListOption));
      dispatch(setThresholdValueResult(thresholdValueResult));
      dispatch(setThresholdValueResult(thresholdValueResult));
      dispatch(updateCompletedSteps(currentStep));
      setCurrentStep((prev: number) => prev + 1);
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.DURATION}`);
    } else {
      setListOfOptions(nextListOption);
    }
  };

  const handleBorderStatus = (option: OptionType) => {
    if (option.status?.type === 'WARN') {
      return 'border-yellow-version-5';
    }
    if (option.status?.type === 'ERROR') {
      return 'border-red-version-5';
    }
    if (option.status?.type === 'SUCCESS') {
      return 'border-green-version-5';
    }
    return '';
  };

  const handleGoBack = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}`);
  };

  const handleCountedBy = (value: SelectBoxOption | null) => {
    if (value?.id === 'numberOfParticipants') {
      setCountedBy('numberOfParticipants');
      dispatch(updateThresholdCalculatedBy(NUMBER_OF_PARTICIPANTS_OPTIONS[0]));
    } else if (value?.id === 'numberOfVotes') {
      setCountedBy('numberOfVotes');
      dispatch(updateThresholdCalculatedBy(NUMBER_OF_VOTES_OPTIONS[0]));
    } else if (value?.id === 'numberOfTokensUsedToVote') {
      setCountedBy('numberOfTokensUsedToVote');
      dispatch(updateThresholdCalculatedBy(NUMBER_OF_TOKENS_USED_TO_VOTE_OPTIONS[0]));
    }
    dispatch(updateCountedBy(value));
  };

  const handleOnChangeThresholdCalculatedBy = (value: SelectBoxOption | null) => {
    dispatch(updateThresholdCalculatedBy(value));
  };

  const handleToggleVotingCondition = () => {
    setIsVotingCondition(!isVotingCondition);
    dispatch(votingCondition(!isVotingCondition));
  };

  const handleThresholdCalculatedByOptions = () => {
    if (countedBy === 'numberOfParticipants') {
      return NUMBER_OF_PARTICIPANTS_OPTIONS;
    }
    if (countedBy === 'numberOfTokensUsedToVote') {
      return NUMBER_OF_TOKENS_USED_TO_VOTE_OPTIONS;
    }
    if (countedBy === 'numberOfVotes') {
      return NUMBER_OF_VOTES_OPTIONS;
    }
    return '';
  };

  const renderVotingCondition = () => (
    <>
      <div className="flex flex-col gap-[6px]">
        <p className="text-text_1.5 font-medium text-grey-version-6">
          {L('thresholdCalculatedBy')}
        </p>
        <CommonSelectBox
          options={handleThresholdCalculatedByOptions() as SelectBoxOption[]}
          defaultValue={
            votingMethodData.thresholdCalculatedBy?.id === ''
              ? (handleThresholdCalculatedByOptions()[0] as SelectBoxOption)
              : (votingMethodData.thresholdCalculatedBy as SelectBoxOption)
          }
          placeholderClass="text-grey-version-7"
          onChange={handleOnChangeThresholdCalculatedBy}
        />
      </div>
      <div className="flex flex-col gap-[6px]">
        <CustomInput
          childrenClassName="border-none"
          label="thresholdValueForEachResult"
          validate={thresholdValue?.status || validates.allowedBy}
        >
          <input
            type="text"
            className={`input-token-address border-1.5 text-grey-version-6 ${
              !validates.allowedBy ? '' : 'border-yellow-version-5'
            }  ${handleBorderStatus(thresholdValue)}`}
            value={thresholdValue.value}
            onChange={(e) => {
              const mustNumberRegex = /^\d+(\.\d{0,3})?$/;
              if (e.target.value !== '' && !mustNumberRegex.test(e.target.value)) return;
              setThresholdValue({
                ...thresholdValue,
                value: e.target.value,
              });
            }}
            placeholder="0.1"
          />
        </CustomInput>
      </div>
    </>
  );

  const handleChangeVotingMethod = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}`);
  };

  useEffect(() => {
    if (isProgress) {
      dispatch(setMethod('vetoVote'));
      if (votingMethodData.option.length !== 0 && votingMethodData.method === EVotingMethod.veto) {
        setListOfOptions(votingMethodData.option);
        setIsVotingCondition(votingMethodData.isVotingCondition);
      }
    } else {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ADD_BASIC_INFO}`);
    }
  }, []);
  useEffect(() => {
    if (thresholdValue.value) {
      if (+thresholdValue.value >= 100 || +thresholdValue.value < 0.01) {
        currentValidateStates.allowedBy = {
          type: 'WARN',
          message: L('valueMustBeGreater'),
        };
      } else {
        currentValidateStates.allowedBy = null;
      }
      setValidates(currentValidateStates);
    }
  }, [thresholdValue.value]);

  return (
    <>
      <div className="gap-8 w-full flex flex-col cursor-pointer" onClick={handleChangeVotingMethod}>
        <div className="p-6 flex justify-between items-center border-[1px] border-violet-version-5 rounded-xl">
          <div className="gap-4 text-violet-version-5 flex items-center">
            <NoFlashIcon />
            <p className="text-xl font-semibold">{L('vetoVote')}</p>
          </div>
          <PencilIcon color="#5D23BB" classes="cursor-pointer" />
        </div>
      </div>
      <div className="gap-4 flex flex-col h-full w-full">
        {listOfOptions?.map((option: MethodVoteOptionType, index: number) => (
          <CustomInput
            className="flex flex-col gap-[6px]"
            label={LF('$(0) $(1)', L('option'), String(index + 1))}
            childrenClassName="flex gap-2"
            key={option.id.toString()}
            validate={option.status}
          >
            <Input classes="voting-method-input bg-grey-version-3" value="Veto" disabled />
          </CustomInput>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 justify-start">
          <p className="flex text-xl font-semibold text-grey-version-7">{L('votingResults')}</p>
          <QuestionCircleIcon color="#898988" w="24px" h="24px" />
        </div>
        <div className="flex flex-col w-full">
          <p className="flex text-text_1.5 font-medium text-grey-version-6">{L('countedBy')}</p>
          <CommonSelectBox
            options={countedByOptions}
            defaultValue={
              votingMethodData.countedBy?.id === ''
                ? countedByOptions[0]
                : votingMethodData.countedBy
            }
            onChange={handleCountedBy}
            placeholderClass="text-grey-version-7"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 justify-start">
            <p className="flex text-xl font-semibold text-grey-version-7">{L('votingCondition')}</p>
            <QuestionCircleIcon color="#898988" w="24px" h="24px" />
          </div>
          <Toggle
            className="border-[1px] w-[60px] h-[32px] rounded-[20px]"
            offColorButton="grey-version-3"
            onColorButton="violet-version-5"
            onChange={handleToggleVotingCondition}
            isChecked={isVotingCondition}
          />
        </div>
        {isVotingCondition && renderVotingCondition()}
      </div>
      <div className="w-full gap-6 flex justify-end items-center">
        <Button
          variant="text"
          className="border-1.5 border-grey-version-3 text-[#252422] text-text_3 h-[63px] leading-[25px] tracking-[0.38px] py-5 px-4 w-[168px]"
          onClick={handleGoBack}
        >
          <p>{L('back')}</p>
        </Button>
        <Button
          variant="text"
          className="border-1.5 border-grey-version-3 text-[#252422] text-text_3 h-[63px] leading-[25px] tracking-[0.38px] py-5 px-4 w-[168px]"
          onClick={handleValidates}
        >
          <p>{L('continue')}</p>
        </Button>
      </div>
    </>
  );
};

export default VetoVote;
