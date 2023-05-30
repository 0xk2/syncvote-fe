import React from 'react';
import { Dayjs } from 'dayjs';
import { L } from '@utils/locales/L';
import CustomInput from '@pages/Proposal/components/commons/CustomInput';
import CommonDateTimePicker from '@components/CommonDateTimePicker';
import TimeIcon from '@assets/icons/svg-icons/TimeIcon';
import { AlertMessage } from 'types/common';

type Props = {
  errors: { [key: string]: null | AlertMessage };
  timeStart: Dayjs | null | undefined;
  timeEnd: Dayjs | null | undefined;
  foundCp: any;
  handleChangeStartTime(date: Dayjs | null | undefined): void;
  handleChangeEndTime(date: Dayjs | null | undefined): void;
};

function VotingDuration(props: Props) {
  const { errors, timeStart, timeEnd, foundCp, handleChangeStartTime, handleChangeEndTime } = props;

  return (
    <>
      <div className="w-[50%] pr-[6px]">
        <div className=" pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
          <p>{L('startTime')}</p>
        </div>
        <div className="flex justify-between" />
        <div className="h-[60px]">
          <CustomInput
            className="relative"
            childrenClassName="border-none"
            validate={errors.timeStart}
          >
            <CommonDateTimePicker
              className={`flex justify-center items-center border-1.5 ${
                !errors.timeStart ? 'border-grey-version-3' : 'border-yellow-version-5'
              } rounded-8 h-[57px] p-[16px] w-full mt-2`}
              suffixIcon={<TimeIcon />}
              defaultDate={timeStart}
              id={`startTime-${foundCp.id}`}
              onChange={handleChangeStartTime}
            />
          </CustomInput>
        </div>
      </div>

      <div className="w-[50%] pl-[6px]">
        <div className="pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
          <p>{L('endTime')}</p>
        </div>
        <div className="flex justify-between" />
        <div className="h-[60px]">
          <CustomInput
            className="relative"
            childrenClassName="border-none"
            validate={errors.timeEnd}
          >
            <CommonDateTimePicker
              className={`flex justify-center items-center border-1.5 ${
                !errors.timeEnd ? 'border-grey-version-3' : 'border-yellow-version-5'
              } rounded-8 h-[57px] p-[16px] w-full mt-2`}
              suffixIcon={<TimeIcon />}
              id={`endTime-${foundCp.id}`}
              defaultDate={timeEnd}
              onChange={handleChangeEndTime}
            />
          </CustomInput>
        </div>
      </div>
    </>
  );
}

export default VotingDuration;
