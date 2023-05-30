import { MethodVoteOptionType } from 'types/proposal';
import CustomInput from '@pages/Proposal/components/commons/CustomInput';
import { L, LF } from '@utils/locales/L';
import Input from '@components/Input/Input';
import TrashCan from '@assets/icons/svg-icons/TrashCan';
import React, { useEffect } from 'react';
import { checkDuplicateOption, isExistsOption } from '../helper';

type Props = {
  listOptions?: MethodVoteOptionType[];
  setListOptions(options: MethodVoteOptionType[]): void;
};

const defaultOptions: MethodVoteOptionType[] = [
  {
    id: 1,
    value: '',
    status: null,
  },
  {
    id: 2,
    value: '',
    status: null,
  },
];

function UpvoteOptions(props: Props) {
  const { listOptions = [], setListOptions } = props;

  useEffect(() => {
    if (!listOptions?.length) {
      setListOptions(defaultOptions);
    }
  }, []);

  function handleSetOptionValue(value: string, index: number) {
    const newListOptions = JSON.parse(JSON.stringify(listOptions));
    newListOptions[index].value = value;
    newListOptions[index].status = null;
    setListOptions(newListOptions);
  }

  const handleRemoveOption = (id: number | string) => {
    const nextListOption = listOptions.filter((option) => option.id !== id);
    setListOptions(nextListOption);
  };

  console.log({ listOptions });

  return (
    <>
      {listOptions?.map((option: MethodVoteOptionType, index: number) => {
        return (
          <div key={option.id}>
            <CustomInput
              className="flex flex-col gap-[6px]"
              label={LF('$(0) $(1)', L('option'), String(index + 1))}
              childrenClassName="flex gap-2"
              validate={option.status || checkDuplicateOption(listOptions, option.value, index)}
            >
              <Input
                classes={`voting-method-input ${
                  option.value?.trim() && isExistsOption(option.value, index, listOptions)
                    ? 'border-yellow-version-5'
                    : ''
                }  ${option.status ? 'border-yellow-version-5' : ''}`}
                value={option.value}
                placeholder="Placeholder"
                onChange={(e) => {
                  handleSetOptionValue(e.target.value, index);
                }}
              />
              {index > 0 && (
                <div
                  id={`${option.id}`}
                  className="trash-can-button"
                  onClick={() => handleRemoveOption(option.id)}
                >
                  <TrashCan />
                </div>
              )}
            </CustomInput>
          </div>
        );
      })}
    </>
  );
}

export default UpvoteOptions;
