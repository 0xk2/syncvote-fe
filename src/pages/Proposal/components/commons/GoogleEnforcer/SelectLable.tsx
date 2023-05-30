import React from 'react';
import { L } from '@utils/locales/L';

type Props = {
  hasNote?: boolean;
  handleChooseTag?: any;
};

const SelectLabel = ({ hasNote = true, handleChooseTag = () => {} }: Props) => {
  const listTag = [L('labelOfTheApprovedOptionS'), L('labelOfTheRejectedOptionS')];
  return (
    <div className="flex flex-col gap-[16px] border-dashed border-[2px] p-4 rounded-2xl border-[#5D23BB]">
      <div className="text-[#252422] text-[16px] leading-[21px] tracking-0.5px">
        <span>{L('selectATagToAddContentBasedOnResults')}</span>
      </div>
      {hasNote && (
        <div className="text-[#575655] tracking-[0.6px] text-[13px] leading-[18px]">
          <span>{L('noteLongDynamicContentMayNotDisplayOnTwitterSRulesOf250Characters')}</span>
        </div>
      )}

      <div className="flex gap-2">
        {listTag.map((tag, index) => (
          <div
            key={index}
            onClick={() => handleChooseTag(tag)}
            className="rounded-8 w-fit py-1 px-2 bg-[#EFE9F8] text-[#5D23BB] text-[16px] leading-[21px] tracking-[0.5px] cursor-pointer"
          >
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectLabel;
