import { useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';
import PencilIcon from '@assets/icons/svg-icons/PencilIcon';
import CheckCircleIcon from '@assets/icons/svg-icons/CheckCircleIcon';
import Input from '@components/Input/Input';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import CommonSelectBox from '@components/SelectBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { AlertMessage, SelectBoxOption } from 'types/common';
import Toggle from '@components/Toggle/Toggle';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
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
import { v4 as uuidv4 } from 'uuid';
import { EVotingMethod } from 'types/enums/votingMethodProposal';
import { OptionType, VotingValidateInterface } from 'types/proposal';
import { initValidates } from '@utils/mockData/proposal';
import CustomInput from '../commons/CustomInput';

const validateOption = [
  {
    id: 1,
    value: 'Yes',
    status: null,
    isLoop: true,
  },
  {
    id: 2,
    value: 'No',
    status: null,
    isLoop: true,
  },
];

const SingleChoiceVote = () => {
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);

  const [inputValues, setInputValues] = useState<{ [id: number]: string }>({});
  const [countedBy, setCountedBy] = useState('');
  const [listOfOptionsSingleChoice, setListOfOptionsSingleChoice] =
    useState<OptionType[]>(validateOption);
  const [isVotingCondition, setIsVotingCondition] = useState(votingMethodData.isVotingCondition);
  const [thresholdValue, setThresholdValue] = useState({
    id: uuidv4(),
    value: votingMethodData.thresholdValueResult?.value || '',
    status: null,
  });
  const { currentStep, setCurrentStep } = useOutletContext<any>();

  const allowedBy = useSelector((state: RootState) => state?.votingMethod?.allowedBy);
  const isProgress = useSelector((state: RootState) => state.proposal.isProgress);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [validates, setValidates] = useState<VotingValidateInterface>(initValidates);
  const currentValidateStates = { ...validates };

  let countedByOptions: SelectBoxOption[] = [];
  if (allowedBy.id === 'roles') {
    countedByOptions = COUNTED_BY_ROLES_OPTIONS;
  } else if (allowedBy.id === 'token') {
    countedByOptions = COUNTED_BY_TOKEN_OPTIONS;
  }

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

  const handleOnChangeThresholdCalculatedBy = (value: SelectBoxOption | null) => {
    dispatch(updateThresholdCalculatedBy(value));
  };

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

    if (regex.test(thresholdValue.value.toString())) {
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
    const tempValues = new Set();
    const nextListOption = listOfOptionsSingleChoice.map((option) => {
      const currentOption = { ...option };
      const currentValue = currentOption.value?.trim();
      if (!currentValue) {
        hasError = true;
        currentOption.status = {
          type: 'WARN',
          message: L('thisFieldIsRequiredPleaseFillIn'),
        };
      } else if (currentValue.length >= 255) {
        hasError = true;
        currentOption.status = {
          type: 'WARN',
          message: L('maximumInputLengthIs255Characters'),
        };
      } else if (tempValues.has(currentValue)) {
        hasError = true;
        currentOption.status = {
          type: 'WARN',
          message: L('allOptionsNameOfAllVotingMethodsHaveToBeDifferent'),
        };
      } else {
        tempValues.add(currentValue);
        currentOption.status = null;
      }
      return currentOption;
    });

    const thresholdValueResult: any = handleValidatesThresholdValue();
    if (isVotingCondition) {
      setThresholdValue(thresholdValueResult);
      if (thresholdValueResult?.status) {
        hasError = true;
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
    }

    if (!hasError && !check) {
      setListOfOptionsSingleChoice(nextListOption);
      dispatch(addVotingOption(nextListOption));
      dispatch(setThresholdValueResult(thresholdValueResult));
      dispatch(updateCompletedSteps(currentStep));
      setCurrentStep((prev: number) => prev + 1);
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.DURATION}`);
    } else {
      setListOfOptionsSingleChoice(nextListOption);
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

  const handleInputChange = (id: number | string, e: React.ChangeEvent<HTMLInputElement>) => {
    const nextInputValues = { ...inputValues, [id]: e.target.value };
    setInputValues(nextInputValues);

    const nextListOfOptions = listOfOptionsSingleChoice.map((option) => {
      if (option.id === id) {
        return { ...option, value: e.target.value };
      }
      return option;
    });

    setListOfOptionsSingleChoice(nextListOfOptions);
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

  const handleGoBack = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}`);
  };

  const handleChangeVotingMethod = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}`);
  };

  useEffect(() => {
    if (isProgress) {
      dispatch(setMethod('singleChoiceVote'));
      if (
        votingMethodData.option.length !== 0 &&
        votingMethodData.method === EVotingMethod.singleChoice
      ) {
        setListOfOptionsSingleChoice(votingMethodData.option);
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
          <div className="gap-2 text-violet-version-5 flex items-center">
            <CheckCircleIcon color="#5D23BB" />
            <p className="text-xl font-semibold">{L('singleChoiceVote')}</p>
          </div>
          <PencilIcon color="#5D23BB" classes="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <CustomInput
          childrenClassName="border-none"
          label={L('option1')}
          validate={listOfOptionsSingleChoice[0].status}
        >
          <Input
            classes={`w-full ${handleBorderStatus(listOfOptionsSingleChoice[0])}`}
            value={listOfOptionsSingleChoice[0].value}
            onChange={(e) => handleInputChange(listOfOptionsSingleChoice[0].id, e)}
          />
        </CustomInput>
        <CustomInput
          childrenClassName="border-none"
          label={L('option2')}
          validate={listOfOptionsSingleChoice[1].status}
        >
          <Input
            classes={`w-full ${handleBorderStatus(listOfOptionsSingleChoice[1])}`}
            value={listOfOptionsSingleChoice[1].value}
            onChange={(e) => handleInputChange(listOfOptionsSingleChoice[1].id, e)}
          />
        </CustomInput>
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

export default SingleChoiceVote;
