/* eslint-disable max-len */
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import AngleLeftIcon from '@assets/icons/svg-icons/AngleLeftIcon';
import ActionButton from '@components/ActionButton/ActionButton';
import { L } from '@utils/locales/L';
import ParticipantTable from '@pages/Workflow/Participants/components/PartitipantsTable';
import { createRootLink } from '@utils/helpers';

import { IMember } from 'types/member';
import { setMembers } from '@redux/reducers/blueprint.reducer';
import { ECheckpointsType } from 'types/enums/checkpoints';
import { ALLOWED_BY } from '@constants/proposal';
import { workflows } from '@pages/Workflow/EditBlueprintCheckpoint/workflowMockData';
import { RootState } from '@redux/store';

const EditParticipantsDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const typeId: any = id;
  const dispatch = useDispatch();
  const foundWf = workflows.find((item) => item.id === typeId);
  if (!foundWf) {
    return <h2>Not found checkpoint</h2>;
  }
  // let members: any[] = [...membersMockData];
  const { members, roles } = useSelector((state: RootState) => state.blueprint);

  // const roles = [...rolesMockData];

  const { listCheckpoint } = foundWf;

  const [blinkEffect, setBlinkEffect] = useState(false);

  const tableRef = useRef(null);

  const hasTokenHolder = listCheckpoint.some((checkpoint: any) => {
    if ([ECheckpointsType.end, ECheckpointsType.enforcer].includes(checkpoint.type)) return false;
    return checkpoint.config.allowedBy.id === ALLOWED_BY.token;
  });

  const handleDispatchRoles = (listMember: any[], roleId?: string | number) => {
    const listMemberOfOtherRole = members.filter((member: IMember) => member.roleId !== roleId);
    dispatch(setMembers([...listMemberOfOtherRole, ...listMember]));
    // members = [...listMemberOfOtherRole, ...listMember];
  };
  const handleGoBack = () => {
    const { pathname } = location;
    if (pathname.split('/')[1] === 'edit-blueprint') {
      navigate(
        `/${PAGE_ROUTES.EDIT_BLUEPRINT.ROOT}/${PAGE_ROUTES.EDIT_BLUEPRINT.SETUP_CHECKPOINT}/${typeId}`,
      );
    } else {
      navigate(`/${PAGE_ROUTES.WORKFLOW.ROOT}/${PAGE_ROUTES.WORKFLOW.SETUP_CHECKPOINT}`);
    }
  };
  const handleNavigate = () => {
    const { pathname } = location;
    if (members.length === 0) return;
    if (pathname.split('/')[1] === 'edit-blueprint') {
      navigate(
        createRootLink([
          PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
          PAGE_ROUTES.EDIT_BLUEPRINT.REVIEW_CHECKPOINT_TREE,
          typeId,
        ]),
      );
    } else {
      navigate(createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.REVIEW_CP_TREE]));
    }
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
                roles={roles}
                handleDispatchRoles={handleDispatchRoles}
                hasTokenHolder={hasTokenHolder}
              />
            </div>
          </div>
          <ActionButton
            classes="mt-[40px] rounded-8 py-[19px] h-[60px] cursor-pointer"
            disabled={members.length === 0}
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

export default EditParticipantsDetail;
