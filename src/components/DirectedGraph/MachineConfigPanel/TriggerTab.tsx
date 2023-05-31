import { IIntegration } from '@pages/Organization/interface';
import {
  Button, Collapse, Drawer, Select, Space,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Paragraph from 'antd/es/typography/Paragraph';
import Twitter from '../Enforcer/Twitter';

interface ITrigger {
  id: string,
  name: string,
  provider: string,
  integrationId: string,
  params: any,
}

const getProvider = (provider:string) => {
  switch (provider) {
    case Twitter.getName():
      return {
        Add: Twitter.Add,
        Display: Twitter.Display,
      };
    default:
      return {
        Add: () => (<></>),
        Display: () => (<></>),
      };
  }
};

const TriggerTab = ({
  web2Integrations, triggers, onChange, children, selectedNode, allNodes,
}:{
  web2Integrations: IIntegration[],
  triggers: ITrigger[],
  onChange: (data:any) => void,
  children: any[],
  selectedNode: any,
  allNodes: any[],
}) => {
  const [showAddTriggerDrawer, setShowAddTriggerDrawer] = useState(false);
  const [selectedIntegrationId, setSelectedIntegrationId] = useState<string>();
  const [selectedTriggerAt, setSelectedTriggerAt] = useState<string>();
  const options = web2Integrations?.map((integration:IIntegration) => {
    return {
      id: integration.id,
      label: `${integration.provider}:${integration.username}`,
      value: integration.id,
    };
  });
  const selectedIntegration = web2Integrations?.find(
    (integration) => integration.id === selectedIntegrationId);
  const AddElement = getProvider(selectedIntegration?.provider || '').Add;
  const triggerAtOptions = [
    {
      id: 'this',
      label: 'This checkpoint started',
      value: 'this',
    },
  ];
  children?.forEach((childId) => {
    let title = allNodes.find((n) => n.id === childId).title || childId;
    if (title.length > 20) {
      title = `${title.slice(0, 20)}...`;
    }
    triggerAtOptions.push({
      id: childId,
      label: `'${title}' is choosen`,
      value: childId,
    });
  });
  return (
    <Space direction="vertical" className="w-full" size="large">
      <Collapse>
        {
          triggers.map(
            (trigger:ITrigger, index: number) => {
              const display = getProvider(trigger.provider).Display;
              return (
                <Collapse.Panel
                  header={
                    (
                      <Paragraph
                        style={{ marginBottom: '0px' }}
                        editable={{
                          onChange: (name) => {
                            const newTriggers = [...triggers];
                            newTriggers[index].name = name;
                            onChange({
                              ...selectedNode,
                              triggers: newTriggers,
                            });
                          },
                        }}
                      >
                        {trigger.name}
                      </Paragraph>
                    )
                  }
                  key={trigger.id || Math.random()}
                  extra={(
                    <Space direction="horizontal" size="middle">
                      <DeleteOutlined
                        className="text-red-500"
                        onClick={() => {
                          const tmpSelectedNode = structuredClone(selectedNode);
                          const tmpTriggers = [...triggers];
                          tmpTriggers.splice(index, 1);
                          onChange({
                            ...tmpSelectedNode,
                            triggers: tmpTriggers,
                          });
                        }}
                      />
                    </Space>
                  )}
                >
                  <div>
                    {display({
                      ...trigger, allNodes,
                    })}
                  </div>
                </Collapse.Panel>
              );
            },
        )}
      </Collapse>
      <Button
        type="default"
        className="w-full"
        onClick={() => {
          setShowAddTriggerDrawer(true);
        }}
      >
        Add Trigger
      </Button>
      <Drawer
        open={showAddTriggerDrawer}
        title="Add Trigger"
        onClose={() => {
          setShowAddTriggerDrawer(false);
        }}
      >
        <Space direction="vertical" className="w-full" size="large">
          <Select
            options={options}
            value={selectedIntegrationId}
            onChange={(value) => {
              setSelectedIntegrationId(value);
            }}
            className="w-full"
          />
          {selectedIntegrationId ?
          (
            <Space direction="vertical" className="w-full" size="small">
              <div>Trigger when</div>
              <Select
                options={triggerAtOptions}
                className="w-full"
                value={selectedTriggerAt}
                onChange={(value) => {
                  setSelectedTriggerAt(value);
                }}
              />
              <AddElement
                data={selectedIntegration}
                onChange={(data:any) => {
                  const tmpData = structuredClone(data);
                  const tmpSelectedNode = structuredClone(selectedNode);
                  tmpData.integrationId = selectedIntegrationId;
                  delete tmpData.id;
                  delete tmpData.access_token;
                  delete tmpData.refresh_token;
                  delete tmpData.refresh_token_expires_at;
                  delete tmpData.created_at;
                  delete tmpData.scope;
                  delete tmpData.updated_at;
                  onChange({
                    ...tmpSelectedNode,
                    triggers: [...triggers, {
                      provider: selectedIntegration?.provider,
                      name: `Trigger#${triggers.length + 1}`,
                      triggerAt: selectedTriggerAt,
                      ...tmpData,
                    }],
                  });
                  setShowAddTriggerDrawer(false);
                }}
              />
            </Space>
          )
          :
          null}
        </Space>
      </Drawer>
    </Space>
  );
};

export default TriggerTab;
