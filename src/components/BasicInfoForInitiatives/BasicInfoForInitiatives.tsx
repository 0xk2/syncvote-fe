/* eslint-disable max-len */
import DataIcon from '@assets/icons/svg-icons/DataIcon';
import UpLoadIcon from '@assets/icons/svg-icons/UpLoadIcon';
import Button from '@components/Button/Button';
import PageWrapper from '@components/PageWrapper';
import {
  checkNode,
  setBasicInfoInitiative,
  setCreateInfo,
} from '@redux/reducers/check-node.reducer';
import { RootState } from '@redux/store';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { createRootLink } from '@utils/helpers';
import { L } from '@utils/locales/L';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Toggle from '@components/Toggle/Toggle';
import CommonSelectBox from '@components/SelectBox';
import { v4 as uuidv4 } from 'uuid';
import Option from './Option';

export default function BasicInfoForInitiatives() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basicInfo: any = useSelector((state: RootState) => state.checkNode.basicInfoInitiative);
  const createInfo: any = useSelector((state: RootState) => state.checkNode.createInfo);
  const [nameFileInput, setNameFileInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | undefined>(
    createInfo?.dataFile || undefined,
  );
  const [numberInput, setNumberInput] = useState<string>(createInfo?.numberProposal || '');
  const [proposalName, setProposalName] = useState<string>(createInfo?.proposalMultiLink || '');
  const [scanCV, setScanCV] = useState();
  const [interView, setInterView] = useState();
  const [cuturalFit, setCuturalFit] = useState();
  const [markingOffer, setMarkingOffer] = useState();
  const [isIgnoreHeader, setIsIgnoreHeader] = useState(createInfo?.isIgnoreHeaders || false);
  const [selectSheet, setSelectSheet] = useState<any>(createInfo.selectSheets || []);
  const [activeSheet, setActiveSheet] = useState<any>(createInfo.activeSheets);
  const [isDisable, setIsDisable] = useState(false);
  const [getItem, setGetItem] = useState([false, false, false, false]);

  useEffect(() => {
    setScanCV(basicInfo[0]);
    setInterView(basicInfo[1]);
    setCuturalFit(basicInfo[2]);
    setMarkingOffer(basicInfo[3]);
  }, [basicInfo]);
  useEffect(() => {
    setIsDisable(getItem.some((item) => !item) || !numberInput || !selectedFile || !proposalName);
  }, [numberInput, selectedFile, proposalName, getItem]);

  useEffect(() => {
    if (selectedFile) {
      setNameFileInput(selectedFile?.name);
    }
  }, [selectedFile]);

  const fileRef = useRef<any>();
  const fileExcelRef = useRef<any>();

  const handleAddDataFileExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileReader = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(fileReader, { type: 'array', cellDates: true });
        const sheetNameDropdown = wb.SheetNames.map((item) => ({
          id: uuidv4(),
          label: item,
        }));

        setNameFileInput(file.name);
        setSelectSheet(sheetNameDropdown);
        setActiveSheet(sheetNameDropdown[0]);
        setSelectedFile(file);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleButtonBack = () => {
    navigate(
      createRootLink([PAGE_ROUTES.INITIATIVE.ROOT, PAGE_ROUTES.INITIATIVE.REVIEW_CHECKPOINT]),
    );
  };

  const handleCreateData = () => ({
    id: '1',
    numberProposal: numberInput,
    dataFile: selectedFile,
    proposalMultiLink: proposalName,
    selectSheets: selectSheet,
    activeSheets: activeSheet,
    isIgnoreHeaders: isIgnoreHeader,
  });

  const handleButtonSaveDraft = () => {
    const payload: any = [scanCV, interView, cuturalFit, markingOffer];
    const dataInfo: any = handleCreateData();

    dispatch(setBasicInfoInitiative(payload));
    dispatch(setCreateInfo(dataInfo));
    dispatch(checkNode.actions.resetStore());

    navigate(`${PAGE_ROUTES.ROOT}`);
  };
  const handleButtonContinue = () => {
    const payload: any = [scanCV, interView, cuturalFit, markingOffer];
    const dataInfo: any = handleCreateData();

    dispatch(setBasicInfoInitiative(payload));
    dispatch(setCreateInfo(dataInfo));
    dispatch(checkNode.actions.resetStore());

    navigate(`/${PAGE_ROUTES.REVIEW_INITIATIVES}`);
  };

  const handleOnChangeSheet = (sheetSelected: any) => {
    if (sheetSelected && sheetSelected.label !== activeSheet.label) {
      setActiveSheet(sheetSelected);
    }
  };
  const handelInputNumber = (value: React.ChangeEvent<HTMLInputElement>) => {
    const valueNumber = value.target.value;
    setNumberInput(valueNumber);
  };

  const handelProposalNameInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    const valueProposalInput = value.target.value;
    setProposalName(valueProposalInput);
  };
  const handleOnchangeToggle = () => {
    setIsIgnoreHeader(!isIgnoreHeader);
  };
  const handleGetItem = (index: number) => {
    const nextListItem = [...getItem];
    nextListItem[index] = true;
    setGetItem(nextListItem);
  };

  return (
    <PageWrapper classes="flex-col h-screen container ">
      <div className="flex justify-center w-full mt-[83px]">
        <div className="w-[648px] p-6">
          <div className="w-[648px]">
            <div className="text-[34px] leading-[41px] tracking-[0.374px] text-[#252422]">
              <span>{L('addBasicInfoForInitiatives')}</span>
            </div>
            <div className="pt-4 text-[16px] leading-[21px] tracking-0.5px">
              <span>
                {L('atTheSameTime')}
                <a
                  className="text-[#5048BC]"
                  href="https://hectagondao.notion.site/Hectagon-Dapp-Manual-Doc-724da305b9664c8e89b62881adc6c2f9"
                  target="_blank"
                  rel="noreferrer"
                >
                  {` ${L('manualDoc')} `}
                </a>
                {L('or')}
                <a
                  href="https://docs.google.com/spreadsheets/d/1Si1sCRof6cI836zKJxcopziJGjF6KiL-mTR8jEb4w6w/edit#gid=2096294204"
                  className="text-[#5048BC]"
                  target="_blank"
                  rel="noreferrer"
                >
                  {` ${L('templateDatabase')} `}
                </a>
                {L('beforeProceed')}
              </span>
            </div>
          </div>
          <div className="pt-[32px]">
            <div className="text-[16px] leading-[21px] pb-[9.05px] tracking-0.5px text-[#575655]">
              <span>{L('numberOfMultiLinkedProposals')}</span>
            </div>
            <div className="w-[648px] h-[65.19px] p-[18.094px] border border-[#E3E3E2] rounded-[9.04698px] text-[20px]">
              <input
                type="text"
                placeholder={L('multiLinkedProposals')}
                className="w-[611.81px] focus:outline-none"
                onChange={(event) => handelInputNumber(event)}
                value={numberInput}
              />
            </div>
          </div>
          <div className="pt-[32px] w-[648px]">
            <div className="flex justify-between">
              <div className="text-[16px] leading-[21px] tracking-0.5px text-[#575655]">
                <span>{L('addDatabase')}</span>
              </div>
              <div
                className="flex justify-between gap-1 text-[#5D23BB] hover:cursor-pointer"
                onClick={() => fileExcelRef.current?.click()}
              >
                <div>
                  <DataIcon />
                </div>
                <input
                  type="file"
                  ref={fileExcelRef}
                  accept=".xlsx, .xls , .csv "
                  hidden
                  onChange={handleAddDataFileExcel}
                />
                <div>
                  <span>{L('addDatabase')}</span>
                </div>
              </div>
            </div>
            <div className="pt-[12.05px]">
              <div className="w-[648px] h-[65.19px] p-[18.094px] border border-[#E3E3E2] pb-[9.05px] rounded-[9.04698px] flex justify-between text-[20px]">
                <div>
                  <input
                    type="text"
                    className="w-[500px] focus:outline-none"
                    value={nameFileInput}
                    placeholder={L('uploadDatabase')}
                  />
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileRef}
                    hidden
                    placeholder={L('uploadDatabase')}
                    onChange={handleAddDataFileExcel}
                    className="w-[584.67px] focus:outline-none"
                  />
                </div>
                <div className="hover:cursor-pointer" onClick={() => fileRef.current?.click()}>
                  <UpLoadIcon width="22.62px" height="22.62px" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[648px]">
            <div className="pt-32px">
              <div className="text-[16px] leading-[21px] pb-[9.05px] tracking-0.5px text-[#575655]">
                <span>Select sheet in the database</span>
              </div>
              <div className="border rounded-8 flex">
                <CommonSelectBox
                  options={selectSheet}
                  defaultValue={activeSheet}
                  onChange={handleOnChangeSheet}
                />
              </div>
            </div>
            <div className="flex justify-between pt-[24px]">
              <div className="text-[16px] leading-[21px] tracking-0.5px ">
                <span>Column contains header?</span>
              </div>
              <div className="flex gap-2">
                <div className="text-[17px] leading-[22px] tracking-0.5px text-[#272422]">
                  <span>{isIgnoreHeader ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <Toggle
                    className="border-[1px] w-[34px] h-[20px] rounded-[20px] relative"
                    offColorButton="grey-version-3"
                    onColorButton="violet-version-5"
                    buttonClass="w-[16px] h-[16px] absolute top-[1px] left-[1px]"
                    onChange={handleOnchangeToggle}
                    isChecked={isIgnoreHeader}
                    transClass="translate-x-[14px] translate-y-0 left-[100%] top-0"
                  />
                </div>
              </div>
            </div>
            <div className="text-[13px] leading-[18px] tracking-[0.6px] text-[#252422] pt-[4px]">
              <span>Enable this to ignore value of the header row</span>
            </div>
          </div>
          <div className="pt-[32px]">
            <div className="text-[16px] leading-[21px] pb-[9.05px] tracking-0.5px text-[#575655]">
              <span>Multi-linked proposals name (column)</span>
            </div>
            <div className="w-[648px] h-[65.19px] p-[18.094px] border border-[#E3E3E2] rounded-[9.04698px] text-[20px]">
              <input
                type="text"
                value={proposalName}
                onChange={handelProposalNameInput}
                placeholder="A"
                className="w-[611.81px] focus:outline-none"
              />
            </div>
          </div>

          <div className="border-b border-primary_logo w-[648px] pt-[24px]" />

          <Option
            basicInfo={scanCV}
            id="1"
            onchangeData={(item: any) => setScanCV(item)}
            areAllFieldsFilleds={() => handleGetItem(0)}
          />
          <Option
            basicInfo={interView}
            id="2"
            onchangeData={(item: any) => setInterView(item)}
            areAllFieldsFilleds={() => handleGetItem(1)}
          />
          <Option
            basicInfo={cuturalFit}
            id="3"
            onchangeData={(item: any) => setCuturalFit(item)}
            areAllFieldsFilleds={() => handleGetItem(2)}
          />
          <Option
            basicInfo={markingOffer}
            id="4"
            onchangeData={(item: any) => setMarkingOffer(item)}
            areAllFieldsFilleds={() => handleGetItem(3)}
          />

          <div className="bg-[#F6F6F6] w-[648px] py-4 px-2 mt-[35px]">
            <span className="text-[#575655] text-[16px] leading-[21px] tracking-[0.5px]">
              In the multi-linked proposals automatically created feature, the enforcer is not able
              to auto-created
            </span>
          </div>
          <div className="flex justify-end gap-6 mt-10 w-[648px]">
            <Button
              children={L('back')}
              variant="outline"
              className="w-[168px] h-[60px] text-text_3 leading-[25px] border-1.5 border-grey-version-3 tracking-[0.38px]"
              onClick={handleButtonBack}
            />

            <Button
              children={L('saveDraft')}
              variant="outline"
              className="w-[168px] h-[60px] text-text_3 border-1.5 border-grey-version-3 leading-[25px] tracking-[0.38px]"
              onClick={handleButtonSaveDraft}
            />

            <Button
              children={L('continue')}
              variant="outline"
              disabled={isDisable}
              className="w-[168px] h-[60px] text-text_3 border-1.5 border-grey-version-3 leading-[25px] tracking-[0.38px]"
              onClick={handleButtonContinue}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
