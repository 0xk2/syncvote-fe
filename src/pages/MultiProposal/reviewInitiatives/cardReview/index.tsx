import { L } from '@utils/locales/L';
import { useState } from 'react';
import PopupPublish from '@components/PopupPublish/PopupPublish';
import Modal from '@components/Modal/Modal';

interface Review {
  title: string;
  text: string;
}
type Props = {
  data: Review[];
};
function CardReview(props: Props) {
  const { data } = props;
  const [modalPopUp, setModalPopUp] = useState(false);

  return (
    <div className="text-[20px]">
      <div className="grid grid-rows-6 grid-cols-4 gap-4">
        {data?.map((item) => (
          <>
            <div className="flex flex-col justify-end items-start px-4 py-[20px] bg-[#F9FAFF] rounded-2xl h-[156px]">
              <span className="text-[#5D23BB] font-medium text-sm">{item.title}</span>
              <p className="font-semibold text-base">{item.text}</p>
            </div>
          </>
        ))}
      </div>
      <div className="pt-[65px] pb-[25px] flex justify-end">
        <button className="w-[168px] h-[63px] bg-[#fff] border-[1.5px] border-[#E3E3E2] border-solid rounded-[8px] mr-[35px]">
          {L('back')}
        </button>
        <button className="w-[168px] h-[63px] bg-[#fff] border-[1.5px] border-[#E3E3E2] border-solid rounded-[8px] mr-[35px]">
          {L('saveDraft')}
        </button>
        <button
          className="w-[168px] h-[63px] bg-[#5D23BB] text-white rounded-[8px]"
          onClick={() => setModalPopUp(!modalPopUp)}
        >
          {L('publish')}
        </button>
      </div>
      {modalPopUp && (
        <Modal isOpen={modalPopUp} onClose={() => setModalPopUp(false)} closeClickOverlay={false}>
          <PopupPublish />
        </Modal>
      )}
    </div>
  );
}

export default CardReview;
