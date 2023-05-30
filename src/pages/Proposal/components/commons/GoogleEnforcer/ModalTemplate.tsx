import React, { useEffect, useState } from 'react';
import { useTemplate } from './dataDropdown';

type Props = {
  handleCloseTemplate: (value: boolean) => void;
  handleSaveState?: any;
};

const ModalTemplate = ({ handleCloseTemplate, handleSaveState }: Props) => {
  const [useThisTemplateA, setUseThisTemplateA] = useState();
  const [useThisTemplateB, setUseThisTemplateB] = useState();
  const handleMapUseTemplate = (item: any) => {
    item.map((content: any) => {
      if (content.id === '1') {
        setUseThisTemplateA(content);
        handleSaveState(useThisTemplateA);
      } else {
        setUseThisTemplateB(content);
        handleSaveState(useThisTemplateB);
      }
    });
  };
  useEffect(() => {
    handleSaveState(useThisTemplateA);
    handleSaveState(useThisTemplateB);
  }, [useThisTemplateA, useThisTemplateB]);
  return (
    <div className="w-[561px]">
      <div className="flex pb-[10.01px] justify-between items-center gap-10">
        <div className="text-[252422] text-[24.8792px] leading-[32px] tracking-[0.395805px] font-semibold">
          <span>Content template</span>
        </div>
        <div
          className="w-[40px] h-[40px] rounded-full text-center leading-[40px] border-2 border-solid border-[#BCBCBB] cursor-pointer relative"
          onClick={() => {
            handleCloseTemplate(false);
          }}
        >
          <span className="absolute m-auto flex items-center justify-center left-0 top-0 right-0 bottom-0">
            X
          </span>
        </div>
      </div>
      {useTemplate.map((item) => {
        return (
          <div className="flex justify-between pt-[24.01px] pb-[32px]" key={item.id}>
            <div className="text-[17px] leading-[22px] tracking-[0.5px] text-[#252422]">
              <span>{item.templateForApproval}</span>
            </div>
            <div
              className="text-[#5D23BB] tracking-[0.6px] text-[15px] leading-[20px] "
              onClick={() => handleMapUseTemplate(item.useThisTemplate.arrays)}
            >
              <span className="cursor-pointer">{item.useThisTemplate.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ModalTemplate;
