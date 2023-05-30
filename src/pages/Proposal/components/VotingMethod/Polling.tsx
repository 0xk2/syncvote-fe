import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { L, LF } from '@utils/locales/L';
import SignalIcon from '@assets/icons/svg-icons/SignalIcon';
import PencilIcon from '@assets/icons/svg-icons/PencilIcon';
import Input from '@components/Input/Input';
import DataIcon from '@assets/icons/svg-icons/DataIcon';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import CommonSelectBox from '@components/SelectBox';
import Toggle from '@components/Toggle/Toggle';
import TrashCan from '@assets/icons/svg-icons/TrashCan';
import { AlertMessage, SelectBoxOption } from 'types/common';
import Button from '@components/Button/Button';
import { RootState } from '@redux/store';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import LinkDatasource from '@components/LinkDatasource';
import Modal from '@components/Modal/Modal';
import {
  addVotingOption,
  NumberOfInputResults,
  NumberOfPollingOptions,
  setFileDataSource,
  setMethod,
  setThresholdValueResult,
  updateCompletedSteps,
  updateCountedBy,
  updateNumberOfResults,
  updateThresholdCalculatedBy,
  votingCondition,
} from '@redux/reducers/proposal.reducer';
import {
  COUNTED_BY_ROLES_OPTIONS,
  COUNTED_BY_TOKEN_OPTIONS,
  NUMBER_OF_PARTICIPANTS_OPTIONS,
  NUMBER_OF_RESULTS_OPTIONS,
  NUMBER_OF_TOKENS_USED_TO_VOTE_OPTIONS,
  NUMBER_OF_VOTES_OPTIONS,
} from '@constants/proposal';
import {
  IOptionDataSource,
  MethodVoteOptionType,
  OptionType,
  VotingValidateInterface,
} from 'types/proposal';
import { EVotingMethod } from 'types/enums/votingMethodProposal';
import { initValidates } from '@utils/mockData/proposal';
import CustomInput from '../commons/CustomInput';
import NumberInputResult from '../commons/NumberInputResult';

const defaultListOfOptions = [
  {
    id: 1,
    value: '',
    status: null,
  },
  {
    id: 2,
    value: '',
    status: null,
  },
  {
    id: 3,
    value: '',
    status: null,
  },
];

