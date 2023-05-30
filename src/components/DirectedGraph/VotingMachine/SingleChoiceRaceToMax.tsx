import { useState } from 'react';
import {
  BranchesOutlined, CarryOutOutlined, DeleteOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import {
  Input, Select, Space, Button, Tag,
} from 'antd';
import { ICheckPoint } from '../interfaces';

interface IData { //eslint-disable-line
  options: string[],
  max: number,
}

const getName = () => {
  return 'SingleChoiceRaceToMax';
};

const deleteChildNode = (data: IData, children:string[], childId:string) => {
  const index = children.indexOf(childId);
  const result = data.options.length === 0 ? [] : [...data.options];
  if (index === -1) {
    return result;
  }
  result.splice(index, 1);
  console.log('result after splice: ',result);
  return { ...data, options: result };
};

interface Config {
  id?: string,
  data: IData,
  mode?: Mode,
  whitelist?: string[],
  votingPowerProvider?: string,
  splNftCollection?: string,
  children: string[],
  allNodes: any[],
  onChange: (data:any) => void,
}

const ConfigPanel = ({
  id = '', mode = Mode.WhiteList, votingPowerProvider = '', whitelist = [], splNftCollection = '', //eslint-disable-line
  data = {
    max: 0,
    options: [],
  },
  onChange = (data:ICheckPoint) => {}, children = [], allNodes = [], //eslint-disable-line
}:Config) => {
  const { max, options } = data;
  let max_str = 0;
  if (max) {
    max_str = max < 1 ? `${max * 100}%` : `${max}`;
  }
  const posibleOptions:ICheckPoint[] = [];
  allNodes.forEach((child) => {
    if (child.id !== id && !children.includes(child.id)) {
      posibleOptions.push(child);
    }
  });
  const [newOption, setNewOption] = useState({
    id: '', title: '',
  });
  return (
    <Space direction="vertical" size="large" className="mb-4 w-full">
      <Space direction="vertical" size="small" className="w-full">
        <div className="text-lg">Single Choice</div>
        <div className="bg-slate-100 p-2 w-full">
          {`Everyone choose ONE option until one option reach ${max || 'condition to pass'}`}
        </div>
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
            value={max_str}
            onChange={(e) => {
              const str = e.target.value;
              let tMax = 0;
              if (str !== '') {
                tMax = str.indexOf('%') > 0 ? parseFloat(str) / 100 : parseInt(str, 10);
              }
              onChange({
                data: {
                  ...data,
                  max: tMax,
                },
              });
            }}
          />
        </Space.Compact>
      </Space>
      {options?.length > 0 ?
      (
        <Space direction="vertical" size="small">
          <div className="text-md">List of options</div>
          {options?.map((option, index) => {
            const currentNode = allNodes.find((node) => node.id === children[index]);
            return (
              <div
                key={children[index]}
                className="mb-2 inline-flex items-center"
              >
                <Button
                  className="mr-2 inline-flex items-center"
                  type="link"
                  icon={<DeleteOutlined className="text-red-600" />}
                  onClick={() => {
                    onChange({
                      data: {
                        options: [
                          ...options.slice(0, index),
                          ...options.slice(index + 1),
                        ],
                      },
                      children: [
                        ...children.slice(0, index),
                        ...children.slice(index + 1),
                      ],
                    });
                  }}
                />
                <span className="pr-4">
                  {option}
                </span>
                {
                  currentNode.title ?
                  (
                    <Tag>
                      <BranchesOutlined className="pr-2 inlinex-flex items-center" />
                      {currentNode.title}
                    </Tag>
                  )
                  :
                  (
                    <Tag>
                      <BranchesOutlined className="pr-2 inlinex-flex items-center" />
                      {currentNode.id}
                    </Tag>
                  )
                }
              </div>
            );
          },
          )}
        </Space>
      )
      : <></>}
      <Space direction="vertical" className="w-full">
        <Space direction="horizontal" className="w-full">
          <span>
            Add new Option
          </span>
        </Space>
        <Space direction="horizontal" className="w-full">
          <Input
            type="text"
            value={newOption.title}
            onChange={(e) => setNewOption({
              ...newOption,
              title: e.target.value,
            })}
          />
          <Select
            value={newOption.id}
            style={{ width: '200px' }}
            options={posibleOptions.map((p) => {
              return {
                value: p.id,
                label: p.title ? p.title : p.id,
              };
            })}
            onChange={(value) => {
              setNewOption({
                ...newOption,
                id: value,
              });
            }}
          />
          <Button
            type="default"
            className="inline-flex items-center"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              if (newOption.id && newOption.title) {
                const opts = options ? [...options] : [];
                const chds = children ? [...children] : [];
                onChange({
                  data: {
                    options: [
                      ...opts,
                      newOption.title,
                    ],
                  },
                  children: [
                    ...chds,
                    newOption.id,
                  ],
                });
                setNewOption({
                  id: '', title: '',
                });
              }
            }}
          >
            Add
          </Button>
        </Space>
      </Space>
    </Space>
  );
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
