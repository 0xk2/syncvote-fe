import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import clsx from 'clsx';

import AttachIcon from '@assets/icons/svg-icons/AttachIcon';
import EditIcon from '@assets/icons/svg-icons/EditIcon';
import EyeIcon from '@assets/icons/svg-icons/EyeIcon';
import TimeIcon from '@assets/icons/svg-icons/TimeIcon';
import Button from '@components/Button/Button';
import CommonDateTimePicker from '@components/CommonDateTimePicker';
import Modal from '@components/Modal/Modal';
import PopupPublish from '@components/PopupPublish/PopupPublish';
import { RootState } from '@redux/store';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L } from '@utils/locales/L';
import {
  resetProposalStore,
  updateCompletedSteps,
  updateHighestStep,
} from '@redux/reducers/proposal.reducer';
import ViewMembers from '@components/MemberList/ViewMembers';
import SectionWrapper from './commons/SectionWrapper';
import { RoleOptionsInterface, OptionType } from 'types/proposal';

const ReviewProposal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentStep, setCurrentStep } = useOutletContext<any>();
  const [modalType, setModalType] = useState('');
  const [isShowLess, setIsShowLess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const participantsData = useSelector((state: RootState) => state.proposal.participants);
  const basicInfo = useSelector((state: RootState) => state.proposal.basicInfo);
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);
  const durationData = useSelector((state: RootState) => state.proposal.duration);
  const isProgress = useSelector((state: RootState) => state.proposal.isProgress);
  const votingMethodOptions = votingMethodData.option;

  const allMembers: any[] = [];
  participantsData.allowedRoles.forEach((role: any) => {
    role.member.forEach((item: any) => {
      allMembers.push({ ...item, roleId: role.id });
    });
  });

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalType('');
    setIsModalOpen(false);
  };

  const handleNavigateBack = () => {
    setCurrentStep((prev: number) => prev - 1);
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ENFORCE}`);
  };

  const handlePressBtnPublish = () => {
    // dispatch(resetProposalStore());
    handleOpenModal('publish');
  };

  const handleSaveDraft = () => {
    dispatch(resetProposalStore());
    navigate('/');
  };

  const onClickChangeHeight = () => {
    setIsShowLess(!isShowLess);
  };

  const editOnClick = (page: string) => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${page}`);
  };

  useEffect(() => {
    if (!isProgress) {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ADD_BASIC_INFO}`);
    } else {
      setCurrentStep(6);
      dispatch(updateHighestStep(6));
    }
    dispatch(updateCompletedSteps(currentStep));
  }, []);

  return (
    <SectionWrapper>
      <div className="pt-[56px] w-full">
        <div className="gap-4  text-grey-version-6 text-[34px] font-semibold leading-[41px] tracking-[0.37px]">
          <span>{L('reviewSingleProposal')}</span>
        </div>

        <div className="pt-[32px]">
          <Link to={`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.REVIEW_MODE_PROPOSAL}`}>
            <Button
              variant="secondary"
              className="w-full h-[60px] text-[17px] leading-[22px] tracking-0.5px border-1.5 border-grey-version-3"
            >
              <div>
                <EyeIcon color="#252422" />
              </div>
              <div>
                <span>{L('viewAsTokenHolder')}</span>
              </div>
            </Button>
          </Link>
        </div>

        <div className="border-b border-primary_logo pt-[32px]" />

        <div className="pt-[43.5px]">
          <div className="flex justify-between">
            <p className="font-semibold w-full text-[#252422] text-[20px] leading-[25px] tracking-[0.38px]">
              {basicInfo.decisionTitle}
            </p>
            <div
              className="flex gap-1 cursor-pointer"
              onClick={() => editOnClick(`${PAGE_ROUTES.ADD_BASIC_INFO}`)}
            >
              <div>
                <EditIcon />
              </div>
              <div className="text-[17px] leading-[22px] tracking-[0.5px] text-[#5D23BB]">
                <span>{L('edit')}</span>
              </div>
            </div>
          </div>

          <div className="pt-[23.5px] text-[20px] leading-[25px] tracking-[0.38px] text-[#575655] h-50">
            <div
              className={clsx(
                'w-full h-full focus:outline-none font-medium text-xl overflow-hidden preview-block',
                !isShowLess ? 'max-h-[360px] mb-6 ' : 'max-h-full mb-6',
              )}
              dangerouslySetInnerHTML={{ __html: basicInfo.description }}
            />
            <button
              className="mb-5 py-2 px-3 bg-violet-version-1 hover:bg-[#5D23BB] border-solid rounded-[8px] cursor-pointer text-[#5D23BB] hover:text-white"
              onClick={onClickChangeHeight}
            >
              <span className="text-base">{!isShowLess ? 'View more' : 'View less'}</span>
            </button>
          </div>

          {basicInfo.listOfFiles.length > 0 && (
            <div className="flex pt-[24px] gap-[12px]">
              <div className="text-[17px] leading-[22px] tracking-[0.5px]">
                <div className="flex flex-wrap gap-4 mb-[24px]">
                  {basicInfo.listOfFiles.length > 0 &&
                    Array.from(basicInfo.listOfFiles as FileList | File[]).map(
                      (file, index: number) => (
                        <p
                          // eslint-disable-next-line react/no-array-index-key
                          key={index.toString()}
                          className="flex justify-center items-center w-[230px] rounded-full bg-secondary-color border-1.5 gap-2 px-[16px] py-[13px]"
                        >
                          <AttachIcon />
                          <span className="truncate max-w-[80%]">{file?.name}</span>
                        </p>
                      ),
                    )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-primary_logo" />

        <div>
          <div className="pt-[32px]">
            <div className="flex justify-between">
              <div className="text-[20px] leading-[25px] tracking-[0.38px] font-semibold text-[#252422]">
                <span>{L('voteOnChain')}</span>
              </div>
              <div
                className="flex gap-1 cursor-pointer"
                onClick={() => editOnClick(`${PAGE_ROUTES.VOTING_METHOD}`)}
              >
                <div>
                  <EditIcon />
                </div>
                <div className="text-[17px] leading-[22px] tracking-[0.5px] text-[#5D23BB]">
                  <span>{L('edit')}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[16px] pt-[24px]">
              {votingMethodOptions.map((option: OptionType, index: number) => {
                return (
                  <div
                    key={option.id}
                    className="flex w-full h-[70px] border-[1px] border-grey-version-3 px-[16px] py-[24px] rounded-[12px]"
                  >
                    <p className="text-[17px] font-semibold leading-[22px] text-grey-version-7">
                      {`${index + 1}.`}
                    </p>
                    <p className="flex-1 text-center text-[17px] font-medium leading-[22px] text-grey-version-7">
                      {option.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-b border-primary_logo w-full pt-[24px]" />

        <div>
          <div className=" pt-[32px]">
            <div className="flex justify-between">
              <div className="text-[20px] leading-[25px] tracking-[0.38px] font-semibold text-[#252422]">
                <span>{L('votingParticipants')}</span>
              </div>
              <div
                className="flex gap-1 cursor-pointer"
                onClick={() => editOnClick(`${PAGE_ROUTES.PARTICIPANTS}`)}
              >
                <div>
                  <EditIcon />
                </div>
                <div className="text-[17px] leading-[22px] tracking-[0.5px] text-[#5D23BB]">
                  <span>{L('edit')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-[35.5px]">
          <div className="w-full h-[76px] border-1.5 border-grey-version-3 text-[17px] tracking-0.5px flex gap-2 justify-between leading-[20px] rounded-[12px] py-[27px] px-[16px] items-center">
            <div className="text-[#252422] text-[17px] flex flex-wrap gap-2 tracking-0.5px items-center">
              {participantsData.allowedRoles.map((role: RoleOptionsInterface, index: number) => (
                <span
                  className="rounded-8 bg-violet-version-1 p-1
                    text-violet-version-5 flex"
                  key={`${role?.label} ${index.toString()}`}
                >
                  {L(`${role?.label}`)}
                </span>
              ))}
            </div>
            <span
              className="text-[15px] text-[#5D23BB] w-fit tracking-[0.6px] whitespace-nowrap cursor-pointer"
              onClick={() => handleOpenModal('addMember')}
            >
              {L('viewMemberList')}
            </span>
          </div>
        </div>
        <div className="border-b border-primary_logo w-full pt-[24px]" />

        <div>
          <div className=" pt-[32px]">
            <div className="flex justify-between">
              <div className="text-[20px] leading-[25px] tracking-[0.38px] font-semibold text-[#252422]">
                <span>{L('votingDuration')}</span>
              </div>
              <div
                className="flex gap-1 cursor-pointer"
                onClick={() => editOnClick(`${PAGE_ROUTES.DURATION}`)}
              >
                <div>
                  <EditIcon />
                </div>
                <div className="text-[17px] leading-[22px] tracking-[0.5px] text-[#5D23BB]">
                  <span>{L('edit')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex pt-35.5px">
          <div className="w-[50%] pr-[6px]">
            <div className=" pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
              <p>{L('startTime')}</p>
            </div>
            <div className=" border-grey-version-3 rounded-8 text-text_3 leading-line-semi-letter text-grey-version-7">
              <div className="flex justify-between" />
              <div className="h-[60px]">
                <CommonDateTimePicker
                  defaultDate={durationData.startTime}
                  suffixIcon={<TimeIcon />}
                  id="startTime"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="w-[50%] pl-[6px]">
            <div className="pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
              <p>{L('endTime')}</p>
            </div>
            <div className=" rounded-8 text-text_3 leading-line-semi-letter border-grey-version-3 text-grey-version-7">
              <div className="flex justify-between" />
              <div className="h-[60px]">
                <CommonDateTimePicker
                  defaultDate={durationData.endTime}
                  suffixIcon={<TimeIcon />}
                  id="endTime"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex pt-[44px] gap-[10.5px] items-center w-full">
          <input
            id="save-template-cb"
            className="w-[15px] h-[15px] cursor-pointer"
            type="checkbox"
            name="check"
          />
          <label htmlFor="save-template-cb" className="text-[17px] text-[#252422] cursor-pointer">
            <span>{L('saveAsTemplate')}</span>
          </label>
        </div>

        <div className="flex justify-end items-end gap-[24px] pt-[44px] pb-[118px]">
          <div>
            <Button
              children={L('back')}
              variant="outline"
              className="w-[168px] h-[60px] text-text_3 leading-[25px] border-1.5 border-grey-version-3 tracking-[0.38px]"
              onClick={handleNavigateBack}
            />
          </div>
          <div>
            <Button
              children={L('saveDraft')}
              variant="outline"
              className="w-[168px] h-[60px] text-text_3 border-1.5 border-grey-version-3 leading-[25px] tracking-[0.38px]"
              onClick={handleSaveDraft}
            />
          </div>
          <div>
            <Button
              children={L('publish')}
              variant="primary"
              className="w-[168px] h-[60px] text-text_3 border-1.5 border-grey-version-3 leading-[25px] tracking-[0.38px]"
              onClick={handlePressBtnPublish}
            />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} closeClickOverlay={false}>
              {modalType === 'addMember' && (
                <ViewMembers
                  closeModal={handleCloseModal}
                  members={allMembers}
                  chosenRoles={participantsData.allowedRoles || []}
                  isReviewMode
                />
              )}
              {modalType === 'publish' && (
                <PopupPublish
                  height=""
                  wrapperClassName="max-h-[650px] max-w-[896px]"
                  navigateTo={`/${PAGE_ROUTES.PROPOSAL_DETAIL}`}
                />
              )}
            </Modal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default ReviewProposal;