const Polling = () => {
  const dispatch = useDispatch();
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);
  const fileDataSource: IOptionDataSource = useSelector(
    (state: RootState) => state.proposal.fileDataSource,
  );
  const allowedBy = useSelector((state: RootState) => state?.votingMethod?.allowedBy);
  const isProgress = useSelector((state: RootState) => state.proposal.isProgress);
  const currentCountedBy = useSelector((state: RootState) => state.proposal.votingMethod.countedBy);

  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = useOutletContext<any>();

  const [numberOfOptions, setNumberOfOptions] = useState<string | number>('1');
  const [numberOfResults, setNumberOfResults] = useState<string | number>('1');
  const [isShowNumberOfResults, setIsShowNumberOfResults] = useState<boolean>(false);
  const [listOfOptions, setListOfOptions] = useState<MethodVoteOptionType[]>(defaultListOfOptions);
  const [inputValues, setInputValues] = useState<{ [id: number]: string }>({});
  const [isVotingCondition, setIsVotingCondition] = useState(votingMethodData.isVotingCondition);
  const [countedBy, setCountedBy] = useState('');
  const [thresholdValue, setThresholdValue] = useState({
    id: uuidv4(),
    value: votingMethodData.thresholdValueResult?.value || '',
    status: null,
  });
  const [isModalDatasource, setIsModalDatasource] = useState(false);
  const [validates, setValidates] = useState<VotingValidateInterface>(initValidates);
  const currentValidateStates = { ...validates };

  const currentTokenCountedBy = () => {
    if (currentCountedBy.id === 'numberOfParticipants') {
      return COUNTED_BY_TOKEN_OPTIONS[0];
    }
    if (currentCountedBy.id === 'numberOfTokensUsedToVote') {
      return COUNTED_BY_TOKEN_OPTIONS[1];
    }
    return COUNTED_BY_TOKEN_OPTIONS[0];
  };

  let countedByOptions: SelectBoxOption[] = [];
  if (allowedBy.id === 'roles') {
    countedByOptions = COUNTED_BY_ROLES_OPTIONS;
    dispatch(updateCountedBy(COUNTED_BY_ROLES_OPTIONS[0]));
  } else if (allowedBy.id === 'token') {
    countedByOptions = COUNTED_BY_TOKEN_OPTIONS;
    dispatch(updateCountedBy(currentTokenCountedBy()));
  }

  const handleAddNumberOptions = () => {
    setNumberOfOptions(
      Number(numberOfOptions) >= listOfOptions.length
        ? listOfOptions.length
        : Number(numberOfOptions) + 1,
    );
  };
  const handleSubtractNumberOptions = () => {
    setNumberOfOptions(+numberOfOptions <= 1 ? 1 : +numberOfOptions - 1);
  };

  const handleAddNumberResults = () => {
    setNumberOfResults(
      Number(numberOfResults) >= listOfOptions.length
        ? listOfOptions.length
        : Number(numberOfResults) + 1,
    );
  };

  const handleSubtractNumberResults = () => {
    setNumberOfResults(+numberOfResults <= 1 ? 1 : +numberOfResults - 1);
  };

  const handleShowNumberOfResults = (value: SelectBoxOption | null) => {
    setIsShowNumberOfResults(value?.id === 'custom');
    dispatch(updateNumberOfResults(value));
  };

  const handleNumberLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueResult = e.target.value;
    if (+valueResult <= listOfOptions.length && valueResult !== '0') {
      setNumberOfResults(valueResult);
    }
  };

  const handleNumberOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+value <= listOfOptions.length && value !== '0') {
      setNumberOfOptions(value);
    }
  };

  const handleBlurOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setNumberOfOptions(1);
    }
  };

  const handleBlurInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setNumberOfResults(1);
    }
  };

  const addANewOption = () => {
    const nextId = Date.now();
    const nextOption = {
      id: nextId,
      value: '',
      isLoop: true,
      status: null,
    };
    if (listOfOptions.length <= 100) {
      setListOfOptions([...listOfOptions, nextOption]);
    }
  };

  const handleInputChange = (id: number | string, e: React.ChangeEvent<HTMLInputElement>) => {
    const nextInputValues = { ...inputValues, [id]: e.target.value };
    setInputValues(nextInputValues);

    const nextListOfOptions = listOfOptions.map((option) => {
      if (option.id === id) {
        return { ...option, value: e.target.value };
      }
      return option;
    });

    setListOfOptions(nextListOfOptions);
  };

  const handleRemoveOption = (id: number | string) => {
    const nextListOption = listOfOptions.filter((option) => option.id !== id);
    setListOfOptions(nextListOption);
  };

  const handleValidatesThresholdValue = () => {
    const regex = /^\d*(\.\d{1,3})?$/;

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
    const tempValues = new Set();

    const nextListOption = listOfOptions.map((option) => {
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
      setListOfOptions(nextListOption);
      dispatch(addVotingOption(nextListOption));
      dispatch(NumberOfPollingOptions(numberOfOptions));
      dispatch(NumberOfInputResults(numberOfResults));
      dispatch(setThresholdValueResult(thresholdValueResult));
      dispatch(setMethod('polling'));
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

  const handleToggleVotingCondition = () => {
    setIsVotingCondition(!isVotingCondition);
    dispatch(votingCondition(!isVotingCondition));
  };

  const handleUploadDatasource = (datasource: any) => {
    dispatch(setFileDataSource(datasource));
  };
  const handleLoadOptionFromDatasource = (options: any) => {
    if (options.length === 0 || options.toString() === '') return;

    let cloneOptions: any = [...options];
    if (options.length > 100) {
      cloneOptions = options.slice(0, 100);
    } else if (options.length < 3) {
      cloneOptions.length = 3;
      cloneOptions.fill('', options.length, 3);
    }

    const nextOption = cloneOptions.map((opt: any) => {
      return {
        id: uuidv4(),
        value: opt,
        isLoop: true,
        status: null,
      };
    });
    setListOfOptions(nextOption);
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

  const handleGoBack = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}`);
  };

  const handleChangeVotingMethod = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}`);
  };

  const renderVotingCondition = () => (
    <>
      <NumberInputResult
        handleAddNumberResults={handleAddNumberOptions}
        handleSubtractNumberResults={handleSubtractNumberOptions}
        defaultNumber={numberOfOptions}
        label="numberOfOptionsEachParticipantCanVote"
        plusColor={+numberOfOptions >= listOfOptions.length ? '#E3E3E2' : '#575655'}
        minusColor={+numberOfOptions === 1 ? '#E3E3E2' : '#575655'}
        onChange={handleNumberOptions}
        onBlur={handleBlurOption}
      />
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
            } ${handleBorderStatus(thresholdValue)}`}
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
  useEffect(() => {
    if (isProgress) {
      dispatch(setMethod('polling'));
      if (
        votingMethodData.option.length !== 0 &&
        votingMethodData.method === EVotingMethod.polling
      ) {
        setListOfOptions(votingMethodData.option);
        setThresholdValue(votingMethodData.thresholdValueResult);
        setNumberOfOptions(votingMethodData.numberOfOptions);
        setNumberOfResults(votingMethodData.inputNumberOfResults);
        setIsVotingCondition(votingMethodData.isVotingCondition);
      }
      // handleCountedBy(currentCountedBy);
    } else {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ADD_BASIC_INFO}`);
    }
  }, []);

  const isCloseModalDataSource = () => {
    setIsModalDatasource(false);
  };

  return (
    <>
      <>
        <div
          className="gap-8 w-full flex flex-col cursor-pointer"
          onClick={handleChangeVotingMethod}
        >
          <div className="p-6 flex justify-between items-center border-[1px] border-violet-version-5 rounded-xl">
            <div className="gap-2 text-violet-version-5 flex items-center">
              <SignalIcon />
              <p className="text-xl font-semibold">{L('polling')}</p>
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
              <Input
                classes={`voting-method-input ${handleBorderStatus(option)}`}
                value={inputValues[+option.id] ?? option.value}
                placeholder="Placeholder"
                onChange={(e) => {
                  handleInputChange(option.id, e);
                  thresholdValue.status = null;
                }}
              />
              {index > 2 && (
                <div
                  id={`${option.id}`}
                  className="trash-can-button"
                  onClick={() => handleRemoveOption(option.id)}
                >
                  <TrashCan />
                </div>
              )}
            </CustomInput>
          ))}
          <div className="flex justify-between items-center w-full h-16 gap-3">
            <div className="flex justify-center items-center gap-1 text-violet-version-5 h-full cursor-pointer">
              <DataIcon />
              <div
                className="font-medium text-text_2 hover:underline bg-transparent text-violet-version-5"
                onClick={() => setIsModalDatasource(!isModalDatasource)}
              >
                {L('linkToADatasource')}
              </div>
            </div>
            <div
              className="flex justify-center items-center gap-1 h-full text-violet-version-5 cursor-pointer"
              onClick={addANewOption}
            >
              <PlusIcon />
              <p className="text-text_2 font-medium hover:underline">{L('addANewOption')}</p>
            </div>
          </div>
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
          <div className="flex flex-col w-full">
            <p className="flex text-text_1.5 font-medium text-grey-version-6">
              {L('numberOfResults')}
            </p>
            <CommonSelectBox
              options={NUMBER_OF_RESULTS_OPTIONS}
              defaultValue={votingMethodData.numberOfResults}
              onChange={handleShowNumberOfResults}
              placeholderClass="text-grey-version-7"
            />
          </div>
          {isShowNumberOfResults && (
            <NumberInputResult
              label="inputNumberOfResults"
              defaultNumber={numberOfResults}
              plusColor={+numberOfResults >= listOfOptions.length ? '#E3E3E2' : '#575655'}
              minusColor={+numberOfResults === 1 ? '#E3E3E2' : '#575655'}
              handleAddNumberResults={handleAddNumberResults}
              handleSubtractNumberResults={handleSubtractNumberResults}
              onChange={handleNumberLimit}
              onBlur={handleBlurInputNumber}
            />
          )}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center">
            <div className="flex  items-center gap-2 justify-start">
              <p className="flex text-xl font-semibold text-grey-version-7">
                {L('votingCondition')}
              </p>
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
      </>
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
      {isModalDatasource && (
        <Modal isOpen={isModalDatasource} onClose={isCloseModalDataSource}>
          <LinkDatasource
            setIsModalDatasource={setIsModalDatasource}
            datasource={fileDataSource}
            handleUploadDatasource={handleUploadDatasource}
            handleLoadOptionFromDatasource={handleLoadOptionFromDatasource}
          />
        </Modal>
      )}
    </>
  );
};

export default Polling;
