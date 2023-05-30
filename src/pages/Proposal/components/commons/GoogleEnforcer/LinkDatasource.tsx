import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import clsx from 'clsx';

import UpLoadIcon from '@assets/icons/svg-icons/UpLoadIcon';
import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';
import DownLoadIcon from '@assets/icons/svg-icons/DownLoadIcon';
import CommonSelectBox from '@components/SelectBox';
import Toggle from '@components/ToggleV2/Toggle';
import fileDownload from 'js-file-download';

import { IOptionDataSource } from 'types/proposal';
import PreviewOptionUploaded from './Preview';

interface Props {
  datasource: IOptionDataSource | undefined;
  setIsModalDatasource: (value: boolean) => void;
  handleUploadDatasource: (value: IOptionDataSource) => void;
  handleLoadOptionFromDatasource: (value: string[]) => void;
  content?: string;
}

function LinkDataSource(props: Props) {
  const {
    setIsModalDatasource,
    datasource = {} as IOptionDataSource,
    handleUploadDatasource,
    handleLoadOptionFromDatasource,
    content,
  } = props;

  const [isModalPreview, setIsModalPreview] = useState(false);
  const [isIgnoreHeader, setIsIgnoreHeader] = useState(datasource.isIgnoreHeader || false);
  const [fileName, setFileName] = useState<string>(datasource.fileName);
  const [selectSheet, setSelectSheet] = useState<any>(datasource.sheetNames || []);
  const [activeSheet, setActiveSheet] = useState<any>(datasource.activeSheet);
  const [workbook, setWorkbook] = useState<any>(datasource.workbook);
  const [columnsOption, setColumnsOption] = useState(datasource.optionColumn || 'A');
  const [columnsOptionB, setColumnsOptionB] = useState(datasource.optionColumn || 'B');
  const [previewData, setPreviewData] = useState<string[][]>(datasource.optionsData || [[]]);

  const fileRef = useRef<HTMLInputElement | null>(null);

  function getPreviewData(
    wb: XLSX.WorkBook,
    sheetName: string,
    ignoreHeader: boolean,
    firstCol: string,
    secondCol?: string,
  ) {
    const worksheet = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 'A', blankrows: false });
    const data = rows
      .map((row: any) => {
        if (content && secondCol) {
          return [row[firstCol], row[secondCol]];
        }
        return [row[firstCol]];
      })
      .filter((row) => {
        return row[0] !== undefined;
      });

    return ignoreHeader ? data.slice(1) : data;
  }

  const handleDownload = async () => {
    const url =
      'https://docs.google.com/spreadsheets/d/1Tmz0Le17LIDTK_AoeW_S-1fe6CaTSyZPG48NJvcg7zo/edit?usp=sharing';

    const response = await fetch(url);

    const arrayBuffer = await response.arrayBuffer();
    const wb: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });

    const sheetName = wb.SheetNames[0];

    const worksheet = wb.Sheets[sheetName];

    const csv = XLSX.utils.sheet_to_csv(worksheet, { FS: '\t' });
    const filename = 'Template-MultiLink-Datasource.xlsx';
    const data = new Blob([csv], { type: 'application/vnd.ms-excel' });
    fileDownload(data, filename);
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        setFileName(file.name);
        setSelectSheet(sheetNameDropdown);
        setActiveSheet(sheetNameDropdown[0]);
        setWorkbook(wb);
        setPreviewData(
          getPreviewData(
            wb,
            sheetNameDropdown[0].label,
            isIgnoreHeader,
            columnsOption,
            columnsOptionB,
          ),
        );
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleOnChangeSheet = (sheetSelected: any) => {
    if (sheetSelected && sheetSelected.label !== activeSheet.label) {
      setActiveSheet(sheetSelected);

      setPreviewData(
        getPreviewData(
          workbook,
          sheetSelected?.label,
          isIgnoreHeader,
          columnsOption,
          columnsOptionB,
        ),
      );
    }
  };

  const handleChangeOptionColumn = (value: string) => {
    setColumnsOption(value.toUpperCase());
    if (activeSheet && workbook) {
      setPreviewData(
        getPreviewData(
          workbook,
          activeSheet.label,
          isIgnoreHeader,
          value.toUpperCase(),
          columnsOptionB,
        ),
      );
    }
  };

  const handleChangeSecondColumn = (value: string) => {
    setColumnsOptionB(value.toUpperCase());
    if (activeSheet && workbook) {
      setPreviewData(
        getPreviewData(
          workbook,
          activeSheet.label,
          isIgnoreHeader,
          columnsOption,
          value.toUpperCase(),
        ),
      );
    }
  };

  const handleOnClickPreview = () => {
    setIsModalPreview(!isModalPreview);
  };

  const handleOnchangeToggle = () => {
    setIsIgnoreHeader(!isIgnoreHeader);
    if (activeSheet && workbook) {
      setPreviewData(
        getPreviewData(workbook, activeSheet.label, !isIgnoreHeader, columnsOption, columnsOptionB),
      );
    }
  };

  useEffect(() => {
    if (content) {
      handleLoadOptionFromDatasource(previewData.map((item) => item[1]?.toString()));
    } else {
      handleLoadOptionFromDatasource(previewData.map((item) => item[0]?.toString()));
    }
  }, [previewData]);

  return (
    <div className="max-h-[70vh] overflow-scroll">
      <div className="container w-[610px] rounded-[36px]">
        {isModalPreview ? (
          <div className="max-h-[70vh] overflow-scroll h-[70vh]">
            <PreviewOptionUploaded
              content={content}
              setIsModalPreview={setIsModalPreview}
              previewData={previewData}
              handleRemoveOptions={setPreviewData}
            />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-[34px]">
              <div className="text-[#252422] text-2xl font-semibold ">
                <span>Upload recipients</span>
              </div>
              <div
                className="w-[40px] h-[40px] rounded-full text-center leading-[40px] border-2 border-solid border-[#BCBCBB] cursor-pointer relative"
                onClick={() => {
                  handleUploadDatasource({
                    fileName,
                    sheetNames: selectSheet,
                    activeSheet,
                    workbook,
                    optionColumn: columnsOption,
                    isIgnoreHeader,
                    optionsData: previewData,
                  });
                  if (content) {
                    handleLoadOptionFromDatasource(previewData.map((item) => item[1]?.toString()));
                  } else {
                    handleLoadOptionFromDatasource(previewData.map((item) => item[0]?.toString()));
                  }
                  setIsModalDatasource(false);
                }}
              >
                <span className="absolute m-auto flex items-center justify-center left-0 top-0 right-0 bottom-0">
                  X
                </span>
              </div>
            </div>
            <div>
              <input
                type="file"
                accept=".xlsx, .xls , .csv "
                id="file"
                multiple={false}
                ref={fileRef}
                hidden
                onChange={handleUploadFile}
              />
              <Button
                variant="outline"
                className={clsx(
                  'flex items-center w-full border-2 border-solid relative h-[58px] p-[16px] rounded-[8px]',
                  fileName ? 'hover:border-[#5D23BB] border-[#5D23BB]' : 'border-[#E3E3E2]',
                )}
                onClick={() => fileRef.current?.click()}
              >
                <div
                  className={clsx(
                    'flex items-center justify-center',
                    fileName
                      ? 'text-[#5D23BB] absolute w-full m-auto top-0 left-0 right-0 bottom-0'
                      : 'text-[#252422]',
                  )}
                >
                  <UpLoadIcon width="19" height="19" />
                  <div className="pl-1">{fileName || 'Upload Data'}</div>
                </div>
              </Button>
              {fileName ? (
                <div
                  className="flex justify-center items-center text-[#5D23BB] py-5 "
                  onClick={() => fileRef.current?.click()}
                >
                  <div className="cursor-pointer">
                    <UpLoadIcon width="19" height="19" />
                  </div>
                  <p className="pl-1 cursor-pointer">{L('replaceWithData')}</p>
                </div>
              ) : (
                <div className="flex justify-center items-center pt-8 gap-1">
                  <div className="cursor-pointer" onClick={handleDownload}>
                    <DownLoadIcon />
                  </div>
                  <div
                    className="text-[#5D23BB] cursor-pointer text-[15px] leading-[20px] tracking-[0.6px]"
                    onClick={handleDownload}
                  >
                    <span>Template </span>
                  </div>
                </div>
              )}
            </div>
            <div className="text-[16px] leading-[22px] text-[#252422] tracking-[0.5px] pb-[12px]">
              {content}
            </div>
            {fileName && (
              <>
                <div className="pt-12px">
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
                <div className="pt-[24px]">
                  <div className="pb-[8px]">
                    <span>Options (column)</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={columnsOption?.trim().toUpperCase()}
                      onChange={(e) => handleChangeOptionColumn(e.target.value)}
                      className="w-full h-[57px] flex justify-start items-center border-[1.5px] border-[#E3E3E2] rounded-8 px-3 focus:outline-none"
                    />
                  </div>
                </div>
                {content && (
                  <div className="py-[24px]">
                    <div className="pb-[8px]">
                      <span>Recipient email address (column)</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={columnsOptionB?.trim().toUpperCase()}
                        onChange={(e: any) => handleChangeSecondColumn(e.target.value)}
                        className="w-full h-[57px]
                          flex justify-start items-center
                          border-[1.5px] border-[#E3E3E2]
                          rounded-8 px-3 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <Button
                  variant="text"
                  className="flex justify-center items-center w-full border-[1.5px] border-[#E3E3E2] h-[58px] rounded-[8px] text-xl text-[#252422] p-0 mt-[24px]"
                  onClick={handleOnClickPreview}
                >
                  <div className="pl-1 text-[20px] leading-[25px] tracking-[0.38px]">
                    {L('preview')}
                  </div>
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LinkDataSource;
