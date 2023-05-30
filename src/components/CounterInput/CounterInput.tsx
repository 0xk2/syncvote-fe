import MinusCircleIcon from '@assets/icons/svg-icons/MinusCircleIcon';
import PlusCircleIcon from '@assets/icons/svg-icons/PlusCircleIcon';
import React, { ChangeEvent } from 'react';

type Props = {
  value: number | string;
  onDecreasing: () => void;
  onIncreasing: () => void;
  onChangeInput: (value: string | number) => void;
  isValidInput: boolean;
};

const CounterInput: React.FC<Props> = ({
  value,
  onDecreasing,
  onIncreasing,
  onChangeInput,
  isValidInput,
}) => (
  <div
    className={`flex justify-between items-center border-[1.5px] text-grey-version-6 rounded-lg p-4 text-xl min-w-[450px] ${
      !isValidInput ? 'border-red-version-5' : 'focus:border-violet-primary'
    } mb-[8px]`}
  >
    <span
      className={isValidInput && value > 2 ? 'hover: cursor-pointer' : ''}
      onClick={() => onDecreasing()}
    >
      <MinusCircleIcon color={isValidInput && value > 2 ? '#575655' : '#E9EBF8'} />
    </span>
    <input
      type="number"
      value={value}
      className=" text-center focus:outline-none"
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e.target.value)}
    />
    <span
      className={isValidInput && value < 20 ? 'hover: cursor-pointer' : ''}
      onClick={() => onIncreasing()}
    >
      <PlusCircleIcon color={isValidInput && value < 20 ? '#575655' : '#E9EBF8'} />
    </span>
  </div>
);

export default CounterInput;
