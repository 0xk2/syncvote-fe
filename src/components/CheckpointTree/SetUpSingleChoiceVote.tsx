/* eslint-disable max-len */
import PencilIcon from '@assets/icons/svg-icons/PencilIcon';
import CommonSelectBox from '@components/SelectBox';
import React, { useState } from 'react';
import { L } from '@utils/locales/L';
import { Tooltip } from 'antd';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import Toggle from '@components/Toggle/Toggle';
import CustomInput from '@pages/Proposal/components/commons/CustomInput';
import Input from '@components/Input/Input';
import { IVotingDetail, OptionBlueprintType } from 'types/proposal';
import { AlertMessage, SelectBoxOption } from 'types/common';
import CheckCircleIcon from '@assets/icons/svg-icons/CheckCircleIcon';
import WarningIcon from '@assets/icons/svg-icons/WarningIcon';
import { ICheckpointNode } from 'types/checkpoint';
import AllowedRolesDropDown from '@pages/Proposal/components/commons/AllowedRolesDropDown';
import { setRoles } from '@redux/reducers/blueprint.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { IRole } from 'types/member';
import Button from '@components/Button/Button';
import AllowTokenForm from '@components/CheckpointTree/AllowTokenForm';
import ThresholdInput from './ThresholdInput';
import { handleClickSave } from './helper';
import { ALLOW_OPTION } from './constants';

type Props = {
  node?: ICheckpointNode | null;
  isReview?: boolean;
  listCheckPoints?: ICheckpointNode[];
  onChangeMethod?: () => void;
  onCloseCheckpoint?: () => void;
  setListCheckPoints?: React.Dispatch<React.SetStateAction<ICheckpointNode[] | []>>;
};

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
  listOfOptions: [
    {
      id: 1,
      value: 'YES',
      status: null,
      isLoop: true,
    },
    {
      id: 2,
      value: 'NO',
      status: null,
      isLoop: true,
    },
    {
      id: 3,
      value: '0',
      status: null,
      isLoop: false,
    },
  ],
  allowedBy: {
    ...allowByOptions[0],
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
    ...countedByRolesOptions[0],
  },
  votingCondition: false,
  thresholdCalculatedBy: {
    ...numberOfParticipantsOptions[0],
  },
  thresholdValue: {
    id: 'thresholdValue',
    value: '',
    status: null as AlertMessage | null,
  },
  isComplete: false,
};

