import {
  Tabs,
} from 'antd';
import { ICheckPoint } from '../../../types';
import ContextTab from './ContextTab';
import RulesTab from './RulesTab';
import TriggerTab from './TriggerTab';

const MachineConfigPanel = ({
  children, selectedNode, onChange, web2Integrations, allNodes, editable = false,
}:{
  children: any,
  selectedNode: any,
  onChange: (changedData:ICheckPoint) => void,
  web2Integrations: any[],
  allNodes: any[],
  editable?: boolean,
}) => {
  const items = [
    {
      key: '1',
      label: 'Content',
      children: (
        <ContextTab
          selectedNode={selectedNode}
          onChange={onChange}
          editable={editable}
        />
      ),
    },
    {
      key: '2',
      label: 'Rules and conditions',
      children: (
        <RulesTab
          selectedNode={selectedNode}
          onChange={onChange}
          editable={editable}
        >
          {children}
        </RulesTab>
      ),
    },
    {
      key: '3',
      label: 'Automated actions',
      children: <TriggerTab
        web2Integrations={web2Integrations}
        triggers={selectedNode?.triggers || []}
        onChange={onChange}
        children={selectedNode?.children}
        selectedNode={selectedNode}
        allNodes={allNodes}
        editable={editable}
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
