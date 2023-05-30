import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '@redux/store';
import { L, LF } from '@utils/locales/L';
import PencilIcon from '@assets/icons/svg-icons/PencilIcon';
import Input from '@components/Input/Input';
import DataIcon from '@assets/icons/svg-icons/DataIcon';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import TrashCan from '@assets/icons/svg-icons/TrashCan';
import Button from '@components/Button/Button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ThumbLikeIcon from '@assets/icons/svg-icons/ThumbLikeIcon';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import {
  addVotingOption,
  setFileDataSource,
  setMethod,
  setThresholdValueResult,
  updateCompletedSteps,
} from '@redux/reducers/proposal.reducer';
import LinkDatasource from '@components/LinkDatasource';
import Modal from '@components/Modal/Modal';
import { MethodVoteOptionType, OptionType, VotingValidateInterface } from 'types/proposal';
import { initValidates } from '@utils/mockData/proposal';
import CustomInput from '../commons/CustomInput';

const defaultListOfOptionsUpVote = [
  {
    id: uuidv4(),
    value: '',
    status: null,
  },
  {
    id: uuidv4(),
    value: '',
    status: null,
  },
];

const Upvote = () => {
  const dispatch = useDispatch();
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);
  const isProgress = useSelector((state: RootState) => state.proposal.isProgress);
  const fileDataSource: any = useSelector((state: RootState) => state.proposal.fileDataSource);

  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = useOutletContext<any>();

  const [listOfOptionsUpVote, setListOfOptionsUpVote] = useState<MethodVoteOptionType[]>(
    votingMethodData.option?.length ? votingMethodData.option : defaultListOfOptionsUpVote,
  );
  const [isModalDatasource, setIsModalDatasource] = useState(false);
  const [thresholdValue, setThresholdValue] = useState({
    id: uuidv4(),
    value: votingMethodData.thresholdValueResult?.value || '',
    status: null,
  });
  const [validates, setValidates] = useState<VotingValidateInterface>(initValidates);
  const currentValidateStates = { ...validates };

  const addANewOption = () => {
    const nextOption = {
      id: uuidv4(),
      value: '',
      status: null,
    };
    if (listOfOptionsUpVote.length <= 100) {
      setListOfOptionsUpVote([...listOfOptionsUpVote, nextOption]);
    }
  };

  const handleInputChangeUpVote = (id: number | string, e: React.ChangeEvent<HTMLInputElement>) => {
    const foundIndexOption = listOfOptionsUpVote.findIndex((option) => option.id === id);
    if (foundIndexOption === -1) return;

    const nextListOfOptions = [...listOfOptionsUpVote];
    nextListOfOptions[foundIndexOption] = {
      ...listOfOptionsUpVote[foundIndexOption],
      value: e.target.value,
    };

    setListOfOptionsUpVote(nextListOfOptions);
  };

  const handleRemoveOption = (id: number | string) => {
    const nextListOption = listOfOptionsUpVote.filter((option) => option.id !== id);
    setListOfOptionsUpVote(nextListOption);
  };

  const handleInputThresholdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mustNumberRegex = /^\d+(\.\d{0,3})?$/;
    const { value } = e.target;
    if (value !== '' && !mustNumberRegex.test(value)) return;
    if (+value > 100 || +value < 0) return;
    setThresholdValue({ ...thresholdValue, value, status: null });
  };

  // const handleValidatesThresholdValue = () => {
  //   const regex = /^-?\d*(\.\d{1,3})?$/;
  //   setThresholdValue(thresholdValue);
  //   if (thresholdValue.value === '') {
  //     return {
  //       id: 3,
  //       value: thresholdValue,
  //       status: {
  //         type: 'WARN',
  //         message: L('This field is required. Please fill in!'),
  //       } as ValidateInterface | null | undefined,
  //     };
  //   }
  //   if (regex.test(thresholdValue)) {
  //     return {
  //       id: 3,
  //       value: thresholdValue,
  //       status: null,
  //     };
  //   }
  //   return {
  //     id: 3,
  //     value: thresholdValue,
  //     status: {
  //       type: 'WARN',
  //       message: L('IntegerOrDecimalNumberWithNoMoreThan3Decimal'),
  //     } as ValidateInterface | null | undefined,
  //   };
  // };

  const handleValidates = () => {
    let hasError = false;
    let check = false;

    const tempValues = new Set();
    const nextListOption = listOfOptionsUpVote.map((option) => {
      const currentOption = { ...option };
      const currentValue = currentOption.value?.trim();
      if (currentValue === '') {
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

    if (thresholdValue.value?.trim() === '') {
      hasError = true;
      setThresholdValue({
        ...thresholdValue,
        status: {
          type: 'WARN',
          message: L('thisFieldIsRequiredPleaseFillIn'),
        } as any,
      });
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
      setListOfOptionsUpVote(nextListOption);
      dispatch(addVotingOption(nextListOption));
      dispatch(setMethod('upVote'));
      dispatch(setThresholdValueResult(thresholdValue));
      dispatch(updateCompletedSteps(currentStep));
      setCurrentStep((prev: number) => prev + 1);
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.DURATION}`);
    } else {
      setListOfOptionsUpVote(nextListOption);
    }
  };

  const handleBorderStatus = (option: OptionType) => {
    if (option?.status?.type === 'WARN') {
      return 'border-yellow-version-5';
    }
    if (option?.status?.type === 'ERROR') {
      return 'border-red-version-5';
    }
    if (option?.status?.type === 'SUCCESS') {
      return 'border-green-version-5';
    }
    return '';
  };

  const isCloseModalDataSource = () => {
    setIsModalDatasource(false);
  };

  const handleUploadDatasource = (datasource: any) => {
    dispatch(setFileDataSource(datasource));
  };
  const handleLoadOptionFromDatasource = (options: any) => {
    let cloneOptions: any = [...options];
    if (options.length > 100) {
      cloneOptions = options.slice(0, 100);
    } else if (options.length < 2) {
      cloneOptions.length = 2;
      cloneOptions.fill('', options.length, 2);
    }

    const nextOption = cloneOptions.map((opt: any) => {
      return {
        id: uuidv4(),
        value: opt,
        status: null,
      };
    });
    setListOfOptionsUpVote(nextOption);
  };

  useEffect(() => {
    if (!isProgress) {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ADD_BASIC_INFO}`);
    }
    dispatch(setMethod('upVote'));
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

  const handleGoBack = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}`);
  };

  const handleChangeVotingMethod = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}`);
  };

  return (
    <>
      <>
        <div
          className="gap-8 w-full flex flex-col cursor-pointer"
          onClick={handleChangeVotingMethod}
        >
          <div className="p-6 flex justify-between items-center border-[1px] border-violet-version-5 rounded-xl">
            <div className="gap-4 text-violet-version-5 flex items-center">
              <ThumbLikeIcon />
              <p className="text-xl font-semibold">{L('upVote')}</p>
            </div>
            <PencilIcon color="#5D23BB" classes="cursor-pointer" />
          </div>
        </div>
        <div className="gap-4 flex flex-col h-full w-full">
          {listOfOptionsUpVote?.map((option: MethodVoteOptionType, index: number) => (
            <CustomInput
              className="flex flex-col gap-[6px]"
              label={LF('$(0) $(1)', L('option'), String(index + 1))}
              childrenClassName="flex gap-2"
              key={option.id.toString()}
              validate={option.status}
            >
              <Input
                classes={`voting-method-input ${handleBorderStatus(option)}`}
                value={option.value}
                placeholder="Placeholder"
                onChange={(e) => handleInputChangeUpVote(option.id, e)}
              />
              {index > 0 && (
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
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-[6px]">
            <p className="text-text_1.5 font-medium text-grey-version-6">
              {L('thresholdCalculatedBy')}
            </p>
            <CustomInput>
              <Input value="Total votes made" classes="w-full" disabled />
            </CustomInput>
          </div>
          <div className="flex flex-col gap-[6px]">
            <CustomInput
              childrenClassName="border-none"
              label="thresholdValueForEachResultVotes"
              validate={thresholdValue.status || validates.allowedBy}
            >
              <input
                type="text"
                className={`input-token-address border-1.5 text-grey-version-6  ${
                  !validates.allowedBy ? '' : 'border-yellow-version-5'
                }  ${handleBorderStatus(thresholdValue)}`}
                value={thresholdValue.value}
                onChange={handleInputThresholdValue}
                placeholder="0"
              />
            </CustomInput>
          </div>
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

export default Upvote;
