import React from 'react';

type Props = {
  children?: JSX.Element;
};

const MainLayout = ({ children }: Props) => (
  <div className="w-full flex justify-center mt-20">{children}</div>
);

export default MainLayout;
