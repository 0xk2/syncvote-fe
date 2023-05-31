import {
  CarryOutOutlined, DeleteOutlined, NodeIndexOutlined, PlusOutlined,
} from '@ant-design/icons';
import {
  Button, Drawer, Input, Select, Space, Tag,
} from 'antd';
import { useState } from 'react';

interface Option {
  title: string,
  description: string,
}
interface Config {
  id: string,
  data: IData,
  mode?: Mode,
  whitelist?: string[],
  votingPowerProvider?: string,
  splNftCollection?: string,
  onChange: (data:any) => void,
  children?: string[],
  allNodes: any[],
}

interface IData { //eslint-disable-line
  options?: Option[],
  max?: number,
  next?: string,
  fallback?: string,
  upTo?: number,
}

const deleteChildNode = (data: IData, children:string[], childId:string) => { //eslint-disable-line
  const result = structuredClone(data);
  if (childId === data.next) {
    delete result.next;
  } else if (childId === data.fallback) {
    delete result.fallback;
  }
  return result;
};

const ConfigPanel = ({
  id, mode = Mode.WhiteList, votingPowerProvider = '', whitelist = [], splNftCollection = '', onChange = (data) => {}, children = [], //eslint-disable-line
  data = {
    max: 0,
    upTo: 1,
    options: [],
    next: '',
    fallback: '',
  }, allNodes //eslint-disable-line
}: Config) => {
  // TODO: config `upTo`
  const {
    max, options, next, fallback, upTo,
  } = data;
  const [newOption, setNewOption] = useState({
    title: '',
    description: '',
  });
  const [showNewOptionDrawer, setShowNewOptionDrawer] = useState(false);
  const possibleOptions:any[] = [];
  let maxStr = '0';
  if (max) {
    maxStr = max < 1 ? `${max * 100}%` : `${max}`;
  }
  let nextTitle = next;
  let fallbackTitle = fallback;
  allNodes.forEach((node) => {
    if (node.id !== fallback && node.id !== next && node.id !== id) {
      possibleOptions.push({
        value: node.id,
        label: node.title ? node.title : node.id,
      });
    } else if (node.id === fallback) {
      fallbackTitle = node.title ? node.title : node.id;
    } else if (node.id === next) {
      nextTitle = node.title ? node.title : node.id;
    }
  });
  const renderChildren = (type:any, val:any) => {
    return (
      !val ?
        (
          <Space direction="horizontal" className="flex items-center" size="small">
            <div>
              {type === 'next' ? 'If we found winner then ' : 'If voting is over and we can not find winners, then ' }
            </div>
            <NodeIndexOutlined />
            <Select
              style={{ width: '200px' }}
              options={possibleOptions}
              onChange={(value) => {
                const newData:any = structuredClone(data);
                newData[type] = value; //eslint-disable-line
                onChange({
                  data: newData,
                  children: [...children, value],
                });
              }}
            />
          </Space>
        )
        :
        (
          <Space direction="horizontal" size="small">
            <Button
              type="link"
              className="flex items-center text-red-500"
              icon={<DeleteOutlined />}
              onClick={() => {
                const newData:any = structuredClone(data);
                delete newData[type];
                const newChildren = [...children];
                const idx = children.indexOf(val);
                newChildren.splice(idx, 1);
                onChange({
                  data: newData,
                  children: newChildren,
                });
              }}
            />
            {type === 'next' ? 'Winner found' : 'No winner found'}
            <NodeIndexOutlined />
            {type === 'next' ? <Tag>{nextTitle}</Tag> : <Tag>{fallbackTitle}</Tag>}
          </Space>
        )
    );
  };
  // const lOptions = options ? options.length : 0;
  return (
    <Space direction="vertical" size="large" className="mb-4 w-full">
      <Space direction="vertical" size="small" className="w-full">
        <div className="text-lg">Poll Vote</div>
        <div className="bg-slate-100 p-2 w-full">{`Everyone choose up to ${upTo || 'X'} options until ${upTo || 'X'} options reach ${maxStr || 'condition to pass'}`}</div>
      </Space>
      <Space direction="vertical" size="small" className="w-full">
        <div className="text-md">Min no of vote to pass (e.g: 3, 10%)</div>
        <Space.Compact className="w-full">
          <Input
            type="text"
            className="w-full"
            prefix={(
              <div className="text-slate-300">
                <CarryOutOutlined className="inline-flex items-center pr-2" />
              </div>
            )}
            value={maxStr}
            onChange={(e) => {
              const str = e.target.value;
              let tMax = 0;
              if (str !== '') {
                tMax = str.indexOf('%') > 0 ? parseFloat(str) / 100 : parseInt(str, 10);
              }
              onChange({
                data: {
                  ...structuredClone(data),
                  max: tMax,
                },
              });
            }}
          />
        </Space.Compact>
      </Space>
      <Space direction="vertical" size="small" className="w-full">
        <div className="text-md">
          Max number of choices
          {/* (&lt;
          {lOptions}
          ) */}
        </div>
        <Space.Compact className="w-full">
          <Input
            type="number"
            className="w-full"
            prefix={(
              <div className="text-slate-300">
                <CarryOutOutlined className="inline-flex items-center pr-2" />
              </div>
            )}
            value={upTo}
            onChange={(e) => {
              onChange({
                data: {
                  ...structuredClone(data),
                  upTo: parseInt(e.target.value, 10),
                },
              });
              // TODO: enforce this in Mission, not in workflow
              // if (e.target.value !== '' && !Number.isNaN(parseInt(e.target.value, 10))
              //   && parseInt(e.target.value, 10) > 0 && parseInt(e.target.value, 10) < lOptions) {
              //   onChange({
              //     data: {
              //       upTo: parseInt(e.target.value, 10),
              //     },
              //   });
              // } else {
              //   onChange({
              //     data: {
              //       upTo: 0,
              //     },
              //   });
              // }
            }}
          />
        </Space.Compact>
      </Space>
      {
        options && options.length > 0 ?
        (
          <Space direction="vertical" size="small" className="w-full">
            <div>List of options</div>
            {options?.map((option, index) => (
              <div key={option.title}>
                <Button
                  className="mr-2"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    onChange({
                      data: {
                        ...structuredClone(data),
                        options: [
                          ...options.slice(0, index),
                          ...options.slice(index + 1),
                        ],
                      },
                    });
                  }}
                />
                {`${option.title} , ${option.description}`}
              </div>
            ))}
          </Space>
        )
        : <></>
      }
      <Button
        icon={<PlusOutlined />}
        className="w-full"
        onClick={() => { setShowNewOptionDrawer(true); }}
      >
        New Option
      </Button>
      <Drawer
        open={showNewOptionDrawer}
        onClose={() => { setShowNewOptionDrawer(false); }}
        title="New Option"
      >
        <Space direction="vertical" size="small" className="w-full">
          <div className="text-slate-700">Title</div>
          <Input
            type="text"
            className="w-full"
            value={newOption.title}
            onChange={(e) => {
              setNewOption({
                ...newOption,
                title: e.target.value,
              });
            }}
          />
          <div className="text-slate-700">Description</div>
          <Input.TextArea
            className="w-full"
            value={newOption.description}
            onChange={(e) => {
              setNewOption({
                ...newOption,
                description: e.target.value,
              });
            }}
          />
          <Button
            type="default"
            className="w-full"
            icon={<PlusOutlined />}
            onClick={() => {
              setNewOption({ title: '', description: '' });
              setShowNewOptionDrawer(false);
              onChange({
                data: { ...data, options: options ? [...options, newOption] : [newOption] },
              });
            }}
          >
            Add
          </Button>
        </Space>
      </Drawer>
      {renderChildren('next', next)}
      {renderChildren('fallback', fallback)}
    </Space>
  );
};

const getName = () => {
  return 'MultipleChoiceRaceToMax';
};

enum Mode {
  WhiteList,
  SPL_NFT,
  EVM_NFT,
}

export default {
  ConfigPanel,
  getName,
  Mode,
  deleteChildNode,
};
