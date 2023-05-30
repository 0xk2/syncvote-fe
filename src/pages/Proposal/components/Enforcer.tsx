import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Dayjs } from 'dayjs';

import EyeIcon from '@assets/icons/svg-icons/EyeIcon';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import TimeIcon from '@assets/icons/svg-icons/TimeIcon';
import UpLoadIcon from '@assets/icons/svg-icons/UpLoadIcon';
import Button from '@components/Button/Button';
import CommonDateTimePicker from '@components/CommonDateTimePicker';
import Modal from '@components/Modal/Modal';
import AddPreview from '@components/PreviewList/AddPreview';
import LayoutPreview from '@components/PreviewList/LayoutPreview';
import CommonSelectBox from '@components/SelectBox';
import { SelectBoxOption } from 'types/common';
import {
  setApplication,
  setProposalExecutionTime,
  updateCompletedSteps,
  updateEnforcer,
  updateHighestStep,
} from '@redux/reducers/proposal.reducer';
import { RootState } from '@redux/store';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L } from '@utils/locales/L';
import { VotingValidateInterface } from 'types/proposal';
import { initValidates } from '@utils/mockData/proposal';
import { applicationType, enforcerApplication } from '@utils/constants/enforcer';
import CustomInput from './commons/CustomInput';
import SectionWrapper from './commons/SectionWrapper';
import TwitterEnforcer from './commons/TwitterEnforcer/TwitterEnforcer';
import DetailSendEmail from './commons/GoogleEnforcer/DetailSendEmail';

const DropdownOptionsAction = [
  {
    id: 'transfer',
    label: 'Transfer',
    disabled: false,
  },
  {
    id: 'custom',
    label: 'Custom (coming soon)',
    disabled: true,
  },
];

const DropdownOptionsAssetType = [
  {
    id: 'token',
    label: 'Token',
  },
  {
    id: 'nFT',
    label: 'NFT',
  },
];

const DropdownOptionsSelect = [
  {
    id: '1',
    label: 'Mock Collection',
  },
];

