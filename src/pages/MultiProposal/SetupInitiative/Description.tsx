import EyeIcon from '@assets/icons/svg-icons/EyeIcon';
import { L } from '@utils/locales/L';
import TextEditor from '@components/Editor/TextEditor';
import AttachIcon from '@assets/icons/svg-icons/AttachIcon';
import DeleteIcon from '@assets/icons/svg-icons/DeleteIcon';
import Button from '@components/Button/Button';
import React, { MutableRefObject } from 'react';

type Props = {
  name: string;
  description?: string;
  attachments?: FileList | File[];
  fileRef: MutableRefObject<HTMLInputElement | null>;
  setIsOpenSideBar(value: boolean): void;
  handleChangeDescription(value: string): void;
  handleDeleteFileAttach(indexFileRemove: number): void;
  handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
  handleClickAttach(): void;
};

function Description(props: Props) {
  const {
    name,
    handleChangeDescription,
    description,
    attachments = [],
    fileRef,
    setIsOpenSideBar,
    handleDeleteFileAttach,
    handleFileInputChange,
    handleClickAttach,
  } = props;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-[34px] leading-[41px] tracking-[0.374px] text-[#252422]">
          <span>{name}</span>
        </div>
        <div className="flex text-[#5D23BB] leading-22px gap-1 cursor-pointer">
          <div>
            <EyeIcon />
          </div>
          <div className="text-[17px]" onClick={() => setIsOpenSideBar(true)}>
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
        <TextEditor setValue={handleChangeDescription} value={description} />
      </div>
      <div className="pt-[24px]">
        <div className="flex flex-wrap items-center gap-4 mb-[24px]">
          {Array.from(attachments).map((file, index: number) => (
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
    </>
  );
}

export default Description;
