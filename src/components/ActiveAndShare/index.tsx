import React, { useState } from 'react';
import { Tooltip } from 'antd';
import Tag from '@components/Card/Tag/Tag';
import ShareIcon from '@assets/icons/svg-icons/ShareIcon';
import { L } from '@utils/locales/L';
import { unsecuredCopyToClipboard } from '@utils/helpers';

function ActiveAndShare() {
  const [activeTooltip, setActiveTooltip] = useState(false);

  const handleCopyLink = () => {
    const content = window.location.href;

    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
    } else {
      unsecuredCopyToClipboard(content);
    }
    // navigator.clipboard.writeText(window.location.href);
    setActiveTooltip(true);
    setTimeout(() => setActiveTooltip(false), 2000);
  };
  return (
    <>
      <Tag tagType="Active" />
      <div className="p-0 cursor-pointer">
        <Tooltip
          placement="right"
          title="Copied link"
          color="#7948C7"
          zIndex={10}
          trigger="click"
          open={activeTooltip}
        >
          <div className="flex items-center gap-1" onClick={handleCopyLink}>
            <ShareIcon />
            <p className="text-violet-version-5">{L('share')}</p>
          </div>
        </Tooltip>
      </div>
    </>
  );
}

export default ActiveAndShare;
