import {
  Space, Collapse, Input, Button, Select, Modal,
} from 'antd';
import { LockFilled, UnlockOutlined } from '@ant-design/icons';
import moment from 'moment';

import { ICheckPoint } from '../interfaces';

const RulesTab = ({ selectedNode, onChange }:{
  selectedNode:ICheckPoint,
  onChange: (changedData:ICheckPoint) => void,
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
            />
          </Space>
        </Collapse.Panel>
        <Collapse.Panel header="Participation" key="2">
          <Select options={[
              {
                label: 'Address',
                value: 'address',
              },
            ]}
          />
        </Collapse.Panel>
      </Collapse>
    </Space>
  );
};

export default RulesTab;
