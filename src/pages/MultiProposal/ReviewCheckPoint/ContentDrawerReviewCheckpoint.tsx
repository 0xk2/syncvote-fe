import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import SpenIcon from '@assets/icons/svg-icons/SpenIcon';
import ViewMembers from '@components/MemberList/ViewMembers';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { createRootLink } from '@utils/helpers';
import { L } from '@utils/locales/L';
import Modal from '@components/Modal/Modal';
import { useState } from 'react';
import { IMember } from 'types/member';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { ECheckpointsType } from 'types/enums/checkpoints';

type Props = {
  dataArray?: any;
  isCreateWf?: boolean;
  nodeInfo?: any;
  iconProps?: any;
  dataArrayCheckpoint?: any;
  typeId?: string | undefined;
  path?: string | undefined;
};

const ContentDrawerReviewCheckpoint = ({
  nodeInfo,
  isCreateWf,
  dataArray,
  iconProps,
  dataArrayCheckpoint,
  typeId,
  path,
}: Props) => {
  const [openViewMember, setOpenViewMember] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    const { pathname } = location;
    if (pathname.split('/')[1] === 'edit-blueprint') {
      navigate(
        createRootLink([
          PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
          PAGE_ROUTES.EDIT_BLUEPRINT.SETUP_CHECKPOINT,
          typeId?.toString() || '',
        ]),
      );
    } else {
      navigate(createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.SETUP_CHECKPOINT]));
    }
    if (path?.includes('initiative')) {
      navigate(
        createRootLink([
          PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
          PAGE_ROUTES.EDIT_BLUEPRINT.SETUP_CHECKPOINT,
          '3',
        ]),
      );
    }
  };
  const handleModalViewMember = () => {
    setOpenViewMember(!openViewMember);
  };

  return (
    <div>
      {dataArray && (
        <>
          {dataArray.map((item: any) => {
            if (nodeInfo?.id === item.id) {
              const {
                allowedBy,
                allowedRoles,
                tokenAddress,
                minimumHoldingPeriod,
                minimumHoldingQuantity,
                countedBy,
                action,
                placeholder,
                application,
                numberOfResults,
                inputNumberOfResults,
                thresholdValue,
                thresholdCalculatedBy,
                assetType,
              } = item;
              return (
                <div className="flex flex-col m-6" key={item.id}>
                  <div className="flex gap-2">
                    <div className="text-[#898988]">
                      {item && iconProps[item?.type as keyof typeof iconProps].icon}
                    </div>
                    <div className="text-[#898988] font-semibold text-[20px] leading-[25px] tracking-[0.38px] ">
                      <span>{item && iconProps[item?.type as keyof typeof iconProps].type}</span>
                    </div>
                  </div>
                  <div className="pt-[23px] flex justify-between">
                    <div className="font-semibold text-[28px] leading-[34px] tracking-[0.364px] text-[#252422]">
                      <span>{item?.name}</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 hover:cursor-pointer">
                      <div>
                        <SpenIcon />
                      </div>
                      <div
                        className="text-[17px] leading-[22px] tracking-0.5px text-[#5D23BB]"
                        onClick={handleNavigate}
                      >
                        <span>Edit in workflow</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-[47px]">
                    {item?.name === 'Enforcer' ? (
                      <>
                        <div className="gap-4 w-full border flex flex-col rounded-xl py-[24px] px-[16px]">
                          {[application, action, assetType, tokenAddress, placeholder].map(
                            (role: any) => (
                              <div key={role?.id} className=" flex justify-between items-center ">
                                <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                  {role === action && <span>Action</span>}
                                  {role === application && <span>Application</span>}
                                  {role === tokenAddress && <span>Token Address</span>}
                                  <span>{role?.title}</span>
                                </div>
                                <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422] flex ">
                                  {role === application && (
                                    <div className="font-semibold">
                                      <span>{role?.label}</span>
                                    </div>
                                  )}
                                  {role === assetType && (
                                    <div className="font-semibold">
                                      <span>{role?.label}</span>
                                    </div>
                                  )}
                                  {role === action && (
                                    <div className="font-semibold">
                                      <span>{action}</span>
                                    </div>
                                  )}
                                  {role === tokenAddress && (
                                    <>
                                      <div className="truncate w-[200px]">
                                        <span>{tokenAddress}</span>
                                      </div>
                                      <div className="text-[#5D23BB] w-[78px] text-[16px] flex justify-center leading-[21px] rounded-8 bg-[#EFE9F8] h-[20px]">
                                        <span>{L('eTH')}</span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-[#252422] font-semibold text-[20px] leading-[25px] tracking-one">
                            {L('votingParticipants')}
                          </p>
                        </div>
                        {item.allowedBy?.id === 'role' ? (
                          <div className="gap-3 my-2 w-full border flex flex-col gap-4 rounded-xl p-[12px] mt-[24px]">
                            {[allowedBy, allowedRoles].map((role: any) => (
                              <div key={role?.id} className=" flex justify-between items-center ">
                                <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                  <span>{role?.title}</span>
                                </div>
                                <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                  {role === allowedBy && (
                                    <div className="font-semibold">
                                      <span>{role?.label}</span>
                                    </div>
                                  )}
                                  {role === allowedRoles && (
                                    <div className="flex gap-2 text-[#5D23BB] text-[13px]">
                                      <div className="border rounded-8 bg-[#EFE9F8]">
                                        <span className="p-2">{role.type[0].label}</span>
                                      </div>
                                      {role?.type.length > 1 && (
                                        <div className="border rounded-8 bg-[#EFE9F8]">
                                          <span className="pl-2">+{role?.type.length - 1}</span>
                                          <span className="p-2">other roles</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end">
                              <div
                                className="text-[#5D23BB] text-[15px] leading-[20px] tracking-[0.6px] cursor-pointer"
                                onClick={handleModalViewMember}
                              >
                                {L('viewMemberList')}
                              </div>
                            </div>
                            {openViewMember && (
                              <Modal isOpen={openViewMember} onClose={handleModalViewMember}>
                                <ViewMembers
                                  closeModal={handleModalViewMember}
                                  members={item.members}
                                  chosenRoles={item.allowedRoles.type}
                                  isReviewMode
                                />
                              </Modal>
                            )}
                          </div>
                        ) : (
                          <div className="mt-[30px] border  border-[#E3E3E2] rounded-8 py-[8px]">
                            {[
                              allowedBy,
                              tokenAddress,
                              minimumHoldingPeriod,
                              minimumHoldingQuantity,
                            ].map((participant) => (
                              <div className="flex justify-between p-[12px]" key={participant?.id}>
                                <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] ">
                                  <span>{participant?.title}</span>
                                </div>
                                <div className=" text-[15px]  leading-[20px] tracking-[0.6px] text-[#252422] flex gap-2">
                                  {participant === allowedBy && (
                                    <div className="font-semibold">
                                      <span>{participant?.label}</span>
                                    </div>
                                  )}
                                  {participant === minimumHoldingPeriod && (
                                    <div className="font-semibold">
                                      <span>
                                        {participant?.value} {participant?.type.value}
                                      </span>
                                    </div>
                                  )}
                                  {(participant === tokenAddress ||
                                    participant === minimumHoldingQuantity) && (
                                    <>
                                      <div>
                                        <span>{participant?.value}</span>
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
                        )}
                      </>
                    )}
                  </div>
                  {item.name !== 'Enforcer' && (
                    <>
                      {item.votingCondition === true && (
                        <>
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
                            {[countedBy, numberOfResults, inputNumberOfResults].map((result) => (
                              <div className="flex justify-between" key={result?.id}>
                                <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] ">
                                  <span>{result?.title}</span>
                                </div>
                                <div className="text-[15px] leading-[20px] font-semibold tracking-[0.6px] text-[#252422]">
                                  <div>
                                    <span>
                                      {result?.value}
                                      {result?.label}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

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
                        {[thresholdValue, thresholdCalculatedBy].map((result) => (
                          <div className="flex justify-between" key={result?.id}>
                            <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                              <span>{result?.title}</span>
                            </div>
                            <div className="text-[15px] leading-[20px] font-semibold tracking-[0.6px] text-[#252422]">
                              <div>
                                <span>
                                  {result?.value}
                                  {result?.label}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            }
          })}
        </>
      )}
      {dataArrayCheckpoint && (
        <>
          {dataArrayCheckpoint.map((item: any) => {
            if (nodeInfo?.id === item.id) {
              const { allowedBy, assetType, application } = item;
              let allMembers: IMember[] | any[] = [];
              if (isCreateWf && item.type !== ECheckpointsType.enforcer) {
                const { members } = useSelector((state: RootState) => state.blueprint);
                const chosenRoleIds = item.config.allowedRoles.map((role: any) => role.id);
                allMembers = members.filter((member: IMember) =>
                  chosenRoleIds.includes(member.roleId),
                );
              }
              item.config.allowedRoles?.forEach((role: any) => {
                role.member?.forEach((item: any) => {
                  allMembers.push({ ...item, roleId: role.id });
                });
              });
              return (
                <div className="flex flex-col" key={item.id}>
                  <div className="flex gap-2 px-[24px] mt-[24px]">
                    <div className="text-[#898988]">
                      {item && iconProps[item?.type as keyof typeof iconProps].icon}
                    </div>
                    <div className="text-[#898988] font-semibold text-[20px] leading-[25px] tracking-[0.38px] ">
                      <span>{item && iconProps[item?.type as keyof typeof iconProps].type}</span>
                    </div>
                  </div>
                  <div className="pt-[23px] flex justify-between px-[24px]">
                    <div className="font-semibold text-[28px] leading-[34px] tracking-[0.364px] text-[#252422]">
                      <span>{item?.name}</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 hover:cursor-pointer">
                      <div>
                        <SpenIcon />
                      </div>
                      <div
                        className="text-[17px] leading-[22px] tracking-0.5px text-[#5D23BB]"
                        onClick={handleNavigate}
                      >
                        <span>Edit in workflow</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-[47px] px-[24px]">
                    {item?.name === 'END' ||
                    (item &&
                      iconProps[item?.type as keyof typeof iconProps].type === 'Enforcer') ? (
                      <>
                        {item &&
                          iconProps[item?.type as keyof typeof iconProps].type === 'Enforcer' && (
                            <div
                              className="gap-4 w-full border flex flex-col rounded-xl py-[24px] px-[16px]"
                              key={item.parentId}
                            >
                              {item.config?.application?.id === 'twitter' && (
                                <>
                                  <div className=" flex justify-between items-center ">
                                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                      <span>
                                        {item.config?.twitterData?.application && 'Application'}
                                      </span>
                                    </div>
                                    <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                      <div className="font-semibold">
                                        <span>{item.config?.twitterData?.application?.label}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" flex justify-between items-center ">
                                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                      <span>{item.config.twitterData?.action && 'Action'}</span>
                                    </div>
                                    <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                      <div className="font-semibold">
                                        <span>{item.config.twitterData?.action?.label}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" flex justify-between items-center ">
                                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                      <span>
                                        {item.config.twitterData?.selectedConnection &&
                                          'Connection'}
                                      </span>
                                    </div>
                                    <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                      <div className="font-semibold">
                                        <span>
                                          {item.config.twitterData?.selectedConnection?.label}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}

                              {item.config.application?.label === 'On-chain' && (
                                <>
                                  <div className=" flex justify-between items-center ">
                                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                      <span>{item.config.application && 'Application'}</span>
                                    </div>
                                    <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                      {item.config[application] === application && (
                                        <div className="font-semibold">
                                          <span>{item.config.application?.label}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className=" flex justify-between items-center ">
                                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                      <span>{item.config.action && 'Action'}</span>
                                    </div>
                                    <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                      {item.config[assetType] === assetType && (
                                        <div className="font-semibold">
                                          <span>{item.config.action}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className=" flex justify-between items-center ">
                                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                      <span>{item.config.assetType && 'Asset Type'}</span>
                                    </div>
                                    <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                      {item.config[assetType] === assetType && (
                                        <div className="font-semibold">
                                          <span>{item.config.assetType?.label}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {item.config?.assetType?.label === 'Token' && (
                                    <div className=" flex justify-between items-center ">
                                      <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                        <span>Token Address</span>
                                      </div>
                                      <div className="text-[15px] flex leading-[20px]  tracking-[0.6px] text-[#252422]">
                                        <>
                                          <div className="truncate text-right pr-1 w-[200px]">
                                            <span>{item.config.tokenAddress}</span>
                                          </div>
                                          <div className="text-[#5D23BB] w-[78px] text-[16px] flex justify-center leading-[21px] rounded-8 bg-[#EFE9F8] h-[20px]">
                                            <span>{L('eTH')}</span>
                                          </div>
                                        </>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}

                              {item.config?.application?.id === 'gmail' && (
                                <>
                                  <div className=" flex justify-between items-center ">
                                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                      <span>{item.config?.application && 'Application'}</span>
                                    </div>
                                    <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                      <div className="font-semibold">
                                        <span>{item.config?.application?.label}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" flex justify-between items-center ">
                                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                      <span>{item.config.gmailData?.action && 'Action'}</span>
                                    </div>
                                    <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                      <div className="font-semibold">
                                        <span>{item.config.gmailData?.action?.label}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" flex justify-between items-center ">
                                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                      <span>
                                        {item.config.gmailData?.selectedConnection && 'Connection'}
                                      </span>
                                    </div>
                                    <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                      <div className="font-semibold">
                                        <span>
                                          {item.config.gmailData?.selectedConnection?.label}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-[#252422] font-semibold text-[20px] leading-[25px] tracking-one">
                            {L('votingParticipants')}
                          </p>
                        </div>
                        {item.config.allowedBy?.id === 'role' ? (
                          <div className=" my-2 w-full border flex flex-col gap-4 rounded-xl p-[12px] mt-[24px]">
                            <div className=" flex justify-between items-center ">
                              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                <span>{item.config.allowedBy && 'Allowed By'}</span>
                              </div>
                              <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                {item.config[allowedBy] === allowedBy && (
                                  <div className="font-semibold">
                                    <span>{item.config.allowedBy?.label}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className=" flex justify-between items-center ">
                              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                <span>{item.config.allowedRoles && 'Allowed Roles'}</span>
                              </div>
                              <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                <div className="flex gap-2 text-[#5D23BB] text-[13px]">
                                  <div className="border rounded-8 bg-[#EFE9F8]">
                                    <span className="p-2">
                                      {item.config.allowedRoles[0]?.label}
                                    </span>
                                  </div>
                                  {item.config.allowedRoles.length > 1 && (
                                    <div className="border rounded-8 bg-[#EFE9F8]">
                                      <span className="pl-2">
                                        +{item.config.allowedRoles.length - 1}
                                      </span>
                                      <span className="p-2">other roles</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <p
                                className="text-[#5D23BB] text-[15px] leading-[20px] tracking-[0.6px] cursor-pointer"
                                onClick={handleModalViewMember}
                              >
                                {L('viewMemberList')}
                              </p>
                            </div>
                            {openViewMember && (
                              <Modal isOpen={openViewMember} onClose={handleModalViewMember}>
                                <ViewMembers
                                  closeModal={handleModalViewMember}
                                  members={allMembers}
                                  chosenRoles={item.config.allowedRoles}
                                  isReviewMode
                                />
                              </Modal>
                            )}
                          </div>
                        ) : (
                          <div className="mt-[30px] border  border-[#E3E3E2] rounded-8 px-[4px] py-[12px]">
                            <div className="flex justify-between p-[12px]">
                              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                <span>{item.config.allowedBy && 'Allowed By'}</span>
                              </div>
                              <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                {item.config[allowedBy] === allowedBy && (
                                  <div className="font-semibold">
                                    <span>{item.config.allowedBy?.label}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between p-[12px]">
                              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                <span>{item.config.tokenAddress && 'Token Address'}</span>
                              </div>
                              <div className="text-[15px] gap-1 flex leading-[20px] justify-between tracking-[0.6px] text-[#252422] w-[200px]">
                                <div className="truncate">
                                  <span>{item.config.tokenAddress}</span>
                                </div>
                                <div className="text-[#5D23BB] w-[78px] text-[16px] flex justify-center leading-[21px] rounded-8 bg-[#EFE9F8] h-[20px]">
                                  <span>{L('eTH')}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between p-[12px]">
                              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                <span>
                                  {item.config.minimumHoldingPeriod && 'Minimum holding period '}
                                </span>
                              </div>
                              <div className="text-[15px] flex leading-[20px] gap-1 justify-between tracking-[0.6px] text-[#252422]">
                                <div className="font-semibold">
                                  <span>
                                    {item.config.minimumHoldingPeriod?.value}
                                    &nbsp;
                                    {item.config.minimumHoldingPeriod?.type?.value}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between p-[12px]">
                              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                <span>
                                  {item.config.minimumHoldingPeriod && ' Minimum holding quantity '}
                                </span>
                              </div>
                              <div className="text-[15px] flex leading-[20px] gap-1 justify-between tracking-[0.6px] text-[#252422]">
                                <div className="truncate">
                                  <span>{item.config.minimumHoldingQuantity?.value}</span>
                                </div>
                                <div className="text-[#5D23BB] w-[78px] text-[16px] flex justify-center leading-[21px] rounded-8 bg-[#EFE9F8] h-[20px]">
                                  <span>{L('eTH')}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {item.name !== 'END' && item.name !== 'Enforcer' && (
                    <>
                      {item.config.votingCondition === true && (
                        <>
                          <div className="pt-[32px] mx-6 flex items-center gap-2">
                            <div>
                              <p className="text-[#252422] font-semibold text-[20px] leading-[25px] tracking-one">
                                {L('votingResults')}
                              </p>
                            </div>
                            <div>
                              <QuestionCircleIcon w="24px" h="24px" color="#898988" />
                            </div>
                          </div>
                          <div className="mt-[16px] border rounded-xl py-[24px] mx-6 px-[16px] flex justify-between gap-4">
                            <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                              <span>{item.config.countedBy && 'Counted By'}</span>
                            </div>
                            <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                              <div className="font-semibold">
                                <span>{item.config.countedBy?.label}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {item &&
                      iconProps[item?.type as keyof typeof iconProps].type === 'Enforcer' ? (
                        ''
                      ) : (
                        <div className="px-[24px]">
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
                            <div className=" flex justify-between items-center ">
                              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[220px] truncate">
                                <span>
                                  {item.config.thresholdCalculatedBy && 'Threshold calculated by'}
                                </span>
                              </div>
                              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#252422]">
                                <div className="font-semibold truncate">
                                  <span>{item.config.thresholdCalculatedBy?.label}</span>
                                </div>
                              </div>
                            </div>
                            <div className=" flex justify-between items-center ">
                              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] truncate">
                                <span>
                                  {item.config.thresholdValue &&
                                    'Threshold value for each result (% at least)'}
                                </span>
                              </div>
                              <div className="text-[15px] leading-[20px]  tracking-[0.6px] text-[#252422]">
                                <div className="font-semibold">
                                  <span>
                                    {item.config.thresholdValue?.value
                                      ? item.config.thresholdValue?.value
                                      : 0}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default ContentDrawerReviewCheckpoint;
