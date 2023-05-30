import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import Button from '@components/Button/Button';
import CommonSelectBox from '@components/SelectBox';
import { SelectBoxOption } from 'types/common';
import { L } from '@utils/locales/L';
import {
  gmailActionOptions,
  gmailMockMail,
} from '@pages/Proposal/components/commons/GoogleEnforcer/constant';
import React, { useEffect, useState } from 'react';
import { SetupGmailType } from './interface';

type Props = {
  handleStoredData?: (type: string, data: any) => void;
  storeData?: any;
};

const SetupGmail = ({ handleStoredData = () => {}, storeData = {} }: Props) => {
  const [gmailDetail, setGmailDetail] = useState<SetupGmailType>(storeData.gmailData || {});
  const [connectionOptions, setConnectionOptions] = useState<SelectBoxOption[]>(
    gmailDetail.connectionOptions || gmailMockMail,
  );
  const [isConnectGmail, setIsConnectGmail] = useState(gmailDetail.isConnect || false);

  const handleSelectGmail = (value: any) => {
    setGmailDetail({
      ...gmailDetail,
      selectedConnection: value,
    });
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

  const handleGmailAction = (value: any) => {
    setGmailDetail({
      ...gmailDetail,
      action: value,
    });
  };

  const handleConnectionGmail = () => {
    setIsConnectGmail(!isConnectGmail);
    setGmailDetail({
      ...gmailDetail,
      isConnect: !isConnectGmail,
    });
  };

  useEffect(() => {
    handleStoredData('gmailData', gmailDetail);
  }, [gmailDetail]);

  const renderGmailContent = () => {
    if (isConnectGmail) {
      return (
        <>
          <div className="flex flex-col gap-2 px-[24px]">
            <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
              {L('connection')}
            </span>
            <div className="flex gap-2">
              <CommonSelectBox
                borderClassName="h-[57px] w-full border-[1.5px]"
                options={connectionOptions}
                defaultValue={gmailDetail.selectedConnection || connectionOptions[0]}
                onChange={handleSelectGmail}
              />
              <Button
                variant="outline"
                className="h-[57px] w-[200px] border-[1px] border-grey-version-3"
                onClick={handleClickAddNew}
              >
                <PlusIcon />
                <div className="text-[20px] leading-[25px] font-medium">{L('addNew')}</div>
              </Button>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="flex flex-col gap-2 px-[24px]">
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
      <div className="px-[24px]">
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

export default SetupGmail;
