import React from 'react';
import clsx from 'clsx';
import './style.scss';

interface Props extends React.PropsWithChildren {
  text: string;
  classes?: string;
}

const CustomTooltip = ({ text, classes, children }: Props) => {
  return (
    <div className={clsx('tooltip', classes)}>
      {children}
      <span className="tooltip-text" data-align="top">
        {text}
      </span>
    </div>
  );
};

export default CustomTooltip;
