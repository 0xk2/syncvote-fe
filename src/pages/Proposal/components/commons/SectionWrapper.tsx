import React from 'react';

type Props = {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  containerClassName?: string;
};

const SectionWrapper = ({ children, className = '', containerClassName = '' }: Props) => (
  <div className={`w-full flex justify-center items-start relative ${containerClassName}`}>
    <div className={`w-[648px] h-fit ${className}`}>{children}</div>
  </div>
);

export default SectionWrapper;
