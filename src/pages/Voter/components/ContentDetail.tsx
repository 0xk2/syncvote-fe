import React, { useState } from 'react';
import Tag from '@components/Card/Tag/Tag';
import ShareIcon from '@assets/icons/svg-icons/ShareIcon';
import Button from '@components/Button/Button';
import AttachIcon from '@assets/icons/svg-icons/AttachIcon';
import { L } from '@utils/locales/L';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';
import { unsecuredCopyToClipboard } from '@utils/helpers';

const ContentDetail = () => {
  const [isTooltip, setIsTooltip] = useState(false);
  const [isShowLess, setIsShowLess] = useState(false);
  const basicInfo = useSelector((state: RootState) => state.proposal.basicInfo);

  const dataParagraph = [
    {
      id: 1,
      decs: basicInfo.description
        ? basicInfo.description
        : 'Evermoon is a Web3 company offering an innovative platform for decentralized finance (DeFi) and secure asset trading. The company is looking for an investment to help further its development and reach its goals. An investment in Evermoon will offer a unique opportunity to benefit from the rapid growth of the Web3 economy.',
    },
  ];

  const onClickChangeHeight = () => {
    setIsShowLess(true);
  };
  const renderParagraph = () =>
    dataParagraph.map((ele) => (
      <p
        key={ele.id}
        className="text-grey-version-6 text-text_5 leading-line-higher tracking-[0.35px] py-4"
      >
        {ele.decs}
      </p>
    ));

  const handleShare = () => {
    const value = window.location.href;
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(value);
    } else {
      unsecuredCopyToClipboard(value);
    }
    // navigator.clipboard.writeText(window.location.href);
    setIsTooltip(true);
    setTimeout(() => setIsTooltip(false), 2000);
  };
  return (
    <div>
      <div className="hidden md:flex items-center gap-2">
        <Tag tagType="Active" />
        <div className="p-0 cursor-pointer" onClick={handleShare}>
          <Tooltip
            placement="right"
            title="Copied link"
            color="#7948C7"
            zIndex={10}
            trigger={['click']}
            open={isTooltip}
          >
            <div className="flex items-center gap-1">
              <ShareIcon />
              <p className="text-violet-version-5">Share</p>
            </div>
          </Tooltip>
        </div>
      </div>
      <h3 className="text-grey-version-7 font-semibold text-base-2xl tracking-[0.36px] leading-[34px] mt-4">
        Approval for Evermoon invesment 💎!
      </h3>

      <div className="md:hidden flex items-center gap-2 mt-3">
        <Tag tagType="Active" />
        <div className="p-0 cursor-pointer" onClick={handleShare}>
          <Tooltip
            placement="right"
            title="Copied link"
            color="#7948C7"
            zIndex={10}
            trigger={['click']}
            open={isTooltip}
          >
            <div className="flex items-center gap-1">
              <ShareIcon />
              <p className="text-violet-version-5">Share</p>
            </div>
          </Tooltip>
        </div>
      </div>
      <div
        className={clsx(
          'md:max-h-full overflow-hidden',
          !isShowLess ? 'max-h-[300px]' : 'max-h-full',
        )}
      >
        {renderParagraph()}
        <Button
          className="bg-[#F7F7F8] text-[#252422] w-[230px] h-[48px] rounded-[80px]"
          variant="text"
        >
          <div className="">
            <AttachIcon />
          </div>
          <div className="text-text_2 leading-[22px] tracking-[0.5px]">
            <span>{L('traction')}</span>
          </div>
        </Button>
      </div>
      <>
        {!isShowLess ? (
          <button
            className="my-5 md:hidden block w-full h-[63px] bg-[#fff] border-2 border-[#E3E3E2] border-solid rounded-2xl"
            onClick={onClickChangeHeight}
          >
            View more
          </button>
        ) : (
          <button
            className="my-5 md:hidden block w-full h-[63px] bg-[#fff] border-2 border-[#E3E3E2] border-solid rounded-2xl"
            onClick={() => setIsShowLess(false)}
          >
            View less
          </button>
        )}
      </>
    </div>
  );
};

export default ContentDetail;
