import React from 'react';
import { L } from '@utils/locales/L';
import { AlertMessage } from 'types/common';
import ValidateMessage from '@components/ValidateMessage';
import { renderValidateStatus } from '@utils/helpers';

interface Props {
  label?: string;
  className?: string;
  labelClassName?: string;
  childrenClassName?: string;
  validate?: AlertMessage | null;
  children: React.ReactNode;
}

const CustomInput: React.FC<Props> = ({
  label = '',
  className = '',
  childrenClassName = 'border-1.5 rounded-8',
  labelClassName = '',
  children,
  validate = null,
}) => {
  return (
    <div className={`gap-2 flex flex-col ${className}`}>
      {label && (
        <p className={`text-text_1.5 font-medium text-grey-version-6 ${labelClassName}`}>
          {L(`${label}`)}
        </p>
      )}
      <div className={`${renderValidateStatus(validate)} ${childrenClassName}`}>{children}</div>
      <ValidateMessage condition={validate} />
    </div>
  );
};
export default CustomInput;
