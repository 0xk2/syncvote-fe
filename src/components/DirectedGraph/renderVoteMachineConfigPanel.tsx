import { DeleteOutlined } from '@ant-design/icons';
import { Button, Drawer, Space } from 'antd';
import MachineConfigPanel from './MachineConfigPanel/MachineConfigPanel';
import { getAllVoteMachines, getVoteMachine } from './voteMachine';
import { IVoteMachine } from '../../types';

const renderVoteMachineConfigPanel = ({
  versionData, selectedNodeId, onChange, onNew, onDelete, onClose, web2Integrations,
}: {
  versionData: any, selectedNodeId:string, onChange: (data:any) => void, onNew: (data:any) => void,
  onDelete: (data:any) => void, onClose: () => void,
  web2Integrations: any[],
}) => {
  const allVoteMachines = getAllVoteMachines();
  const selectedNode = versionData.checkpoints.find((chk:any) => chk.id === selectedNodeId);
  let configPanel = (
    <MachineConfigPanel
      selectedNode={selectedNode}
      onChange={onChange}
      web2Integrations={web2Integrations}
      allNodes={versionData.checkpoints}
    >
      <Space direction="vertical" className="w-full">
        <div>Choose a vote machine</div>
        {Object.keys(allVoteMachines).map((type:any) => {
          const machine = allVoteMachines[type];
          return (
            <div
              className="p-4 border border-slate-300 mb-2 cursor-pointer hover:bg-slate-100 w-full"
              onClick={() => {
                onNew(type);
              }}
              key={type}
            >
              {machine.getName()}
            </div>
          );
        })}
      </Space>
    </MachineConfigPanel>
  );
  if (selectedNode !== undefined && selectedNode.vote_machine_type !== undefined) {
    const machine:IVoteMachine = getVoteMachine(selectedNode.vote_machine_type);
    const { ConfigPanel } = machine;
    const data = selectedNode.data ? selectedNode.data : {};
    configPanel = (
      <MachineConfigPanel
        selectedNode={selectedNode}
        onChange={onChange}
        web2Integrations={web2Integrations}
        allNodes={versionData.checkpoints}
      >
        <ConfigPanel
          currentNodeId={selectedNodeId}
          onChange={onChange}
          children={selectedNode.children}
          allNodes={versionData.checkpoints}
          data={structuredClone(data)}
        />
      </MachineConfigPanel>
    );
  }
  return (
    <Drawer
      open={selectedNodeId !== '' && selectedNodeId !== undefined}
      onClose={onClose}
      title={`${selectedNode?.title ? selectedNode.title : selectedNodeId}`}
      // TODO: use Paragraph instead
      bodyStyle={{ paddingTop: '0px' }}
      extra={
        (
          <Button
            type="link"
            icon={<DeleteOutlined />}
            className="text-red-500 flex items-center"
            onClick={() => {
              let data = structuredClone(selectedNode.data);
              const newVersionData = structuredClone(versionData);
              const vm = getVoteMachine(selectedNode.vote_machine_type);
              data = vm.deleteChildNode(
                data, selectedNode.children, selectedNodeId,
              );
              newVersionData.data = data;
              onChange(newVersionData);
              onDelete(selectedNodeId);
            }}
          >
            Delete
          </Button>
        )
      }
      size="large"
    >
      { configPanel }
    </Drawer>
  );
};

export default renderVoteMachineConfigPanel;
