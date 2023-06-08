import React, { useEffect } from 'react';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { L } from '@utils/locales/L';
import { useDispatch, useSelector } from 'react-redux';
import { checkNode } from '@redux/reducers/check-node.reducer';
import { createIdString, extractIdFromIdString } from '@utils/helpers';
import { Tag } from 'antd';
import moment from 'moment';
import { queryWorkflow } from '@utils/data';
import { initialize, setWorkflows } from '@redux/reducers/ui.reducer';

const BuildInitiative = () => {
  const navigate = useNavigate();
  const { orgIdString } = useParams();
  const ui = useSelector((state: any) => state.ui);
  const allWorkflows = ui.workflows;
  const orgId = extractIdFromIdString(orgIdString);
  const [workflowVerions, setWorkflowVerions] = React.useState<any[]>([]);
  const handleNavigate = () => {
    const { ROOT, WF_TEMPLATES } = PAGE_ROUTES.WORKFLOW;
    const path = `/${ROOT}/${WF_TEMPLATES}`;
    navigate(path, { state: { previousPath: `/${PAGE_ROUTES.INITIATIVE.ROOT}` } });
  };
  const dispatch = useDispatch();
  if (allWorkflows.length === 0 && ui.initialized === false) {
    queryWorkflow({
      orgId,
      onLoad: () => {
        dispatch(initialize(true));
      },
      dispatch,
    });
  }
  useEffect(() => {
    const workflows = allWorkflows.filter((w: any) => w.owner_org_id === orgId);
    const tmp:any[] = [];
    workflows.map((w: any) => {
      w.workflow_version.map((v:any) => {
        if (v.status === 'PUBLISHED' && v.recommended === true) {
          tmp.push({
            id: v.id,
            title: w.title,
            version: v.version,
            created_at: v.created_at,
            workflowId: w.id,
          });
        }
        return null;
      });
      return null;
    });
    setWorkflowVerions(tmp);
    dispatch(checkNode.actions.resetStore());
  }, [ui]);
  return (
    <div className="container w-full flex justify-center">
      <div className="w-2/3 flex flex-col gap-8  mt-[5%]">
        <p className="text-[#252422] text-[28px] font-semibold">
          Select
          <span className="text-violet-version-5 italic"> a workflow </span>
          to apply
        </p>
        {/* go to `/${PAGE_ROUTES.INITIATIVE.ROOT}/${PAGE_ROUTES.INITIATIVE.REVIEW_CHECKPOINT}` */}
        <div className="flex flex-col gap-4 my-2 w-full border rounded-lg text-[#575655]">
          {
            workflowVerions.map(w => {
              return (
                <div
                  key={w.id}
                  className="flex justify-between items-center cursor-pointer p-4 hover:bg-slate-100"
                  onClick={() => {
                    navigate(`/${PAGE_ROUTES.INITIATIVE.ROOT}/${orgIdString}/${createIdString(w.title, w.workflowId)}/${createIdString(w.version, w.id)}/${PAGE_ROUTES.INITIATIVE.MISSION}`);
                  }}
                >
                  <p className="text-[17px] truncate">
                    {w.title}
                    <Tag className="ml-2">{w.version}</Tag>
                  </p>
                  {/* <p className="text-[13px]">Created on January 1st, 2023</p> */}
                  <p className="text-[13px]">{moment(w.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>
              );
            })
          }
          <div
            className="py-2 text-center text-[#5D23BB] cursor-pointer text-base font-medium"
            onClick={handleNavigate}
          >
            {L('exploreBlueprintsInTheTemplateLibrary')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildInitiative;
