/* eslint-disable jsx-a11y/no-autofocus */
import PencilIcon from '@assets/icons/svg-icons/PencilIcon';
import React, { useEffect, useState } from 'react';

type Props = {
  classes?: string;
  title: string;
  textClass?: string;
  borderClass?: string;
  isPreview?: boolean;
  icon?: React.ReactNode;
  handleSaveValue?: (value: string) => void;
};

const EditTextName = ({
  classes = '',
  title = '',
  icon = '',
  textClass = '',
  borderClass = '',
  isPreview = false,
  handleSaveValue = () => {},
}: Props) => {
  const [value, setValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const handleKeyDownInput = (event: any) => {
    if (event.keyCode === 13 && value) {
      if (value !== '') {
        setIsEditing(false);
        handleSaveValue(value);
      }
    }
  };
  function handleInputBlur() {
    const valueInput = value.trim() === '' ? title : value;
    setIsEditing(false);
    setValue(valueInput);
    handleSaveValue(valueInput);
  }

  function handleClickEditIcon() {
    if (isPreview) return;
    setIsEditing(true);
  }

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <div className={`w-fit max-w-[100%] ${classes}`}>
      <div
        className={`flex items-center text-base-2xl text-grey-version-5 ${borderClass}`}
        onClick={handleClickEditIcon}
      >
        {isEditing ? (
          <input
            type="text"
            disabled={!isEditing}
            className={`max-h-[42px] border-b font-semibold border-b-[#898988] text-[#898988] ${
              value === '' ? 'max-w-[20px] ' : ''
            } max-w-[100%] bg-transparent focus:outline-none p-0  ${textClass}`}
            value={value}
            autoFocus
            onFocus={() => setIsEditing(true)}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDownInput}
            size={value.length}
          />
        ) : (
          <p
            className={`overflow-hidden max-h-[42px]  font-semibold truncate max-w-[100%] mr-2 ${textClass} `}
          >
            {value}
          </p>
        )}
        {icon || (
          <div className={`p-3 ${isPreview ? 'hover:cursor-default' : 'hover:cursor-pointer'}`}>
            {!isPreview && (
              <PencilIcon classes="flex justify-center items-center " color="#5D23BB" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTextName;
