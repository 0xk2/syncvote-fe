/* eslint-disable max-len */
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';

import AngleLeftIcon from '@assets/icons/svg-icons/AngleLeftIcon';
import ActionButton from '@components/ActionButton/ActionButton';
import { L } from '@utils/locales/L';
import ParticipantTable from '@pages/Workflow/Participants/components/PartitipantsTable';
import { createRootLink } from '@utils/helpers';
import './style.scss';
import { IMember } from 'types/member';
import { setMembers } from '@redux/reducers/blueprint.reducer';
import { ECheckpointsType } from 'types/enums/checkpoints';
import { ALLOW_OPTION } from '@components/CheckpointTree/constants';

const ParticipantsDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { members, roles, listCheckpoint } = useSelector((state: RootState) => state.blueprint);

  const [blinkEffect, setBlinkEffect] = useState(false);

  const tableRef = useRef(null);

  let hasTokenHolder = false;
  let hasRole = false;

  listCheckpoint.forEach((checkpoint) => {
    if ([ECheckpointsType.end, ECheckpointsType.enforcer].includes(checkpoint.type)) return;

    if (checkpoint.config.allowedBy.id === ALLOW_OPTION.TOKEN) {
      hasTokenHolder = true;
      return;
    }
    if (checkpoint.config.allowedBy.id === ALLOW_OPTION.ROLE) {
      hasRole = true;
    }
  });
  // const hasRole = listCheckpoint.some((checkpoint) => {
  //   if ([ECheckpointsType.end, ECheckpointsType.enforcer].includes(checkpoint.type)) return false;
  //   return checkpoint.config.allowedBy.id === ALLOWED_BY.roles;
  // });

  const handleDispatchRoles = (listMember: any[], roleId?: string | number) => {
    const listMemberOfOtherRole = members.filter((member: IMember) => member.roleId !== roleId);
    dispatch(setMembers([...listMemberOfOtherRole, ...listMember]));
  };
  const handleGoBack = () => {
    navigate(`/${PAGE_ROUTES.WORKFLOW.ROOT}/${PAGE_ROUTES.WORKFLOW.SETUP_CHECKPOINT}`);
  };
  const handleNavigate = () => {
    if (members.length === 0 && !hasTokenHolder) return;
    navigate(createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.REVIEW_CP_TREE]));
  };

  useLayoutEffect(() => {
    const current: any = tableRef?.current;
    setBlinkEffect(current?.offsetHeight >= 481);
  }, []);

  return (
    <div className="flex justify-start h-screen w-full mx-[41px]">
      <div className="flex flex-col w-full">
        <div className="breadcrumbs flex items-center pt-4">
          <div className="cursor-pointer">
            <AngleLeftIcon color="#575655" onClick={handleGoBack} />
          </div>
          <span className="text-emph-title-1 ml-4">{L('editingWorkflow')}</span>
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className={`${blinkEffect ? 'participant-wrapper' : ''} w-[622px]`} ref={tableRef}>
            <div className="self-left leading-[41px] tracking-[0.374px] text-emph-large-title mb-8 text-[#252422] ">
              {L('editParticipants')}
            </div>
            <div className="participant-table max-h-[408px] overflow-hidden overflow-y-auto">
              <ParticipantTable
                members={members}
                roles={hasRole ? roles : []}
                handleDispatchRoles={handleDispatchRoles}
                hasTokenHolder={hasTokenHolder}
              />
            </div>
          </div>
          <ActionButton
            classes="mt-[40px] rounded-8 py-[19px] h-[60px] cursor-pointer"
            disabled={members.length === 0 && !hasTokenHolder}
            variant="primary"
            onClick={handleNavigate}
          >
            <p className="text-[17px]">{L('continue').toUpperCase()}</p>
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsDetail;
