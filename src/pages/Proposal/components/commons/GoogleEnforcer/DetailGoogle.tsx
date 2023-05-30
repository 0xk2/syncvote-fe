import CommonSelectBox from '@components/SelectBox';
import React, { useRef, useState } from 'react';
import UpLoadIcon from '@assets/icons/svg-icons/UpLoadIcon';
import Button from '@components/Button/Button';
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import TextEditor from '@components/Editor/TextEditor';
import Modal from '@components/Modal/Modal';
import { IOptionDataSource } from 'types/proposal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setFileDataSource } from '@redux/reducers/proposal.reducer';
import { dataActions, DropdownOptionsSendTo } from './dataDropdown';
import SelectLabel from './SelectLable';
import ModalTemplate from './ModalTemplate';
import LinkDataSource from './LinkDatasource';

const DetailGoogle = ({ detail, handleChangeDetail, index }: any) => {
  const [emailContent, setEmailContent] = useState(detail.emailContent || '');
  const [titleInput, setTitleInput] = useState(detail.title || '');
  const [optionSendTo, setOptionSendTo] = useState(detail.sendTo || DropdownOptionsSendTo[3]);
  const [recipientAddress, setRecipientAddress] = useState(detail.recipientAddress || '');
  const [isModalUseTemplate, setIsModalUseTemplate] = useState(false);
  const [isModalLinkDataSource, setIsModalLinkDataSource] = useState(false);
  const [fileName, setFileName] = useState('');

  const dispatch = useDispatch();

  const datasource: IOptionDataSource[] = useSelector(
    (state: RootState) => state.checkNode.datasource,
  );

  const id = 'setup-enforcer';
  const fileRef = useRef<any>();
  const editorRef = useRef<any>(null);

  const handleSaveState = (item: any) => {
    if (item) {
      setTitleInput(item.title);
      setEmailContent(item.content);
      setIsModalUseTemplate(false);

      handleChangeDetail(index, 'title', item.title);
      handleChangeDetail(index, 'emailContent', item.content);
    }
  };

  const handleOptionSelect = (option: any) => {
    setOptionSendTo(option);
    handleChangeDetail(index, 'sendTo', option);
  };

  const handleLoadOptionFromDatasource = (options: any) => {
    if (options.length === 0 || options.toString() === '') return;
    setRecipientAddress(options);
    handleChangeDetail(index, 'recipientAddress', options);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.length) {
      const file = event.target.files[0];
      setFileName(file.name);
    }
  };

  const handleCloseIsModalTemplate = () => {
    setIsModalUseTemplate(false);
  };

  const handleCloseIsModalLinkDataSource = () => {
    setIsModalLinkDataSource(false);
  };

  const handleChangeEmailContent = (value: string): void => {
    setEmailContent(value);
    handleChangeDetail(index, 'emailContent', value);
  };

  const handleUploadDatasource = (datasource: any) => {
    dispatch(setFileDataSource({ ...datasource, id }));
  };

  const handleChooseTag = (tag: string) => {
    const separateText = editorRef.current.getCurrentContent().split('</p>');
    const initText = separateText?.[0];
    const lastText = separateText?.[separateText.length - 1];
    const tagDOM = `<span data-mce-noneditable contenteditable="false" class="mceNonEditable" 
      style="
        display: inline-block;
        max-width: 100%;
        padding: 4px;
        height: 24px;
        background: #EFE9F8;
        border-radius: 8px;
        color: #5D23BB;
        font-size: 16px;
        line-height: 17px;
        letter-spacing: 0.5px;
        cursor: pointer;
        user-select: none;
      outline: none;"
    >
      ${tag}
    </span>&nbsp`;
    const content = initText + tagDOM + lastText;
    setEmailContent(content);
  };

  return (
    <div className="border mt-4 p-4 bg-[#F6F6F6]">
      <div>
        <CommonSelectBox
          options={dataActions}
          colorPlaceholder="!text-[#252422]"
          defaultValue={dataActions[0]}
          borderClassName="border-none p-0"
        />
      </div>
      <div className="pt-4">
        <div className="text-[#575655] text-[16px] leading-[21px] tracking-[0.5px]">
          <span>Send to</span>
        </div>
        <div className="pt-2">
          <div>
            <CommonSelectBox
              options={DropdownOptionsSendTo}
              defaultValue={optionSendTo}
              borderClassName="bg-white"
              onChange={handleOptionSelect}
            />
          </div>
        </div>
        <div className="pt-4">
          <div className="text-[#575655] text-[16px] leading-[21px] tracking-[0.5px]">
            <span>Recipient address</span>
          </div>
          <div className="border mt-2 rounded-8">
            <textarea
              className="focus:outline-none w-full text-[16px] rounded-8 p-4"
              value={recipientAddress.toString().split(',').join(', ')}
              onChange={(e: any) => {
                setRecipientAddress(e.target.value);
                handleChangeDetail(index, 'recipientAddress', e.target.value);
              }}
            />
          </div>
        </div>
        <div className="pt-[15px] ">
          <Button
            startIcon={<UpLoadIcon />}
            children={`${fileName || 'Upload CSV file'}`}
            endIcon={
              <QuestionCircleIcon color={`${fileName ? '#5D23BB' : '#898988'}`} w="24px" h="24px" />
            }
            className="w-full border-1.5 bg-white h-[57px] text-text_3 leading-[25px] tracking-[0.38px] border-grey-version-3
              "
            variant="outline"
            onClick={() => setIsModalLinkDataSource(true)}
          />
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
          <>
            {isModalLinkDataSource && (
              <Modal isOpen={isModalLinkDataSource} onClose={handleCloseIsModalLinkDataSource}>
                {(optionSendTo.label === 'Send to Custom ' ||
                  optionSendTo.label === 'Send to All') && (
                  <LinkDataSource
                    setIsModalDatasource={setIsModalLinkDataSource}
                    datasource={datasource.find((i: IOptionDataSource) => i.id === id)}
                    handleUploadDatasource={handleUploadDatasource}
                    handleLoadOptionFromDatasource={handleLoadOptionFromDatasource}
                  />
                )}

                {(optionSendTo.label === 'Send to All Pass' ||
                  optionSendTo.label === 'Send to All Fail') && (
                  <LinkDataSource
                    setIsModalDatasource={setIsModalLinkDataSource}
                    content="Please make sure to input the correct column names when uploading your CSV file. Specifically, please provide the name of the column containing the options of the proposal, as well as the name of the column containing the email addresses associated with the proposal. This will allow our system to process your data correctly."
                    datasource={datasource.find((i: IOptionDataSource) => i.id === id)}
                    handleUploadDatasource={handleUploadDatasource}
                    handleLoadOptionFromDatasource={handleLoadOptionFromDatasource}
                  />
                )}
              </Modal>
            )}
          </>
        </div>
        <div className="text-center pt-[19px]">
          <span className="text-[#252422] text-[13px] leading-[18px] tracking-[0.6px]">
            Max 1500 recipients
          </span>
        </div>
        <div className="pt-[19px]">
          <div className="text-[#575655] text-[16px] leading-[21px] tracking-[0.5px]">
            <span>Title</span>
          </div>
          <div className="border mt-2 rounded-8">
            <input
              type="text"
              value={titleInput}
              className="focus:outline-none w-full text-[16px] rounded-8 p-4"
              onChange={(e: any) => {
                setTitleInput(e.target.value);
                handleChangeDetail(index, 'title', e.target.value);
              }}
            />
          </div>
        </div>
        <div className="pt-[22.5px]">
          <div className="flex justify-between items-center text-[#575655] text-[16px] leading-[21px] tracking-[0.5px]">
            <div>
              <span>Email content</span>
            </div>
            <div
              className="flex  justify-between items-center gap-1 text-[#5D23BB]"
              onClick={() => setIsModalUseTemplate(true)}
            >
              <div className="cursor-pointer">
                <PlusIcon />
              </div>
              <div className="text-[15px] cursor-pointer leading-[20px] tracking-[0.6px] ">
                <span>Use template</span>
              </div>
            </div>
            {isModalUseTemplate && (
              <Modal isOpen={isModalUseTemplate} onClose={handleCloseIsModalTemplate}>
                <ModalTemplate
                  handleCloseTemplate={setIsModalUseTemplate}
                  handleSaveState={handleSaveState}
                />
              </Modal>
            )}
          </div>
          <div className="bg-white mt-4 rounded-[10px]">
            <TextEditor ref={editorRef} value={emailContent} setValue={handleChangeEmailContent} />
          </div>
          <div className="pt-[15px]">
            <SelectLabel hasNote={false} handleChooseTag={handleChooseTag} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGoogle;
