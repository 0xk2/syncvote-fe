import React, { useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import CommonSelectBox from '@components/SelectBox';
import { SelectBoxOption } from 'types/common';
import { L } from '@utils/locales/L';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIncompleted,
  setParticipants,
  updateAllowedRoles,
  updateCompletedSteps,
  updateHighestStep,
  updateRolesOption,
} from '@redux/reducers/proposal.reducer';
import { RootState } from '@redux/store';
import { setAllowedBy } from '@redux/reducers/votingMethod.reducer';
import { ALLOWED_BY } from '@constants/proposal';
import { IVotingDetail, VotingValidateInterface } from 'types/proposal';
import SectionWrapper from './commons/SectionWrapper';
import CustomInput from './commons/CustomInput';
import AllowedRolesDropDown from './commons/AllowedRolesDropDown';

const defaultDropdownOptions = [
  {
    id: 'roles',
    label: 'Roles',
  },
  {
    id: 'token',
    label: 'Token',
  },
];

const OptionsTime: SelectBoxOption[] = [
  {
    id: 'hour',
    label: 'HOUR(S)',
    value: 'HOUR',
  },
  {
    id: 'day',
    label: 'DAY(S)',
    value: 'DAY',
  },
  {
    id: 'month',
    label: 'MONTH(S)',
    value: 'MONTH',
  },
];

