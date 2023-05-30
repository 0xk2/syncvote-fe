import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';

type Props = {
  isDisable?: boolean;
  handleContinue(): void;
  handleBack(): void;
};

function NavigateButtons({ handleContinue, handleBack, isDisable }: Props) {
  return (
    <div className="flex justify-end pt-8 w-full mt-3">
      <div className="flex gap-6">
        <Button
          children={L('back')}
          variant="outline"
          className="w-[168px] h-[63px] text-text_3 leading-line-semi-letter tracking flex justify-center items-center text-grey-version-7 border-1.5 border-grey-version-3 tracking-one font-medium"
          onClick={handleBack}
        />
        <Button
          children={L('continue')}
          variant="outline"
          onClick={handleContinue}
          className={`py-[19px] px-[40px] text-text_3 tracking tracking-one font-medium rounded-[8px] ${
            isDisable
              ? 'bg-grey-version-3 border-none text-[#BBBBBA]'
              : 'text-grey-version-7 border-1.5 border-grey-version-3'
          }`}
          disabled={isDisable}
        />
      </div>
    </div>
  );
}

export default NavigateButtons;
