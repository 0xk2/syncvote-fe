import {
  Space, Collapse, Input, Button, Select, Modal,
  Popconfirm, Switch, Tag, Drawer,
} from 'antd';
import { LockFilled, UnlockOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState } from 'react';

import { ICheckPoint } from '../../../types';
import ChooseVoteMachine from './ChooseVoteMachine';

const RulesTab = ({
  selectedNode, onChange, editable = false, children,
}:{
  selectedNode:ICheckPoint,
  onChange: (changedData:ICheckPoint) => void,
  editable?: boolean,
  children: any;
}) => {
  const duration = selectedNode?.data?.duration;
  const days = duration ? Math.floor(duration / 86400) : 0;
  const mins = duration ? Math.floor((duration % 86400) / 60) : 0;
  const seconds = duration ? duration % 60 : 0;
  const dateChange = (durationChanged:number) => {
    const node = structuredClone(selectedNode);
    node.data.duration = durationChanged;
    onChange(node);
  };
  const locked = selectedNode?.locked ? selectedNode?.locked : {};
  const [vmDrawerVisbibility, setvmDrawerVisbibility] = useState(false);
  return (
    <>
      <Drawer
        open={vmDrawerVisbibility}
        onClose={() => {
          setvmDrawerVisbibility(false);
        }}
      >
        <ChooseVoteMachine
          onNew={(data:any) => {
            console.log('waht is this? ', data);
          }}
          currentType={selectedNode?.vote_machine_type}
        />
      </Drawer>
      <Space direction="vertical" size="large" className="w-full">
        <Button
          onClick={() => {
            setvmDrawerVisbibility(true);
          }}
        >
          Change machine type
        </Button>
        <Space direction="horizontal" className="w-full justify-between p-2 border-slate-300 border rounded">
          <Space direction="horizontal">
            <span>
              Change this checkpoint to
              <Tag className="ml-2" color={selectedNode?.isEnd ? 'red' : 'blue'}>
                {selectedNode?.isEnd ? 'votable node' : ' end node'}
              </Tag>
            </span>
            {selectedNode?.isEnd ?
            (
              <Switch
                checked={selectedNode?.isEnd}
                disabled={!editable}
                onChange={(isEnd) => {
                  onChange({
                    isEnd,
                  });
                }}
              />
            )
            :
            (
              <Popconfirm
                title="Are you sure?"
                description="This will delete all connection to other nodes!"
                onConfirm={() => {
                  onChange({
                    isEnd: !selectedNode?.isEnd,
                  });
                }}
                disabled={locked.isEnd || !editable}
              >
                <Switch
                  checked={selectedNode?.isEnd}
                  disabled={locked.isEnd || !editable}
                />
              </Popconfirm>
            )
            }
          </Space>
          <Button
            icon={locked.isEnd ? <LockFilled /> : <UnlockOutlined />}
            onClick={() => {
              const newLocked = { ...locked, isEnd: !locked.isEnd };
              const newNode = structuredClone(selectedNode);
              newNode.locked = newLocked;
              onChange(newNode);
            }}
            disabled={!editable}
          />
        </Space>
        {!selectedNode?.isEnd ?
        (
          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header="Voting Logic" key="1">
              {children}
            </Collapse.Panel>
          </Collapse>
        )
        : null
        }
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={`Voting duration (${duration ? moment.duration(duration, 'seconds').humanize() : 'missing'})`} key="1">
            <Space direction="horizontal">
              <Space direction="horizontal">
                <Input
                  addonAfter="days"
                  value={days}
                  onChange={(e) => {
                    dateChange(
                      parseInt(e.target.value, 10) * 86400 + mins * 60 + seconds,
                    );
                  }}
                  disabled={locked.duration}
                />
                <Input
                  addonAfter="minutes"
                  value={mins}
                  onChange={(e) => {
                    dateChange(
                      days * 86400 + parseInt(e.target.value, 10) * 60 + seconds,
                    );
                  }}
                  disabled={locked.duration}
                />
                <Input
                  addonAfter="seconds"
                  value={seconds}
                  onChange={(e) => {
                    dateChange(
                      days * 86400 + mins * 60 + parseInt(e.target.value, 10),
                    );
                  }}
                  disabled={locked.duration}
                />
              </Space>
              <Button
                icon={locked.duration ? <LockFilled /> : <UnlockOutlined />}
                onClick={() => {
                  if (duration === undefined || Number.isNaN(duration) || duration === 0) {
                    Modal.error({
                      title: 'Invalid data',
                      content: 'Cannot lock duration if it is not set',
                    });
                  } else {
                    const newLocked = { ...locked, duration: !locked.duration };
                    const newNode = structuredClone(selectedNode);
                    newNode.locked = newLocked;
                    onChange(newNode);
                  }
                }}
                disabled={!editable}
              />
            </Space>
          </Collapse.Panel>
          <Collapse.Panel header="Participation" key="2">
            <Select
              style={{ width: '100%' }}
              defaultValue="whitelist"
              options={[
                {
                  key: 'whitelist',
                  label: 'A lits of addresses',
                  value: 'whitelist',
                },
                // choosing this option would engage Votemachine
                {
                  key: 'spl',
                  label: 'A SPL Token owner',
                  value: 'spl',
                },
                // choosing this option would engage Votemachine
                {
                  key: 'erc20',
                  label: 'An ERC20 Token owner',
                  value: 'erc20',
                },
              ]}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Voting Power Provider" key="3">
            <Select
              style={{ width: '100%' }}
              defaultValue="default"
              options={[
                {
                  key: 'default',
                  label: 'Use voting power provided by voting program',
                  value: '',
                },
                {
                  key: 'a_system_owned_address',
                  label: 'Provide by SyncVote',
                  value: 'a_system_owned_address',
                },
              ]}
            />
          </Collapse.Panel>
        </Collapse>
      </Space>
    </>
  );
};

export default RulesTab;
