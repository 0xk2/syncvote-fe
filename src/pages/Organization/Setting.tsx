import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxPlotOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { deleteWeb2Integration, queryWeb2Integration } from '@utils/data';
import { useParams } from 'react-router-dom';
import { extractIdFromIdString } from '@utils/helpers';
import { IIntegration } from './interface';
import Member from './setting/Member';
import Integration from './setting/Integration';
import Role from './setting/Role';

const Setting = () => {
  const dispatch = useDispatch();
  const { orgIdString } = useParams();
  const { web2Integrations } = useSelector((state:any) => state.ui);
  const [integrations, setIntegrations] = useState<IIntegration[]>(web2Integrations);
  useEffect(() => {
    queryWeb2Integration({
      orgId: extractIdFromIdString(orgIdString),
      onLoad: (data) => {
        setIntegrations(data);
      },
      dispatch,
    });
  }, []);
  const tabs = [
    {
      key: 'setting',
      label: (
        <span className="text-black mt-4">
          <h2>Settings</h2>
        </span>
      ),
      children: <div />,
      disabled: true,
    },
    {
      key: 'members',
      label: (
        <span>
          <UserOutlined />
          Members
        </span>
      ),
      children: <Member />,
    },
    {
      key: 'roles',
      label: (
        <span>
          <SafetyOutlined />
          Roles
        </span>
      ),
      children: <Role />,
    },
    {
      key: 'integrations',
      label: (
        <span>
          <BoxPlotOutlined />
          Integrations
        </span>
      ),
      children: <Integration
        integrations={integrations}
        onDelete={(id:string) => {
          deleteWeb2Integration({
            id,
            onLoad: () => {
              const newIntegrations = structuredClone(integrations);
              const index = newIntegrations.findIndex((item) => item.id === id);
              newIntegrations.splice(index, 1);
              setIntegrations(newIntegrations);
            },
            dispatch,
          });
        }}
      />,
    },
  ];
  return (
    <div className="flex flex-col w-full container mx-auto relative min-h-screen">
      <Tabs
        tabPosition="left"
        style={{ height: '100%' }}
        tabBarStyle={{
          borderRight: 'none',
          width: '288px',
        }}
        items={tabs}
        defaultActiveKey="integrations"
      />
    </div>
  );
};

export default Setting;
