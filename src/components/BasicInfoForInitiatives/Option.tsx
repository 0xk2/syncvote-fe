/* eslint-disable max-len */
import DropDownIcon from '@assets/icons/svg-icons/DropDownIcon';
import DropdownUpIcon from '@assets/icons/svg-icons/DropdownUpIcon';
import TimeIcon from '@assets/icons/svg-icons/TimeIcon';
import CommonDateTimePicker from '@components/CommonDateTimePicker';
import { L } from '@utils/locales/L';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

type Props = {
  id: string;
  basicInfo?: any;
  onchangeData?: any;
  areAllFieldsFilleds?: any;
};

const Option = ({ id, basicInfo, onchangeData, areAllFieldsFilleds }: Props) => {
  const [option, setOption] = useState(basicInfo?.option?.value || '');
  const [description, setDescription] = useState(basicInfo?.description.value || '');
  const [documentLinks, setDocumentLinks] = useState(basicInfo?.attachedLinks.value || '');
  const [timeStart, setTimeStart] = useState<Dayjs | null | undefined>(
    basicInfo?.startTime.value || null,
  );
  const [timeEnd, setTimeEnd] = useState<Dayjs | null | undefined>(
    basicInfo?.endTime.value || null,
  );
  const [isShow, setIsShow] = useState<boolean>(basicInfo?.isShow);

  const handleOnClick = () => {
    setIsShow(!isShow);
  };
  const handelOption = (value: React.ChangeEvent<HTMLInputElement>) => {
    const option = value.target.value;
    setOption(option);
  };
  const handelDescription = (value: React.ChangeEvent<HTMLInputElement>) => {
    const description = value.target.value;
    setDescription(description);
  };
  const handelAttach = (value: React.ChangeEvent<HTMLInputElement>) => {
    const attach = value.target.value;
    setDocumentLinks(attach);
  };
  const handleOnChangeStartTime = (value: Dayjs | null | undefined) => {
    setTimeStart(value);
  };
  const handleOnChangeEndTime = (value: Dayjs | null | undefined) => {
    setTimeEnd(value);
  };

  useEffect(() => {
    if (!!description && !!documentLinks && !!timeEnd && !!timeStart) {
      areAllFieldsFilleds();
    }
  }, [description, documentLinks, timeEnd, timeStart]);

  useEffect(() => {
    if (basicInfo) {
      const handler = setTimeout(() => {
        const tmp = {
          id: basicInfo?.id,
          title_number: basicInfo?.title_number,
          title_string: basicInfo?.title_string,
          option: (basicInfo?.id === 1 && { label: 'Options (column)', value: option }) || null,
          description: { label: 'Description (column)', value: description },
          attachedLinks: { label: 'Attached document links (column)', value: documentLinks },
          startTime: { label: 'Start time (column)', value: timeStart },
          endTime: { label: 'End time (column)', value: timeEnd },
          isShow,
        };
        onchangeData(tmp);
      }, 600);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [option, description, documentLinks, timeEnd, timeStart, isShow]);
  useEffect(() => {
    setOption(basicInfo?.option?.value || '');
    setDescription(basicInfo?.description.value || '');
    setDocumentLinks(basicInfo?.attachedLinks.value || '');
    setTimeStart(basicInfo?.startTime.value || null);
    setTimeEnd(basicInfo?.endTime.value || null);
    setIsShow(basicInfo?.isShow);
  }, [basicInfo]);

  return (
    <div>
      <div className="flex justify-between w-[648px] pt-[32px]">
        <div className=" text-[#575655] font-semibold text-[22px] leading-[28px] tracking-[0.35px]">
          <span className="text-[#898988]">{basicInfo?.title_number}</span>
          &nbsp;
          <span>{basicInfo?.title_string}</span>
        </div>
        <div
          className="flex justify-center items-center py-[10px] pl-16px pr-0 hover:cursor-pointer"
          onClick={handleOnClick}
        >
          {isShow ? <DropdownUpIcon /> : <DropDownIcon />}
        </div>
      </div>
      {isShow && (
        <>
          {basicInfo?.option !== null && (
            <div className="pt-[24px]">
              <div className="text-[16px] leading-[21px] tracking-0.5px  pb-[9.05px]  text-[#575655]">
                <span>Options (column)</span>
              </div>
              <div className="w-[648px] h-[65.19px] p-[18.094px] border border-[#E3E3E2] rounded-[9.04698px] text-[20px]">
                <input
                  type="text"
                  value={option}
                  placeholder="B"
                  className="w-[611.81px] focus:outline-none"
                  onChange={handelOption}
                />
              </div>
            </div>
          )}

          <div className="pt-[16px]">
            <div className="text-[16px] leading-[21px] tracking-0.5px  pb-[9.05px] text-[#575655]">
              <span>Description (column)</span>
            </div>
            <div className="w-[648px] h-[65.19px] p-[18.094px] border border-[#E3E3E2]  rounded-[9.04698px] text-[20px]">
              <input
                type="text"
                value={description}
                placeholder="C"
                className="w-[611.81px] focus:outline-none"
                onChange={handelDescription}
              />
            </div>
          </div>

          <div className="pt-[16px]">
            <div className="text-[16px] leading-[21px] tracking-0.5px pb-[9.05px] text-[#575655] ">
              <span>{L('attachedDocumentLinks')}</span>
            </div>
            <div className="w-[648px] h-[65.19px] p-[18.094px] border border-[#E3E3E2]  rounded-[9.04698px] text-[20px]">
              <input
                type="text"
                placeholder="D; E"
                value={documentLinks}
                className="w-[611.81px] focus:outline-none"
                onChange={handelAttach}
              />
            </div>
          </div>

          <div className="w-[648px] flex pt-4">
            <div className="w-[50%] pr-[6px]">
              <div className=" pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
                <p>Start time (column)</p>
              </div>
              <div className=" border-grey-version-3 rounded-8 text-text_3 leading-line-semi-letter text-grey-version-7">
                <div className="flex justify-between" />
                <div className="h-[60px]">
                  <CommonDateTimePicker
                    defaultDate={timeStart}
                    suffixIcon={<TimeIcon />}
                    placeholder="G"
                    id={`${id}-startTime`}
                    onChange={handleOnChangeStartTime}
                  />
                </div>
              </div>
            </div>

            <div className="w-[50%] pl-[6px]">
              <div className="pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
                <p>End time (column)</p>
              </div>
              <div className=" rounded-8 text-text_3 leading-line-semi-letter border-grey-version-3 text-grey-version-7">
                <div className="flex justify-between" />
                <div className="h-[60px]">
                  <CommonDateTimePicker
                    defaultDate={timeEnd}
                    suffixIcon={<TimeIcon />}
                    placeholder="H"
                    id={`${id}-endTime`}
                    onChange={handleOnChangeEndTime}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {basicInfo?.title_string !== 'Making offer' && (
        <div className="border-b border-primary_logo w-[648px] pt-[32px]" />
      )}
    </div>
  );
};

export default Option;
