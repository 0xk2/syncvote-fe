import {
  ShareAltOutlined, TwitterOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { Tag } from 'antd';
import {
  ICheckPoint,
  IVoteMachine, IVoteMachineGetLabelProps,
} from '../../types';
import {
  getProgramAddress as gpa, getName as gn, deleteChildNode as dcn, getType as gt,
  getInitialData as gid,
} from './funcs';
import cf from './ConfigPanel';
import { IData } from './interface';

export const getLabel = (props: IVoteMachineGetLabelProps) => {
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

export const getIcon = () => {
  return (
    <ShareAltOutlined />
  );
};

export const explain = ({
  checkpoint, data,
}:{
  checkpoint:ICheckPoint, data:IData
}) => {
  const noOfOptions = checkpoint.children ? checkpoint.children.length : 0;
  const p1 = (
    <div className="block">
      The voting would lasts
      <Tag className="text-violet-500 mx-2">
        apprx.&nbsp;
        {moment.duration((checkpoint.duration || 0) * 1000).humanize()}
      </Tag>
      and the user would have to choose ONE of
      <Tag className="text-violet-500 mx-2">
        {noOfOptions}
      </Tag>
      options.
      {data.includedAbstain ? ' User can also choose to abstain from voting.' : ''}
      {/* Only user with ... can vote. */}
      <br />
      The winning option must reach
      <Tag className="text-violet-500 mx-2">
        {data.max < 1 ? `${data.max * 100}% ` : `${data.max} `}
        {!data.token ? 'votes' : ` voted token ${data.token}`}
      </Tag>
      to win.
    </div>
  );
  return (
    p1
  );
};

const VoteMachine : IVoteMachine = {
  ConfigPanel: cf,
  getProgramAddress: gpa,
  getName: gn,
  deleteChildNode: dcn,
  getLabel,
  getType: gt,
  getIcon,
  getInitialData: gid,
  explain,
};

export default VoteMachine;
