import { L } from '@utils/locales/L';

interface Props {
  setIsModalPreview: (value: boolean) => void;
  previewData: string[][];
  handleRemoveOptions: (value: string[][]) => void;
}

function PreviewOptionUploaded(props: Props) {
  const { setIsModalPreview, previewData, handleRemoveOptions } = props;

  const handleRemove = (indexRemove: number) => {
    const nextDataFileList = previewData.filter((_, index) => index !== indexRemove);
    handleRemoveOptions(nextDataFileList);

    // close modal
    if (nextDataFileList.length === 0) {
      setIsModalPreview(false);
    }
  };

  return (
    <div className="container w-[600px] rounded-[36px]">
      <div className="flex justify-between items-center mb-[34px]">
        <div className="text-[#252422] text-2xl font-semibold ">{L('preview')}</div>
        <div
          className="w-[40px] h-[40px] rounded-full text-center leading-[40px] border-2 border-solid border-[#BCBCBB] cursor-pointer relative"
          onClick={() => setIsModalPreview(false)}
        >
          <span className="absolute m-auto flex items-center justify-center left-0 top-0 right-0 bottom-0">
            X
          </span>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-solid border-b border-[#F6F6F6]">
            <td className="pl-4 pb-[14px] ">
              <div className="leading-[22px] border-solid border-r border-[#F6F6F6] pr-[33px]">
                {L('option')}
              </div>
            </td>
            <td className="pl-4 text-start pb-[14px]">Label</td>
          </tr>
        </thead>
        <tbody>
          {previewData.map((item: any, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index} className="border-b h-[55px] border-solid border-b-[#F6F6F6]">
              <td className="pl-4 text-[#252422] font-medium text-base">{index + 1}</td>
              <td className="pl-4 text-start text-[#252422] font-medium text-base">{item}</td>
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
              <td
                className="text-sm font-medium text-[#5D23BB] cursor-pointer"
                onClick={() => handleRemove(index)}
              >
                {L('remove')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreviewOptionUploaded;
