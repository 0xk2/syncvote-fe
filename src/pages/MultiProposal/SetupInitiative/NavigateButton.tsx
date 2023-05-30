import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';
import React from 'react';

type Props = {
  handleNavigateBack(): void;
  handleValidates(): void;
};

function NavigateButton(props: Props) {
  const { handleNavigateBack, handleValidates } = props;
  return (
    <div className="flex gap-6">
      <div>
        <Button
          children={L('back')}
          variant="outline"
          className="w-[168px] h-[63px] text-text_3 leading-line-semi-letter tracking flex justify-center items-center text-grey-version-7 border-1.5 border-grey-version-3 tracking-one font-medium"
          onClick={handleNavigateBack}
        />
      </div>
      <div>
        <Button
          children={L('continue')}
          variant="outline"
          className="w-[168px] h-[63px] text-text_3 leading-line-semi-letter tracking flex justify-center items-center text-grey-version-7 border-1.5 border-grey-version-3 tracking-one font-medium"
          onClick={handleValidates}
        />
      </div>
    </div>
  );
}

export default NavigateButton;
