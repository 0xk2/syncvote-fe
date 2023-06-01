import {
  Space, Collapse, Input, Button, Select, Modal,
} from 'antd';
import { LockFilled, UnlockOutlined } from '@ant-design/icons';
import moment from 'moment';

import { ICheckPoint } from '../../../types';

const RulesTab = ({ selectedNode, onChange, editable = false }:{
  selectedNode:ICheckPoint,
  onChange: (changedData:ICheckPoint) => void,
  editable?: boolean,
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
  return (
    <Space direction="vertical" size="large" className="w-full">
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
  );
};

export default RulesTab;