const initValidates: VotingValidateInterface = {
  allowedBy: null,
  allowedRoles: null,
  tokenAddress: null,
  recipientAddress: null,
  minimumHoldingPeriod: null,
  minimumHoldingQuantity: null,
  executionTimeValidate: null,
  endTimeValidate: null,
  startTimeValidate: null,
};
const Participants = () => {
  const { participants: participantsData, isProgress } = useSelector(
    (state: RootState) => state.proposal,
  );
  const dispatch = useDispatch();

  const { currentStep, setCurrentStep } = useOutletContext<any>();
  const navigate = useNavigate();

  const [votingDetail, setVotingDetail] = useState<IVotingDetail>(participantsData);
  const [validates, setValidates] = useState<VotingValidateInterface>(initValidates);
  const [isToken, setIsToken] = useState<boolean>(votingDetail.allowedBy.id === ALLOWED_BY.token);
  const [addressToken, setAddressToken] = useState(votingDetail.tokenAddress);
  const [roleOptions, setRoleOptions] = useState<SelectBoxOption[]>(
    votingDetail.rolesOptions || [],
  );
  const [inputDate, setInputDate] = useState(votingDetail.minimumHoldingPeriod.value);

  useEffect(() => {
    dispatch(updateRolesOption(roleOptions));
    dispatch(setParticipants(votingDetail));
    dispatch(setAllowedBy(votingDetail.allowedBy));
  }, [votingDetail]);

  useEffect(() => {
    if (isProgress) {
      setCurrentStep(2);
      dispatch(updateHighestStep(2));
      dispatch(setIncompleted(false));
    } else {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ADD_BASIC_INFO}`);
    }
  }, []);

  const mustNumberRegex = /^[0-9]+$/;

  const onAllowedByChange = (value: SelectBoxOption | null) => {
    if (value) {
      setIsToken(value.id === 'token');
      setVotingDetail({ ...votingDetail, allowedBy: value });
      dispatch(setParticipants({ ...participantsData, allowedBy: value }));
    }
  };

  const onAllowedRolesChange = (roles: any[] = []) => {
    if (roles.length > 0) {
      const currentValidateStates = { ...validates, allowedRoles: null };
      setValidates(currentValidateStates);
    }

    setVotingDetail((prevState) => {
      const updatedAllowedRoles = roles.map((value) => {
        const existingRole = prevState.allowedRoles.find((role) => role.id === value.id);
        if (existingRole) {
          return existingRole;
        }
        return {
          id: value.id,
          label: value.label,
          member: value.member || [],
        };
      });
      return {
        ...prevState,
        allowedRoles: updatedAllowedRoles,
      };
    });
  };

  const handleAddNewRole = (value: any) => {
    const currentRoleOptions = [...roleOptions];
    const newRoleOption = {
      id: value,
      label: value,
      member: [],
    };

    const index = currentRoleOptions.findIndex((option) => option.id === newRoleOption.id);
    if (value.trim() && value !== '') {
      if (index === -1) {
        setVotingDetail({
          ...participantsData,
          rolesOptions: [...currentRoleOptions, newRoleOption],
        });
        setRoleOptions([...currentRoleOptions, newRoleOption]);
      }
    }
  };

  const handleRemoveRole = (roleId: string) => {
    const nextRoleOptions = roleOptions.filter((option) => option.id !== roleId);
    const nextAllowedRoles = votingDetail.allowedRoles.filter((role) => role.id !== roleId);

    setRoleOptions(nextRoleOptions);
    setVotingDetail({
      ...votingDetail,
      rolesOptions: nextRoleOptions,
      allowedRoles: nextAllowedRoles,
    });
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
    const nextAllowedRoles = votingDetail.allowedRoles.map((option) => {
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
  };

  const renderAddressToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const currentVotingDetail = { ...participantsData };
    setAddressToken(value);
    setVotingDetail({ ...currentVotingDetail, tokenAddress: value });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && !mustNumberRegex.test(e.target.value)) return;
    setInputDate(e.target.value);
    setVotingDetail({
      ...participantsData,
      minimumHoldingPeriod: {
        ...participantsData.minimumHoldingPeriod,
        value: e.target.value,
      },
    });
  };

  const handleTypePeriod = (value: SelectBoxOption | null) => {
    setVotingDetail({
      ...participantsData,
      minimumHoldingPeriod: {
        ...participantsData.minimumHoldingPeriod,
        type: value,
      },
    });
  };

  const handleChangeMinHolding = (key: string, value: any) => {
    if (value) {
      const updatedValue = key === 'minimumHoldingQuantity' ? value.currentTarget.value : value;
      if (updatedValue !== '' && !mustNumberRegex.test(updatedValue)) return;
      setVotingDetail((prev) => ({ ...prev, [key]: updatedValue }));
      dispatch(
        setParticipants({ ...participantsData, [key]: updatedValue === '' ? '0' : updatedValue }),
      );
    }
  };

  const handleValidateVotingDetail = (detail: IVotingDetail) => {
    const currentValidateStates = { ...validates };
    let check = true;
    if (!isToken) {
      if (!detail.allowedBy) {
        check = false;
        currentValidateStates.allowedBy = {
          type: 'WARN',
          message: L('pleaseSelectThisOption'),
        };
      } else {
        currentValidateStates.allowedBy = null;
      }

      if (detail.allowedRoles.length === 0) {
        check = false;
        currentValidateStates.allowedRoles = {
          type: 'WARN',
          message: L('pleaseSelectThisOption'),
        };
      } else {
        currentValidateStates.allowedRoles = null;
      }
    } else {
      if (detail.tokenAddress.trim().length === 0) {
        check = false;
        currentValidateStates.tokenAddress = {
          type: 'WARN',
          message: L('thisFieldIsRequiredPleaseFillIn'),
        };
      } else {
        currentValidateStates.tokenAddress = null;
      }

      if (
        !Number.isInteger(Number(detail.minimumHoldingQuantity)) ||
        Number(detail.minimumHoldingQuantity) < 0
      ) {
        check = false;
        currentValidateStates.minimumHoldingQuantity = {
          type: 'WARN',
          message: L('thisFieldMustBeAPositiveInteger'),
        };
      } else {
        currentValidateStates.minimumHoldingQuantity = null;
      }
    }

    setValidates(currentValidateStates);
    if (check) {
      dispatch(updateCompletedSteps(currentStep));
      setCurrentStep((prev: number) => prev + 1);
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}`);
    }
  };

  const handleGoBack = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ADD_BASIC_INFO}`);
    setCurrentStep((prev: number) => prev - 1);
  };

  const handleDispatchRoles = (variant: SelectBoxOption) => {
    dispatch(updateAllowedRoles(variant));
  };

  const AllowRoleDropdownComponent = (
    <AllowedRolesDropDown
      options={roleOptions}
      validate={validates.allowedRoles}
      label={L('allowedRoles')}
      labelClassName="font-medium"
      placeholder={L('createNewOrAddAnExistingOne')}
      onChange={(roles: any) => onAllowedRolesChange(roles)}
      onEnter={handleAddNewRole}
      defaultValues={votingDetail.allowedRoles}
      chosenRoles={participantsData.allowedRoles}
      handleDispatchRoles={(variant: SelectBoxOption) => handleDispatchRoles(variant)}
      handleRemoveRole={handleRemoveRole}
      handleRenameRole={handleRenameRole}
    />
  );

  const TokenDetailComponent = (
    <>
      <CustomInput
        label="tokenAddress"
        childrenClassName="input-token-address-container"
        validate={validates.tokenAddress}
      >
        <input
          type="text"
          className="input-token-address text-grey-version-6 "
          value={addressToken}
          placeholder="0x2170ed0880ac9a755fd29b2688956bd959f933f8"
          onChange={renderAddressToken}
        />
        <span className="h-[20px] flex justify-center items-center p-1 rounded-8 bg-violet-version-1 text-violet-version-5 text-[16px] leading-[21px] font-medium">
          $MOCK
        </span>
      </CustomInput>
      <CustomInput label="tokenSymbol">
        <div className="h-[62px] flex items-center p-4">
          <span className="h-[30px] w-[78px] p-1 text-center rounded-8 bg-violet-version-1 text-[16px] leading-[21px] font-medium text-violet-version-5">
            $MOCK
          </span>
        </div>
      </CustomInput>
      <div className="flex flex-col gap-[6px]">
        <p className="text-[15px]">{L('minimumHoldingPeriod')}</p>
        <CustomInput className="relative" childrenClassName="border-none" validate={null}>
          <div
            className={`flex justify-center items-center border-1.5 ${'border-grey-version-3'} rounded-8 h-[57px] p-[16px] w-full`}
          >
            <input
              type="text
              "
              name=""
              id=""
              placeholder="1"
              className="focus:outline-none w-full text-[20px]"
              onChange={onChangeInput}
              value={inputDate}
            />
            <div className="flex items-center justify-center">
              <CommonSelectBox
                borderClassName="static border-none flex justify-between items-center p-0 leading-[30px]"
                iconDropDownClassName="w-[16px] h-[10px]"
                options={OptionsTime}
                placeholder="HOUR(S)"
                defaultValue={votingDetail.minimumHoldingPeriod.type}
                dropDownClassName="w-[211px] left-[calc(100%-211px)]"
                isDefault
                onChange={handleTypePeriod}
              />
            </div>
          </div>
        </CustomInput>
      </div>
      <CustomInput
        label="minimumHoldingQuantity"
        childrenClassName="input-token-address-container"
        validate={null}
      >
        <input
          type="text"
          value={votingDetail.minimumHoldingQuantity}
          placeholder="0"
          className="input-token-address text-grey-version-6"
          onChange={(value) => handleChangeMinHolding('minimumHoldingQuantity', value)}
        />
        <span className="h-full p-1 rounded-8 text-violet-version-5">$MOCK</span>
      </CustomInput>
    </>
  );

  return (
    <SectionWrapper className="flex flex-col gap-32px p-24px mt-32px">
      <div className="flex flex-col gap-16px">
        <h3 className="text-emph-large-title text-grey-version-6">
          {L('setUpVotingParticipants')}
        </h3>
        <span>{L('thisSettingAllowsYouToPassVotingAccessToSpecificTokenHolders')}</span>
      </div>
      <CommonSelectBox
        options={defaultDropdownOptions}
        validate={validates.allowedBy}
        label={L('allowedBy')}
        labelClassName="font-medium"
        defaultValue={votingDetail.allowedBy}
        onChange={onAllowedByChange}
        isDefault
      />
      {isToken ? TokenDetailComponent : AllowRoleDropdownComponent}
      <div className="flex justify-end gap-[24px] items-center w-full">
        <Button
          variant="outline"
          className="border-1.5 border-grey-version-3 text-[#252422] text-text_3 h-[63px] leading-[25px] tracking-[0.38px] py-5 px-4 w-[168px]"
          onClick={handleGoBack}
        >
          <p>{L('back')}</p>
        </Button>
        <Button
          disabled={isToken ? addressToken.length === 0 : votingDetail.allowedRoles.length === 0}
          variant="outline"
          className="border-1.5 border-grey-version-3 text-text_3 h-[63px] leading-[25px] tracking-[0.38px] py-5 px-4 w-[168px]"
          onClick={() => handleValidateVotingDetail(votingDetail)}
        >
          <p>{L('continue')}</p>
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default Participants;
