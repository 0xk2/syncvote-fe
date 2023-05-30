/* eslint-disable max-len */
import { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Drawer, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import AttachIcon from '@assets/icons/svg-icons/AttachIcon';
import DataIcon from '@assets/icons/svg-icons/DataIcon';
import EyeIcon from '@assets/icons/svg-icons/EyeIcon';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import TrashCan from '@assets/icons/svg-icons/TrashCan';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import LinkDatasource from '@components/LinkDatasource';
import Modal from '@components/Modal/Modal';
import { AlertMessage } from 'types/common';
import { ECheckpointsType } from 'types/enums/checkpoints';

import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L, LF } from '@utils/locales/L';
import CustomInput from '@pages/Proposal/components/commons/CustomInput';
import SectionWrapper from '@pages/Proposal/components/commons/SectionWrapper';
import {
  IOptionDataSource,
  MethodVoteOptionType,
  OptionType,
  VotingValidateInterface,
} from 'types/proposal';
import { setConfigCheckpoints, setDataSource } from '@redux/reducers/check-node.reducer';
import { RootState } from '@redux/store';
import TextEditor from '@components/Editor/TextEditor';
import XButton from '@assets/icons/svg-icons/XButton';
import { ICON_LIST_V2 } from '@utils/constants/iconList';
import CommonDateTimePicker from '@components/CommonDateTimePicker';
import TimeIcon from '@assets/icons/svg-icons/TimeIcon';
import { CP_NAME } from '@constants/checkpoint';
import NumberInputResult from '@pages/Proposal/components/commons/NumberInputResult';
import DeleteIcon from '@assets/icons/svg-icons/DeleteIcon';
import { initValidates } from '@utils/mockData/proposal';
import WarningIcon from '@assets/icons/svg-icons/WarningIcon';
import { v4 as uuidv4 } from 'uuid';
import ContentDrawerReviewCheckpoint from '../ReviewCheckPoint/ContentDrawerReviewCheckpoint';
import { dataReviewCheckPoint } from '../ReviewCheckPoint/dataReviewCheckPoint';

const defaultListOfOptionsPollingCP2 = [
  {
    id: 1,
    value: '',
    isLoop: true,
    status: null,
  },
  {
    id: 2,
    value: '',
    isLoop: true,
    status: null,
  },
  {
    id: 3,
    value: '',
    isLoop: true,
    status: null,
  },
  {
    id: 4,
    value: '0',
    isLoop: false,
    status: null,
  },
];

const defaultListOfOptionsVeto = [
  {
    id: 1,
    value: 'Veto',
    isLoop: true,
    status: null,
  },
  {
    id: 2,
    value: '',
    isLoop: false,
    status: null,
  },
];

const defaultListOfOptionsSingleChoice = [
  {
    id: 1,
    value: 'Yes',
    status: null,
    isLoop: true,
  },
  {
    id: 2,
    value: 'No',
    status: null,
    isLoop: true,
  },
  {
    id: 3,
    value: '0',
    status: null,
    isLoop: false,
  },
];
const defaultListOfOptionsUpVote = [
  {
    id: 1,
    value: '',
    isLoop: true,
    status: null,
  },
  {
    id: 2,
    value: '',
    isLoop: true,
    status: null,
  },
  {
    id: 3,
    value: '0',
    isLoop: false,
    status: null,
  },
];
const dataCheckpoints = [
  {
    id: 'cp1',
    parentId: null,
    level: 1,
    name: 'Scan CV',
    haveRouteDetail: true,
    typeNode: ECheckpointsType.upvote,
    iconColor: '#252422',
    isFirstOfLeaf: true,
    isLastOfLeaf: false,
    memberType: 'Members',
  },
  {
    id: 'cp2',
    parentId: 'cp1',
    level: 1,
    name: 'Interview',
    haveRouteDetail: true,
    typeNode: ECheckpointsType.polling,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: 'Council',
  },
  {
    id: 'cp3',
    parentId: 'cp2',
    level: 1,
    name: 'Cutural fit',
    haveRouteDetail: true,
    typeNode: ECheckpointsType.singleChoice,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: 'Members',
  },
  {
    id: 'cp4',
    parentId: 'cp3',
    level: 1,
    name: 'Making offer',
    haveRouteDetail: true,
    typeNode: ECheckpointsType.veto,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: 'Members',
  },
  {
    id: 'cp5',
    parentId: 'cp4',
    level: 1,
    name: CP_NAME.enforcer,
    haveRouteDetail: false,
    typeNode: ECheckpointsType.enforcer,
    iconColor: '#252422',
    isFirstOfLeaf: false,
    isLastOfLeaf: true,
  },
];

