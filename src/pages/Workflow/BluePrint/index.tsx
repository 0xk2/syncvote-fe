import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PAGE_ROUTES } from '@utils/constants/pageRoutes';
import { useSelector, useDispatch } from 'react-redux';
import { queryWorkflow } from '@middleware/data';
import { createIdString, extractIdFromIdString, getImageUrl } from '@utils/helpers';
import Meta from 'antd/es/card/Meta';
import {
  Avatar, Card, Button,
} from 'antd';
import ZapIcon from '@assets/icons/svg-icons/ZapIcoin';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import {
  PlusOutlined, StarFilled, StarOutlined,
} from '@ant-design/icons';

const BluePrint = () => {
  const navigate = useNavigate();
  const { orgIdString, workflowIdString } = useParams();
  const dispatch = useDispatch();
  const { workflows, initialized } = useSelector((state:any) => state.ui);
  const workflowId = extractIdFromIdString(workflowIdString);
  const orgId = extractIdFromIdString(orgIdString);
  const [workflow, setWorkflow] = useState({
    id: -1,
    title: '',
    desc: '',
    icon_url: '',
    workflow_version: [],
  });
  const extractWorkflowFromList = (list:any) => {
    list.forEach((d:any) => {
      if (d.id === workflowId) {
        let isPreset = false;
        isPreset = d.icon_url ? isPreset = d.icon_url.includes('preset') : false;
        setWorkflow({
          ...d,
          icon_url: getImageUrl({ filePath: d.icon_url.replace('preset:', ''), isPreset, type: 'icon' }),
        });
      }
    });
  };
  useEffect(() => {
    if (workflows.length > 0) extractWorkflowFromList(workflows);
    if (initialized === false) {
      queryWorkflow({
        orgId,
        onLoad: (data) => {
          extractWorkflowFromList(data);
        },
        dispatch,
      });
    }
  }, [workflows]);

  return (
    <div className="container mx-auto relative">
      <div className="relative my-[20px]">
        <Card>
          <Meta
            title={`Workflow: ${workflow.title}`}
            description={workflow.desc}
            avatar={<Avatar src={workflow.icon_url} />}
          />
        </Card>
      </div>
      <div className="flex items-center mb-6 container justify-between">
        <div className="text-gray-title font-semibold text-text_5 pl-1.5 flex flex-row items-center">
          <div className="flex flex-row items-center">
            <span className="inline-block">
              <ZapIcon />
            </span>
            <span className="ml-2 hover:text-slate-500 cursor-pointer">
              <span>
                Versions
              </span>
              (
              {workflow.workflow_version.length}
              )
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <Button
            type="link"
            className="flex items-center"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate(`/${PAGE_ROUTES.WORKFLOW.ROOT}/${orgIdString}/${createIdString(workflow.title, workflow.id.toString())}/new`);
            }}
          >
            New & Clear
          </Button>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-3 gap-4 justify-items-left">
        {workflow.workflow_version.map((version:any) => {
          return (
            <Card
              key={version.id}
              title={`${version.version} [${version.status}]`}
              className="w-[300px]"
              extra={version.recommended ? <StarFilled title="Should show at new Mission screen" /> : <StarOutlined />}
            >
              <div className="flex flex-row items-align-center">
                <button
                  onClick={() => {
                    navigate(`/${PAGE_ROUTES.WORKFLOW.ROOT}/${orgIdString}/${createIdString(workflow.title, workflow.id.toString())}/${createIdString(version.version, version.id)}`);
                  }}
                  className="hover:bg-slate-200 bg-slate-100 rounded text-slate-700 p-2 h-[44px]"
                >
                  Edit
                </button>
                {version.status === 'PUBLISHED' ?
                  (
                    <div
                      className="cursor-pointer hover:bg-slate-200 bg-sky-500 rounded text-white hover:text-slate-700 p-2 inline-block h-[44px] ml-3 items-align-center flex"
                      onClick={() => {
                        navigate(`/${PAGE_ROUTES.INITIATIVE.ROOT}/${orgIdString}/${createIdString(workflow.title, workflow.id.toString())}/${createIdString(version.version, version.id)}/${PAGE_ROUTES.INITIATIVE.MISSION}/`);
                      }}
                    >
                      <PlusIcon className="inline-block" />
                      <div className="pl-2 inline-block line flex items-center select-none">New Mission</div>
                    </div>
                  )
                  :
                  null
                }
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BluePrint;
