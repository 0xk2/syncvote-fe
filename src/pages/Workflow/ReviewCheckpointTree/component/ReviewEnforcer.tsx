import TimeIcon from '@assets/icons/svg-icons/TimeIcon';
import Button from '@components/Button/Button';
import CommonSelectBox from '@components/SelectBox';

const actionOptions = [
  {
    id: 'transfer',
    label: 'Transfer',
  },
  {
    id: 'custom',
    label: 'Custom',
    disabled: true,
  },
];

const ReviewEnforcer = () => (
  <>
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col w-full">
        <p className="flex text-text_1.5 font-medium text-grey-version-6">Action</p>
        <CommonSelectBox
          options={actionOptions}
          defaultValue={actionOptions[0]}
          placeholder="Allowed by"
          placeholderClass="text-grey-version-7"
        />
      </div>
      <div className="flex flex-col gap-[6px]">
        <p className="text-text_1.5 font-medium text-grey-version-6">Action</p>
        <div className="flex rounded-8 p-4 border-1.5 border-grey-version-3 h-14 w-full">
          <span className="text-[20px] text-[#252422] flex items-center">Token</span>
        </div>
      </div>
      <div>
        <div className="text-[15px] leading-[20px] tracking-[0.6px] select-none">
          <span>Token address</span>
        </div>
        <div className="pt-[6px]">
          <Button variant="outline" className="w-full h-[57px] border-1.5 border-grey-version-3 ">
            <div className="flex justify-between w-full">
              <div className="text-[20px] leading-[21px] tracking-[0.38px] text-[#898988] w-[553px] flex justify-start ">
                <span>0x2170ed0880ac9a755fd29b2688956bd959f933f8</span>
              </div>
              <div className="text-[#5D23BB] text-[16px] leading-[21px] rounded-8 bg-[#EFE9F8] w-[59px] h-[20px]">
                <span>$MOCK</span>
              </div>
            </div>
          </Button>
        </div>
      </div>
      <div className="pt-[80px] w-full">
        <div className="text-[20px] leading-[25px] tracking-[0.38px] font-semibold">
          <span>Details</span>
        </div>
        <div>
          <div className="text-[16px] text-[#575655] leading-[21px] tracking-0.5px pt-[16px] font-medium">
            <span>Recipient address</span>
          </div>
        </div>
        <div className="text-[16px] text-[#575655] leading-[21px] mt-4 ">
          <div className=" p-4 rounded-8 text-text_3 leading-line-semi-letter border-1.5 border-grey-version-3 text-grey-version-7">
            <div className="flex justify-between ">
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  className="text-grey-version-7 w-full focus:outline-none h-[150px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-text_1.5 font-medium text-grey-version-6">Execution time</p>
          <div className="flex justify-between rounded-8 p-4 border-1.5 border-grey-version-3 h-14 w-full">
            <span className="text-[20px] text-[#252422] flex items-center">1/12/2022 12:00</span>
            <TimeIcon />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ReviewEnforcer;
