import {
  SingleChoiceRaceToMax,
  MultipleChoiceRaceToMax,
} from '@components/DirectedGraph';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import MachineConfigPanel from './MachineConfigPanel/MachineConfigPanel';

const getVotemachine = ({
  versionData, selectedNodeId, onChange, onNew, onDelete, onClose, web2Integrations,
}: {
  versionData: any, selectedNodeId:string, onChange: (data:any) => void, onNew: (data:any) => void,
  onDelete: (data:any) => void, onClose: () => void,
  web2Integrations: any[],
}) => {
  const selectedNode = versionData.checkpoints.find((chk:any) => chk.id === selectedNodeId);
  let result;
  if (selectedNode !== undefined) {
    const data = selectedNode.data ? selectedNode.data : {};
    switch (selectedNode.vote_machine_type) {
      case SingleChoiceRaceToMax.getName():
        result = (
          <MachineConfigPanel
            selectedNode={selectedNode}
            onChange={onChange}
            enforcers={selectedNode.enforcers}
            web2Integrations={web2Integrations}
          >
            <SingleChoiceRaceToMax.ConfigPanel
              id={selectedNodeId}
              onChange={onChange}
              children={selectedNode.children}
              allNodes={versionData.checkpoints}
              data={structuredClone(data)}
            />
          </MachineConfigPanel>
        );
        break;
      case MultipleChoiceRaceToMax.getName():
        result = (
          <MachineConfigPanel
            selectedNode={selectedNode}
            onChange={onChange}
            enforcers={selectedNode.enforcers}
            web2Integrations={web2Integrations}
          >
            <MultipleChoiceRaceToMax.ConfigPanel
              id={selectedNodeId}
              onChange={onChange}
              children={selectedNode.children}
              allNodes={versionData.checkpoints}
              data={structuredClone(data)}
            />
          </MachineConfigPanel>
        );
        break;
      default:
        result = (
          <MachineConfigPanel
            selectedNode={selectedNode}
            onChange={onChange}
            enforcers={selectedNode.enforcers}
            web2Integrations={web2Integrations}
          >
            <div>
              <div className="text-lg mb-4">Choose checkpoint</div>
              <div
                className="p-4 border border-slate-300 mb-2 cursor-pointer hover:bg-slate-100"
                onClick={() => {
                  onNew(SingleChoiceRaceToMax.getName());
                }}
              >
                Single Choice
              </div>
              <div
                className="p-4 border border-slate-300 mb-2 cursor-pointer hover:bg-slate-100"
                onClick={() => {
                  onNew(MultipleChoiceRaceToMax.getName());
                }}
              >
                Poll Vote
              </div>
            </div>
          </MachineConfigPanel>
        );
        break;
    }
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
              switch (selectedNode.vote_machine_type) {
                case SingleChoiceRaceToMax.getName():
                  data = SingleChoiceRaceToMax.deleteChildNode(
                    data, selectedNode.children, selectedNodeId,
                  );
                  break;
                case MultipleChoiceRaceToMax.getName():
                  data = MultipleChoiceRaceToMax.deleteChildNode(
                    data, selectedNode.children, selectedNodeId,
                  );
                  break;
                default: break;
              }
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
      { result }
    </Drawer>
  );
};

export default getVotemachine;
