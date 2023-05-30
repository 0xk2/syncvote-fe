/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';

type Props = {
  children?: React.ReactNode;
  classes?: string;
};

const PageWrapper: React.FC<Props> = ({ children, classes }) => (
  <div className={`w-full ${classes}`}>{children}</div>
);

export default PageWrapper;
