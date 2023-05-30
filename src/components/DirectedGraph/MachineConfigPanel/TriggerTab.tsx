import { IIntegration } from '@pages/Organization/interface';
import {
  Button, Collapse, Drawer, Select, Space,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
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
  web2Integrations, triggers, onChange, children, selectedNode,
}:{
  web2Integrations: IIntegration[],
  triggers: ITrigger[],
  onChange: (data:any) => void,
  children: any[],
  selectedNode: any,
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
  const addElement = getProvider(selectedIntegration?.provider || '').Add;
  const triggerAtOptions = [
    {
      id: 'this',
      label: 'This checkpoint started',
      value: 'this',
    },
  ];
  children?.forEach((child) => {
    triggerAtOptions.push({
      id: child,
      label: `when - ${child} is choosen`,
      value: child,
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
                  header={trigger.name}
                  key={trigger.id || trigger.name}
                  extra={(
                    <EditOutlined
                      onClick={() => {
                        console.log('edit ',trigger.id,'; index: ',index);
                      }}/>
                  )}
                >
                  <div>
                    {display(trigger)}
                  </div>
                </Collapse.Panel>
              );
            },
        )}
      </Collapse>
      <Button
        type="default"
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
          <Space direction="vertical" className="w-full" size="small">
            <div>Trigger when</div>
            {selectedIntegrationId ?
              (
                <Select
                  options={triggerAtOptions}
                  className="w-full"
                  value={selectedTriggerAt}
                  onChange={(value) => {
                    setSelectedTriggerAt(value);
                  }}
                />
              )
              :
              null}
            {addElement({
              data: selectedIntegration,
              onChange: (data) => {
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
              },
            })}
          </Space>
        </Space>
      </Drawer>
    </Space>
  );
};

export default TriggerTab;
