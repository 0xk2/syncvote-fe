/* eslint-disable max-len */
import { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DataIcon from '@assets/icons/svg-icons/DataIcon';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import Button from '@components/Button/Button';
import LinkDatasource from '@components/LinkDatasource';
import Modal from '@components/Modal/Modal';
import { AlertMessage, SelectBoxOption } from 'types/common';

import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L } from '@utils/locales/L';
import SectionWrapper from '@pages/Proposal/components/commons/SectionWrapper';
import { IOptionDataSource, MethodVoteOptionType } from 'types/proposal';
import { setConfigCheckpoints, setDataSource } from '@redux/reducers/check-node.reducer';
import { RootState } from '@redux/store';
import XButton from '@assets/icons/svg-icons/XButton';
import { ICON_LIST_V2 } from '@utils/constants/iconList';
import NumberInputResult from '@pages/Proposal/components/commons/NumberInputResult';
import { v4 as uuidv4 } from 'uuid';
import Toggle from '@components/ToggleV2/Toggle';
import QuestionMarkIcon from '@assets/icons/svg-icons/QuestionMarkIcon';
import CommonSelectBox from '@components/SelectBox';
import { dropdownOptionsConnect } from '@components/CheckpointTree/tempData';
import NavigateButton from '@pages/MultiProposal/SetupInitiative/NavigateButton';
import VotingDuration from '@pages/MultiProposal/SetupInitiative/VotingDuration';
import Options from '@pages/MultiProposal/SetupInitiative/Options';
import Description from '@pages/MultiProposal/SetupInitiative/Description';
import { ECheckpointsType } from 'types/enums/checkpoints';
import CustomOption from '@pages/MultiProposal/SetupInitiative/Options/CustomOption';
import { checkDuplicateOption } from '@pages/MultiProposal/SetupInitiative/helper';
import ContentDrawerReviewCheckpoint from '../ReviewCheckPoint/ContentDrawerReviewCheckpoint';
import { dataReviewCheckPoint } from '../ReviewCheckPoint/dataReviewCheckPoint';

