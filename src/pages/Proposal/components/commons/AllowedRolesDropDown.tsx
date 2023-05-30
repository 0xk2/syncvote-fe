import React, { useEffect, useState } from 'react';
import { AlertMessage, SelectBoxOption } from 'types/common';
import CommonSelectMultiple from '@components/SelectMultiple';
import { L } from '@utils/locales/L';
import Modal from '@components/Modal/Modal';
import EditMember from '@components/MemberList/EditMember';
import ViewMembers from '@components/MemberList/ViewMembers';
import { IMember, IRole } from 'types/member';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setMembers } from '@redux/reducers/blueprint.reducer';

type Props = {
  className?: string;
  label?: string;
  labelClassName?: string;
  options?: Array<SelectBoxOption> | IRole[];
  isWorkflow?: boolean;
  placeholder?: string;
  disabledInput?: boolean;
  canChooseOnlyOne?: boolean;
  defaultValues?: Array<SelectBoxOption>;
  chosenRoles?: Array<SelectBoxOption>;
  validate?: AlertMessage | null;
  handleDispatchRoles?: (variant: SelectBoxOption) => void;
  onChange?: (values: SelectBoxOption[] | IRole[]) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement> | string) => void;
  handleRemoveRole?: (roleId: string) => void;
  handleRenameRole?: (roleId: string, newName: string) => void;
};

const MODAL_TYPE = {
  ADD_NEW_MEMBER: 'addNewMembers',
  VIEW_MEMBERS: 'viewMembers',
};

const AllowedRolesDropDown = ({
  label,
  labelClassName = '',
  className = '',
  options = [],
  isWorkflow,
  disabledInput = false,
  placeholder = L('chooseAnOption'),
  defaultValues = [],
  chosenRoles = [],
  validate = null,
  canChooseOnlyOne = false,
  onChange = () => {},
  onEnter = () => {},
  handleDispatchRoles,
  handleRemoveRole = () => {},
  handleRenameRole = () => {},
}: Props) => {
  const dispatch = useDispatch();
  const { members } = useSelector((state: RootState) => state.blueprint);

  const [hasMember, setHasMember] = useState(false);
  const [hasOpenAddMemberModal, setHasOpenAddMemberModal] = useState<boolean>(false);
  const [hasRole, setHasRole] = useState(false);
  const [modalType, setModalType] = useState('');
  const [activeRole, setActiveRole] = useState<string>();

  useEffect(() => {
    if (chosenRoles.length > 0) {
      if (!hasRole) setHasRole(true);
    } else if (hasRole) setHasRole(false);
  }, [chosenRoles]);

  let allMembers: IMember[] | any[] = [];
  if (isWorkflow) {
    const chosenRoleIds = chosenRoles.map((role: any) => role.id);
    allMembers = members.filter((member: IMember) => chosenRoleIds.includes(member.roleId));
  } else {
    chosenRoles?.forEach((role: any) => {
      role.member?.forEach((item: any) => {
        allMembers.push({ ...item, roleId: role.id });
      });
    });
  }

  const renderText = () => {
    if (chosenRoles.length === 1) {
      if (allMembers.length > 0) {
        if (!hasMember) {
          setHasMember(true);
        }
        return (
          <span>
            {L('total')}
            &nbsp;
            <span className="text-violet-version-5">{allMembers.length}</span>
            &nbsp;
            {L('membersInThisRole')}
          </span>
        );
      }
      if (hasMember) setHasMember(false);
      return <span>{L('noMemberInThisRole')}</span>;
    }
    if (chosenRoles.length > 1) {
      if (allMembers.length > 0) {
        if (!hasMember) setHasMember(true);
        return (
          <span>
            {L('total')}
            &nbsp;
            <span className="text-violet-version-5">{allMembers.length}</span>
            &nbsp;
            {L('membersInThoseRoles')}
          </span>
        );
      }
      if (hasMember) setHasMember(false);
      return <span>{L('noMemberInThoseRoles')}</span>;
    }
    return '';
  };

  const handleCloseModal = () => {
    setHasOpenAddMemberModal(false);
    setActiveRole(undefined);
  };

  const onOpenModal = (type: string) => {
    setHasOpenAddMemberModal(true);
    setModalType(type);
  };

  const clickOnAddMember = () => {
    setModalType(MODAL_TYPE.ADD_NEW_MEMBER);
  };

  const clickOnViewMembers = () => {
    setModalType(MODAL_TYPE.VIEW_MEMBERS);
  };

  const handleAddMember = (variant: any, roleId?: string | number) => {
    if (handleDispatchRoles) {
      handleDispatchRoles(variant);
      return;
    }

    const listMemberOfOtherRole = members.filter((member: IMember) => member.roleId !== roleId);
    dispatch(setMembers([...listMemberOfOtherRole, ...variant]));
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <CommonSelectMultiple
        options={options}
        validate={validate}
        label={label}
        labelClassName={labelClassName}
        placeholder={placeholder}
        onChange={onChange}
        onEnter={onEnter}
        defaultValues={defaultValues}
        canChooseOnlyOne={canChooseOnlyOne}
        disabledInput={disabledInput}
        handleRemoveRole={handleRemoveRole}
        handleRenameRole={handleRenameRole}
      />
      {hasRole && (
        <div
          className={`h-[54px] flex justify-between ${
            hasMember ? 'bg-violet-version-1' : 'bg-[#FBF4EA]'
          } rounded-8 ${className}`}
        >
          <div className="px-[16px] flex justify-start items-center h-full font-semibold text-[17px] leading-[22px]">
            <p>{renderText()}</p>
          </div>

          <div
            className="px-[16px] flex justify-start items-center h-full font-medium text-[15px] leading-5 text-violet-version-5"
            onClick={() =>
              onOpenModal(hasMember ? MODAL_TYPE.VIEW_MEMBERS : MODAL_TYPE.ADD_NEW_MEMBER)
            }
          >
            <p className="cursor-pointer hover:underline">
              {hasMember ? L('viewMembers') : L('addMembers')}
            </p>
          </div>
        </div>
      )}
      <Modal
        isOpen={hasOpenAddMemberModal}
        onClose={handleCloseModal}
        className="p-[24px] overflow-y-auto"
        // closeClickOverlay={false}
      >
        {modalType === MODAL_TYPE.ADD_NEW_MEMBER && (
          <EditMember
            closeModal={handleCloseModal}
            chosenRoles={chosenRoles || []}
            members={allMembers}
            activeRole={activeRole}
            dispatchRoles={handleAddMember}
            clickOnViewMembers={clickOnViewMembers}
            isWorkflow={isWorkflow}
          />
        )}
        {modalType === MODAL_TYPE.VIEW_MEMBERS && (
          <ViewMembers
            closeModal={handleCloseModal}
            members={allMembers}
            chosenRoles={chosenRoles || []}
            setActiveRole={(roleId: string) => setActiveRole(roleId)}
            activeRole={activeRole}
            clickOnAddMember={clickOnAddMember}
          />
        )}
      </Modal>
    </div>
  );
};

export default AllowedRolesDropDown;
