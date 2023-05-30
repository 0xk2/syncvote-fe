import React from 'react';
import CommonSelectBox from '@components/SelectBox';
import { optionsTime } from '@components/CheckpointTree/tempData';
import { SelectBoxOption } from 'types/common';

type Props = {
  value: string | number;
  delayUnit: SelectBoxOption;
  handleChangeValue: (value: string) => void;
  handleChangeDelayUnit: (e: any) => void;
};

function DelayTimeOption({ value, delayUnit, handleChangeValue, handleChangeDelayUnit }: Props) {
  return (
    <div className="flex justify-between items-center gap-2 mt-[6px] ">
      <div className="flex justify-between relative items-center border-1.5 bg-white rounded-8 h-[57px] p-[16px] w-full">
        <div className="w-[140px]">
          <input
            type="text"
            value={value}
            onChange={(e) => handleChangeValue(e.target.value)}
            placeholder="1"
            className="focus:outline-none border-none text-[20px]"
          />
        </div>
        <div>
          <CommonSelectBox
            borderClassName="border-none flex justify-between items-center  p-0 leading-[30px] static "
            iconDropDownClassName="w-[16px] h-[10px]"
            options={optionsTime}
            placeholder="HOUR(S)"
            colorPlaceholder="text-[#898988]"
            onChange={(opt: any) => handleChangeDelayUnit(opt)}
            defaultValue={delayUnit}
            dropDownClassName="w-[211px] left-[calc(100%-211px)]"
            divClass="flex-row"
            isDefault
          />
        </div>
      </div>
    </div>
  );
}

export default DelayTimeOption;
