/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import React, { useState } from 'react';
import PencilIcon from '@assets/icons/svg-icons/PencilIcon';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import SignalIcon from '@assets/icons/svg-icons/SignalIcon';
import CommonSelectBox from '@components/SelectBox';
import { L } from '@utils/locales/L';
import Toggle from '@components/Toggle/Toggle';
import { AlertMessage, SelectBoxOption } from 'types/common';
import { IVotingDetail } from 'types/proposal';
import NumberInputResult from '@pages/Proposal/components/commons/NumberInputResult';
import { ICheckpointNode } from 'types/checkpoint';
import AllowedRolesDropDown from '@pages/Proposal/components/commons/AllowedRolesDropDown';
import { RootState } from '@redux/store';
import { IRole } from 'types/member';
import { setRoles } from '@redux/reducers/blueprint.reducer';
import Button from '@components/Button/Button';
import AllowTokenForm from '@components/CheckpointTree/AllowTokenForm';
import { handleClickSave } from './helper';
import ThresholdInput from './ThresholdInput';
import { ALLOW_OPTION } from './constants';

type Props = {
  node?: ICheckpointNode | null;
  isReview?: boolean;
  listCheckPoints?: ICheckpointNode[];
  onChangeMethod?: () => void;
  onCloseCheckpoint?: () => void;
  setListCheckPoints?: React.Dispatch<React.SetStateAction<ICheckpointNode[] | []>>;
};

const COUNTED_BY_OPTION = {
  PARTICIPANTS: 'numberOfParticipants',
  VOTES: 'numberOfVotes',
  TOKEN: 'numberOfTokensUsedToVote',
};

const countedByRolesOptions = [
  {
    id: COUNTED_BY_OPTION.PARTICIPANTS,
    label: 'Number of participants',
  },
];

const countedByTokenOptions = [
  {
    id: COUNTED_BY_OPTION.VOTES,
    label: 'Number of votes',
  },
  {
    id: COUNTED_BY_OPTION.TOKEN,
    label: 'Number of tokens used to vote',
  },
];

const allowByOptions = [
  {
    id: ALLOW_OPTION.ROLE,
    label: 'Roles',
  },
  {
    id: ALLOW_OPTION.TOKEN,
    label: 'Token',
  },
];

const numberOfParticipantsOptions = [
  {
    id: 'totalRoleAssignedMembers',
    label: 'Total role-assigned members',
  },
  {
    id: 'showUpMember',
    label: 'Show-up member',
  },
];

const numberOfResultsOptions = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'custom',
    label: 'Custom',
  },
];

const numberOfTokensUsedToVoteOptions = [
  {
    id: 'totalCirculatingTokens',
    label: 'Total circulating tokens',
  },
  {
    id: 'showUpTokensUsedToVote',
    label: 'Show-up tokens used to vote',
  },
];

const numberOfVotesOptions = [
  {
    id: 'totalVotesMade',
    label: 'Total votes made',
  },
];

const defaultVotingDetail = {
  allowedBy: {
    id: allowByOptions[0].id,
    label: allowByOptions[0].label,
  },
  allowedRoles: [],
  rolesOptions: [],
  tokenAddress: '',
  minimumHoldingPeriod: {
    value: '',
    type: {
      id: 'hour',
      label: 'HOUR(S)',
      value: 'HOUR',
    },
  },
  minimumHoldingQuantity: {
    id: 'minHoldingQty',
    value: '',
    status: null as AlertMessage | null,
  },
  countedBy: {
    id: countedByRolesOptions[0].id,
    label: countedByRolesOptions[0].label,
  },
  numberOfResults: {
    id: 'all',
    label: 'All',
  },
  inputNumberOfResults: '1',
  votingCondition: false,
  numberOfOptions: '1',
  thresholdCalculatedBy: {
    id: 'totalRoleAssignedMembers',
    label: 'Total role-assigned members',
  },
  thresholdValue: {
    id: 'thresholdValue',
    value: '',
    status: null as AlertMessage | null,
  },
  isComplete: false,
};

