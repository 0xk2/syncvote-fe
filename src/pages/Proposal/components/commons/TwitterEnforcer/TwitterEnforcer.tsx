import React, { useEffect, useRef, useState } from 'react';
import CommonSelectBox from '@components/SelectBox';
import { L } from '@utils/locales/L';
import Button from '@components/Button/Button';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import { SelectBoxOption } from 'types/common';
import TextEditor from '@components/Editor/TextEditor';
import { TwitterDetail } from 'types/proposal';
import { mockMail, twitterActionsOptions, twitterData } from './contants';
import SelectLabel from '../GoogleEnforcer/SelectLable';

type Props = {
  setIsShowExecutionTime: React.Dispatch<React.SetStateAction<boolean>>;
  handleStoredData?: (type: string, data: any) => void;
  twitterEnforcer: any;
};

const TwitterEnforcer = ({ setIsShowExecutionTime, twitterEnforcer, handleStoredData }: Props) => {
  const [twitterDetail, setTwitterDetail] = useState<TwitterDetail>(twitterEnforcer);

  const [isConnectTwitter, setIsConnectTwitter] = useState(twitterEnforcer.isConnect || false);
  const [connectionOptions, setConnectionOptions] = useState<SelectBoxOption[]>(
    twitterEnforcer.connectionOptions || mockMail,
  );
  const [valueTextArea, setValueTextArea] = useState<string>(twitterEnforcer.postContent || '');

  const editorRef = useRef<any>(null);

  const currentState = useRef(twitterDetail);

  useEffect(() => {
    currentState.current = twitterDetail;
  }, [twitterDetail]);

  useEffect(() => {
    return () => {
      if (typeof handleStoredData === 'function') {
        handleStoredData('twitter', currentState.current);
      }
    };
  }, []);

  const handleClickAddNew = () => {
    const nextOptions = [
      ...connectionOptions,
      {
        id: `@mock${connectionOptions.length}`,
        label: `@mock${connectionOptions.length}`,
      },
    ];
    setConnectionOptions(nextOptions);
    setTwitterDetail({
      ...twitterDetail,
      connectionOptions: nextOptions,
    });
  };

  const handleTwitterAction = (value: any) => {
    setTwitterDetail({
      ...twitterDetail,
      action: value,
    });
  };

  const handleSelectedConnection = (value: any) => {
    setTwitterDetail({
      ...twitterDetail,
      selectedConnection: value,
    });
  };

  const handleConnection = () => {
    setIsConnectTwitter(!isConnectTwitter);
    setIsShowExecutionTime(true);
    setTwitterDetail({
      ...twitterDetail,
      isConnect: !isConnectTwitter,
    });
  };

  const handleChooseTag = (tag: string) => {
    // const currentCursor = Number(editorRef.current?.getRef()?.valueCursor?.start?.split(",")[1]);
    const { selection } = editorRef.current.getRef().editor.editorManager.activeEditor;
    const range = selection.getRng();
    const value = editorRef.current.getRef().editor.getContent({ format: 'html' });
    const { startContainer, startOffset, endContainer, endOffset } = range;
    const startText = selection.getStart();
    const cursorIndex = startText.index;
    const textBeforeCursor = value.slice(0, cursorIndex);

    const seperateText = editorRef.current.getCurrentContent().split('</p>');
    const initText = seperateText?.[0];
    const lastText = seperateText?.[seperateText.length - 1];
    const tagDOM = `<span data-mce-noneditable contenteditable="false" class="mceNonEditable" 
      style="
        display: inline-block;
        max-width: 100%;
        padding: 4px;
        height: 24px;
        background: #EFE9F8;
        border-radius: 8px;
        color: #5D23BB;
        font-size: 16px;
        line-height: 17px;
        letter-spacing: 0.5px;
        cursor: pointer;
        user-select: none;
        outline: none;"
    >
      ${tag}
    </span>&nbsp`;
    const content = initText + tagDOM + lastText;
    setValueTextArea(content);
  };

  const handleChangeInput = (value: string): void => {
    setValueTextArea(value);
    setTwitterDetail({
      ...twitterDetail,
      postContent: value,
    });
  };

  const renderTwitterContent = () => {
    if (isConnectTwitter) {
      return (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
              {L('connection')}
            </span>
            <div className="flex gap-2">
              <CommonSelectBox
                borderClassName="h-[57px] w-[472px] border-[1.5px]"
                options={connectionOptions}
                defaultValue={twitterEnforcer.selectedConnection || twitterData.selectedConnection}
                onChange={handleSelectedConnection}
              />
              <Button
                variant="outline"
                className="h-[57px] w-full border-[1px] border-grey-version-3"
                onClick={handleClickAddNew}
              >
                <PlusIcon />
                <div className="text-[20px] leading-[25px] font-medium">{L('addNew')}</div>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-[40px]">
            <p className="font-semibold text-[20px] leading-[25px]">{L('details')}</p>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-[16px] leading-[21px] text-grey-version-6">
                {L('postContent')}
              </p>
              <TextEditor
                hideToolbar
                ref={editorRef}
                heightEditor={178}
                value={valueTextArea}
                setValue={handleChangeInput}
              />
            </div>
          </div>
          <SelectLabel handleChooseTag={handleChooseTag} />
        </>
      );
    }
    return (
      <div className="flex flex-col gap-2">
        <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
          {L('connection')}
        </span>
        <Button
          variant="outline"
          onClick={handleConnection}
          className="h-[61px] w-full border-[1px] border-grey-version-3"
        >
          <div className="flex gap-1">
            <PlusIcon />
            <p className="flex items-center text-[20px] leading-[25px] font-medium">
              {L('connectToTwitter')}
            </p>
          </div>
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="pt-16px">
        <div className="pb-[8px]">
          <span className="text-grey-version-6 text-[16px] font-medium leading-[21px] select-none">
            {L('action')}
          </span>
        </div>
        <div>
          <CommonSelectBox
            options={twitterActionsOptions}
            defaultValue={twitterActionsOptions[0]}
            onChange={handleTwitterAction}
          />
        </div>
      </div>
      {renderTwitterContent()}
    </div>
  );
};

export default TwitterEnforcer;
