import { MethodVoteOptionType } from 'types/proposal';
import CustomInput from '@pages/Proposal/components/commons/CustomInput';
import { L, LF } from '@utils/locales/L';
import Input from '@components/Input/Input';
import React, { useEffect } from 'react';
import { checkDuplicateOption, isExistsOption } from '@pages/MultiProposal/SetupInitiative/helper';

type Props = {
  listOptions?: MethodVoteOptionType[];
  setListOptions(options: MethodVoteOptionType[]): void;
};

const defaultOptions: MethodVoteOptionType[] = [
  {
    id: 1,
    value: 'Yes',
    status: null,
  },
  {
    id: 2,
    value: 'No',
    status: null,
  },
];

function SingleChoiceOptions(props: Props) {
  const { listOptions, setListOptions } = props;

  useEffect(() => {
    if (!listOptions?.length) {
      setListOptions(defaultOptions);
    }
  }, []);

  const handleInputChange = (value: string, index: number) => {
    const newListOptions = JSON.parse(JSON.stringify(listOptions));
    newListOptions[index].value = value;
    newListOptions[index].status = null;
    setListOptions(newListOptions);
  };

  return (
    <>
      {listOptions?.map((option: MethodVoteOptionType, index: number) => {
        return (
          <>
            <CustomInput
              className="flex flex-col gap-[6px]"
              label={LF('$(0) $(1)', L('option'), String(index < 4 ? index + 1 : index))}
              childrenClassName="flex gap-2"
              key={option.id}
              validate={option.status || checkDuplicateOption(listOptions, option.value, index)}
            >
              <Input
                classes={`voting-method-input ${
                  option.value?.trim() && isExistsOption(option.value, index, listOptions)
                    ? 'border-yellow-version-5'
                    : ''
                } ${option.status ? 'border-yellow-version-5' : ''}`}
                value={option.value}
                placeholder="Placeholder"
                onChange={(e) => handleInputChange(e.target.value, index)}
              />
            </CustomInput>
          </>
        );
      })}
    </>
  );
}

export default SingleChoiceOptions;
