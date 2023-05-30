/* eslint-disable max-len */
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import SpenIcon from '@assets/icons/svg-icons/SpenIcon';
import { L } from '@utils/locales/L';
import Modal from '@components/Modal/Modal';
import { useState } from 'react';
import ViewMembers from '@components/MemberList/ViewMembers';
import { useNavigate } from 'react-router-dom';
import { createRootLink } from '@utils/helpers';
import PAGE_ROUTES from '@utils/constants/pageRoutes';

type Props = {
  iconProps?: any;
  titleProps?: string;
  nameProps?: string | undefined;
  dataParticipants?: any;
  dataVotingCondition?: any;
  dataVotingResult?: any;
  wfId?: number | string;
  memberId?: any;
  rolesOptions?: any;
};

const ContentDrawerTemplate = ({
  iconProps,
  titleProps,
  nameProps,
  dataParticipants,
  dataVotingCondition,
  dataVotingResult,
  wfId,
  memberId,
  rolesOptions,
}: Props) => {
  const [isOpenViewMember, setIsOpenViewMember] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(
      createRootLink([
        PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
        PAGE_ROUTES.EDIT_BLUEPRINT.SETUP_CHECKPOINT,
        wfId?.toString() || '',
      ]),
    );
  };
  const handleCloseModalViewMember = () => {
    setIsOpenViewMember(false);
  };
  const role = rolesOptions?.map((role: any) => role.allowedRoles.type);
  return (
    <div className="m-6">
      <div className="flex gap-[10.32px] ">
        <div className="text-[#898988] w-[24px]">{iconProps}</div>
        <div className="text-[#898988] text-[20px] leading-[25px] tracking-[0.38px] font-semibold">
          <span>{titleProps}</span>
        </div>
      </div>
      <div className="flex justify-between pt-[23px]">
        <div className="text-[28px] leading-[34px] tracking-[0.364px] text-[#252422] font-semibold">
          <span>{nameProps}</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={handleNavigate}>
          <div>
            <SpenIcon />
          </div>
          <div className="text-[17px] leading-[22px] tracking-0.5px text-[#5D23BB]">
            <span>Edit in workflow</span>
          </div>
        </div>
      </div>

      <div className="pt-[47px]">
        <div className="text-[20px] leading-[25px] tracking-[0.38px] text-[#252422] font-semibold">
          <span>Voting participants</span>
        </div>
        {dataParticipants[0].value === 'Token' ? (
          <div>
            <div className="mt-[30px] border border-[#E3E3E2] rounded-8 py-[24px]">
              {dataParticipants.map((participant: any) => (
                <div className="flex justify-between px-[16px] py-[12px]" key={participant.id}>
                  <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] ">
                    <span>{participant.title}</span>
                  </div>
                  <div className=" text-[15px] leading-[20px] tracking-[0.6px] text-[#252422] flex gap-2 ">
                    {participant.id === '1' && (
                      <div>
                        <span>{participant.value}</span>
                      </div>
                    )}
                    {participant.id === '3' && (
                      <div>
                        <span>
                          {participant.value} {participant.type.value}
                        </span>
                      </div>
                    )}
                    {(participant.id === '2' || participant.id === '4') && (
                      <>
                        <div className="w-[150px] truncate flex justify-end">
                          <span className="truncate">{participant.value}</span>
                        </div>
                        <div className="text-[#5D23BB] w-[78px] text-[16px] flex justify-center leading-[21px] rounded-8 bg-[#EFE9F8] h-[20px]">
                          <span>{L('eTH')}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="gap-4 my-2 w-full border flex flex-col rounded-xl py-[24px] px-[16px] mt-[24px]">
              {dataParticipants.map((role: any) => (
                <div key={role.id} className=" flex justify-between items-center ">
                  <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                    <span>{role.title}</span>
                  </div>
                  <div className="text-[15px] leading-[20px] font-semibold tracking-[0.6px] text-[#252422]">
                    {role.id === '1' && (
                      <div>
                        <span>{role.value}</span>
                      </div>
                    )}
                    {role.id === '2' && (
                      <div className="flex gap-2 font-medium text-[#5D23BB] text-[13px]">
                        <div className="border rounded-8 bg-[#EFE9F8]">
                          <span className="p-2">{role.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div
                className="flex justify-end cursor-pointer"
                onClick={() => setIsOpenViewMember(true)}
              >
                <p className="text-[#5D23BB] text-[15px] leading-[20px] tracking-[0.6px]">
                  {L('viewMemberList')}
                </p>
              </div>
            </div>
            <Modal onClose={handleCloseModalViewMember} isOpen={isOpenViewMember}>
              <ViewMembers
                closeModal={handleCloseModalViewMember}
                members={memberId}
                chosenRoles={role[0]}
                isReviewMode
              />
            </Modal>
          </div>
        )}
      </div>
      <div>
        <div className="pt-[32px] flex items-center gap-2">
          <div>
            <p className="text-[#252422] font-semibold text-[20px] leading-[25px] tracking-one">
              {L('votingResults')}
            </p>
          </div>
          <div>
            <QuestionCircleIcon w="24px" h="24px" color="#898988" />
          </div>
        </div>
        <div className="mt-[16px] border rounded-xl py-[24px] px-[16px] flex flex-col gap-4">
          {dataVotingCondition.map((result: any) => (
            <div className="flex justify-between" key={result.id}>
              <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#575655] w-[250px] truncate">
                <span>{result.title}</span>
              </div>
              <div className="text-[15px] leading-[20px] font-semibold truncate tracking-[0.6px] text-[#252422]">
                <span>{result.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="pt-[32px] flex items-center gap-2">
            <div>
              <p className="text-[#252422] font-semibold text-[20px] leading-[25px] tracking-one">
                {L('votingCondition')}
              </p>
            </div>
            <div>
              <QuestionCircleIcon w="24px" h="24px" color="#898988" />
            </div>
          </div>
          <div className="mt-[16px] border rounded-xl py-[24px] px-[16px] flex flex-col gap-4">
            {dataVotingResult.map((result: any) => (
              <div className="flex justify-between" key={result.id}>
                <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                  <span>{result.title}</span>
                </div>
                <div className="text-[15px] leading-[20px] font-semibold truncate tracking-[0.6px] text-[#252422]">
                  <span>{result.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDrawerTemplate;
