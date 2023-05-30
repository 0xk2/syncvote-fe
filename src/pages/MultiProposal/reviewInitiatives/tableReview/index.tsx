import { L } from '@utils/locales/L';
import Modal from '@components/Modal/Modal';
import PopupPublish from '@components/PopupPublish/PopupPublish';
import { useState } from 'react';

interface Review {
  title: string;
  text: string;
}
type Props = {
  data: Review[];
};
function TableReview(props: Props) {
  const { data } = props;
  const [modalPopUp, setModalPopUp] = useState(false);

  return (
    <>
      <table className="w-full">
        <tr className="border-solid border-b border-[#F6F6F6] ">
          <td className="pr-[33px] pl-[3rem] w-[93px]">{L('no')}</td>
          <td className="pl-[33px] text-start">{L('name')}</td>
          <td> </td>
        </tr>
        {data?.map((item: Review, index) => (
          <tr className="border-b h-[55px] border-solid border-b-[#F6F6F6]">
            <td className="text-start pl-[3rem] text-[#252422] font-medium text-base">
              {index + 1}
            </td>
            <td className="text-start pl-[33px] text-[#252422] font-medium text-base">
              {item.text}
            </td>
            <td className="text-sm font-medium text-[#5D23BB] cursor-pointer">{L('viewDetail')}</td>
          </tr>
        ))}
      </table>
      <div className="pt-[65px] pb-[25px] flex justify-end">
        <button className="w-[168px] h-[63px] bg-[#fff] border-2 border-[#E3E3E2] border-solid rounded-2xl mr-[35px]">
          {L('back')}
        </button>
        <button className="w-[168px] h-[63px] bg-[#fff] border-2 border-[#E3E3E2] border-solid rounded-2xl mr-[35px]">
          {L('saveDraft')}
        </button>
        <button
          className="w-[168px] h-[63px] bg-[#5D23BB] text-white rounded-2xl mr-[35px]"
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
    </>
  );
}

export default TableReview;
