import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { L } from '@utils/locales/L';
import EditMember from '@components/MemberList/EditMember';
import ViewMembers from '@components/MemberList/ViewMembers';
import Modal from '@components/Modal/Modal';
import { IMember, IRole } from 'types/member';
import { MOCK_TOKEN_NAME } from '@constants/checkpoint';

const MODAL_TYPE = {
  ADD_NEW_MEMBER: 'addNewMembers',
  VIEW_MEMBERS: 'viewMembers',
};

type Props = {
  roles: IRole[];
  hasTokenHolder?: boolean;
  members: IMember[];
  handleDispatchRoles?: (variant: any[], roleId?: string | number) => void;
};

const ParticipantTable: React.FC<Props> = ({
  roles,
  hasTokenHolder,
  members,
  handleDispatchRoles = () => {},
}) => {
  const [modalType, setModalType] = useState('');
  const [hasOpenAddMemberModal, setHasOpenAddMemberModal] = useState<boolean>(false);
  const [activeRole, setActiveRole] = useState<string | number>();
  const onOpenModal = (hasMember: boolean, role: IRole) => {
    setHasOpenAddMemberModal(true);
    setModalType(hasMember ? MODAL_TYPE.VIEW_MEMBERS : MODAL_TYPE.ADD_NEW_MEMBER);
    setActiveRole(role.id);
  };
  const handleCloseModal = () => {
    setHasOpenAddMemberModal(false);
  };

  const clickOnAddMember = () => {
    setModalType(MODAL_TYPE.ADD_NEW_MEMBER);
  };

  const clickOnViewMembers = () => {
    setModalType(MODAL_TYPE.VIEW_MEMBERS);
  };

  return (
    <div>
      <table className="mt-8 text-grey-version-7 w-full text-regular-body">
        <tbody>
          <tr className="border-b border-secondary-color">
            <th className="text-regular-subhead text-left p-4">{L('role')}</th>
            <th className="text-center text-regular-subhead pt-4 pb-4">
              <span className="border-l border-r w-full inline-block">{L('member')}</span>
            </th>
            <th className="text-regular-subhead text-left p-4">{L('action')}</th>
          </tr>
        </tbody>
        {hasTokenHolder && (
          <tbody>
            <tr className="border-b border-secondary-color">
              <td className="p-4 w-[33%]">{`${MOCK_TOKEN_NAME} holders`}</td>
              <td className="text-center p-4 w-[33%]">-</td>
              <td className="p-4 text-violet-primary cursor-pointer w-[33%]">{L('ViewOnScan')}</td>
            </tr>
          </tbody>
        )}
        {!!roles.length &&
          roles.map((role: IRole) => {
            const totalMember = members.filter(
              (member: IMember) => member.roleId === role.id,
            ).length;
            return (
              <tbody key={uuidv4()}>
                <tr className="border-b border-secondary-color">
                  <td className="p-4 w-[33%]">{role.label}</td>
                  <td className="text-center p-4 w-[33%]">
                    {/* {role.isTokenHolder ? '-' : role.totalMember} */}
                    {totalMember}
                  </td>
                  <td>
                    <span
                      className="p-4 text-violet-primary cursor-pointer w-[33%]"
                      onClick={() => onOpenModal(!!totalMember, role)}
                    >
                      {totalMember ? L('viewMembers') : L('addNewMembers')}
                    </span>
                  </td>
                  {/* {role.isTokenHolder ? ( */}
                  {/*  <td className="p-4 text-violet-primary cursor-pointer w-[33%]"> */}
                  {/*    {L('ViewOnScan')} */}
                  {/*  </td> */}
                  {/* ) : */}
                  {/*  ( */}
                  {/*  <td> */}
                  {/*    <span */}
                  {/*      className="p-4 text-violet-primary cursor-pointer w-[33%]" */}
                  {/*      onClick={() => onOpenModal(role)} */}
                  {/*    > */}
                  {/*      {totalMember ? L('viewMembers') : L('addNewMembers')} */}
                  {/*    </span> */}
                  {/*  </td> */}
                  {/* )} */}
                </tr>
              </tbody>
            );
          })}
      </table>
      <Modal
        isOpen={hasOpenAddMemberModal}
        onClose={handleCloseModal}
        className="p-[24px] overflow-y-auto"
        closeClickOverlay
      >
        {modalType === MODAL_TYPE.ADD_NEW_MEMBER && (
          <EditMember
            chosenRoles={roles || []}
            isWorkflow
            activeRole={activeRole?.toString()}
            members={members}
            closeModal={handleCloseModal}
            dispatchRoles={handleDispatchRoles}
            clickOnViewMembers={clickOnViewMembers}
          />
        )}
        {modalType === MODAL_TYPE.VIEW_MEMBERS && (
          <ViewMembers
            closeModal={handleCloseModal}
            members={members}
            chosenRoles={roles || []}
            clickOnAddMember={clickOnAddMember}
            setActiveRole={(roleId: string) => setActiveRole(roleId)}
            activeRole={activeRole}
          />
        )}
      </Modal>
    </div>
  );
};

export default ParticipantTable;
