import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import './style.scss';

const TabsVote = () => {
  const dataUserVote = [
    {
      id: 1,
      urlAvatar: '/assets/images/temp/avatar-vote-1.png',
      token: '0xAB...11AB',
      money: '2M $HTG',
    },
    {
      id: 2,
      urlAvatar: '/assets/images/temp/avatar-vote-2.png',
      token: '0xCB...23GB',
      money: '5M $HTG',
    },
    {
      id: 3,
      urlAvatar: '/assets/images/temp/avatar-vote-3.png',
      token: '0xEF...43XA',
      money: '8M $HTG',
    },
    {
      id: 4,
      urlAvatar: '/assets/images/temp/avatar-vote-4.png',
      token: '0xGH...66FD',
      money: '12M $HTG',
    },
    {
      id: 5,
      urlAvatar: '/assets/images/temp/avatar-vote-5.png',
      token: '0xFC...82DE',
      money: '18M $HTG',
    },
    {
      id: 6,
      urlAvatar: '/assets/images/temp/avatar-vote-6.png',
      token: '0xBV...41HU',
      money: '200M $HTG',
    },
  ];

  const renderUserVote = () =>
    dataUserVote.map((ele) => (
      <div key={ele.id} className="flex justify-between">
        <div className="flex items-center gap-2">
          <div>
            <img
              className="rounded-full object-cover object-center w-8 h-8"
              src={ele.urlAvatar}
              alt=""
            />
          </div>
          <p>{ele.token}</p>
        </div>
        <div>{ele.money}</div>
      </div>
    ));

  const onChange = (key: string) => {};

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Make 100$M deal',
      children: <div className="flex flex-col gap-4">{renderUserVote()}</div>,
    },
    {
      key: '2',
      label: 'Proceed with 50$M deal',
      children: (
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div>
              <img
                className="rounded-full object-cover object-center w-8 h-8"
                src="/assets/images/temp/avatar-vote-1.png"
                alt=""
              />
            </div>
            <p>0xEF...43XA</p>
          </div>
          <div>200M $HTG</div>
        </div>
      ),
    },
    {
      key: '3',
      label: 'I’m not sure',
      children: (
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div>
              <img
                className="rounded-full object-cover object-center w-8 h-8"
                src="/assets/images/temp/avatar-vote-4.png"
                alt=""
              />
            </div>
            <p>0xEF...43XA</p>
          </div>
          <div>20M $HTG</div>
        </div>
      ),
    },
  ];

  return (
    <div className="tabsVote">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default TabsVote;