type Props = {
  foundCp: any;
  configCp: any;
  dataCheckpoints: any;
  orderCp: number;
  prevConfigCp?: any;
};
const ConfigCheckpoint = (props: Props) => {
  const { foundCp, configCp = {}, prevConfigCp, dataCheckpoints, orderCp } = props;

  const isFirstCp = orderCp === 0; // only show option for first checkpoint

  const dispatch = useDispatch();
  const { datasource, name } = useSelector((state: RootState) => state.checkNode);

  const navigate = useNavigate();

  const [description, setDescription] = useState<string>(configCp?.description || '');
  const [listOptions, setListOptions] = useState<MethodVoteOptionType[]>(configCp.listOptions);
  const [timeStart, setTimeStart] = useState<Dayjs | null | undefined>(configCp.timeStart);
  const [timeEnd, setTimeEnd] = useState<Dayjs | null | undefined>(configCp.timeEnd);
  const [numberOfOptions, setNumberOfOptions] = useState<string | number>(
    configCp.numberOfOptions || '1',
  );
  const [attachments, setAttachments] = useState<FileList | File[]>(configCp.attachments || []);
  const [errors, setErrors] = useState<{ [key: string]: null | AlertMessage }>({});
  const [isModalDatasource, setIsModalDatasource] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isImportPrevOpts, setIsImportPrevOpts] = useState(false);
  const [votingOpt, setVotingOpt] = useState<SelectBoxOption | null>(
    configCp.votingOpt || dropdownOptionsConnect[0],
  );
  const [customOptions, setCustomOptions] = useState<MethodVoteOptionType[]>(
    configCp.customOptions || [],
  );

  const fileRef = useRef<HTMLInputElement | null>(null);
  const configCpRef = useRef({ ...configCp, cpId: foundCp.id });

  useEffect(() => {
    return () => {
      dispatch(
        setConfigCheckpoints({
          ...configCpRef.current,
          cpId: foundCp.id,
          cpType: foundCp.typeNode,
        }),
      );
    };
  }, []);
  useEffect(() => {
    configCpRef.current = {
      description,
      listOptions,
      timeStart,
      timeEnd,
      numberOfOptions,
      attachments,
      isImportPrevOpts,
      customOptions,
      votingOpt,
    };
  }, [
    description,
    listOptions,
    timeStart,
    timeEnd,
    numberOfOptions,
    attachments,
    isImportPrevOpts,
    customOptions,
    votingOpt,
  ]);

  const handleChangeDescription = (value: string): void => {
    setDescription(value);
  };

  // Handle Add attachments
  const handleClickAttach = () => {
    fileRef.current?.click();
  };
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }
    setAttachments([...attachments, ...event.target.files]);
  };
  const handleDeleteFileAttach = (indexFileRemove: number) => {
    const fileAttach = Array.from(attachments).filter(
      (file, index: number) => index !== indexFileRemove,
    );
    setAttachments(fileAttach);
  };

  // Handle Voting Options
  const addANewOption = () => {
    let options = [...(listOptions || [])];
    let setOptions = setListOptions;

    if (isImportPrevOpts) {
      options = [...customOptions];
      setOptions = setCustomOptions;
    }

    if (options.length <= 100) {
      const nextOption = {
        id: uuidv4(),
        value: '',
        status: null,
      };

      setOptions([...options, nextOption]);
    }
  };

  const handleUploadDatasource = (datasource: any) => {
    dispatch(setDataSource({ ...datasource, nodeId: foundCp.id }));
  };
  const handleLoadOptionFromDatasource = (options: any) => {
    if (options.length === 0 || options.toString() === '') return;

    const defaultNumOptForUpVote = 2;

    let cloneOptions: any = [...options];
    if (options.length > 100) {
      cloneOptions = options.slice(0, 100);
    } else if (options.length < defaultNumOptForUpVote) {
      cloneOptions.length = defaultNumOptForUpVote;
      cloneOptions.fill('', options.length, defaultNumOptForUpVote);
    }

    const nextOption = cloneOptions.map((opt: any) => {
      return {
        id: uuidv4(),
        value: opt,
        status: null,
      };
    });
    setListOptions([...nextOption, listOptions[listOptions.length - 1]]);
  };

  const handleIncreaseNumberOptions = () => {
    if (+numberOfOptions < listOptions.length) {
      setNumberOfOptions((pre) => +pre + 1);
    }
  };
  const handleSubtractNumberOptions = () => {
    if (+numberOfOptions > 1) {
      setNumberOfOptions((pre) => +pre - 1);
    }
  };
  const handleNumberOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+value <= listOptions.length && value !== '0') {
      setNumberOfOptions(value);
    }
  };
  const handleBlurOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setNumberOfOptions(1);
    }
  };

  const onClose = () => {
    setIsOpenSideBar(false);
  };

  const handleCreateData = () => ({
    id: foundCp.nodeId,
    cpId: foundCp.id,
    cpType: foundCp.typeNode,
    description,
    listOptions,
    timeStart,
    timeEnd,
    numberOfOptions,
    attachments,
    isImportPrevOpts,
    customOptions,
    votingOpt,
  });
  const isCloseModalDataSource = () => {
    setIsModalDatasource(false);
  };

  const handleNavigateBack = () => {
    const { ROOT, REVIEW_CHECKPOINTS_TREE, SET_UP_INITIATIVE } = PAGE_ROUTES.INITIATIVE;
    if (isFirstCp) {
      navigate(`/${ROOT}/${REVIEW_CHECKPOINTS_TREE}`);
      return;
    }
    navigate(`/${ROOT}/${SET_UP_INITIATIVE}/${dataCheckpoints[orderCp - 1].id}`);
  };

  const handleContinue = () => {
    let hasError = false;

    let nextListOption = [...listOptions];
    if (isImportPrevOpts) {
      nextListOption = customOptions.map((option, index) => {
        const isDuplicate = checkDuplicateOption(customOptions, option.value, index);
        if (isDuplicate) {
          hasError = true;
        }

        if (!option.value) {
          hasError = true;
          return {
            ...option,
            status: {
              type: 'WARN',
              message: L('thisFieldIsRequiredPleaseFillIn'),
            },
          };
        }
        if (option.value.length >= 255) {
          hasError = true;
          return {
            ...option,
            status: {
              type: 'WARN',
              message: L('maximumInputLengthIs255Characters'),
            },
          };
        }

        return {
          ...option,
          status: null,
        };
      });
    } else {
      nextListOption = listOptions.map((option, index) => {
        const isDuplicate = checkDuplicateOption(listOptions, option.value, index);
        if (isDuplicate) {
          hasError = true;
        }
        if (!option.value) {
          hasError = true;
          return {
            ...option,
            status: {
              type: 'WARN',
              message: L('thisFieldIsRequiredPleaseFillIn'),
            },
          };
        }
        if (option.value.length >= 255) {
          hasError = true;
          return {
            ...option,
            status: {
              type: 'WARN',
              message: L('maximumInputLengthIs255Characters'),
            },
          };
        }

        return {
          ...option,
          status: null,
        };
      });
    }

    if (timeStart && timeEnd) {
      if (timeStart >= timeEnd) {
        hasError = true;
        setErrors((prev) => {
          return {
            ...prev,
            timeStart: {
              type: 'WARN',
              message: L('endTimeGreaterThanStartTime'),
            },
          };
        });
      }

      if (!isFirstCp && prevConfigCp?.timeEnd > timeStart) {
        setErrors({
          ...errors,
          timeStart: {
            type: 'WARN',
            message: L('startGreaterThanEndTime'),
          },
        });
        return;
      }
    } else {
      if (!timeStart) {
        hasError = true;
        setErrors((prev) => {
          return {
            ...prev,
            timeStart: {
              type: 'WARN',
              message: L('thisFieldIsRequiredPleaseFillIn'),
            },
          };
        });
      }
      if (!timeEnd) {
        hasError = true;
        setErrors((prev) => {
          return {
            ...prev,
            timeEnd: {
              type: 'WARN',
              message: L('thisFieldIsRequiredPleaseFillIn'),
            },
          };
        });
      }
    }

    if (!hasError) {
      const data: any = handleCreateData();
      dispatch(setConfigCheckpoints(data));

      const { ROOT, SET_UP_INITIATIVE } = PAGE_ROUTES.INITIATIVE;
      navigate(`/${ROOT}/${SET_UP_INITIATIVE}/${dataCheckpoints[orderCp + 1].id}`);
    } else {
      setListOptions(nextListOption);
    }
  };

  const handleOnchangeToggle = () => {
    setIsImportPrevOpts(!isImportPrevOpts);
  };

  const handleChangeStartTime = (date: Dayjs | null | undefined) => {
    if (!date) {
      setTimeStart(null);
      setErrors({
        ...errors,
        timeEnd: null,
        timeStart: null,
      });
      return;
    }

    setTimeStart(date);
    if (!isFirstCp && prevConfigCp?.timeEnd > date) {
      setErrors({
        ...errors,
        timeStart: {
          type: 'WARN',
          message: L('startGreaterThanEndTime'),
        },
      });
      return;
    }

    if (timeEnd && date >= timeEnd) {
      setErrors({
        ...errors,
        timeStart: {
          type: 'WARN',
          message: L('endTimeGreaterThanStartTime'),
        },
      });
      return;
    }
    setErrors({
      ...errors,
      timeEnd: null,
      timeStart: null,
    });
  };
  const handleChangeEndTime = (date: Dayjs | null | undefined) => {
    if (!date) {
      setTimeEnd(null);
    } else {
      setTimeEnd(date);

      if (timeStart && date <= timeStart) {
        setErrors({
          ...errors,
          timeEnd: {
            type: 'WARN',
            message: L('endTimeGreaterThanStartTime'),
          },
        });
      } else {
        setErrors({
          ...errors,
          timeEnd: null,
          timeStart: null,
        });
      }
    }
  };

  return (
    <SectionWrapper>
      <div className="pt-[56px] w-full">
        <Description
          name={name}
          fileRef={fileRef}
          setIsOpenSideBar={setIsOpenSideBar}
          description={description}
          attachments={attachments}
          handleChangeDescription={handleChangeDescription}
          handleDeleteFileAttach={handleDeleteFileAttach}
          handleFileInputChange={handleFileInputChange}
          handleClickAttach={handleClickAttach}
        />

        <div className="flex justify-between items-center pt-[22px]">
          <div className="text-[22px] font-semibold leading-[28px] tracking-[0.35px] text-[#252422]">
            {L('votingOptions')}
          </div>
          {foundCp.typeNode === ECheckpointsType.polling &&
            prevConfigCp.cpType === ECheckpointsType.polling && (
              <div className="flex leading-[22px]">
                <div className="flex mr-[12px]">
                  <span className="font-[17px] mr-[6px]">Import from previous checkpoint</span>
                  <QuestionMarkIcon />
                </div>
                <Toggle
                  className="border-[1px] w-[34px] h-[20px] rounded-[20px] relative"
                  offColorButton="grey-version-3"
                  onColorButton="violet-version-5"
                  buttonClass="w-[16px] h-[16px] absolute top-[1px] left-[1px]"
                  onChange={handleOnchangeToggle}
                  isChecked={isImportPrevOpts}
                  transClass="translate-x-[14px] translate-y-0 left-[100%] top-0"
                />
              </div>
            )}
        </div>

        {isImportPrevOpts ? (
          <>
            <div className="pt-[6px]">
              <CommonSelectBox
                options={dropdownOptionsConnect}
                onChange={(opt) => setVotingOpt(opt)}
                iconDropDownClassName="w-[16px] h-[10px]"
                defaultValue={votingOpt}
                isDefault
              />
            </div>
            <div className="gap-4 pt-[16px] pb-[14px] flex flex-col h-full w-full">
              <CustomOption listOptions={customOptions} setListOptions={setCustomOptions} />
            </div>
          </>
        ) : (
          <div className="gap-4 pt-[16px] pb-[14px] flex flex-col h-full w-full">
            <Options listOptions={listOptions} setListOptions={setListOptions} foundCp={foundCp} />
          </div>
        )}

        <div className="flex justify-between items-center w-full h-16 gap-3">
          <div className="flex justify-center items-center gap-1 text-violet-version-5 h-full cursor-pointer">
            <DataIcon />
            <div
              className="font-medium text-text_2 hover:underline bg-transparent text-violet-version-5"
              onClick={() => setIsModalDatasource(!isModalDatasource)}
            >
              {L('linkToADatasource')}
            </div>
          </div>
          <div
            className="flex justify-center items-center gap-1 h-full text-violet-version-5 cursor-pointer"
            onClick={addANewOption}
          >
            <PlusIcon />
            <p className="text-text_2 font-medium hover:underline">{L('addANewOption')}</p>
          </div>
        </div>
        {foundCp.typeNode === ECheckpointsType.polling && (
          <>
            <div className="text-[22px] font-semibold leading-[28px] tracking-[0.35px] text-[#252422] mb-[14px]">
              Voting rule
            </div>
            <div>
              <NumberInputResult
                handleAddNumberResults={handleIncreaseNumberOptions}
                handleSubtractNumberResults={handleSubtractNumberOptions}
                defaultNumber={numberOfOptions}
                label="numberOfOptionsEachParticipantCanVote"
                minusColor={+numberOfOptions === 1 ? '#E3E3E2' : '#575655'}
                plusColor={+numberOfOptions >= listOptions?.length ? '#E3E3E2' : '#575655'}
                onChange={handleNumberOptions}
                onBlur={handleBlurOption}
              />
            </div>
          </>
        )}
        <div className="text-[22px] font-semibold leading-[28px] tracking-[0.35px] text-[#252422] mt-[51px]">
          <span>{L('votingDuration')}</span>
        </div>
        <div className="pt-4 flex">
          <VotingDuration
            errors={errors}
            timeStart={timeStart}
            timeEnd={timeEnd}
            foundCp={foundCp}
            handleChangeStartTime={handleChangeStartTime}
            handleChangeEndTime={handleChangeEndTime}
          />
        </div>
        <div className="flex justify-end py-8 w-full mt-6">
          <NavigateButton
            handleNavigateBack={handleNavigateBack}
            handleValidates={handleContinue}
          />
        </div>
        {isModalDatasource && (
          <Modal isOpen={isModalDatasource} onClose={isCloseModalDataSource}>
            <LinkDatasource
              setIsModalDatasource={setIsModalDatasource}
              datasource={datasource.find((i: IOptionDataSource) => i.id === foundCp.id)}
              handleUploadDatasource={handleUploadDatasource}
              handleLoadOptionFromDatasource={handleLoadOptionFromDatasource}
            />
          </Modal>
        )}
      </div>

      <Drawer placement="right" onClose={onClose} open={isOpenSideBar} closable={false}>
        <div className="">
          <div className="flex justify-end mt-[26px] mr-[26px] mb-[40px]">
            <Button
              variant="outline"
              className="w-[40.71px] border-[#BBBBBA] h-[40.71px] rounded-[113.087px] flex items-center justify-center"
              onClick={onClose}
            >
              <XButton />
            </Button>
          </div>
          <ContentDrawerReviewCheckpoint
            iconProps={ICON_LIST_V2}
            dataArray={dataReviewCheckPoint}
            nodeInfo={foundCp}
            path="initiative"
          />
        </div>
      </Drawer>
    </SectionWrapper>
  );
};

export default ConfigCheckpoint;
