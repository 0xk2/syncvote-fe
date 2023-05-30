import { Progress } from 'antd';
import React from 'react';
import './style.scss';
import clsx from 'clsx';

type Props = {
  option: string;
  percent: number | undefined;
  className?: string;
  percentSign?: string;
};

const ProgressBar = ({ option, percent, className, percentSign = '%' }: Props) => (
  <div>
    <div className="flex justify-between mb-1">
      <span
        className={clsx(
          'text-base font-medium text-grey-version-6 tracking-[0.5px] max-w-[75%] truncate',
          className,
        )}
      >
        {option}
      </span>
      <span className="text-base font-medium text-grey-version-6">
        {percent} {percentSign}
      </span>
    </div>
    <div className="h-5">
      <Progress percent={percent} showInfo={false} strokeColor="#5D23BB" />
    </div>
  </div>
);

export default ProgressBar;
