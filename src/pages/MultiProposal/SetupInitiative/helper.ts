import { AlertMessage } from 'types/common';
import { L } from '@utils/locales/L';

export const isExistsOption = (value: string, index: number, options: any[]) => {
  return options.find((e, i) => i !== index && e.value === value);
};

export const checkDuplicateOption = (
  options: any[],
  value: string,
  cpIndex: number,
): AlertMessage | null => {
  if (value.trim() === '') {
    return null;
  }

  const indexOptDuplicate = options.findIndex((option, index) => {
    return cpIndex !== index && option.value === value;
  });
  if (indexOptDuplicate !== -1) {
    return {
      type: 'WARN',
      message: L('allOptionsName'),
    };
  }
  return null;
};
