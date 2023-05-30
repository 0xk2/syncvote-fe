import AttachIcon from '@assets/icons/svg-icons/AttachIcon';
import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';
import React, { useRef, useState } from 'react';
import WarningIcon from '@assets/icons/svg-icons/WarningIcon';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBasicInfo,
  setIsProgress,
  updateCompletedSteps,
} from '@redux/reducers/proposal.reducer';
import { RootState } from '@redux/store';
import TextEditor from '@components/Editor/TextEditor';
import DeleteIcon from '@assets/icons/svg-icons/DeleteIcon';
import SectionWrapper from './commons/SectionWrapper';

const BasicInfo = () => {
  const navigate = useNavigate();

  const { basicInfo } = useSelector((state: RootState) => state.proposal);
  const dispatch = useDispatch();

  const [titleValue, setTitleValue] = useState(basicInfo.decisionTitle);
  const [descriptionValue, setDescriptionValue] = useState(basicInfo.description);
  const [validate, setValidate] = useState(true);
  const { currentStep, setCurrentStep } = useOutletContext<any>();
  const [selectedFileList, setSelectedFileList] = useState<FileList | File[]>(
    basicInfo.listOfFiles,
  );
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleTitleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const handleDescriptionValueChange = (event: string): void => {
    setDescriptionValue(event);
  };

  const handleValidateInput = () => {
    const validateCondition = /^.{1,255}$/;
    if (titleValue.match(validateCondition)) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  const handleValidate = () => {
    handleValidateInput();
    if (validate) {
      dispatch(
        setBasicInfo({
          decisionTitle: titleValue,
          description: descriptionValue,
          listOfFiles: selectedFileList,
        }),
      );

      dispatch(setIsProgress(true));
      dispatch(updateCompletedSteps(currentStep));

      setCurrentStep((prev: number) => prev + 1);
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.PARTICIPANTS}`);
    }
  };

  const handleValidateStatus = () => {
    if (titleValue.length > 255) {
      return 'border-yellow-version-5';
    }
    return '';
  };

  const handleClick = () => {
    fileRef.current?.click();
  };
  const handleDeleteFileAttach = (indexFileRemove: number) => {
    const fileAttach = Array.from(selectedFileList).filter(
      (file, index: number) => index !== indexFileRemove,
    );
    setSelectedFileList(fileAttach);
  };
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }
    setSelectedFileList([...selectedFileList, ...event.target.files]);
  };

  const handleBackBtn = () => {
    navigate('/');
  };

  return (
    <SectionWrapper className="flex flex-col p-24px mt-32px">
      <div className="flex flex-col gap-16px mb-7">
        <h3 className="text-emph-large-title text-grey-version-6">{L('addBasicInfo')}</h3>
      </div>
      <div className="mb-1">
        <p className="text-sm">{L('decisionTitle')}</p>
      </div>
      <div className="flex flex-col mb-6 gap-8px">
        <input
          className={`basic-info-input ${handleValidateStatus()}`}
          type="text"
          placeholder={L('enterTitle')}
          value={titleValue}
          onChange={handleTitleValueChange}
        />
        {titleValue.length > 255 && (
          <div className="flex items-center gap-8px">
            <WarningIcon />
            <span className="w-full text-emph-caption-1 text-grey-version-5">
              {L('maximumInputLengthIs255Characters')}
            </span>
          </div>
        )}
      </div>
      <div className="mb-1">
        <p className="text-sm">{L('description')}</p>
      </div>
      <div id="my-editor">
        <TextEditor value={descriptionValue} setValue={handleDescriptionValueChange} />
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
      <div className="flex flex-wrap items-center gap-4 mb-[24px] pt-5">
        {Array.from(selectedFileList).map((file, index: number) => (
          <>
            <p
              key={index.toString() + file.name}
              className="flex justify-center items-center w-[230px] rounded-full bg-secondary-color border-1.5 gap-2 px-[16px] py-[13px]"
            >
              <AttachIcon />
              <span className="truncate max-w-[80%]">{file?.name}</span>
            </p>
            <div className="cursor-pointer" onClick={() => handleDeleteFileAttach(index)}>
              <DeleteIcon />
            </div>
          </>
        ))}
      </div>
      <Button
        variant="outline"
        className="h-16 bg-secondary-color border-1.5 mb-8"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <AttachIcon />
          <p className="text-lg text-grey-version-7 font-medium">{L('attachDocuments')}</p>
        </div>
      </Button>
      <div className="flex w-full justify-end items-center gap-6">
        <Button
          variant="text"
          className="border-1.5 border-grey-version-3 text-[#252422] text-text_3 h-[63px] leading-[25px] tracking-[0.38px] py-5 px-4 w-[168px]"
          onClick={handleBackBtn}
        >
          <p>{L('back')}</p>
        </Button>
        <Button
          variant="text"
          className="border-1.5 border-grey-version-3 text-text_3 h-[63px] leading-[25px] tracking-[0.38px] py-5 px-4 w-[168px]"
          disabled={(titleValue?.length === 0 || titleValue?.length > 255) && true}
          onClick={handleValidate}
        >
          <p>{L('continue')}</p>
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default BasicInfo;
