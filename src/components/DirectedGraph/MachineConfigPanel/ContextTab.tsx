import {
  Button, Collapse, Input, Popconfirm, Space, Switch, Tag,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { LockFilled, UnlockOutlined } from '@ant-design/icons';

import { ICheckPoint } from '../../../types';

const ContextTab = ({
  selectedNode = {}, onChange, children, editable,
} : {
  selectedNode?: any;
  onChange: (changedData:ICheckPoint) => void;
  children: any;
  editable?: boolean;
}) => {
  const locked = selectedNode?.locked ? selectedNode?.locked : {};
  return (
    <Space direction="vertical" size="large" className="w-full">
      <Space.Compact className="w-full">
        <Input
          value={selectedNode?.title ? selectedNode.title : selectedNode.id}
          onChange={(e) => {
            const newNode = structuredClone(selectedNode);
            newNode.title = e.target.value;
            onChange(newNode);
          }}
          disabled={locked.title}
        />
        <Button
          icon={locked.title ? <LockFilled /> : <UnlockOutlined />}
          onClick={() => {
            const newLocked = { ...locked, title: !locked.title };
            const newNode = structuredClone(selectedNode);
            newNode.locked = newLocked;
            onChange(newNode);
          }}
          disabled={!editable}
        />
      </Space.Compact>
      <Space direction="vertical" size="small" className="w-full">
        <Space direction="horizontal" className="justify-between w-full">
          <span>Information supporting the decision</span>
          <Button
            icon={locked.description ? <LockFilled /> : <UnlockOutlined />}
            onClick={() => {
              const newLocked = { ...locked, description: !locked.description };
              const newNode = structuredClone(selectedNode);
              newNode.locked = newLocked;
              onChange(newNode);
            }}
            disabled={!editable}
          />
        </Space>
        <TextArea
          value={selectedNode?.description}
          onChange={(e) => {
            const newNode = structuredClone(selectedNode);
            newNode.description = e.target.value;
            onChange(newNode);
          }}
          disabled={locked.description}
        />
      </Space>
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
      {!selectedNode.isEnd ?
      (
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="Voting Logic" key="1">
            {children}
          </Collapse.Panel>
        </Collapse>
      )
      : null
      }
    </Space>
  );
};

export default ContextTab;
