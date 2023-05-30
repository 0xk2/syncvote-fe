import { ChangeEvent, useEffect, useState } from 'react';
import CommonSelectBox from '@components/SelectBox';
import { L } from '@utils/locales/L';
import Button from '@components/Button/Button';
import { ICheckpointNode } from 'types/checkpoint';
import { applicationType, enforcerApplication } from '@utils/constants/enforcer';
import { SelectBoxOption } from 'types/common';
import ValidateMessage from '@components/ValidateMessage';
import SetupTwitter from './EnforcerOptions/SetupTwitter';
import SetupGmail from './EnforcerOptions/SetupGmail';

type Props = {
  node?: ICheckpointNode | null;
  listCheckPoints?: ICheckpointNode[];
  setListCheckPoints?: React.Dispatch<React.SetStateAction<ICheckpointNode[] | []>>;
  onCloseCheckpoint?: () => void;
};
const DropdownOptionsAction = [
  {
    id: 'transfer',
    label: 'Transfer',
    disabled: false,
  },
  {
    id: 'custom',
    label: 'Custom (coming soon)',
    disabled: true,
  },
];
const DropdownOptionsAssetType = [
  {
    id: 'token',
    label: 'Token',
  },
  {
    id: 'nft',
    label: 'NFT',
  },
];
const defaultVotingDetail = {
  application: enforcerApplication[0],
  action: 'Transfer',
  assetType: DropdownOptionsAssetType[0],
  placeholder: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  tokenAddress: '',
};

const SetUpEnforcer = ({
  node = null,
  listCheckPoints = [],
  setListCheckPoints = () => {},
  onCloseCheckpoint = () => {},
}: Props) => {
  const [option, setOption] = useState(false);
  const [votingDetail, setVotingDetail] = useState<any>(
    node?.config.assetType ? node.config : defaultVotingDetail,
  );
  const [typeOfApplication, setTypeOfApplication] = useState<SelectBoxOption>(
    votingDetail.application,
  );

  const renderApplication = enforcerApplication.findIndex(
    (item) => item.id === typeOfApplication.id,
  );

  const handleSelectAssetType = (value: any) => {
    setOption(value?.id === 'token');
    setVotingDetail({ ...votingDetail, assetType: value });
  };

  const handleChangeTokenAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setVotingDetail({
      ...votingDetail,
      tokenAddress: e.target.value,
    });
  };

  const renderButtonAcceptToken = () => (
    <div className="px-[24px]">
      <div className="text-[15px] leading-[20px] tracking-[0.6px]">
        <span>{L('tokenAddress')}</span>
      </div>
      <div className="pt-[6px]">
        <Button
          variant="outline"
          className={`w-full h-[57px] border-1.5 ${
            votingDetail.tokenAddress
              ? 'border-grey-version-3 hover:border-grey-version-3'
              : 'border-yellow-version-5 hover:border-yellow-version-5'
          }`}
        >
          <div className="flex justify-between w-full">
            <input
              className="text-[20px] truncate outline-none grow text-grey-version-7 leading-[21px] tracking-[0.38px]"
              type="text"
              value={votingDetail.tokenAddress}
              placeholder={defaultVotingDetail.placeholder}
              onChange={handleChangeTokenAddress}
            />
            <span className="text-[#5D23BB] text-[16px] leading-[21px] rounded-8 bg-[#EFE9F8] w-[59px] h-[20px]">
              $MOCK
            </span>
          </div>
        </Button>
        <div className="mt-[14px]">
          {!votingDetail.tokenAddress && (
            <ValidateMessage
              condition={{
                type: 'WARN',
                message: L('thisFieldIsRequiredPleaseFillIn'),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  const handleChooseApplication = (value: SelectBoxOption | null) => {
    if (value) {
      setTypeOfApplication(value);
      setVotingDetail({ ...votingDetail, application: value });
    }
  };

  const handleStoredData = (type: string, data: any) => {
    setVotingDetail({
      ...votingDetail,
      [type]: data,
    });
  };

  function saveEnforcerToStore() {
    let isComplete = true;
    const indexCurrentCp = listCheckPoints.findIndex((cp) => cp.id === node?.id);
    if (indexCurrentCp === -1) {
      return { isComplete };
    }

    if (
      typeOfApplication.id === 'onChain' &&
      votingDetail?.assetType?.id === 'token' &&
      !votingDetail.tokenAddress
    ) {
      isComplete = false;
    }

    const nextListCheckpoint = [...listCheckPoints];
    nextListCheckpoint[indexCurrentCp] = {
      ...nextListCheckpoint[indexCurrentCp],
      config: { ...votingDetail, isComplete },
    };

    setListCheckPoints(nextListCheckpoint);

    return { isComplete };
  }

  const handleOnSave = () => {
    if (
      typeOfApplication.id === 'onChain' &&
      votingDetail?.assetType?.id === 'token' &&
      !votingDetail.tokenAddress
    ) {
      return;
    }

    const { isComplete } = saveEnforcerToStore();

    if (!isComplete) {
      return;
    }

    onCloseCheckpoint();
  };

  useEffect(() => {
    saveEnforcerToStore();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="pb-[8px]">
          <span className="text-grey-version-6 px-[24px] text-[16px] font-medium leading-[21px] select-none">
            {L('application')}
          </span>
        </div>
        <CommonSelectBox
          options={enforcerApplication}
          defaultValue={enforcerApplication[renderApplication]}
          onChange={handleChooseApplication}
          divClass="px-[24px]"
          borderClassName="w-full"
        />
      </div>
      {typeOfApplication.id === applicationType.onchain.id && (
        <>
          <div className="px-[24px]">
            <div className="pb-[8px]">
              <span className="font-medium text-[16px] leading-[21px]">{L('action')}</span>
            </div>
            <div>
              <CommonSelectBox
                options={DropdownOptionsAction}
                defaultValue={DropdownOptionsAction[0]}
              />
            </div>
          </div>
          <div className="px-[24px]">
            <div className="pb-[8px]">
              <span className="font-medium text-[16px] leading-[21px]">{L('assetType')}</span>
            </div>
            <div>
              <CommonSelectBox
                options={DropdownOptionsAssetType}
                defaultValue={votingDetail.assetType}
                onChange={handleSelectAssetType}
              />
            </div>
          </div>
          <div>{option && renderButtonAcceptToken()}</div>
        </>
      )}

      {typeOfApplication.id === applicationType.twitter.id && (
        <SetupTwitter handleStoredData={handleStoredData} storeData={votingDetail} />
      )}

      {typeOfApplication.id === applicationType.gmail.id && (
        <SetupGmail handleStoredData={handleStoredData} storeData={votingDetail} />
      )}

      <div className="mt-[12px] py-[27px] border-t-[1px] border-grey-version-3 px-[23px] bg-white flex justify-end absolute bottom-0 right-0 w-full">
        <div className="gap-[16px] w-[178px] h-[46px] flex justify-between">
          <Button
            className="w-[90px] rounded-8 py-[12px] px-[16px] border-[1px] border-grey-version-3 hover:bg-grey-version-3"
            variant="secondary"
            onClick={onCloseCheckpoint}
          >
            <p className="font-medium text-[17px] leading-[22px]">{L('cancel')}</p>
          </Button>
          <Button className="w-[72px] rounded-8 py-[12px] px-[16px]" onClick={handleOnSave}>
            <p className="font-medium text-[17px] leading-[22px]">{L('Save')}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SetUpEnforcer;
