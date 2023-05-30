import Toggle from '@components/ToggleV2/Toggle';
import React from 'react';
import { ICheckpointNode } from 'types/checkpoint';

type Props = {
  startCp: ICheckpointNode;
  endCp: ICheckpointNode;
  isEnable: boolean;
  handleOnchangeToggle(): void;
};

function RouteToggle({ startCp, endCp, isEnable, handleOnchangeToggle }: Props) {
  function truncateName(value: string) {
    return value.length > 10 ? `${value.substring(0, 7)}...` : value;
  }

  return (
    <>
      <p>
        Start&nbsp;
        <span className="text-violet-primary font-bold">{truncateName(endCp.name)}</span>
        &nbsp;immediately after&nbsp;
        <span className="text-violet-primary font-bold">{truncateName(startCp.name)}</span>
        &nbsp;results
      </p>
      <div className="flex ">
        <span className="mr-[10px]">{isEnable ? 'Yes' : 'No'}</span>
        <Toggle
          className="border-[1px] w-[34px] h-[20px] rounded-[20px] relative"
          offColorButton="grey-version-3"
          onColorButton="violet-version-5"
          buttonClass="w-[16px] h-[16px] absolute top-[1px] left-[1px]"
          onChange={handleOnchangeToggle}
          isChecked={isEnable}
          transClass="translate-x-[14px] translate-y-0 left-[100%] top-0"
        />
      </div>
    </>
  );
}

export default RouteToggle;
