import React, { useEffect, useRef, useState } from 'react';
import { L } from '@utils/locales/L';
import CommonSelectBox from '@components/SelectBox';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import { SelectBoxOption } from 'types/common';
import Button from '@components/Button/Button';
import { GmailDetail, GmailEnforcerDetail } from 'types/proposal';
import DetailGoogle from './DetailGoogle';
import { gmailActionOptions, gmailData, gmailMockMail } from './constant';

type Props = {
  setIsShowExecutionTime: React.Dispatch<React.SetStateAction<boolean>>;
  handleStoredData?: (type: string, data: any) => void | undefined;
  gmailEnforcer: any;
};

const DetailSendEmail = ({ setIsShowExecutionTime, gmailEnforcer, handleStoredData }: Props) => {
  const [gmailDetail, setGmailDetail] = useState<GmailEnforcerDetail>(gmailEnforcer);

  const [isSection, setIsSection] = useState(true);
  const [isConnectGmail, setIsConnectGmail] = useState(gmailEnforcer.isConnect || false);
  const [connectionOptions, setConnectionOptions] = useState<SelectBoxOption[]>(
    gmailEnforcer.connectionOptions || gmailMockMail,
  );
  const [sectionData, setSectionData] = useState(gmailEnforcer.details || []);

  const currentState = useRef(gmailDetail);

  useEffect(() => {
    currentState.current = gmailDetail;
  }, [gmailDetail]);

  useEffect(() => {
    return () => {
      if (typeof handleStoredData === 'function') {
        console.log('send', currentState.current);

        handleStoredData('gmail', currentState.current);
      }
    };
  }, []);

  const handleAddSection = () => {
    if (sectionData.length < 3) {
      const newSection = {
        sendTo: '',
        recipientAddress: '',
        csvFile: [],
        title: '',
        emailContent: '',
      };
      setGmailDetail((gmailDetail: any) => ({
        ...gmailDetail,
        details: [...gmailDetail.details, newSection],
      }));
      setSectionData((prev: any) => [...prev, newSection]);
    }
    if (sectionData.length === 2) {
      setIsSection(true);
    }
  };

  const handleClickAddNew = () => {
    const nextOptions = [
      ...connectionOptions,
      {
        id: `mock${connectionOptions.length}@gmail.com`,
        label: `mock${connectionOptions.length}@gmail.com`,
      },
    ];
    setConnectionOptions(nextOptions);
    setGmailDetail({
      ...gmailDetail,
      connectionOptions: nextOptions,
    });
  };

  const handleConnectionGmail = () => {
    setIsConnectGmail(!isConnectGmail);
    // handleAddSection();
    setIsShowExecutionTime(true);
    setGmailDetail({
      ...gmailDetail,
      isConnect: !isConnectGmail,
    });
  };

  const handleGmailAction = (value: any) => {
    setGmailDetail({
      ...gmailDetail,
      action: value,
    });
  };

  const handleSelectGmail = (value: any) => {
    setGmailDetail({
      ...gmailDetail,
      selectedConnection: value,
    });
  };

  const handleChangeDetail = (index: number, type: string, value: any) => {
    setGmailDetail((prev) => ({
      ...prev,
      details: prev.details.map((element: any, idx: number) =>
        idx === index ? { ...element, [type]: value } : element,
      ),
    }));
  };

  const renderGmailContent = () => {
    if (isConnectGmail) {
      const sections = sectionData.map((data: GmailDetail, index: number) => (
        <DetailGoogle
          key={index}
          index={index}
          detail={data}
          handleChangeDetail={handleChangeDetail}
        />
      ));
      return (
        <>
          <div className="flex flex-col gap-2 pt-4">
            <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
              {L('connection')}
            </span>
            <div className="flex gap-2">
              <CommonSelectBox
                borderClassName="h-[57px] w-[472px] border-[1.5px]"
                options={connectionOptions}
                defaultValue={gmailEnforcer.selectedConnection || gmailData.selectedConnection}
                onChange={handleSelectGmail}
              />
              <Button
                variant="outline"
                className="h-[57px] w-full border-[1px] border-grey-version-3"
                onClick={handleClickAddNew}
              >
                <PlusIcon />
                <div className="text-[20px] leading-[25px] font-medium">{L('addNew')}</div>
              </Button>
            </div>
          </div>
          <div className="pt-[40px]">
            <p className="font-semibold text-[20px] leading-[25px]">{L('details')}</p>
            {sections}
            <div className="pt-4">
              <Button
                variant="outline"
                children="Add a new group of recipient"
                className={`text-[#5D23BB] ${
                  sectionData.length === 3 && isSection ? '' : 'border-[#5D23BB]'
                }  py-3 w-full text-text_3 leading-[25px] tracking-[0.38px]`}
                onClick={handleAddSection}
                disabled={sectionData.length === 3 && isSection}
              />
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="flex flex-col gap-2 pt-4">
        <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
          {L('connection')}
        </span>
        <Button
          variant="outline"
          onClick={handleConnectionGmail}
          className="h-[61px] w-full border-[1px] border-grey-version-3"
        >
          <div className="flex gap-1">
            <PlusIcon />
            <p className="flex items-center text-[20px] leading-[25px] font-medium">
              {L('connectToGmail')}
            </p>
          </div>
        </Button>
      </div>
    );
  };
  return (
    <>
      <div className="pt-16px">
        <div className="pb-[8px]">
          <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
            {L('action')}
          </span>
        </div>
        <div>
          <CommonSelectBox
            options={gmailActionOptions}
            defaultValue={gmailActionOptions[0]}
            onChange={handleGmailAction}
          />
        </div>
      </div>
      {renderGmailContent()}
    </>
  );
};

export default DetailSendEmail;