const NodeContent = () => {
  const dispatch = useDispatch();
  const nodeContent = useSelector((state: RootState) => state.checkNode.checkpointConfig);
  const datasource: IOptionDataSource[] = useSelector(
    (state: RootState) => state.checkNode.datasource,
  );
  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = useOutletContext<any>();
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const typeId = id;
  const typeParams = searchParams.get('type');
  const location = useLocation();
  const { pathname } = location;
  const parts = pathname.split('/');
  const newPathname = `${parts.slice(0, -1).join('/')}/`;

  const orderCp = dataCheckpoints.findIndex((item) => item.id === typeId);

  const [listOfOptionsPollingCP2, setListOfOptionsPollingCP2] = useState<MethodVoteOptionType[]>(
    defaultListOfOptionsPollingCP2,
  );
  const [listOfOptionsSingleChoice, setListOfOptionsSingleChoice] = useState<
    MethodVoteOptionType[]
  >(defaultListOfOptionsSingleChoice);
  const [listOfOptionsUpVote, setListOfOptionsUpVote] = useState<MethodVoteOptionType[]>(
    defaultListOfOptionsUpVote,
  );
  const [listOfOptionsVeto, setListOfOptionsVeto] =
    useState<OptionType[]>(defaultListOfOptionsVeto);
  const [isModalDatasource, setIsModalDatasource] = useState(false);
  const [open, setOpen] = useState(false);
  const [valueTextArea, setValueTextArea] = useState<string>('');
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [thresholdValue, setThresholdValue] = useState('0');
  const [timeStart, setTimeStart] = useState<Dayjs | null | undefined>();
  const [timeEnd, setTimeEnd] = useState<Dayjs | null | undefined>();
  const [numberOfOptions, setNumberOfOptions] = useState<string | number>('1');
  const [selectedFileList, setSelectedFileList] = useState<FileList | File[]>([]);
  const [validates, setValidates] = useState<VotingValidateInterface>(initValidates);

  const indexCurrentNode = dataCheckpoints.findIndex((node) => node.id === id);
  const currentNode = dataCheckpoints.find((node) => node.id === id);
  const currentValidateStates: VotingValidateInterface = { ...validates };
  setCurrentStep(indexCurrentNode + 1);
  const [hasErrorOption, setHasErrorOptions] = useState(false);

  const listOptionsUpVote = listOfOptionsUpVote.filter((value) => value.isLoop);
  const listOptionsPolling = listOfOptionsPollingCP2.filter((value) => value.isLoop);
  const currentIndex = nodeContent.findIndex((item: { id: string | undefined }) => item.id === id);

  const addANewOption = () => {
    const nextId = Date.now();
    const nextOption = {
      id: nextId,
      value: '',
      isLoop: true,
      status: null,
    };
    if (listOfOptionsPollingCP2.length <= 100 && typeParams === 'polling') {
      setListOfOptionsPollingCP2([...listOfOptionsPollingCP2, nextOption]);
    }
    if (listOfOptionsUpVote.length <= 100 && typeParams === 'single_choice_vote') {
      setListOfOptionsSingleChoice([...listOfOptionsSingleChoice, nextOption]);
    }
    if (listOfOptionsUpVote.length <= 100 && typeParams === 'up_vote') {
      setListOfOptionsUpVote([...listOfOptionsUpVote, nextOption]);
    }
  };
  const handleRemoveOption = (id: number | string) => {
    if (typeParams === 'polling') {
      const nextListOption = listOfOptionsPollingCP2.filter((option) => option.id !== id);
      setListOfOptionsPollingCP2(nextListOption);
    }
    if (typeParams === 'single_choice_vote') {
      const nextListOption = listOfOptionsSingleChoice.filter((option) => option.id !== id);
      setListOfOptionsSingleChoice(nextListOption);
    }
    if (typeParams === 'up_vote') {
      const nextListOption = listOfOptionsUpVote.filter((option) => option.id !== id);
      setListOfOptionsUpVote(nextListOption);
    }
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleInputChange = (id: number | string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeParams === 'veto') {
      const nextListOfOptions = listOfOptionsVeto.map((option) => {
        if (option.id === id) {
          return { ...option, value: e.target.value, status: null };
        }
        return option;
      });
      setListOfOptionsVeto(nextListOfOptions);
    }

    if (typeParams === 'polling') {
      const nextListOfOptions = listOfOptionsPollingCP2.map((option) => {
        if (option.id === id) {
          return { ...option, value: e.target.value, status: null };
        }
        return option;
      });
      setListOfOptionsPollingCP2(nextListOfOptions);
    }

    if (typeParams === 'single_choice_vote') {
      const nextListOfOptions = listOfOptionsSingleChoice.map((option) => {
        if (option.id === id) {
          return { ...option, value: e.target.value, status: null };
        }
        return option;
      });
      setListOfOptionsSingleChoice(nextListOfOptions);
    }

    if (typeParams === 'up_vote') {
      const nextListOfOptions = listOfOptionsUpVote.map((option) => {
        if (option.id === id) {
          return { ...option, value: e.target.value, status: null };
        }
        return option;
      });

      setListOfOptionsUpVote(nextListOfOptions);
    }
  };

  const handleClickAttach = () => {
    fileRef.current?.click();
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }
    setSelectedFileList([...selectedFileList, ...event.target.files]);
  };
  const handleDeleteFileAttach = (indexFileRemove: number) => {
    const fileAttach = Array.from(selectedFileList).filter(
      (file, index: number) => index !== indexFileRemove,
    );
    setSelectedFileList(fileAttach);
  };
  const handleChangeInput = (e: string): void => {
    setValueTextArea(e);
  };
  const handleValidatesThresholdValue = () => {
    const regex = /^-?\d*(\.\d{1,3})?$/;
    setThresholdValue(thresholdValue);
    if (regex.test(thresholdValue)) {
      return {
        id: 3,
        value: thresholdValue,
        isLoop: false,
        status: null,
      };
    }
    return {
      id: 3,
      value: thresholdValue,
      isLoop: false,
      status: {
        type: 'WARN',
        message: L('IntegerOrDecimalNumberWithNoMoreThan3Decimal'),
      } as AlertMessage | null | undefined,
    };
  };
  const handleCreateData = (options?: any) => ({
    id: typeId,
    textArea: valueTextArea,
    dataFile: selectedFileList,
    startTime: timeStart,
    endTime: timeEnd,
    option: options,
    numberOfOption: numberOfOptions,
  });
  const isCloseModalDataSource = () => {
    setIsModalDatasource(false);
  };
  const handleNavigate = () => {
    if (currentStep === dataCheckpoints.length - 1) {
      navigate(
        `/${PAGE_ROUTES.INITIATIVE.ROOT}/${PAGE_ROUTES.INITIATIVE.SET_UP_INITIATIVE}/${PAGE_ROUTES.INITIATIVE.ENFORCER}/${dataCheckpoints[currentStep].id}?type=${dataCheckpoints[currentStep].typeNode}`,
      );
    } else {
      navigate(
        `/${PAGE_ROUTES.INITIATIVE.ROOT}/${PAGE_ROUTES.INITIATIVE.SET_UP_INITIATIVE}/${PAGE_ROUTES.INITIATIVE.CHECKPOINT}/${dataCheckpoints[currentStep].id}?type=${dataCheckpoints[currentStep].typeNode}`,
      );
    }
    setCurrentStep((prev: number) => prev + 1);
    setSelectedFileList([]);
  };
  const handleNavigateBack = () => {
    const data: any = handleCreateData();
    dispatch(setConfigCheckpoints(data));
    if (currentStep === 1) {
      navigate(`/${PAGE_ROUTES.INITIATIVE.ROOT}/${PAGE_ROUTES.INITIATIVE.REVIEW_CHECKPOINTS_TREE}`);
    } else {
      navigate(
        `/${PAGE_ROUTES.INITIATIVE.ROOT}/${PAGE_ROUTES.INITIATIVE.SET_UP_INITIATIVE}/${
          PAGE_ROUTES.INITIATIVE.CHECKPOINT
        }/${dataCheckpoints[currentStep - 2].id}?type=${dataCheckpoints[currentStep - 2].typeNode}`,
      );
    }
    setCurrentStep((prev: number) => prev - 1);
  };
  const handleValidates = () => {
    let hasError = false;
    let check = false;
    let prevNode;
    if (currentIndex === -1) {
      prevNode = nodeContent[nodeContent.length - 1];
    } else {
      prevNode = nodeContent[currentIndex - 1];
    }
    if (timeEnd && timeStart && timeEnd < timeStart) {
      check = true;
      currentValidateStates.endTimeValidate = {
        type: 'WARN',
        message: L('endTimeGreaterThanStartTime'),
      };
    } else {
      currentValidateStates.endTimeValidate = null;
    }

    if (!timeStart) {
      check = true;
      currentValidateStates.allowedBy = {
        type: 'WARN',
        message: L('pleaseSelectTheTime'),
      };
    } else {
      currentValidateStates.allowedBy = null;
    }

    if (!timeEnd) {
      check = true;
      currentValidateStates.allowedRoles = {
        type: 'WARN',
        message: L('pleaseSelectTheTime'),
      };
    } else {
      currentValidateStates.allowedRoles = null;
    }
    if (prevNode) {
      if (!!timeStart && prevNode.endTime > timeStart) {
        check = true;
        currentValidateStates.startTimeMoreEndTime = {
          type: 'WARN',
          message: L('startGreaterThanEndTime'),
        };
      } else {
        currentValidateStates.startTimeMoreEndTime = null;
      }
    }

    setValidates(currentValidateStates);

    if (typeParams === 'up_vote') {
      let nextListOption = [...listOptionsUpVote];
      if (orderCp === 0) {
        nextListOption = listOptionsUpVote.map((option) => {
          const currentOption = { ...option };
          const currentValue = currentOption.value?.trim();
          if (!currentValue) {
            hasError = true;
            currentOption.status = {
              type: 'WARN',
              message: L('thisFieldIsRequiredPleaseFillIn'),
            };
          } else if (currentValue.length >= 255) {
            hasError = true;
            currentOption.status = {
              type: 'WARN',
              message: L('maximumInputLengthIs255Characters'),
            };
          } else {
            currentOption.status = null;
          }
          return currentOption;
        });
        const thresholdValueResult = handleValidatesThresholdValue();
        if (thresholdValueResult?.status) {
          hasError = true;
          nextListOption[2] = thresholdValueResult;
        }
      }

      if (!hasError && !check && !hasErrorOption) {
        const data: any = handleCreateData(nextListOption);
        dispatch(setConfigCheckpoints(data));
        handleNavigate();
        setCurrentStep((prev: number) => prev + 1);
      } else {
        setListOfOptionsUpVote(nextListOption);
      }
      return;
    }

    if (typeParams === 'polling') {
      let nextListOption = [...listOptionsUpVote];
      if (orderCp === 0) {
        nextListOption = listOfOptionsPollingCP2.map((option) => {
          const currentOption = { ...option };
          const currentValue = currentOption.value?.trim();
          if (!currentValue) {
            hasError = true;
            currentOption.status = {
              type: 'WARN',
              message: L('thisFieldIsRequiredPleaseFillIn'),
            };
          } else if (currentValue.length >= 255) {
            hasError = true;
            currentOption.status = {
              type: 'WARN',
              message: L('maximumInputLengthIs255Characters'),
            };
          } else {
            currentOption.status = null;
          }
          return currentOption;
        });
        const thresholdValueResult = handleValidatesThresholdValue();
        if (thresholdValueResult?.status) {
          hasError = true;
          nextListOption[2] = thresholdValueResult;
        }
      }

      if (!hasError && !check) {
        const data: any = handleCreateData(nextListOption);
        dispatch(setConfigCheckpoints(data));
        handleNavigate();
        setCurrentStep((prev: number) => prev + 1);
      } else {
        setListOfOptionsPollingCP2(nextListOption);
      }
      return;
    }

    if (typeParams === 'single_choice_vote') {
      let nextListOption = [...listOptionsUpVote];
      if (orderCp === 0) {
        nextListOption = listOfOptionsSingleChoice.map((option) => {
          const currentOption = { ...option };
          const currentValue = currentOption.value?.trim();
          if (!currentValue) {
            hasError = true;
            currentOption.status = {
              type: 'WARN',
              message: L('thisFieldIsRequiredPleaseFillIn'),
            };
          } else if (currentValue.length >= 255) {
            hasError = true;
            currentOption.status = {
              type: 'WARN',
              message: L('maximumInputLengthIs255Characters'),
            };
          } else {
            currentOption.status = null;
          }
          return currentOption;
        });
        const thresholdValueResult = handleValidatesThresholdValue();
        if (thresholdValueResult?.status) {
          hasError = true;
          nextListOption[2] = thresholdValueResult;
        }
      }

      if (!hasError && !check) {
        const data: any = handleCreateData(nextListOption);
        dispatch(setConfigCheckpoints(data));
        handleNavigate();
        setCurrentStep((prev: number) => prev + 1);
      } else {
        setListOfOptionsSingleChoice(nextListOption);
      }
      return;
    }

    if (typeParams === 'veto') {
      if (!check) {
        const data: any = handleCreateData(listOfOptionsVeto);
        dispatch(setConfigCheckpoints(data));
        handleNavigate();
      }
    }
  };

  const isDisableCalendar = !!timeEnd && !!timeStart && timeEnd < timeStart;

  const handleBorderStatus = (option: OptionType) => {
    if (option.status?.type === 'WARN') {
      return 'border-yellow-version-5';
    }
    if (option.status?.type === 'ERROR') {
      return 'border-red-version-5';
    }
    if (option.status?.type === 'SUCCESS') {
      return 'border-green-version-5';
    }
    return '';
  };
  const isExitName = (value: string, index: number, listArrayOptions: any[]) => {
    return listArrayOptions.find((e, i) => i !== index && e.value === value);
  };

  const handleAddNumberOptions = (listOptions: any) => {
    setNumberOfOptions(
      +numberOfOptions >= listOptions.length ? listOptions.length : +numberOfOptions + 1,
    );
  };
  const handleSubtractNumberOptions = () => {
    setNumberOfOptions(+numberOfOptions <= 1 ? 1 : +numberOfOptions - 1);
  };
  const handleNumberOptions = (e: React.ChangeEvent<HTMLInputElement>, options: number) => {
    const { value } = e.target;
    if (+value <= options && value !== '0') {
      setNumberOfOptions(value);
    }
  };
  const handleBlurOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setNumberOfOptions(1);
    }
  };

  const renderListInputOptions = () => {
    if (typeParams === 'polling') {
      return (
        <NumberInputResult
          handleAddNumberResults={() => handleAddNumberOptions(listOptionsPolling)}
          handleSubtractNumberResults={handleSubtractNumberOptions}
          defaultNumber={numberOfOptions}
          label="numberOfOptionsEachParticipantCanVote"
          minusColor={+numberOfOptions === 1 ? '#E3E3E2' : '#575655'}
          plusColor={+numberOfOptions >= listOptionsPolling.length ? '#E3E3E2' : '#575655'}
          onChange={(e) => handleNumberOptions(e, listOptionsPolling.length)}
          onBlur={handleBlurOption}
        />
      );
    }
    if (typeParams === 'up_vote') {
      return (
        <NumberInputResult
          handleAddNumberResults={() => handleAddNumberOptions(listOptionsUpVote)}
          handleSubtractNumberResults={handleSubtractNumberOptions}
          defaultNumber={numberOfOptions}
          label="numberOfOptionsEachParticipantCanVote"
          minusColor={+numberOfOptions === 1 ? '#E3E3E2' : '#575655'}
          plusColor={+numberOfOptions >= listOptionsUpVote.length ? '#E3E3E2' : '#575655'}
          onChange={(e) => handleNumberOptions(e, listOptionsUpVote.length)}
          onBlur={handleBlurOption}
        />
      );
    }
  };

  const handleUploadDatasource = (datasource: any) => {
    dispatch(setDataSource({ ...datasource, id }));
  };
  const handleLoadOptionFromDatasource = (options: any) => {
    if (!['polling', 'up_vote'].includes(typeParams || '')) {
      return;
    }

    if (options.length === 0 || options.toString() === '') return;

    const defaultNumOptForPolling = 3;
    const defaultNumOptForUpVote = 2;

    const numOpt = typeParams === 'polling' ? defaultNumOptForPolling : defaultNumOptForUpVote;

    let cloneOptions: any = [...options];
    if (options.length > 100) {
      cloneOptions = options.slice(0, 100);
    } else if (options.length < numOpt) {
      cloneOptions.length = numOpt;
      cloneOptions.fill('', options.length, numOpt);
    }

    const nextOption = cloneOptions.map((opt: any) => {
      return {
        id: uuidv4(),
        value: opt,
        isLoop: true,
        status: null,
      };
    });

    if (typeParams === 'polling') {
      setListOfOptionsPollingCP2([
        ...nextOption,
        listOfOptionsPollingCP2[listOfOptionsPollingCP2.length - 1],
      ]);
      return;
    }

    if (typeParams === 'up_vote') {
      setListOfOptionsUpVote([...nextOption, listOfOptionsUpVote[listOfOptionsUpVote.length - 1]]);
    }
  };

  useEffect(() => {
    let prevNode;
    if (currentIndex === -1) {
      prevNode = nodeContent[nodeContent.length - 1];
    } else {
      prevNode = nodeContent[currentIndex - 1];
    }
    if (prevNode) {
      if (isDisableCalendar) {
        currentValidateStates.startTimeValidate = {
          type: 'WARN',
          message: L('endTimeGreaterThanStartTime'),
        };
      } else if (!!timeStart && !!prevNode.endTime && prevNode.endTime > timeStart) {
        currentValidateStates.startTimeMoreEndTime = {
          type: 'WARN',
          message: L('startGreaterThanEndTime'),
        };
      } else {
        currentValidateStates.startTimeMoreEndTime = null;
        currentValidateStates.startTimeValidate = null;
        currentValidateStates.endTimeValidate = null;
      }
    }
    setValidates(currentValidateStates);
  }, [timeStart]);

  useEffect(() => {
    if (isDisableCalendar) {
      currentValidateStates.endTimeValidate = {
        type: 'WARN',
        message: L('endTimeGreaterThanStartTime'),
      };
    } else {
      currentValidateStates.startTimeValidate = null;
      currentValidateStates.endTimeValidate = null;
    }
    setValidates(currentValidateStates);
  }, [timeEnd]);

  useEffect(() => {
    const nameTags = listOfOptionsUpVote.map((item) => item.value);
    const isDuplicate = new Set(nameTags).size !== nameTags.length;
    setHasErrorOptions(isDuplicate);
  }, [listOfOptionsUpVote]);

  useEffect(() => {
    const nameTags = listOfOptionsPollingCP2.map((item) => item.value);
    const isDuplicate = new Set(nameTags).size !== nameTags.length;
    setHasErrorOptions(isDuplicate);
  }, [listOfOptionsPollingCP2]);

  useEffect(() => {
    const foundNode =
      nodeContent.find((node: { id: string | undefined }) => node.id === typeId) || {};
    const listOptionStoreUpVote = foundNode.option ? foundNode.option : defaultListOfOptionsUpVote;
    const listOptionStoreCP2 = foundNode.option ? foundNode.option : defaultListOfOptionsPollingCP2;
    const listOptionStoreCP3 = foundNode.option
      ? foundNode.option
      : defaultListOfOptionsSingleChoice;
    const listOptionStoreSingleChoice = foundNode.option
      ? foundNode.option
      : defaultListOfOptionsVeto;
    const listFiles = foundNode.dataFile ? foundNode.dataFile : '';
    const numberOfOptions = foundNode.numberOfOption ? foundNode.numberOfOption : 1;

    setTimeStart(foundNode?.startTime || undefined);
    setTimeEnd(foundNode?.endTime || undefined);
    setSelectedFileList(listFiles);
    setListOfOptionsUpVote(listOptionStoreUpVote);
    setListOfOptionsPollingCP2(listOptionStoreCP2);
    setListOfOptionsSingleChoice(listOptionStoreCP3);
    setListOfOptionsVeto(listOptionStoreSingleChoice);
    setValueTextArea(foundNode.textArea || '');
    setNumberOfOptions(numberOfOptions);
  }, [currentStep]);

  useEffect(() => {
    let listOptions;
    if (typeParams === 'polling') {
      listOptions = listOfOptionsPollingCP2;
    } else if (typeParams === 'up_vote') {
      listOptions = listOfOptionsUpVote;
    } else if (typeParams === 'single_choice') {
      listOptions = listOfOptionsSingleChoice;
    } else if (typeParams === 'veto') {
      listOptions = listOfOptionsVeto;
    }

    const data: any = handleCreateData(listOptions);
    dispatch(setConfigCheckpoints(data));
  }, [
    listOfOptionsPollingCP2,
    listOfOptionsSingleChoice,
    listOfOptionsUpVote,
    listOfOptionsVeto,
    valueTextArea,
    thresholdValue,
    timeStart,
    timeEnd,
    numberOfOptions,
    selectedFileList,
  ]);

  const renderOption = () => {
    if (typeParams === 'polling') {
      return (
        <>
          {listOfOptionsPollingCP2?.map((option: MethodVoteOptionType, index: number) => {
            return (
              option.isLoop && (
                <div key={option.id.toString()}>
                  <CustomInput
                    className="flex flex-col gap-[6px]"
                    label={LF('$(0) $(1)', L('option'), String(index < 4 ? index + 1 : index))}
                    childrenClassName="flex gap-2"
                    validate={option.status}
                  >
                    <Input
                      classes={`voting-method-input ${handleBorderStatus(option)} ${
                        option.value?.trim() &&
                        isExitName(option.value, index, listOfOptionsPollingCP2)
                          ? 'border-yellow-version-5'
                          : ''
                      }`}
                      value={option.value}
                      placeholder="Placeholder"
                      onChange={(e) => {
                        handleInputChange(option.id, e);
                      }}
                    />
                    {index > 2 && (
                      <div
                        id={`${option.id}`}
                        className="trash-can-button"
                        onClick={() => handleRemoveOption(option.id)}
                      >
                        <TrashCan />
                      </div>
                    )}
                  </CustomInput>
                  {option.value?.trim() &&
                    isExitName(option.value, index, listOfOptionsPollingCP2) && (
                      <div className="flex items-center gap-8px">
                        <WarningIcon />
                        <span className="text-emph-caption-1 text-grey-version-5">
                          {L('allOptionsName')}
                        </span>
                      </div>
                    )}
                </div>
              )
            );
          })}
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
        </>
      );
    }
    if (typeParams === 'single_choice_vote') {
      return (
        <>
          {listOfOptionsSingleChoice?.map((option: MethodVoteOptionType, index: number) => {
            return (
              option.isLoop && (
                <>
                  <CustomInput
                    className="flex flex-col gap-[6px]"
                    label={LF('$(0) $(1)', L('option'), String(index < 4 ? index + 1 : index))}
                    childrenClassName="flex gap-2"
                    key={option.id.toString()}
                    validate={option.status}
                  >
                    <Input
                      classes={`voting-method-input ${handleBorderStatus(option)} ${
                        option.value?.trim() &&
                        isExitName(option.value, index, listOfOptionsSingleChoice)
                          ? 'border-yellow-version-5'
                          : ''
                      }`}
                      value={option.value}
                      placeholder="Placeholder"
                      onChange={(e) => handleInputChange(option.id, e)}
                    />
                  </CustomInput>
                  {option.value?.trim() &&
                    isExitName(option.value, index, listOfOptionsSingleChoice) && (
                      <div className="flex items-center gap-8px">
                        <WarningIcon />
                        <span className="text-emph-caption-1 text-grey-version-5">
                          {L('allOptionsName')}
                        </span>
                      </div>
                    )}
                </>
              )
            );
          })}
        </>
      );
    }
    if (typeParams === 'up_vote') {
      return (
        <>
          {listOfOptionsUpVote?.map((option: MethodVoteOptionType, index: number) => {
            return (
              option.isLoop && (
                <>
                  <CustomInput
                    className="flex flex-col gap-[6px]"
                    label={LF('$(0) $(1)', L('option'), String(index < 2 ? index + 1 : index))}
                    childrenClassName="flex gap-2"
                    key={option.id.toString()}
                    validate={option.status}
                  >
                    <Input
                      classes={`voting-method-input ${handleBorderStatus(option)} ${
                        option.value?.trim() && isExitName(option.value, index, listOfOptionsUpVote)
                          ? 'border-yellow-version-5'
                          : ''
                      }`}
                      value={option.value}
                      placeholder="Placeholder"
                      onChange={(e) => {
                        handleInputChange(option.id, e);
                      }}
                    />
                    {index > 0 && (
                      <div
                        id={`${option.id}`}
                        className="trash-can-button"
                        onClick={() => handleRemoveOption(option.id)}
                      >
                        <TrashCan />
                      </div>
                    )}
                  </CustomInput>
                  {option.value?.trim() && isExitName(option.value, index, listOfOptionsUpVote) && (
                    <div className="flex items-center gap-8px">
                      <WarningIcon />
                      <span className="text-emph-caption-1 text-grey-version-5">
                        {L('allOptionsName')}
                      </span>
                    </div>
                  )}
                </>
              )
            );
          })}
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
        </>
      );
    }
    if (typeParams === 'veto') {
      return (
        <CustomInput
          childrenClassName="border-none"
          label={L('option1')}
          validate={listOfOptionsVeto[0].status}
        >
          <Input
            classes={`w-full bg-grey-version-3 ${handleBorderStatus(listOfOptionsVeto[0])}`}
            value={listOfOptionsVeto[0].value}
            onChange={(e) => handleInputChange(listOfOptionsVeto[0].id, e)}
            disabled
          />
        </CustomInput>
      );
    }
  };

  return (
    <SectionWrapper>
      <div className="pt-[56px] w-full">
        <div className="flex justify-between items-center">
          <div className="text-[34px] leading-[41px] tracking-[0.374px] text-[#252422]">
            <span>{currentNode?.name}</span>
          </div>
          <div className="flex text-[#5D23BB] leading-22px gap-1 cursor-pointer">
            <div>
              <EyeIcon />
            </div>
            <div className="text-[17px]" onClick={() => setOpen(true)}>
              <span>{L('viewCheckpointSettings')}</span>
            </div>
          </div>
        </div>
        <div className="pt-[25.5px] text-[#575655] text-[16px] leading-[21px] tracking-[0.5px] ">
          <span>{L('informationNoLaterThanTheStartTimeOfEachCheckpoint')}</span>
        </div>
        <div>
          <div className="pt-[32px] text-[#575655] text-[16px] leading-[21px] tracking-[0.5px] ">
            <span>{L('informationSupportingTheDecision')}</span>
          </div>
          <div />
        </div>
        <div id="my-editor" className=" h-full w-full rounded-[9px] focus:outline-none mt-[9.05px]">
          <Tooltip
            className="tooltip-help-info"
            placement="right"
            title={<div style={{ color: 'black' }}>{L('processOfThisMultiLinkedProposal')}</div>}
            color="#fff"
            trigger={['click']}
          >
            <TextEditor setValue={handleChangeInput} value={valueTextArea} />
          </Tooltip>
        </div>
        <div className="pt-[24px]">
          <div className="flex flex-wrap items-center gap-4 mb-[24px]">
            {Array.from(selectedFileList).map((file, index: number) => (
              <div
                className="flex items-center gap-1"
                key={index.toString() + Math.floor(Math.random() * 100000)}
              >
                <p className="flex items-center justify-center w-[230px] rounded-full bg-secondary-color border-1.5 gap-2 px-5 py-[13px]">
                  <AttachIcon />
                  <span className="truncate max-w-[80%]">{file?.name}</span>
                </p>
                <div className="cursor-pointer" onClick={() => handleDeleteFileAttach(index)}>
                  <DeleteIcon />
                </div>
              </div>
            ))}
          </div>
          <input
            type="file"
            id="file"
            ref={fileRef}
            accept=".doc,.docx,.pptx,image/jpeg,image/png,image/gif,image/svg+xml,.csv,.xlsx"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
            multiple
          />
          <Button
            variant="outline"
            className="h-16 bg-secondary-color border-[1.5px] border-[#E3E3E2] mb-8 w-full"
            onClick={handleClickAttach}
          >
            <div className="flex items-center gap-2">
              <AttachIcon />
              <p className="text-lg text-grey-version-7 font-medium">{L('attachDocuments')}</p>
            </div>
          </Button>
        </div>
        {/* is the first checkpoint */}
        {orderCp === 0 && (
          <>
            <div className="text-[22px] font-semibold leading-[28px] tracking-[0.35px] text-[#252422] pt-[22px]">
              <span>{L('votingOptions')}</span>
            </div>
            <div className="gap-4 pt-[16px] pb-[14px] flex flex-col h-full w-full">
              {renderOption()}
            </div>
          </>
        )}
        {orderCp === 0 &&
          typeParams !== 'single_choice_vote' &&
          typeParams !== 'veto' &&
          renderListInputOptions()}
        <div
          className={`${
            typeParams !== 'single_choice_vote' &&
            typeParams !== 'veto' &&
            typeParams !== 'polling' &&
            'pt-[51px]'
          }`}
        >
          <div className="text-[22px] font-semibold leading-[28px] tracking-[0.35px] text-[#252422]">
            <span>{L('votingDuration')}</span>
          </div>
          <div>
            <div className="pt-4 flex">
              <div className="w-[50%] pr-[6px]">
                <div className=" pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
                  <p>{L('startTime')}</p>
                </div>
                <div className="flex justify-between" />
                <div className="h-[60px]">
                  <CustomInput
                    className="relative"
                    childrenClassName="border-none"
                    validate={
                      validates.allowedBy ||
                      validates.startTimeValidate ||
                      validates.startTimeMoreEndTime
                    }
                  >
                    <CommonDateTimePicker
                      className={`flex justify-center items-center border-1.5 ${
                        !validates.allowedBy &&
                        !validates.startTimeValidate &&
                        !validates.startTimeMoreEndTime
                          ? 'border-grey-version-3'
                          : 'border-yellow-version-5'
                      } rounded-8 h-[57px] p-[16px] w-full mt-2`}
                      suffixIcon={<TimeIcon />}
                      defaultDate={timeStart}
                      id={`startTime-${typeId}`}
                      onChange={(date: Dayjs | null | undefined) => {
                        if (!date) {
                          setTimeStart(null);
                        } else {
                          setTimeStart(date);
                          currentValidateStates.startTimeValidate = null;
                          currentValidateStates.allowedBy = null;
                        }
                      }}
                    />
                  </CustomInput>
                </div>
              </div>

              <div className="w-[50%] pl-[6px]">
                <div className="pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
                  <p>{L('endTime')}</p>
                </div>
                <div className="flex justify-between" />
                <div className="h-[60px]">
                  <CustomInput
                    className="relative"
                    childrenClassName="border-none"
                    validate={validates.endTimeValidate || validates.allowedRoles}
                  >
                    <CommonDateTimePicker
                      className={`flex justify-center items-center border-1.5 ${
                        !validates.endTimeValidate && !validates.allowedRoles
                          ? 'border-grey-version-3'
                          : 'border-yellow-version-5'
                      } rounded-8 h-[57px] p-[16px] w-full mt-2`}
                      suffixIcon={<TimeIcon />}
                      id={`endTime-${typeId}`}
                      defaultDate={timeEnd}
                      onChange={(date: Dayjs | null | undefined) => {
                        if (!date) {
                          setTimeEnd(null);
                        } else {
                          setTimeEnd(date);
                          currentValidateStates.endTimeValidate = null;
                          currentValidateStates.allowedRoles = null;
                        }
                      }}
                    />
                  </CustomInput>
                </div>
              </div>
            </div>
            <div className="flex justify-end py-8 w-full mt-6">
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
                    className="w-[168px] h-[63px] text-text_3 leading-line-semi-letter tracking flex justify-center items-center text-grey-version-7 border-1.5 border-grey-version-3 tracking-one font-medium"
                    onClick={handleValidates}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalDatasource && (
          <Modal isOpen={isModalDatasource} onClose={isCloseModalDataSource}>
            <LinkDatasource
              setIsModalDatasource={setIsModalDatasource}
              datasource={datasource.find((i: IOptionDataSource) => i.id === typeId)}
              handleUploadDatasource={handleUploadDatasource}
              handleLoadOptionFromDatasource={handleLoadOptionFromDatasource}
            />
          </Modal>
        )}
      </div>

      <Drawer placement="right" onClose={onClose} open={open} closable={false}>
        <div className="">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="w-[40.71px] border-[#BBBBBA] h-[40.71px] rounded-[113.087px] flex items-center justify-center"
              onClick={onClose}
            >
              <XButton />
            </Button>
          </div>
          <div className="pt-[40px]">
            <ContentDrawerReviewCheckpoint
              iconProps={ICON_LIST_V2}
              dataArray={dataReviewCheckPoint}
              nodeInfo={currentNode}
              path={newPathname}
            />
          </div>
        </div>
      </Drawer>
    </SectionWrapper>
  );
};

export default NodeContent;
