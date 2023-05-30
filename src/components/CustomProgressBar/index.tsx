import React from 'react';

interface Props {
  percent: number;
  className?: string;
}

const CustomProgressBar = ({ percent, className }: Props) => {
  return (
    <div className="relative w-full h-10px bg-grey-version-3 rounded-full">
      <div
        className={`absolute left-0 top-0 h-full rounded-full ${className}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default CustomProgressBar;
