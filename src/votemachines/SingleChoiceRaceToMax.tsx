import { useState } from 'react';
import {
  ArrowLeftOutlined,
  CarryOutOutlined, ClockCircleOutlined, DeleteOutlined, MoneyCollectOutlined, NodeIndexOutlined,
  PlusCircleOutlined, QuestionCircleOutlined, ShareAltOutlined, TwitterOutlined,
} from '@ant-design/icons';
import {
  Input, Select, Space, Button, Tag, Drawer, Tooltip,
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
  const index = children ? children.indexOf(childId) : -1;
  const result = data.options ? [...data.options] : [];
  if (index === -1) {
    return result;
  }
  result.splice(index, 1);
  return { ...data, options: result };
};

const Option = ({
  index, currentNode, option, deleteOptionHandler, changeOptionHandler,
  editable = false, possibleOptions, addAndDeleteOptionHandler,
}:{
  index: number;
  currentNode: any;
  option: string;
  deleteOptionHandler: (index:number) => void;
  changeOptionHandler: (value:any, index:number) => void;
  editable?: boolean;
  possibleOptions: any[];
  addAndDeleteOptionHandler: (newOptionData:any, index:number) => void;
}) => {
  const [label, setLabel] = useState(option);
  return (
    <Space direction="vertical" className="w-full flex justify-between">
      <div className="w-full flex justify-between">
        <div className="w-6/12 flex pt-1 justify-between items-center">
          <span className="text-gray-400">{`Option ${index + 1}`}</span>
          <Button
            type="link"
            className="flex items-center text-violet-600"
            icon={<DeleteOutlined />}
            disabled={!editable}
            onClick={() => deleteOptionHandler(index)}
          >
            Remove
          </Button>
        </div>
        <Space direction="horizontal" className="w-6/12 flex pt-1 justify-between items-center">
          <span className="text-gray-400">Navigate to</span>
          <span className="text-violet-400 flex items-center gap-1">
            <ClockCircleOutlined />
            <span>Deplay 7h</span>
          </span>
        </Space>
      </div>
      <div className="w-full flex justify-between">
        <div className="w-6/12 flex pt-0.25 justify-between items-center pr-2.5">
          <Input
            className="w-full"
            value={label}
            onChange={(e:any) => { setLabel(e.target.value); }}
            onBlur={() => { changeOptionHandler(label, index); }}
          />
        </div>
        <div className="w-6/12 flex pt-0.25 justify-between items-center">
          <Select
            value={currentNode?.title || currentNode?.id}
            suffixIcon={<ArrowLeftOutlined />}
            options={possibleOptions?.map((p:any) => {
              return {
                value: p.id,
                label: p.title ? p.title : p.id,
              };
            })}
            className="w-full"
            onChange={(value) => {
              addAndDeleteOptionHandler({
                id: value,
                title: label,
              }, index);
            }}
          />
        </div>
      </div>
    </Space>
  );
};

/**
 *
 * @param IVoteMachineConfigProps
 * note: editable === true -> then locked item is disabled too
 * @returns ConfigPanel:JSX.Element
 */
