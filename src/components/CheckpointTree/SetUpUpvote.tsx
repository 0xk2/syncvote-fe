import React, { useState } from 'react';
import UpVoteIcon from '@assets/icons/svg-icons/UpVoteIcon';
import PencilIcon from '@assets/icons/svg-icons/PencilIcon';
import CommonSelectBox from '@components/SelectBox';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import { Tooltip } from 'antd';
import { AlertMessage, SelectBoxOption } from 'types/common';
import { IVotingDetail } from 'types/proposal';
import { L } from '@utils/locales/L';
import { ICheckpointNode } from 'types/checkpoint';
import AllowedRolesDropDown from '@pages/Proposal/components/commons/AllowedRolesDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { IRole } from 'types/member';
import { setRoles } from '@redux/reducers/blueprint.reducer';
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
  thresholdCalculatedBy: {
    id: 'totalVotesMade',
    label: 'Total votes made',
  },
  thresholdValue: {
    id: 'thresholdValue',
    value: '',
    status: null as AlertMessage | null,
  },
  isComplete: false,
};

const SetUpUpvote = ({
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
  const [roleOptions, setRoleOptions] = useState<IRole[]>(roles);
  const [thresholdValue, setThresholdValue] = useState(votingDetail.thresholdValue);
  const [addressToken, setAddressToken] = useState(votingDetail.tokenAddress);
  const [inputDate, setInputDate] = useState(votingDetail.minimumHoldingPeriod.value);
  const mustNumberRegex = /^[0-9]+$/;

  const onAllowedByChange = (value: SelectBoxOption | null) => {
    if (value?.id && value.id !== votingDetail.allowedBy.id) {
      setVotingDetail({
        ...votingDetail,
        allowedBy: value,
        votingCondition: false,
        thresholdCalculatedBy: {},
        thresholdValue: {},
      });
    }
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

  const handleChangeAddressToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressToken(e.target.value);
    const nextDetailVoting = { ...votingDetail, tokenAddress: e.target.value };
    setVotingDetail(nextDetailVoting);
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
      isVotingCondition: false,
      thresholdValue,
      votingDetail,
      listCheckPoints,
      node,
      setListCheckPoints,
      onCloseCheckpoint,
    });
  };

  // useEffect(() => {
  //   const { isCompleted } = handleValidateVotingDetail(votingDetail);

  //   const indexCurrentCp = listCheckPoints.findIndex((cp) => cp.id === node?.id);
  //   if (indexCurrentCp === -1) {
  //     return;
  //   }

  //   const nextListCheckpoint = [...listCheckPoints];
  //   nextListCheckpoint[indexCurrentCp] = {
  //     ...nextListCheckpoint[indexCurrentCp],
  //     config: { ...votingDetail, isComplete: isCompleted },
  //   };

  //   setListCheckPoints(nextListCheckpoint);
  // }, [votingDetail]);

  // useEffect(() => {
  //   const nextDetailVoting = { ...votingDetail, thresholdValue };
  //   setVotingDetail(nextDetailVoting);
  // }, [thresholdValue]);

  return (
    <>
      <div className="flex flex-col gap-[32px] px-[24px]">
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
            <span className="w-[24px] h-[24px]">
              <UpVoteIcon />
            </span>
            <p className="text-xl font-semibold">Upvote</p>
          </div>
          {!isReview && <PencilIcon color="#5D23BB" />}
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[10px] items-center mt-[16px]">
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
          {votingDetail.allowedBy.id === ALLOW_OPTION.ROLE ? AllowRoleDropdown : AllowTokenSection}
        </div>
        <div className="flex flex-col gap-[16px] mb-[16px]">
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
          <div className="flex flex-col gap-[6px]">
            <p className="text-text_1.5 font-medium text-grey-version-6">
              {L('thresholdCalculatedBy')}
            </p>
            <CommonSelectBox
              options={numberOfVotesOptions}
              defaultValue={numberOfVotesOptions[0]}
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

export default SetUpUpvote;
