import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SectionWrapper from '@pages/Proposal/components/commons/SectionWrapper';
import EyeIcon from '@assets/icons/svg-icons/EyeIcon';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import TimeIcon from '@assets/icons/svg-icons/TimeIcon';
import UpLoadIcon from '@assets/icons/svg-icons/UpLoadIcon';
import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import CommonSelectBox from '@components/SelectBox';
import { L } from '@utils/locales/L';
import CommonDateTimePicker from '@components/CommonDateTimePicker';
import PopupPublish from '@components/PopupPublish/PopupPublish';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { checkNode, setConfigCheckpoints } from '@redux/reducers/check-node.reducer';
import CustomInput from '@pages/Proposal/components/commons/CustomInput';
import { Dayjs } from 'dayjs';
import { enforcerApplication } from '@utils/constants/enforcer';
import { dataCheckpoints } from '@pages/MultiProposal/SetupInitiative/mockData';

type Props = {
  foundCp: any;
  orderCp: number;
  configCp: any;
  prevConfigCp?: any;
};
const EnforcerContent = ({ foundCp, configCp = {}, orderCp, prevConfigCp }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(configCp.selectedFile);
  const [nameFileInput, setNameFileInput] = useState<string>(
    configCp.fileNameInput || 'Input recipient & quantity (.csv)',
  );
  const [recipientAddress, setRecipientAddress] = useState<any | undefined>(
    configCp.recipientAddress || {},
  );
  const [errors, setErrors] = useState<any>({});
  const [enforcerTime, setEnforcerTime] = useState<Dayjs | null>(configCp.enforcerTime);

  const fileRef = useRef<any>();
  const configCpRef = useRef({ ...configCp, cpId: foundCp.id });

  useEffect(() => {
    return () => {
      dispatch(setConfigCheckpoints({ ...configCpRef.current, cpId: foundCp.id }));
    };
  }, []);
  useEffect(() => {
    configCpRef.current = {
      enforcerTime,
      recipientAddress,
      selectedFile,
      nameFileInput,
    };
  }, [enforcerTime, recipientAddress, selectedFile, nameFileInput]);

  const handleNavigate = () => {
    let hasError = false;
    if (!recipientAddress.token) {
      hasError = true;
      setErrors((prev: any) => {
        return {
          ...prev,
          recipientAddress: {
            type: 'WARN',
            message: L('thisFieldIsRequiredPleaseFillIn'),
          },
        };
      });
    }

    if (!enforcerTime) {
      hasError = true;
      setErrors((prev: any) => {
        return {
          ...prev,
          enforcerTime: {
            type: 'WARN',
            message: L('thisFieldIsRequiredPleaseFillIn'),
          },
        };
      });
    }

    if (!hasError) {
      setIsModalSuccessOpen(!isModalSuccessOpen);
      dispatch(checkNode.actions.resetStore());
    }
  };

  const handleNavigateBack = () => {
    const { ROOT, SET_UP_INITIATIVE } = PAGE_ROUTES.INITIATIVE;
    navigate(`/${ROOT}/${SET_UP_INITIATIVE}/${dataCheckpoints[orderCp - 1].id}`);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.length) {
      setSelectedFile(event.target.files[0]);

      // Read file csv
      const files = event.target.files[0];
      setSelectedFile(files);
      const reader = new FileReader();
      reader.onload = (e) => {
        const file: any = e.target?.result?.toString();
        setRecipientAddress({ ...recipientAddress, token: file });
        setErrors({
          ...errors,
          recipientAddress: null,
        });
      };
      reader.readAsText(files, 'UTF-8');
    }
  };

  useEffect(() => {
    if (selectedFile) {
      setNameFileInput(selectedFile?.name);
    }
  }, [selectedFile]);

  return (
    <SectionWrapper>
      <div className="pt-[56px] w-full">
        <div className="text-[34px] text-grey-version-6 font-semibold leading-[41px] tracking-[0.374px]text-[#575655]">
          <span>{L('setUpEnForcer')}</span>
        </div>

        <div className="pt-[30px]">
          <div className="pb-[8px]">
            <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
              {L('application')}
            </span>
          </div>
          <CommonSelectBox
            options={enforcerApplication}
            defaultValue={enforcerApplication[0]}
            isReview
            colorPlaceholder="!text-[#898988]"
            borderClassName="bg-[#E3E3E2] hover:cursor-default"
          />
        </div>
        <div className="pt-16px">
          <div>
            <span>{L('action')}</span>
          </div>
          <div className="pt-[6px]">
            <CommonSelectBox
              borderClassName="bg-[#E3E3E2] hover:cursor-default"
              placeholder="Transfer"
              placeholderClass="!text-[#898988]"
              isReview
            />
          </div>
        </div>

        <div className="pt-16px">
          <div>
            <span>{L('assetType')}</span>
          </div>
          <div className="pt-2">
            <CommonSelectBox
              borderClassName="bg-[#E3E3E2]"
              placeholderClass="!text-[#898988]"
              placeholder="Token"
              isReview
            />
          </div>
        </div>

        <div className="w-full pt-[14px]">
          <div>
            <div className="text-[15px] leading-[20px] tracking-[0.6px]">
              <span>{L('tokenAddress')}</span>
            </div>
            <div className="pt-[6px]">
              <div
                className="w-full border-1.5
          border-grey-version-3 bg-[#E3E3E2] rounded-8 px-[16px]"
              >
                <div className="flex items-center justify-between w-full  h-[57px] ">
                  <div className="text-[20px] tracking-[0.38px] text-[#898988] w-[553px] flex justify-start ">
                    <span>0x2170ed0880ac9a755fd29b2688956bd959f933f8</span>
                  </div>
                  <div className="text-[#5D23BB] leading-[21px] w-[78px] text-center text-[16px] rounded-8 bg-[#EFE9F8] h-[20px]">
                    <span>{L('eTH')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-[40px] w-full">
          <div className="text-[20px] leading-[25px] tracking-[0.38px] font-semibold">
            <span>{L('detail')}</span>
          </div>
          <div>
            <div className="text-[16px] text-[#575655] leading-[21px] tracking-0.5px pt-[16px] font-medium">
              <span>{L('recipientAddress')}</span>
            </div>
            <div className="pt-2">
              <CustomInput
                className="relative"
                childrenClassName="border-none"
                validate={errors.recipientAddress}
              >
                <textarea
                  className={`w-full h-80 focus:outline-none ${
                    !errors.recipientAddress ? 'border-grey-version-3' : 'border-yellow-version-5'
                  } border-1.5 rounded-8 p-4 font-medium text-xl `}
                  value={recipientAddress.token}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setRecipientAddress({
                      ...recipientAddress,
                      token: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      recipientAddress: null,
                    });
                  }}
                />
              </CustomInput>
            </div>
          </div>
          <div className="pt-[16px]">
            <div>
              <div>
                {selectedFile ? (
                  <Button
                    startIcon={<EyeIcon />}
                    children={nameFileInput}
                    className="w-full border-1.5  h-[57px] text-text_3 leading-[25px] tracking-[0.38px] border-[#5D23BB] text-[#5D23BB] "
                    variant="outline"
                  />
                ) : (
                  <Button
                    startIcon={<UpLoadIcon />}
                    children={nameFileInput}
                    endIcon={<QuestionCircleIcon color="#898988" w="24px" h="24px" />}
                    className="w-full border-1.5  h-[57px] text-text_3 leading-[25px] tracking-[0.38px] border-grey-version-3"
                    variant="outline"
                    onClick={() => fileRef.current?.click()}
                  />
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="file"
                  accept=".csv"
                  ref={fileRef}
                  hidden
                  onChange={handleFileInputChange}
                />
              </div>
              {selectedFile && (
                <div className="flex justify-center items-center h-9 w-full gap-1 text-[#5D23BB] pt-4 text-[15px]">
                  <div className="cursor-pointer flex " onClick={() => fileRef.current?.click()}>
                    <div>
                      <UpLoadIcon height="20px" width="20px" />
                    </div>
                    <div>
                      <span>{L('replaceWithData')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-[16px] text-[#575655] leading-[21px] mt-4 ">
            <div className="pb-2">
              <span>{L('executionTime')}</span>
            </div>
            <div className="flex justify-between" />
            <div className="h-[60px] w-full">
              <CustomInput
                className="relative"
                childrenClassName="border-none"
                validate={errors.enforcerTime}
              >
                <CommonDateTimePicker
                  className={`flex justify-center items-center border-1.5 ${
                    !errors.enforcerTime ? 'border-grey-version-3' : 'border-yellow-version-5'
                  } rounded-8 h-[57px] p-[16px] w-full mt-2`}
                  suffixIcon={<TimeIcon />}
                  defaultDate={enforcerTime}
                  id="startTime-"
                  onChange={(date: Dayjs | null) => {
                    setErrors({
                      ...errors,
                      enforcerTime: null,
                    });
                    if (!date) {
                      setEnforcerTime(null);
                      setErrors({
                        ...errors,
                        enforcerTime: null,
                      });
                    } else {
                      setEnforcerTime(date);
                      if (prevConfigCp.timeEnd > date) {
                        setErrors({
                          ...errors,
                          enforcerTime: {
                            type: 'WARN',
                            message: L('executionTimeGreaterThanEndTime'),
                          },
                        });
                      }
                    }
                  }}
                />
              </CustomInput>
            </div>
          </div>
        </div>

        <div className="flex justify-end py-8 w-full">
          <div className="flex gap-6">
            <div>
              <Button
                children={L('back')}
                variant="outline"
                className="w-[168px] h-[63px] text-text_3 leading-line-semi-letter tracking flex justify-center items-center text-grey-version-7 border-1.5 border-grey-version-3 tracking-one font-medium"
                onClick={handleNavigateBack}
              />
            </div>
            <div>
              <Button
                children={L('publish')}
                variant="primary"
                onClick={handleNavigate}
                className="w-[168px] h-[63px] text-text_3 leading-line-semi-letter flex justify-center items-center text-white border-1.5 border-grey-version-3 tracking-one font-medium"
              />
            </div>
          </div>
        </div>
        <Modal isOpen={isModalSuccessOpen} closeClickOverlay={false}>
          <PopupPublish
            textInPublishBtn="Go to multi-linked proposal management"
            navigateTo={`/${PAGE_ROUTES.PROPOSAL_DETAIL}/2`}
            navigateToShare="/"
          />
        </Modal>
      </div>
    </SectionWrapper>
  );
};
export default EnforcerContent;
