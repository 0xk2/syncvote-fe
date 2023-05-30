import React from 'react';
import MinusIcon from '@assets/icons/svg-icons/MinusCircleIcon';
import PlusCircleIcon from '@assets/icons/svg-icons/PlusCircleIcon';
import { L } from '@utils/locales/L';

interface Props {
  label?: string;
  defaultNumber?: string | number;
  minusColor?: string;
  plusColor?: string;
  isPreview?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddNumberResults?: () => void;
  handleSubtractNumberResults?: () => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInputResult: React.FC<Props> = ({
  label = '',
  plusColor = '#E3E3E2',
  minusColor = '#E3E3E2',
  isPreview = false,
  defaultNumber = '0',
  onChange = () => {},
  onBlur = () => {},
  handleAddNumberResults = () => {},
  handleSubtractNumberResults = () => {},
}) => {
  return (
    <div className="flex flex-col gap-[6px]">
      <p className="text-text_1.5 font-medium text-grey-version-6">{L(`${label}`)}</p>
      <div className="flex justify-between rounded-8 p-4 border-1.5 border-grey-version-3 h-14 w-full">
        <span
          onClick={handleSubtractNumberResults}
          className={isPreview ? 'cursor-default' : 'cursor-pointer'}
        >
          <MinusIcon color={minusColor} />
        </span>
        <input
          value={defaultNumber}
          type="text"
          className="focus:outline-none bg-transparent text-center w-[10%] text-xl font-medium"
          onChange={onChange}
          onBlur={onBlur}
          disabled={isPreview}
        />
        <span
          onClick={handleAddNumberResults}
          className={isPreview ? 'cursor-default' : 'cursor-pointer'}
        >
          <PlusCircleIcon color={plusColor} />
        </span>
      </div>
    </div>
  );
};

export default NumberInputResult;
