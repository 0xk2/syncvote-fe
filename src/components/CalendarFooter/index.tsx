import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { Switch } from 'antd';

type CalendarFooterProps = {
  hoursProps?: string;
  minutesProps?: string;
  isAmProps?: boolean;
  onChangeHours: (value: string) => void;
  onChangeMinutes: (value: string) => void;
  onChangeAMPM: (value: string) => void;
};
function CalendarFooter({
  hoursProps = dayjs().format('HH'),
  minutesProps = dayjs().format('mm'),
  isAmProps = true,
  onChangeHours,
  onChangeMinutes,
  onChangeAMPM,
}: CalendarFooterProps) {
  const [hours, setHours] = useState(hoursProps);
  const [minutes, setMinutes] = useState(minutesProps);
  const [isAm, setIsAm] = useState<boolean>(isAmProps);
  const inputMinutesRef = useRef<HTMLInputElement>(null);
  const inputHoursRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    setIsAm(!isAm);
    onChangeAMPM(isAm ? 'AM' : 'PM');
  };
  const handleChangeMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { value } = e.target;
    if (+value < 60 && +value >= 0) {
      setMinutes(value);
      onChangeMinutes(value);
    }
  };
  const handleChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { value } = e.target;
    if (+value <= 12 && +value >= 0) {
      setHours(value);
      onChangeHours(value);
    }
  };
  const handleFocusInput = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    ref?.current?.focus();
  };

  return (
    <div className="flex justify-between items-center ">
      <div className="time font-[600] text-[20px] leading-[24px]">Time</div>
      <div className="flex items-center gap-[8px] text-[22px] leading-[28px] font-[400]">
        <div className="bg-switch-background rounded-[9px] h-[36px] px-[8px] py-[4px] flex items-center justify-center">
          <input
            type="text"
            className="w-[28px] h-[28px] bg-transparent text-center border-none outline-none"
            value={hours}
            ref={inputHoursRef}
            onChange={handleChangeHours}
            onClick={(e) => handleFocusInput(e, inputHoursRef)}
          />
          :
          <input
            type="text"
            className="w-[28px] h-[28px] bg-transparent text-center border-none outline-none"
            value={minutes}
            onChange={handleChangeMinutes}
            onClick={(e) => handleFocusInput(e, inputMinutesRef)}
            ref={inputMinutesRef}
          />
        </div>
        <Switch
          defaultChecked
          checkedChildren="AM"
          unCheckedChildren="PM"
          checked={isAm}
          onChange={onChange}
          className="bg-switch-background rounded-[9px] h-[36px] px-[8px] py-[4px] w-[100px] hover:bg-transparent"
        />
      </div>
    </div>
  );
}

export default CalendarFooter;
