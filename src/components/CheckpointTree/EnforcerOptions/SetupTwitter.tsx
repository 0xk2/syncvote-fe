import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import Button from '@components/Button/Button';
import CommonSelectBox from '@components/SelectBox';
import { SelectBoxOption } from 'types/common';
import { L } from '@utils/locales/L';
import {
  mockMail,
  twitterActionsOptions,
} from '@pages/Proposal/components/commons/TwitterEnforcer/contants';
import { applicationType } from '@utils/constants/enforcer';
import React, { useEffect, useState } from 'react';
import { SetupTwitterType } from './interface';

type Props = {
  handleStoredData?: (type: string, data: any) => void;
  storeData?: any;
};

const defaultTwitterData = {
  application: applicationType.twitter,
  selectedConnection: mockMail[0],
  isConnect: false,
};

const SetupTwitter = ({ handleStoredData = () => {}, storeData = {} }: Props) => {
  const [twitterDetail, setTwitterDetail] = useState<SetupTwitterType>(
    storeData.twitterData || defaultTwitterData,
  );
  const [isConnectTwitter, setIsConnectTwitter] = useState(twitterDetail.isConnect || false);
  const [connectionOptions, setConnectionOptions] = useState<SelectBoxOption[]>(
    twitterDetail.connectionOptions || mockMail,
  );

  const handleTwitterAction = (value: any) => {
    setTwitterDetail({
      ...twitterDetail,
      action: value,
    });
  };

  const handleClickAddNew = () => {
    const nextOptions = [
      ...connectionOptions,
      {
        id: `@mock${connectionOptions.length}`,
        label: `@mock${connectionOptions.length}`,
      },
    ];
    setConnectionOptions(nextOptions);
    setTwitterDetail({
      ...twitterDetail,
      connectionOptions: nextOptions,
    });
  };

  const handleConnection = () => {
    setIsConnectTwitter(!isConnectTwitter);
    setTwitterDetail({
      ...twitterDetail,
      isConnect: !isConnectTwitter,
    });
  };

  const handleSelectedConnection = (value: any) => {
    setTwitterDetail({
      ...twitterDetail,
      selectedConnection: value,
    });
  };

  useEffect(() => {
    handleStoredData('twitterData', twitterDetail);
  }, [twitterDetail]);

  const renderTwitterContent = () => {
    if (isConnectTwitter) {
      return (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
              {L('connection')}
            </span>
            <div className="flex gap-2">
              <CommonSelectBox
                borderClassName="h-[57px] w-full border-[1.5px]"
                options={connectionOptions}
                defaultValue={
                  (twitterDetail.selectedConnection as SelectBoxOption) || connectionOptions[0]
                }
                onChange={handleSelectedConnection}
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
      <div className="flex flex-col gap-2">
        <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
          {L('connection')}
        </span>
        <Button
          variant="outline"
          onClick={handleConnection}
          className="h-[61px] w-full border-[1px] border-grey-version-3"
        >
          <div className="flex gap-1">
            <PlusIcon />
            <p className="flex items-center text-[20px] leading-[25px] font-medium">
              {L('connectToTwitter')}
            </p>
          </div>
        </Button>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-[16px] px-[24px]">
      <div>
        <div className="pb-[8px]">
          <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
            {L('action')}
          </span>
        </div>
        <div>
          <CommonSelectBox
            options={twitterActionsOptions}
            defaultValue={twitterActionsOptions[0]}
            onChange={handleTwitterAction}
          />
        </div>
      </div>
      {renderTwitterContent()}
    </div>
  );
};

export default SetupTwitter;
