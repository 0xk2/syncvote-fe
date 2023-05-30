import React from 'react';
import CustomInput from '@pages/Proposal/components/commons/CustomInput';
import { L } from '@utils/locales/L';
import Input from '@components/Input/Input';

function VetoOptions() {
  return (
    <CustomInput childrenClassName="border-none" label={L('option1')}>
      <Input classes="w-full bg-grey-version-3" value="Veto" disabled />
    </CustomInput>
  );
}

export default VetoOptions;