const SetUpPolling = ({
  node = null,
  isReview,
  listCheckPoints = [],
  onChangeMethod = () => {},
  onCloseCheckpoint = () => {},
  setListCheckPoints = () => {},
}: Props) => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state: RootState) => state.blueprint);

  const [votingDetail, setVotingDetail] = useState<any>(
    node?.config.allowedBy ? node.config : defaultVotingDetail,
  );
  const isAllowRole = votingDetail.allowedBy.id === ALLOW_OPTION.ROLE;

  const [isShowNumberOfResults, setIsShowNumberOfResults] = useState<boolean>(false);
  const [countedByOptions, setCountedByOptions] = useState<SelectBoxOption[]>(
    isAllowRole ? countedByRolesOptions : countedByTokenOptions,
  );
  const [countedBy, setCountedBy] = useState(votingDetail.countedBy);
  const [isVotingCondition, setIsVotingCondition] = useState(votingDetail.votingCondition);
  const [thresholdValue, setThresholdValue] = useState(
    votingDetail.thresholdValue || {
      type: 'WARN',
      message: L('thisFieldIsRequiredPleaseFillIn'),
    },
  );
  const [addressToken, setAddressToken] = useState(votingDetail.tokenAddress);
  const [numberOfResults, setNumberOfResults] = useState<number>(votingDetail.inputNumberOfResults);
  const [roleOptions, setRoleOptions] = useState<IRole[]>(roles);
  const [inputDate, setInputDate] = useState(votingDetail.minimumHoldingPeriod.value);

  const mustNumberRegex = /^[0-9]+$/;

  const onAllowedByChange = (value: SelectBoxOption | null) => {
    if (isReview) return;
    if (value?.id && value.id !== votingDetail.allowedBy.id) {
      let nextCountedBy;
      if (value.id === ALLOW_OPTION.ROLE) {
        setCountedByOptions(countedByRolesOptions);
        nextCountedBy = { ...countedByRolesOptions[0] };
      } else if (value.id === ALLOW_OPTION.TOKEN) {
        setCountedByOptions(countedByTokenOptions);
        nextCountedBy = { ...countedByTokenOptions[0] };
      }

      setIsVotingCondition(false);
      setVotingDetail({
        ...votingDetail,
        allowedBy: value,
        countedBy: nextCountedBy,
        votingCondition: false,
        thresholdCalculatedBy: {},
        thresholdValue: {},
      });
    }
  };

  const handleInputNumber = (valueResult: string, fieldName: string, setState: Function) => {
    const regex = /^([1-9][0-9]{0,1}|100)$/;
    if (!(valueResult === '' || regex.test(valueResult))) return;
    setState(valueResult);
    if (+valueResult <= 100 && +valueResult > 0) {
      setVotingDetail({ ...votingDetail, [fieldName]: valueResult });
    }
  };
  const handleBlurInputNumber = (value: string, fieldName: string, setState: Function) => {
    const nextNumberOfResult = Math.max(+value, 1);
    setState(nextNumberOfResult);
    setVotingDetail({ ...votingDetail, [fieldName]: nextNumberOfResult });
  };
  const handleIncreaseOrDecreaseInput = (
    isIncrease: boolean,
    fieldName: string,
    setState: Function,
    oldValue: number,
  ) => {
    if (isReview) return;
    if (isIncrease) {
      if (oldValue >= 100) return;
      setState((pre: string | number) => (pre ? +pre + 1 : 2));
      setVotingDetail((pre: { [key: string]: number }) => ({
        ...pre,
        [fieldName]: pre[fieldName] + 1,
      }));
      return;
    }

    // decrease input
    if (!oldValue || oldValue <= 1) {
      return;
    }
    setState((pre: number) => pre - 1);
    setVotingDetail((pre: { [key: string]: number }) => ({
      ...pre,
      inputNumberOfResults: pre[fieldName] - 1,
    }));
  };

  const handleAddValue = (value: any) => {
    const currentRoleOptions = [...roleOptions];
    const newRoleOption = {
      id: value,
      label: value,
    };

    const index = currentRoleOptions.findIndex((option) => option.id === newRoleOption.id);
    if (value.trim() && value !== '') {
      if (index === -1) {
        setRoleOptions([...currentRoleOptions, newRoleOption]);
        dispatch(setRoles([...currentRoleOptions, newRoleOption]));
        // setVotingDetail({ ...votingDetail, rolesOptions: [...currentRoleOptions, newRoleOption] });
      }
    }
    return newRoleOption;
  };
  const onAllowedRolesChange = (values: any[] = []) => {
    setVotingDetail((prevState: any) => {
      return {
        ...prevState,
        allowedRoles: values,
      };
    });
  };

  const handleChangeMinHolding = (key: string, value: any) => {
    if (value) {
      const updatedValue = key === 'minimumHoldingQuantity' ? value.currentTarget.value : value;
      setVotingDetail((prev: IVotingDetail) => ({
        ...prev,
        [key]: {
          value: updatedValue,
        },
      }));
    }
  };

  const handleCountedBy = (value: SelectBoxOption | null) => {
    setCountedBy(value);
    setVotingDetail({
      ...votingDetail,
      countedBy: value,
    });
  };

  const onChangeTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && !mustNumberRegex.test(e.target.value)) return;
    setInputDate(e.target.value);
    setVotingDetail({
      ...votingDetail,
      minimumHoldingPeriod: {
        ...votingDetail.minimumHoldingPeriod,
        value: e.target.value,
      },
    });
  };

  const handleTypePeriod = (value: SelectBoxOption | null) => {
    setVotingDetail({
      ...votingDetail,
      minimumHoldingPeriod: {
        ...votingDetail.minimumHoldingPeriod,
        type: value,
      },
    });
  };

  const handleToggleVotingCondition = () => {
    setIsVotingCondition(!isVotingCondition);
    setVotingDetail({
      ...votingDetail,
      votingCondition: !isVotingCondition,
    });
  };

  const handleThresholdCalculatedByOptions = (): SelectBoxOption[] => {
    if (countedBy?.id === COUNTED_BY_OPTION.PARTICIPANTS) {
      return numberOfParticipantsOptions;
    }
    if (countedBy?.id === COUNTED_BY_OPTION.TOKEN) {
      return numberOfTokensUsedToVoteOptions;
    }
    return numberOfVotesOptions;
  };

  const handleChangeAddressToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressToken(e.target.value);
    const nextDetailVoting = { ...votingDetail, tokenAddress: e.target.value };
    setVotingDetail(nextDetailVoting);
  };

  const handleShowNumberOfResults = (value: SelectBoxOption | null) => {
    setIsShowNumberOfResults(value?.id === 'custom');
    const nextDetailVoting = { ...votingDetail, numberOfResults: value };
    setVotingDetail(nextDetailVoting);
  };

  const changeThresholdCalculatedBy = (value: SelectBoxOption | null) => {
    if (value) {
      const nextDetailVoting = { ...votingDetail, thresholdCalculatedBy: value };
      setVotingDetail(nextDetailVoting);
    } else {
      const nextDetailVoting = {
        ...votingDetail,
        thresholdCalculatedBy: {
          id: '',
          label: '',
        },
      };
      setVotingDetail(nextDetailVoting);
    }
  };

  const renderVotingCondition = () => (
    <>
      <div className="flex flex-col gap-[6px]">
        <p className="text-text_1.5 font-medium text-grey-version-6">
          {L('thresholdCalculatedBy')}
        </p>
        <CommonSelectBox
          options={handleThresholdCalculatedByOptions()}
          defaultValue={
            votingDetail.thresholdCalculatedBy?.id
              ? votingDetail.thresholdCalculatedBy
              : handleThresholdCalculatedByOptions()[0]
          }
          placeholderClass="text-grey-version-7"
          onChange={changeThresholdCalculatedBy}
        />
      </div>
      <div className="flex flex-col gap-[6px]">
        <ThresholdInput
          thresholdDetail={{
            thresholdValue,
            votingDetail,
            setThresholdValue,
            setVotingDetail,
            isReview,
          }}
        />
      </div>
    </>
  );

  const handleOnSave = () => {
    handleClickSave({
      isVotingCondition,
      thresholdValue,
      votingDetail,
      listCheckPoints,
      node,
      setListCheckPoints,
      onCloseCheckpoint,
    });
  };

  const handleRemoveRole = (roleId: string) => {
    const nextRoleOptions = roleOptions.filter((option) => option.id !== roleId);
    const nextAllowedRoles = votingDetail.allowedRoles.filter((role: IRole) => role.id !== roleId);

    setVotingDetail({
      ...votingDetail,
      rolesOptions: nextRoleOptions,
      allowedRoles: nextAllowedRoles,
    });
    setRoleOptions(nextRoleOptions);
    dispatch(setRoles(nextRoleOptions));
  };

  const handleRenameRole = (roleId: string, value: string) => {
    const nextRoleOptions = roleOptions.map((option) => {
      if (option.id === roleId) {
        return {
          ...option,
          label: value,
        };
      }
      return option;
    });

    const nextAllowedRoles = votingDetail.allowedRoles.map((option: IRole) => {
      if (option.id === roleId) {
        return {
          ...option,
          label: value,
        };
      }
      return option;
    });
    setRoleOptions(nextRoleOptions);
    setVotingDetail({
      ...votingDetail,
      rolesOptions: nextRoleOptions,
      allowedRoles: nextAllowedRoles,
    });
    dispatch(setRoles(nextRoleOptions));
  };

  return (
    <>
      <div className="flex flex-col gap-[32px] px-[24px] mb-[122px]">
        <div
          className={`p-6 flex justify-between items-center border-[1px] rounded-xl ${
            isReview
              ? 'border-grey-version-7 cursor-default'
              : 'border-violet-version-5 cursor-pointer'
          }`}
          onClick={() => {
            if (isReview) return;
            onChangeMethod();
          }}
        >
          <div
            className={`gap-2 ${
              isReview ? 'text-grey-version-7' : 'text-violet-version-5'
            } flex items-center`}
          >
            <SignalIcon />
            <p className="text-xl font-semibold">{L('polling')}</p>
          </div>
          {!isReview && <PencilIcon color="#5D23BB" />}
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[10px] items-center">
            <span className="font-[600] text-[20px] tracking-[0.38px] text-[#252422]">
              Voting participants
            </span>
          </div>
          <div className="flex flex-col w-full">
            <p className="flex text-text_1.5 font-medium text-grey-version-6">Allowed by</p>
            <CommonSelectBox
              options={allowByOptions}
              defaultValue={votingDetail.allowedBy}
              placeholder="Allowed by"
              placeholderClass="text-grey-version-7"
              onChange={onAllowedByChange}
            />
          </div>
          {votingDetail.allowedBy.id === ALLOW_OPTION.ROLE ? (
            <AllowedRolesDropDown
              options={roleOptions}
              label={L('allowedRoles')}
              labelClassName="font-medium"
              className={`${!votingDetail.allowedRoles?.length && 'border-yellow-version-5'}`}
              isWorkflow
              placeholder={L('createNewOrAddAnExistingOne')}
              onChange={(value: any) => onAllowedRolesChange(value)}
              onEnter={handleAddValue}
              validate={
                votingDetail.allowedRoles?.length
                  ? null
                  : {
                      type: 'WARN',
                      message: L('thisFieldIsRequiredPleaseFillIn'),
                    }
              }
              defaultValues={votingDetail.allowedRoles || []}
              chosenRoles={votingDetail.allowedRoles || []}
              handleRemoveRole={handleRemoveRole}
              handleRenameRole={handleRenameRole}
            />
          ) : (
            <AllowTokenForm
              addressToken={addressToken}
              inputDate={inputDate}
              votingDetail={votingDetail}
              handleChangeMinHolding={handleChangeMinHolding}
              handleTypePeriod={handleTypePeriod}
              onChangeTimeInput={onChangeTimeInput}
              handleChangeAddressToken={handleChangeAddressToken}
            />
          )}
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[10px] items-center">
            <span className="font-[600] text-[20px] tracking-[0.38px] text-[#252422]">
              Voting results
            </span>
            <Tooltip placement="right" title="Some text here">
              <span className="cursor-pointer">
                <QuestionCircleIcon color="#898988" w="24px" h="24px" />
              </span>
            </Tooltip>
          </div>
          <div className="flex flex-col w-full">
            <p className="flex text-text_1.5 font-medium text-grey-version-6">{L('countedBy')}</p>
            <CommonSelectBox
              options={countedByOptions}
              defaultValue={votingDetail.countedBy}
              onChange={handleCountedBy}
              placeholderClass="text-grey-version-7"
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="flex text-text_1.5 font-medium text-grey-version-6">
              {L('numberOfResults')}
            </p>
            <CommonSelectBox
              options={numberOfResultsOptions}
              defaultValue={votingDetail.numberOfResults}
              onChange={handleShowNumberOfResults}
              placeholderClass="text-grey-version-7"
            />
          </div>
          {isShowNumberOfResults && (
            <NumberInputResult
              label="inputNumberOfResults"
              plusColor={numberOfResults >= 100 ? '#E3E3E2' : '#575655'}
              minusColor={!numberOfResults || +numberOfResults === 1 ? '#E3E3E2' : '#575655'}
              defaultNumber={numberOfResults ?? votingDetail.inputNumberOfResults ?? 1}
              handleAddNumberResults={() =>
                handleIncreaseOrDecreaseInput(
                  true,
                  'inputNumberOfResults',
                  setNumberOfResults,
                  numberOfResults,
                )
              }
              handleSubtractNumberResults={() =>
                handleIncreaseOrDecreaseInput(
                  false,
                  'inputNumberOfResults',
                  setNumberOfResults,
                  numberOfResults,
                )
              }
              onChange={(e) =>
                handleInputNumber(e.target.value, 'inputNumberOfResults', setNumberOfResults)
              }
              onBlur={(e) =>
                handleBlurInputNumber(e.target.value, 'inputNumberOfResults', setNumberOfResults)
              }
            />
          )}
        </div>
        <div className="flex flex-col gap-[16px] relative">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 justify-start">
                <p className="flex text-xl font-semibold text-[#252422]">{L('votingCondition')}</p>
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
        </div>
      </div>
      <div className="mt-[12px] py-[27px] border-t-[1px] border-grey-version-3 px-[23px]  flex justify-end bg-white absolute bottom-0 right-0 w-full">
        <div className="gap-[16px] w-[178px] h-[46px] flex justify-between">
          <Button
            className="w-[90px] rounded-8 py-[12px] px-[16px] border-[1px] border-grey-version-3 hover:bg-grey-version-3"
            variant="secondary"
            onClick={onCloseCheckpoint}
          >
            <p className="font-medium text-[17px] leading-[22px]">{L('cancel')}</p>
          </Button>
          <Button className="w-[72px] rounded-8 py-[12px] px-[16px]" onClick={handleOnSave}>
            <p className="font-medium text-[17px] leading-[22px]">{L('Save')}</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SetUpPolling;
