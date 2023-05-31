import { useState } from 'react';
import {
  BranchesOutlined, CarryOutOutlined, DeleteOutlined, NodeIndexOutlined,
  PlusCircleOutlined, TwitterOutlined,
} from '@ant-design/icons';
import {
  Input, Select, Space, Button, Tag, Drawer,
} from 'antd';
import {
  IVoteMachine, ICheckPoint, IVoteMachineGetLabelProps, IVoteMachineConfigProps,
} from '../types';

interface IData { //eslint-disable-line
  options: string[],
  max: number,
}

const getName = () => {
  return 'Single Choice';
};

const getProgramAddress = () => {
  return 'SingleChoiceRaceToMax';
};

/**
 * Providing both getType and getProgramAddress enables the same program with different views
 * @returns Type of the voting machine
 */
const getType = () => {
  return 'SingleChoiceRaceToMax';
};

const deleteChildNode = (data: IData, children:string[], childId:string) => {
  const index = children.indexOf(childId);
  const result = data.options.length === 0 ? [] : [...data.options];
  if (index === -1) {
    return result;
  }
  result.splice(index, 1);
  return { ...data, options: result };
};

const ConfigPanel = ({
  currentNodeId = '', votingPowerProvider = '', whitelist = [], //eslint-disable-line
  data = {
    max: 0,
    options: [],
  },
  onChange = (data:ICheckPoint) => {}, children = [], allNodes = [], //eslint-disable-line
}:IVoteMachineConfigProps) => {
  const { max, options } = data;
  let maxStr = '0';
  if (max) {
    maxStr = max < 1 ? `${max * 100}%` : `${max}`;
  }
  const posibleOptions:ICheckPoint[] = [];
  const [showAddOptionDrawer, setShowNewOptionDrawer] = useState(false);
  allNodes.forEach((child) => {
    if (child.id !== currentNodeId && !children.includes(child.id)) {
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
            value={maxStr}
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
        <Space direction="vertical" size="small" className="w-full">
          <div className="text-md">List of options</div>
          {options?.map((option:any, index:any) => {
            const currentNode = allNodes.find((node) => node.id === children[index]);
            return (
              <Space.Compact
                key={children[index]}
                className="mb-2 inline-flex items-center w-full"
                direction="horizontal"
              >
                <Input
                  prefix={
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
                  className="w-full"
                  value={option}
                  onChange={(e:any) => {
                    const newData = { ...data };
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    onChange({
                      data: {
                        ...newData,
                        options: newOptions,
                      },
                    });
                  }}
                />
                <Button
                  className="mr-2 flex items-center justify-center"
                  type="default"
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
              </Space.Compact>
            );
          },
          )}
        </Space>
      )
      : <></>}
      <Button
        type="default"
        className="w-full"
        onClick={() => setShowNewOptionDrawer(true)}
      >
        Add New Option
      </Button>
      <Drawer
        open={showAddOptionDrawer}
        title="Add New Option"
        onClose={() => setShowNewOptionDrawer(false)}
      >
        <Space direction="vertical" className="w-full">
          <span>
            Add new Option
          </span>
          <Input
            type="text"
            value={newOption.title}
            prefix="Option Title: "
            className="w-full"
            onChange={(e) => setNewOption({
              ...newOption,
              title: e.target.value,
            })}
          />
          <Space direction="horizontal" className="w-full flex justify-between">
            <Space direction="horizontal" size="small">
              Connect
              <NodeIndexOutlined />
            </Space>
            <Select
              value={newOption.id}
              style={{ width: '200px' }}
              options={posibleOptions.map((p) => {
                return {
                  value: p.id,
                  label: p.title ? p.title : p.id,
                };
              })}
              className="w-full"
              onChange={(value) => {
                setNewOption({
                  ...newOption,
                  id: value,
                });
              }}
            />
          </Space>
          <Button
            type="default"
            className="inline-flex items-center text-center justify-center w-full mt-4"
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
                setShowNewOptionDrawer(false);
              }
            }}
          >
            Add
          </Button>
        </Space>
      </Drawer>
    </Space>
  );
};

const getLabel = (props: IVoteMachineGetLabelProps) => {
  const { source, target } = props;
  const data = source.data || {};
  const { triggers } = source;
  const filteredTriggers = triggers?.filter((trg:any) => (trg.triggerAt === target.id));
  const children = source.children || [];
  const idx = children.indexOf(target.id);
  return data.options ?
    (
      <div>
        <div>{data.options[idx]}</div>
        <div>{filteredTriggers?.map((trg:any) => (trg.provider === 'twitter' ? <TwitterOutlined key={trg.id || Math.random()} className="pr-2" /> : <span key={trg.id || Math.random()}>{trg.provider}</span>))}</div>
      </div>
    )
    :
    (
      <div>{filteredTriggers?.map((trg:any) => (trg.provider === 'twitter' ? <TwitterOutlined key={trg.id || Math.random()} className="pr-2" /> : <span key={trg.id || Math.random()}>{trg.provider}</span>))}</div>
    );
};
// label: label.length > 20 ? `${label.substring(0, 20)}...` : label,

const VoteMachine : IVoteMachine = {
  ConfigPanel,
  getProgramAddress,
  getName,
  deleteChildNode,
  getLabel,
  getType,
};

export default VoteMachine;
