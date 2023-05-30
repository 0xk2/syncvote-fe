import React from 'react';
import XButton from '@assets/icons/svg-icons/XButton';
import Button from '@components/Button/Button';

interface Props {
  closeModal?: any;
  title?: string;
  onChooseImage?: (image: any) => void;
}

interface ItemType {
  id: string;
  thumbnail: string;
}

const dataImages = [
  {
    id: '1',
    thumbnail: '/assets/images/imagePreview/1K7_1.png',
  },
  {
    id: '2',
    thumbnail: '/assets/images/imagePreview/1K7_2.png',
  },
  {
    id: '3',
    thumbnail: '/assets/images/imagePreview/1K7_3.png',
  },
  {
    id: '4',
    thumbnail: '/assets/images/imagePreview/1K7_4.png',
  },
  {
    id: '5',
    thumbnail: '/assets/images/imagePreview/1K7_5.png',
  },
  {
    id: '6',
    thumbnail: '/assets/images/imagePreview/1K7.png',
  },
];
const AddPreview: React.FC<Props> = ({
  closeModal = () => {},
  title,
  onChooseImage = () => {},
}: Props) => {
  const handleCloseModal = () => {
    closeModal();
  };
  const handleSelectFromList = (selected: ItemType) => {
    onChooseImage(selected);
    closeModal(true);
  };
  return (
    <div className="max-h-[70vh] overflow-y-scroll">
      <div className="flex flex-col justify-center items-center w-[857px] cursor-pointer  ">
        <div className=" w-full flex justify-end">
          <Button
            variant="secondary"
            className="w-[40.71px] h-[40.71px] rounded-[113.087px] flex items-center justify-center "
            onClick={handleCloseModal}
          >
            <XButton />
          </Button>
        </div>
        <div className="pt-[32px] text-[28px] leading-[34px] text-[#252422] tracking-[0.364px] flex justify-start w-full">
          <span>{title}</span>
        </div>
        <div className="pt-32px w-full ">
          <div className="grid grid-cols-3 gap-4">
            {dataImages.map((item: ItemType) => (
              <div
                className="border border-[#E3E3E2]w-[275px] h-[395px] rounded-3xl flex  items-center justify-center"
                key={item.id}
                onClick={() => {
                  handleSelectFromList(item);
                }}
              >
                <div>
                  <img src={item.thumbnail} alt={item.thumbnail} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPreview;
