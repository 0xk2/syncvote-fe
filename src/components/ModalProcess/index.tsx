import React from 'react';
import { L } from '@utils/locales/L';
import Button from '@components/Button/Button';
import XButton from '@assets/icons/svg-icons/XButton';
import CheckpointNodeReview from '@components/CheckpointNodeReview/CheckpointNodeReview';
import { checkpointsList } from '@utils/mockData/proposal';
import CustomProgressBar from '@components/CustomProgressBar';

type Props = {
  handleModalProcessMap: () => void;
  percent: number;
};
function ModalProcess(props: Props) {
  const { handleModalProcessMap, percent } = props;

  return (
    <div className="min-w-[801px] overflow-hidden">
      <div className="my-2">
        <div className="flex justify-between items-center mb-[14px]">
          <p className="text-grey-version-7 text-2xl font-semibold">{L('processMap')}</p>
          <Button
            variant="outline"
            className="w-[40.71px] h-[40.71px] rounded-[113.087px] flex items-center justify-center"
            onClick={handleModalProcessMap}
          >
            <XButton />
          </Button>
        </div>
        <div className=" mb-[44px]">
          <div className="flex justify-between items-center text-[#575655] mb-[8px]">
            <span>{L('Progress')}</span>
            <span>{`${percent}%`}</span>
          </div>
          <CustomProgressBar className="bg-[#5D23BB] h-10px" percent={percent} />
        </div>
        <div className="overflow-x-auto custom-scroll-bar">
          <div className="w-full flex items-center justify-center min-w-[810px]">
            {checkpointsList.map((item) => (
              <CheckpointNodeReview
                key={item.id}
                parentId={item.parentId}
                haveRouteDetail={item.haveRouteDetail}
                iconColor={item.iconColor}
                type={item.type}
                name={item.name}
                level={item.level}
                isFirstOfLeaf={item.isFirstOfLeaf}
                isLastOfLeaf={item.isLastOfLeaf}
                memberType={item.memberType}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProcess;
