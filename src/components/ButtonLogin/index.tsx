import React from 'react';

type Pops = {
  title?: string;
  Icon?: any;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function ButtonLogin({
    title,
    Icon,
    className,
    onClick,
  }
  : Pops) {
  return (
    <div
      className={`flex bg-[#FFF] text-[20px] gap-[15px] items-center py-[14px] pl-[37px] border border-solid border-[#E3E3E2] rounded-[10px] cursor-pointer leading-[25px] ${className}`}
      onClick={onClick || undefined}
    >
      {Icon}
      {title}
    </div>
  );
}

export default ButtonLogin;