const Enforcer = () => {
  const dispatch = useDispatch();
  const enforcerData = useSelector((state: RootState) => state.proposal.enforcer);
  const durationData = useSelector((state: RootState) => state.proposal.duration);
  const isProgress = useSelector((state: RootState) => state.proposal.isProgress);

  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = useOutletContext<any>();

  const fileRef = useRef<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPreviewOpen, setIsModalPreviewOpen] = useState(false);

  const [option, setOption] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(enforcerData.onChain.file);
  const [nameFileInput, setNameFileInput] = useState<string>(
    enforcerData.onChain.fileName || 'Input recipient & quantity (.csv)',
  );
  const [chooseImage, setChooseImage] = useState<any>(enforcerData.onChain.images);
  const [listNftChoose, setListNftChoose] = useState([]);
  const [listNft, setListNft] = useState(enforcerData.onChain.images);
  const [addressToken, setAddressToken] = useState(enforcerData.onChain.tokenAddress);
  const [recipientAddress, setRecipientAddress] = useState(enforcerData.onChain.recipientAddress);
  const [enforcerTime, setEnforcerTime] = useState<Dayjs | null>(durationData.executionTime);
  const [applicationValue, setApplicationValue] = useState<string>(applicationType.onchain.id);

  const [isShowExcutionTime, setIsShowExcutionTime] = useState(true);
  const [validates, setValidates] = useState<VotingValidateInterface>(initValidates);
  const [typeDispatchStored, setTypeDispatchStored] = useState('');

  const currentValidateStates = { ...validates };
  const chosenApplication = Object.values(applicationType).find(
    (item) => item.id === applicationValue,
  );

  const isDisableCalendar =
    applicationValue === applicationType.onchain.id &&
    !!enforcerTime &&
    !!durationData.endTime &&
    enforcerTime < durationData.endTime;

  useEffect(() => {
    if (selectedFile) {
      setNameFileInput(selectedFile?.name);
    }
  }, [selectedFile]);

  useEffect(() => {
    setListNft((prevList: any) =>
      prevList.map((item: any) => {
        if (item.id === listNftChoose?.toString()) {
          return { ...item, image: chooseImage.thumbnail };
        }
        return item;
      }),
    );
  }, [chooseImage]);

  useEffect(() => {
    if (!isProgress) {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ADD_BASIC_INFO}`);
    } else {
      setCurrentStep(5);
      dispatch(updateHighestStep(5));
    }
  }, []);

  useEffect(() => {
    if (recipientAddress.token !== '') {
      currentValidateStates.recipientAddress = null;
    }
    if (isDisableCalendar) {
      currentValidateStates.executionTimeValidate = {
        type: 'WARN',
        message: L('executionTimeGreaterThanEndTime'),
      };
    } else {
      currentValidateStates.executionTimeValidate = null;
    }
    setValidates(currentValidateStates);
  }, [enforcerTime, recipientAddress.token]);

  useEffect(() => {
    if (typeDispatchStored === applicationType.onchain.id) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleStoredData('onChain', generateOnchainStored());
    }
  }, [typeDispatchStored]);

  const generateOnchainStored = () => {
    const assetType = option ? DropdownOptionsAssetType[0] : DropdownOptionsAssetType[1];
    return {
      action: 'Transfer',
      assetType,
      tokenAddress: addressToken || '',
      file: selectedFile || null,
      fileName: nameFileInput || '',
      images: listNft || [],
      recipientAddress: {
        token: recipientAddress.token || '',
        nft: recipientAddress.nft,
      },
    };
  };

  function validateForSocialNetwork() {
    let hasError = false;
    if (isShowExcutionTime) {
      if (!enforcerTime) {
        hasError = true;
        currentValidateStates.allowedRoles = {
          type: 'WARN',
          message: L('pleaseSelectTheTime'),
        };
      } else {
        currentValidateStates.allowedRoles = null;
      }
      if (enforcerTime && durationData.endTime && enforcerTime < durationData.endTime) {
        hasError = true;
        currentValidateStates.executionTimeValidate = {
          type: 'WARN',
          message: L('executionTimeGreaterThanEndTime'),
        };
      } else {
        currentValidateStates.executionTimeValidate = null;
      }
    }
    setTypeDispatchStored(applicationValue || '');
    setValidates(currentValidateStates);
    if (!hasError) {
      dispatch(setApplication(chosenApplication));
      dispatch(setProposalExecutionTime(enforcerTime));
      dispatch(updateCompletedSteps(currentStep));
      setCurrentStep((prev: number) => prev + 1);
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.REVIEW_PROPOSAL}`);
    }
  }

  const handleNavigate = () => {
    if (applicationValue !== applicationType.onchain.id) {
      validateForSocialNetwork();
      return;
    }

    let check = true;
    if (option) {
      if (!recipientAddress.token) {
        check = false;
        currentValidateStates.recipientAddress = {
          type: 'WARN',
          message: L('pleaseEnterTheValue'),
        };
      } else {
        currentValidateStates.recipientAddress = null;
      }
      if (!addressToken.trim()) {
        check = false;
        currentValidateStates.tokenAddress = {
          type: 'WARN',
          message: L('pleaseEnterTheValue'),
        };
      } else {
        currentValidateStates.tokenAddress = null;
      }
    } else {
      if (!recipientAddress.nft) {
        check = false;
        currentValidateStates.allowedBy = {
          type: 'WARN',
          message: L('pleaseEnterTheValue'),
        };
      } else {
        currentValidateStates.allowedBy = null;
      }
      if (!listNft.some((value: any) => value.image !== '')) {
        check = false;
        currentValidateStates.minimumHoldingPeriod = {
          type: 'WARN',
          message: 'Please choose image',
        };
      } else {
        currentValidateStates.minimumHoldingPeriod = null;
      }
    }
    if (!enforcerTime) {
      check = false;
      currentValidateStates.allowedRoles = {
        type: 'WARN',
        message: L('pleaseSelectTheTime'),
      };
    } else {
      currentValidateStates.allowedRoles = null;
    }
    if (enforcerTime && durationData.endTime && enforcerTime < durationData.endTime) {
      check = false;
      currentValidateStates.executionTimeValidate = {
        type: 'WARN',
        message: L('executionTimeGreaterThanEndTime'),
      };
    } else {
      currentValidateStates.executionTimeValidate = null;
    }

    setValidates(currentValidateStates);
    if ((option && enforcerTime && recipientAddress.token && recipientAddress.nft) || check) {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.REVIEW_PROPOSAL}`);
      setCurrentStep((prev: number) => prev + 1);

      dispatch(setProposalExecutionTime(enforcerTime));
      dispatch(updateCompletedSteps(currentStep));
      dispatch(setApplication(chosenApplication));
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleStoredData('onChain', generateOnchainStored());
    }
  };

  const handleNavigateBack = () => {
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.DURATION}`);
    setCurrentStep((prev: number) => prev - 1);
    if (!enforcerTime) {
      dispatch(setProposalExecutionTime(null));
    } else {
      // dispatch(recipientAddressEnforcer(recipientAddress));
      // dispatch(setEnforcerTokenAddress(addressToken));
      dispatch(setProposalExecutionTime(enforcerTime));
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.length) {
      setSelectedFile(event.target.files[0]);
      // dispatch(addFile(event.target.files[0]));
      // Read file csv
      const files = event.target.files[0];
      setSelectedFile(files);
      const reader = new FileReader();
      reader.onload = (e) => {
        const file: any = e.target?.result?.toString();
        setRecipientAddress({ ...recipientAddress, token: file });
      };
      reader.readAsText(files, 'UTF-8');
    }
  };

  const renderAddressToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddressToken(value);
  };

  const handleSelectOption = (value: SelectBoxOption | null) => {
    setOption(value?.id === 'token');
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const removeId = e.currentTarget.id;
    const updateList = listNft.map((item: any) => {
      if (item.id === removeId) {
        return { ...item, image: '' };
      }
      return item;
    });
    setListNft(updateList);
  };

  const handleChooseApplication = (value: SelectBoxOption | null) => {
    if (!value) return;

    setApplicationValue((prev) => {
      setTypeDispatchStored(prev);
      return value.id;
    });

    if (value.id === applicationType.onchain.id) {
      setIsShowExcutionTime(true);
      return;
    }

    if (value.id === applicationType.twitter.id) {
      setIsShowExcutionTime(enforcerData.twitter.isConnect);
      return;
    }

    if (value.id === applicationType.gmail.id) {
      setIsShowExcutionTime(enforcerData.gmail.isConnect);
    }
  };

  const handleStoredData = (type: string, data: any) => {
    dispatch(updateEnforcer({ [type]: data }));
  };

  return (
    <SectionWrapper>
      <div className="pt-[56px] w-full">
        <div className="text-[34px] text-grey-version-6 font-semibold leading-[41px] mb-[32px] tracking-[0.374px]text-[#575655]">
          <span>{L('setUpEnForcer')}</span>
        </div>

        <div>
          <div className="pb-[8px]">
            <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
              {L('application')}
            </span>
          </div>
          <CommonSelectBox
            options={enforcerApplication}
            defaultValue={enforcerData.application}
            onChange={handleChooseApplication}
          />
        </div>

        {applicationValue === applicationType.onchain.id && (
          <>
            <div className="pt-16px">
              <div className="pb-[8px]">
                <span className="text-[16px] leading-[21px] font-medium select-none">
                  {L('action')}
                </span>
              </div>
              <div>
                <CommonSelectBox
                  options={DropdownOptionsAction}
                  placeholder="Transfer"
                  defaultValue={DropdownOptionsAction[0]}
                />
              </div>
            </div>
            <div className="pt-16px">
              <div className="pb-[8px]">
                <span className="text-[16px] leading-[21px] font-medium select-none">
                  {L('assetType')}
                </span>
              </div>
              <div>
                <CommonSelectBox
                  options={DropdownOptionsAssetType}
                  defaultValue={enforcerData.onChain.assetType}
                  onChange={handleSelectOption}
                />
              </div>
            </div>
            <div className="w-full pt-[14px]">
              {option ? (
                <div>
                  <div className="pt-[6px]">
                    <CustomInput
                      label="tokenAddress"
                      labelClassName="!text-[16px] leading-[21px]"
                      childrenClassName="input-token-address-container"
                      validate={validates.tokenAddress}
                    >
                      <input
                        type="text"
                        className="input-token-address text-grey-version-6"
                        value={addressToken}
                        placeholder="0x2170ed0880ac9a755fd29b2688956bd959f933f8"
                        onChange={(event) => {
                          renderAddressToken(event);
                          validates.tokenAddress = null;
                        }}
                      />
                      <span className="h-full p-1 rounded-8 bg-violet-version-1 text-violet-version-5">
                        $MOCK
                      </span>
                    </CustomInput>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-[15px] leading-[20px] tracking-[0.6px] select-none">
                    <span>{L('selectNFTCol')}</span>
                  </div>
                  <div>
                    <CommonSelectBox
                      options={DropdownOptionsSelect}
                      defaultValue={DropdownOptionsSelect[0]}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="pt-[16px]">
              {option ? (
                <div>
                  <div>
                    {selectedFile ? (
                      <Button
                        startIcon={<EyeIcon />}
                        children={nameFileInput}
                        className="w-full border-1.5  h-[57px] text-text_3 leading-[25px] tracking-[0.38px] border-[#5D23BB] text-[#5D23BB]"
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
                      <div
                        className="cursor-pointer flex "
                        onClick={() => fileRef.current?.click()}
                      >
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
              ) : (
                <div className="w-full pt-4">
                  <div className="flex justify-between text-[16px] leading-[21px] tracking-0.5px">
                    <div>
                      <span>{L('NFT')}</span>
                    </div>
                    <div className="text-[#5D23BB] cursor-pointer">
                      <span onClick={() => setIsModalOpen(true)}>{L('viewNFT')}</span>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                      <AddPreview closeModal={() => setIsModalOpen(false)} />
                    </Modal>
                  </div>

                  <div className="pt-[12px] w-full ">
                    <CustomInput
                      className="relative"
                      childrenClassName="border-none"
                      validate={validates.minimumHoldingPeriod}
                    >
                      <LayoutPreview
                        classes={`focus:outline-none ${
                          validates.minimumHoldingPeriod
                            ? 'border-yellow-version-5'
                            : 'border-grey-version-3'
                        } p-4 `}
                        data={listNft}
                        setOnClick={(item: any) => {
                          setIsModalPreviewOpen(true);
                          setListNftChoose(item);
                        }}
                        onRemove={(e: React.MouseEvent<HTMLButtonElement>) => handleRemoveImage(e)}
                      />
                    </CustomInput>

                    <Modal isOpen={isModalPreviewOpen} onClose={() => setIsModalPreviewOpen(false)}>
                      <AddPreview
                        closeModal={() => setIsModalPreviewOpen(false)}
                        title={L('selectTreasury')}
                        onChooseImage={(image: any) => {
                          setChooseImage(image);
                        }}
                      />
                    </Modal>
                  </div>
                </div>
              )}
            </div>
            <div className="pt-[40px] w-full">
              <div className="text-[20px] leading-[25px] tracking-[0.38px] font-semibold">
                <span>{L('detail')}</span>
              </div>
              <div>
                <div className="text-[16px] text-[#575655] leading-[21px] tracking-0.5px pt-[16px] font-medium">
                  <span>{L('recipientAddress')}</span>
                </div>

                {option ? (
                  <div className="pt-2">
                    <CustomInput
                      className="relative"
                      childrenClassName="border-none"
                      validate={validates.recipientAddress}
                    >
                      <textarea
                        className={`w-full h-80 focus:outline-none ${
                          !validates.recipientAddress
                            ? 'border-grey-version-3'
                            : 'border-yellow-version-5'
                        } border-1.5 rounded-8 p-4 font-medium text-xl `}
                        value={recipientAddress.token}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                          setRecipientAddress({
                            ...recipientAddress,
                            token: e.target.value,
                          });
                          currentValidateStates.tokenAddress = null;
                        }}
                      />
                    </CustomInput>
                  </div>
                ) : (
                  <CustomInput
                    className="relative"
                    childrenClassName="border-none"
                    validate={validates.allowedBy}
                  >
                    <div
                      className={`flex justify-center items-center border-1.5 ${
                        !validates.allowedBy ? 'border-grey-version-3' : 'border-yellow-version-5'
                      } rounded-8 h-[57px] p-[16px] w-full mt-2`}
                    >
                      <input
                        type="text"
                        placeholder="0x..."
                        className="w-full focus:outline-none text-[20px]"
                        value={recipientAddress.nft}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setRecipientAddress({ ...recipientAddress, nft: e.target.value });
                          currentValidateStates.allowedBy = null;
                        }}
                      />
                    </div>
                  </CustomInput>
                )}
              </div>
            </div>
          </>
        )}

        {applicationValue === applicationType.twitter.id && (
          <TwitterEnforcer
            setIsShowExecutionTime={setIsShowExcutionTime}
            handleStoredData={handleStoredData}
            twitterEnforcer={enforcerData.twitter}
          />
        )}

        {applicationValue === applicationType.gmail.id && (
          <DetailSendEmail
            setIsShowExecutionTime={setIsShowExcutionTime}
            handleStoredData={handleStoredData}
            gmailEnforcer={enforcerData.gmail}
          />
        )}

        {isShowExcutionTime && (
          <div className="text-[16px] text-[#575655] leading-[21px] mt-4 ">
            <div>
              <span>{L('executionTime')}</span>
            </div>
            <div className="flex justify-between" />
            <div className="h-[60px] w-full">
              <CustomInput
                className="relative"
                childrenClassName="border-none"
                validate={validates.allowedRoles || validates.executionTimeValidate}
              >
                <CommonDateTimePicker
                  className={`flex justify-center items-center border-1.5 ${
                    !validates.allowedRoles && !validates.executionTimeValidate
                      ? 'border-grey-version-3'
                      : 'border-yellow-version-5'
                  } rounded-8 h-[57px] p-[16px] w-full mt-2`}
                  defaultDate={enforcerTime}
                  suffixIcon={<TimeIcon />}
                  onChange={(date: Dayjs | null) => {
                    if (!date) {
                      setEnforcerTime(null);
                    } else {
                      setEnforcerTime(date);
                      currentValidateStates.executionTimeValidate = null;
                      currentValidateStates.allowedRoles = null;
                    }
                  }}
                />
              </CustomInput>
            </div>
          </div>
        )}

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
                children={L('continue')}
                variant="outline"
                onClick={handleNavigate}
                className={`py-[19px] px-[40px] text-text_3 tracking tracking-one font-medium rounded-[8px] ${
                  validates.executionTimeValidate
                    ? 'bg-grey-version-3 border-none text-[#BBBBBA]'
                    : 'text-grey-version-7 border-1.5 border-grey-version-3'
                }`}
                disabled={isDisableCalendar}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default Enforcer;
