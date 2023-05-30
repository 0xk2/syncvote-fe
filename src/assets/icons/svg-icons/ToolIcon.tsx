import React from 'react';

interface Props {
  color?: string;
  onClick?: () => void;
}

const ToolIcon: React.FC<Props> = ({ color = '#898988', onClick = () => {} }) => (
  <svg
    width={24}
    height={24}
    onClick={onClick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.7999 4.19997C9.67775 4.32459 9.60933 4.49213 9.60933 4.66663C9.60933 4.84113 9.67775 5.00868 9.7999 5.1333L10.8666 6.19997C10.9912 6.32212 11.1587 6.39054 11.3332 6.39054C11.5077 6.39054 11.6753 6.32212 11.7999 6.19997L14.3132 3.68663C14.6485 4.42743 14.75 5.25279 14.6042 6.05273C14.4585 6.85267 14.0724 7.5892 13.4974 8.16415C12.9225 8.73911 12.1859 9.12519 11.386 9.27094C10.5861 9.41669 9.7607 9.31519 9.0199 8.97997L4.41324 13.5866C4.14802 13.8518 3.78831 14.0008 3.41324 14.0008C3.03816 14.0008 2.67845 13.8518 2.41324 13.5866C2.14802 13.3214 1.99902 12.9617 1.99902 12.5866C1.99902 12.2116 2.14802 11.8518 2.41324 11.5866L7.0199 6.97997C6.68468 6.23917 6.58318 5.41381 6.72893 4.61387C6.87468 3.81393 7.26076 3.0774 7.83572 2.50245C8.41067 1.92749 9.1472 1.54141 9.94714 1.39566C10.7471 1.24991 11.5724 1.35141 12.3132 1.68663L9.80657 4.1933L9.7999 4.19997Z"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ToolIcon;
