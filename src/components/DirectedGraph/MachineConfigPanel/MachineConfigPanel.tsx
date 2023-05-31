import {
  Tabs,
} from 'antd';
import { ICheckPoint } from '../../../types';
import ContextTab from './ContextTab';
import RulesTab from './RulesTab';
import TriggerTab from './TriggerTab';

const MachineConfigPanel = ({
  children, selectedNode, onChange, web2Integrations, allNodes,
}:{
  children: any,
  selectedNode: any,
  onChange: (changedData:ICheckPoint) => void,
  web2Integrations: any[],
  allNodes: any[],
}) => {
  const items = [
    {
      key: '1',
      label: 'Context',
      children: (
        <ContextTab
          selectedNode={selectedNode}
          onChange={onChange}
        >
          {children}
        </ContextTab>
      ),
    },
    {
      key: '2',
      label: 'Rules and conditions',
      children: <RulesTab
        selectedNode={selectedNode}
        onChange={onChange}
      />,
      disabled: selectedNode?.isEnd,
    },
    {
      key: '3',
      label: 'Triggers',
      children: <TriggerTab
        web2Integrations={web2Integrations}
        triggers={selectedNode?.triggers || []}
        onChange={onChange}
        children={selectedNode?.children}
        selectedNode={selectedNode}
        allNodes={allNodes}
      />,
    },
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
    />
  );
};

export default MachineConfigPanel;
