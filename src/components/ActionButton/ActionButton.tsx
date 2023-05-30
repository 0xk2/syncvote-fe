import React from 'react';

type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  classes?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const ActionButton: React.FC<Props> = ({
  icon = '',
  variant = 'primary',
  children,
  classes = '',
  disabled = false,
  onClick = () => {},
}) => {
  const disabledClass = disabled
    ? 'bg-violet-version-1 cursor-not-allowed text-violet-version-2'
    : '';

  const variantObject = {
    primary: 'primary-action-button',
    outline: 'outline-action-button',
  };

  return (
    <div
      className={`flex gap-1 border-none p-8 rounded-6.25 w-w_13 justify-center items-center ${classes}  ${variantObject[variant]} ${disabledClass}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </div>
  );
};

export default ActionButton;
