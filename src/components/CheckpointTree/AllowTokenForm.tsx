import CustomInput from '@pages/Proposal/components/commons/CustomInput';
import { L } from '@utils/locales/L';
import CommonSelectBox from '@components/SelectBox';
import React from 'react';
import { OptionsTime } from '@components/CheckpointTree/constants';

type Props = {
  addressToken: string;
  isReview?: boolean;
  inputDate: any;
  votingDetail: any;
  handleChangeMinHolding: (key: string, value: any) => void;
  handleTypePeriod: (value: any) => void;
  onChangeTimeInput: (value: any) => void;
  handleChangeAddressToken: (value: any) => void;
};

function AllowTokenForm(props: Props) {
  const {
    addressToken,
    handleChangeAddressToken,
    isReview,
    onChangeTimeInput,
    inputDate,
    votingDetail,
    handleTypePeriod,
    handleChangeMinHolding,
  } = props;
  return (
    <>
      <CustomInput
        label="tokenAddress"
        childrenClassName="input-token-address-container"
        validate={
          addressToken
            ? null
            : {
                type: 'WARN',
                message: L('thisFieldIsRequiredPleaseFillIn'),
              }
        }
      >
        <input
          type="text"
          className="input-token-address text-grey-version-6"
          placeholder="0x2170ed0880ac9a755fd29b2688956bd959f933f8"
          value={addressToken}
          onChange={handleChangeAddressToken}
          disabled={isReview}
        />
        <span className="h-full p-1 rounded-8 bg-violet-version-1 text-violet-version-5">
          $MOCK
        </span>
      </CustomInput>
      <div className="flex flex-col gap-[6px]">
        <p className="text-[15px]">{L('minimumHoldingPeriod')}</p>
        <CustomInput className="relative" childrenClassName="border-none" validate={null}>
          <div className="flex justify-center items-center border-1.5 border-grey-version-3 rounded-8 h-[57px] p-[16px] w-full">
            <input
              type="text"
              name=""
              id=""
              placeholder="1"
              className="focus:outline-none w-full text-[20px] bg-transparent"
              onChange={onChangeTimeInput}
              value={inputDate}
              disabled={isReview}
            />
            <div className="flex items-center justify-center">
              <CommonSelectBox
                borderClassName="static border-none flex justify-between items-center p-0 leading-[30px]"
                iconDropDownClassName="w-[16px] h-[10px]"
                options={OptionsTime}
                placeholder="HOUR(S)"
                defaultValue={votingDetail.minimumHoldingPeriod.type}
                dropDownClassName="w-[211px] left-[calc(100%-211px)]"
                isDefault
                onChange={handleTypePeriod}
              />
            </div>
          </div>
        </CustomInput>
      </div>
      <CustomInput
        label="minimumHoldingQuantity"
        childrenClassName="input-token-address-container"
        validate={null}
      >
        <input
          type="text"
          value={votingDetail.minimumHoldingQuantity.value}
          className="input-token-address text-grey-version-6"
          placeholder="0"
          onChange={(value) => handleChangeMinHolding('minimumHoldingQuantity', value)}
          disabled={isReview}
        />
        <span className="h-full p-1 rounded-8 text-violet-version-5">$MOCK</span>
      </CustomInput>
    </>
  );
}

export default AllowTokenForm;