const SetUpSingleChoiceVote = ({
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

  const [listOfOptions, setListOfOptions] = useState<OptionBlueprintType[]>(
    votingDetail.listOfOptions || defaultVotingDetail.listOfOptions,
  );
  const [inputValues, setInputValues] = useState<{ [id: number]: string }>({});
  const [countedByOptions, setCountedByOptions] = useState<SelectBoxOption[]>(
    isAllowRole ? countedByRolesOptions : countedByTokenOptions,
  );
  const [roleOptions, setRoleOptions] = useState<IRole[]>(roles);
  const [countedBy, setCountedBy] = useState('');
  const [isVotingCondition, setIsVotingCondition] = useState(votingDetail.votingCondition);
  const [thresholdValue, setThresholdValue] = useState(votingDetail.thresholdValue);
  const [addressToken, setAddressToken] = useState(votingDetail.tokenAddress);
  const [inputDate, setInputDate] = useState(votingDetail.minimumHoldingPeriod.value);
  const mustNumberRegex = /^[0-9]+$/;

  const onAllowedByChange = (value: SelectBoxOption | null) => {
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

  const handleChangeAddressToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressToken(e.target.value);
    const nextDetailVoting = { ...votingDetail, tokenAddress: e.target.value };
    setVotingDetail(nextDetailVoting);
  };

  const handleInputChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const nextInputValues = { ...inputValues, [id]: e.target.value };
    setInputValues(nextInputValues);

    const nextListOfOptions = listOfOptions.map((option) => {
      if (option.id === id) {
        return { ...option, value: nextInputValues[id] };
      }
      return option;
    });

    setListOfOptions(nextListOfOptions);
    setVotingDetail({ ...votingDetail, listOfOptions: nextListOfOptions });
  };

  const handleToggleVotingCondition = () => {
    // setAllowCondition(!allowCondition);
    setIsVotingCondition(!isVotingCondition);
    const nextDetailVoting = { ...votingDetail, votingCondition: !isVotingCondition };
    setVotingDetail(nextDetailVoting);
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

  const handleThresholdCalculatedByOptions = () => {
    if (countedBy === 'numberOfParticipants') {
      return numberOfParticipantsOptions;
    }
    if (countedBy === 'numberOfTokensUsedToVote') {
      return numberOfTokensUsedToVoteOptions;
    }
    if (countedBy === 'numberOfVotes') {
      return numberOfVotesOptions;
    }
    return '';
  };

  const handleCountedBy = (value: SelectBoxOption | null) => {
    if (value?.id.toString() === 'numberOfParticipants') {
      setCountedBy('numberOfParticipants');
      setVotingDetail({
        ...votingDetail,
        countedBy: countedByRolesOptions[0],
      });
    } else if (value?.id.toString() === 'numberOfVotes') {
      setCountedBy('numberOfVotes');
      setVotingDetail({
        ...votingDetail,
        countedBy: countedByTokenOptions[0],
      });
    } else if (value?.id.toString() === 'numberOfTokensUsedToVote') {
      setCountedBy('numberOfTokensUsedToVote');
      setVotingDetail({
        ...votingDetail,
        countedBy: countedByTokenOptions[1],
      });
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const AllowRoleDropdown = (
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
  );

  const renderVotingCondition = () => (
    <>
      <div className="flex flex-col gap-[6px]">
        <p className="text-text_1.5 font-medium text-grey-version-6">
          {L('thresholdCalculatedBy')}
        </p>
        <CommonSelectBox
          options={handleThresholdCalculatedByOptions() as SelectBoxOption[]}
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

  const AllowTokenSection = (
    <AllowTokenForm
      addressToken={addressToken}
      inputDate={inputDate}
      votingDetail={votingDetail}
      handleChangeMinHolding={handleChangeMinHolding}
      handleTypePeriod={handleTypePeriod}
      onChangeTimeInput={onChangeInput}
      handleChangeAddressToken={handleChangeAddressToken}
    />
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
            <CheckCircleIcon color={isReview ? '#252422' : '#5D23BB'} />
            <p className="text-xl font-semibold">Single choice vote</p>
          </div>
          {!isReview && <PencilIcon color="#5D23BB" />}
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col justify-center gap-4">
            <CustomInput
              childrenClassName="border-none"
              label={L('option1')}
              validate={listOfOptions[0]?.status}
            >
              <Input
                classes={`w-full ${listOfOptions[0].value ? '' : 'border-yellow-version-5'} ${
                  isReview ? 'bg-transparent' : ''
                }`}
                value={listOfOptions[0].value}
                onChange={(e) => handleInputChange(+listOfOptions[0].id, e)}
                disabled={isReview}
              />
              {!listOfOptions[0].value && (
                <div className="flex items-center pt-2 gap-8px">
                  <WarningIcon />
                  <span className="w-full text-emph-caption-1 text-grey-version-5">
                    {L('pleaseChoiceYourOption')}
                  </span>
                </div>
              )}
            </CustomInput>
            <CustomInput
              childrenClassName="border-none"
              label={L('option2')}
              validate={listOfOptions[1]?.status}
            >
              <Input
                classes={`w-full ${listOfOptions[1].value ? '' : 'border-yellow-version-5'} ${
                  isReview ? 'bg-transparent' : ''
                }`}
                value={listOfOptions[1].value}
                onChange={(e) => handleInputChange(+listOfOptions[1].id, e)}
                disabled={isReview}
              />
              {!listOfOptions[1].value && (
                <div className="flex items-center pt-2 gap-8px">
                  <WarningIcon />
                  <span className="w-full text-emph-caption-1 text-grey-version-5">
                    {L('pleaseChoiceYourOption')}
                  </span>
                </div>
              )}
            </CustomInput>
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="font-[600] text-[20px] tracking-[0.38px] text-[#252422]">
              Voting participants
            </span>
          </div>
          <div className="flex flex-col w-full gap-[6px]">
            <p className="flex text-text_1.5 font-medium text-grey-version-6">Allowed by</p>
            <CommonSelectBox
              options={allowByOptions}
              defaultValue={votingDetail.allowedBy}
              placeholder="Allowed by"
              placeholderClass="text-grey-version-7"
              onChange={onAllowedByChange}
            />
          </div>
          {votingDetail.allowedBy.id === ALLOW_OPTION.ROLE ? AllowRoleDropdown : AllowTokenSection}
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
          <div className="flex flex-col w-full gap-[6px]">
            <p className="flex text-text_1.5 font-medium text-grey-version-6">{L('countedBy')}</p>
            <CommonSelectBox
              options={countedByOptions}
              defaultValue={votingDetail.countedBy}
              onChange={handleCountedBy}
              placeholderClass="text-grey-version-7"
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 justify-start">
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
          </div>
        </div>
      </div>
      <div className="mt-[12px] py-[27px] border-t-[1px] border-grey-version-3 px-[23px] bg-white flex justify-end absolute bottom-0 right-0 w-full">
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

export default SetUpSingleChoiceVote;
