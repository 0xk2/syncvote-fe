import NextMonthIcon from '@assets/icons/svg-icons/NextMonthIcon';
import NextYearCalendar from '@assets/icons/svg-icons/NextYearCalendar';
import PrevMonthIcon from '@assets/icons/svg-icons/PrevMonthIcon';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import CalendarFooter from '@components/CalendarFooter';

type Props = {
  suffixIcon?: string | any;
  onChange?: (value: Dayjs | null) => void;
  defaultDate?: Dayjs | null;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  // changeDefaultDate?: boolean;
};
const CommonDateTimePicker = (props: Props) => {
  const {
    suffixIcon,
    onChange = () => {},
    placeholder,
    id,
    defaultDate = null,
    disabled,
    className = 'custom-common-date-picker h-full w-full border-grey-version-3',
  } = props;

  const [dateSelected, setDateSelected] = useState<Dayjs | null>(defaultDate);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const handleSelectedDate: DatePickerProps['onChange'] = (date: Dayjs | null) => {
    setDateSelected(date);
    onChange(date);
  };
  const handleChangeMinutes = (value: string) => {
    let date = dateSelected || dayjs().hour(0).minute(0);
    date = date.minute(+value);
    setDateSelected(date);
  };
  const handleChangeHours = (value: string) => {
    let date = dateSelected || dayjs().hour(0).minute(0);
    date = date.hour(+value);
    setDateSelected(date);
  };
  const handelChangeAMPM = (value: string) => {
    const currentAMPM = dateSelected?.format('A');
    if (value !== currentAMPM) {
      let date = dateSelected || dayjs().hour(0).minute(0);
      date = date.hour(value === 'AM' ? date.hour() - 12 : date.hour() + 12);
      setDateSelected(date);
    }
  };

  function handleClickOutside(event: MouseEvent, dropDownNode: any) {
    if (isOpenCalendar && dropDownNode && !dropDownNode?.contains(event.target)) {
      setIsOpenCalendar(false);
      onChange(dateSelected);
    }
  }

  useEffect(() => {
    const dropDownNode = document.querySelector(`.custom-date-picker-${id}`);
    document.addEventListener('mousedown', (event: MouseEvent) =>
      handleClickOutside(event, dropDownNode),
    );
    return () => {
      document.removeEventListener('mousedown', (event: MouseEvent) =>
        handleClickOutside(event, dropDownNode),
      );
    };
  }, [isOpenCalendar, setIsOpenCalendar, defaultDate, dateSelected]);

  useEffect(() => {
    setDateSelected(defaultDate);
  }, [defaultDate]);
  return (
    <DatePicker
      disabled={disabled}
      superNextIcon={<NextYearCalendar />}
      nextIcon={<NextMonthIcon />}
      prevIcon={<PrevMonthIcon />}
      className={`${className} text-text_3 leading-line-semi-letter text-grey-version-7 hover:border-grey-version-3 cursor-pointer-input cursor-pointer`}
      popupClassName={`common-date-time-picker custom-date-picker-${id}`}
      renderExtraFooter={() => (
        <CalendarFooter
          hoursProps={dateSelected?.format('hh')}
          minutesProps={dateSelected?.format('mm')}
          isAmProps={dateSelected?.format('A') === 'AM'}
          onChangeHours={(e) => handleChangeHours(e as string)}
          onChangeMinutes={(e) => handleChangeMinutes(e as string)}
          onChangeAMPM={(e) => handelChangeAMPM(e as string)}
        />
      )}
      onOpenChange={() => setIsOpenCalendar(true)}
      suffixIcon={suffixIcon}
      format="DD/MM/YYYY hh:mm A"
      value={dateSelected}
      onChange={handleSelectedDate}
      showToday={false}
      open={isOpenCalendar}
      placeholder={placeholder}
      inputReadOnly
    />
  );
};

export default CommonDateTimePicker;