const ConfigPanel = ({
  currentNodeId = '', votingPowerProvider = '', whitelist = [], //eslint-disable-line
  data = {
    max: 0,
    token: '', // spl token
    options: [],
  },
  editable,
  onChange = (data:ICheckPoint) => {}, children = [], allNodes = [], //eslint-disable-line
}:IVoteMachineConfigProps) => {
  const { max, token, options } = data;
  let tmpMaxStr = '0';
  if (max) {
    tmpMaxStr = max < 1 ? `${max * 100}%` : `${max}`;
  }
  const [maxStr, setMaxStr] = useState(tmpMaxStr);
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
  const [countedBy, setCountedBy] = useState(token ? 'token' : 'count');
  const addNewOptionHandler = (newOptionData:any) => {
    if (newOptionData.id && newOptionData.title) {
      const opts = options ? [...options] : [];
      const chds = children ? [...children] : [];
      onChange({
        data: {
          options: [
            ...opts,
            newOptionData.title,
          ],
        },
        children: [
          ...chds,
          newOptionData.id,
        ],
      });
    }
  };
  const deleteOptionHandler = (index:number) => {
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
  };
  const changeOptionHandler = (value:any, index:number) => {
    const newData = { ...data };
    const newOptions = [...options];
    newOptions[index] = value;
    onChange({
      data: {
        ...newData,
        options: newOptions,
      },
    });
  };
  const changeMaxHandler = (e:any) => {
    const str = e.target.value;
    let tMax = 0;
    if (str !== '') {
      tMax = str.indexOf('%') > 0 ? parseFloat(str) / 100 : parseInt(str, 10);
    }
    if (tMax > 1) {
      setMaxStr(tMax.toString());
    }
    onChange({
      data: {
        ...data,
        max: tMax,
      },
    });
  };
  const changeTokenHandler = (e:any) => {
    onChange({
      data: {
        ...data,
        token: e.target.value,
      },
    });
  };
  const addAndDeleteOptionHandler = (newOptionData:any, oldIndex:number) => {
    if (newOptionData.id && newOptionData.title) {
      const newData = {
        options: [
          ...options.slice(0, oldIndex),
          ...options.slice(oldIndex + 1),
        ],
      };
      const newChildren = [
        ...children.slice(0, oldIndex),
        ...children.slice(oldIndex + 1),
      ];
      const opts = options ? [...newData.options] : [];
      const chds = children ? [...newChildren] : [];
      onChange({
        data: {
          options: [
            ...opts,
            newOptionData.title,
          ],
        },
        children: [
          ...chds,
          newOptionData.id,
        ],
      });
    }
  };
  const getThresholdText = () => {
    let rs = '';
    if (countedBy === 'count') { // vote counting
      if (max > 1) { // number of vote
        rs = 'Total votes made';
      } else {
        rs = 'Percentage of votes made';
      }
    } else if (countedBy === 'token') { // token counting
      if (max > 1) { // number of vote
        rs = 'Total token voted';
      } else {
        rs = 'Percentage of voted token';
      }
    }
    return rs;
  };
  const getMaxText = () => {
    let rs = <span>condition to pass</span>;
    const tokenEle = token ? <Tag>{token}</Tag> : <Tag color="red">Missing token</Tag>;
    if (max || Number.isNaN(max)) {
      if (max < 1) {
        if (countedBy === 'count') {
          rs = (
            <span>
              {`${max * 100}% of votes`}
            </span>
          );
        } else if (countedBy === 'token') {
          rs = (
            <span>
              <span className="mr-1">
                {`${max * 100}% of total voted tokens`}
              </span>
              {tokenEle}
            </span>
          );
        }
      } else if (max >= 1) {
        if (countedBy === 'count') {
          rs = (
            <span>
              {`${max} votes`}
            </span>
          );
        } else if (countedBy === 'token') {
          rs = (
            <span>
              <span className="mr-1">
                {`${max} tokens`}
              </span>
              {tokenEle}
            </span>
          );
        }
      }
    }
    return rs;
  };
  return (
    <Space direction="vertical" size="large" className="mb-4 w-full">
      <Space direction="vertical" size="small" className="w-full">
        <div className="bg-slate-100 p-2 w-full">
          <span className="mr-0.5">Everyone choose ONE option until one option reach</span>
          {getMaxText()}
        </div>
      </Space>
      {options?.length > 0 ?
      (
        <Space direction="vertical" size="small" className="w-full">
          <div className="text-lg">Options</div>
          {options?.map((option:string, index:number) => {
            const currentNode = allNodes.find((node) => node.id === children[index]);
            return (
              <Option
                key={option}
                index={index}
                option={option}
                currentNode={currentNode}
                changeOptionHandler={changeOptionHandler}
                deleteOptionHandler={deleteOptionHandler}
                possibleOptions={posibleOptions}
                editable={editable}
                addAndDeleteOptionHandler={addAndDeleteOptionHandler}
              />
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
        disabled={!editable}
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
              addNewOptionHandler(newOption);
              setNewOption({
                id: '', title: '',
              });
              setShowNewOptionDrawer(false);
            }}
          >
            Add
          </Button>
        </Space>
      </Drawer>
      <Space direction="vertical" size="small" className="w-full">
        <Space className="text-md" direction="horizontal" size="small">
          <span className="text-lg">Voting results</span>
          <div className="items-center flex">
            <Tooltip title="Counted by number of votes (address showing up) or tokens">
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        </Space>
        <Space direction="vertical" size="small" className="w-full">
          <div className="text-sm text-slate-600">
            Counted by
          </div>
          <Select
            className="w-full"
            value={countedBy}
            options={
              [
                {
                  label: 'Number of votes',
                  value: 'count',
                },
                {
                  label: 'Number of token',
                  value: 'token',
                },
              ]
            }
            onChange={(value) => {
              setCountedBy(value);
            }}
          />
        </Space>
      </Space>
      <Space direction="vertical" size="small" className="w-full">
        <Space className="text-md" direction="horizontal" size="small">
          <span className="text-lg">
            Voting condition
          </span>
          <div className="items-center flex">
            <Tooltip title="Condition for wining option">
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        </Space>
        <Space direction="vertical" size="small" className="w-full">
          <div className="text-sm text-slate-600">
            Threshold calculated by
          </div>
          <Input
            type="text"
            className="w-full"
            disabled
            value={getThresholdText()}
          />
        </Space>
        <Space direction="vertical" size="small" className="w-full">
          <div className="text-sm text-slate-600">
            Threshold value for each result (at least)
          </div>
          <Input
            type="text"
            className="w-full"
            prefix={(
              <div className="text-slate-600">
                <CarryOutOutlined className="inline-flex items-center pr-2" />
              </div>
            )}
            value={maxStr}
            disabled={!editable}
            onChange={(e) => setMaxStr(e.target.value)}
            onBlur={changeMaxHandler}
          />
        </Space>
        {countedBy === 'token' ?
          (
            <Space direction="vertical" size="small" className="w-full">
              <div className="text-sm text-slate-600">
                Token using for voting
              </div>
              <Input
                type="text"
                className="w-full"
                prefix={(
                  <div className="text-slate-300">
                    <MoneyCollectOutlined className="inline-flex items-center pr-2" />
                  </div>
                )}
                value={token}
                disabled={!editable}
                onChange={changeTokenHandler}
              />
            </Space>
          )
          : <></>}
      </Space>
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

const getIcon = () => {
  return (
    <ShareAltOutlined />
  );
};

const getInitialData = () => {
  const data : IData = {
    options: [],
    max: 0,
  };
  return data;
};

const VoteMachine : IVoteMachine = {
  ConfigPanel,
  getProgramAddress,
  getName,
  deleteChildNode,
  getLabel,
  getType,
  getIcon,
  getInitialData,
};

export default VoteMachine;
