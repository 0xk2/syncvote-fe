import React, { useEffect, useState } from 'react';
import BannerDashBoard from '@components/BannerDashBoard/BannerDashBoard';
import { useDispatch, useSelector } from 'react-redux';
import { resetBlueprint } from '@redux/reducers/blueprint.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { createIdString, extractIdFromIdString } from '@utils/helpers';
import { IOrgType } from '@redux/reducers/ui.reducer/interface';
import { Modal, Card as AntCard, Space } from 'antd';
import ZapIcon from '@assets/icons/svg-icons/ZapIcoin';
import DataIcon from '@assets/icons/svg-icons/DataIcon';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import {
  queryMission, queryWeb2Integration, queryWorkflow, upsertAnOrg,
} from '@middleware/data';
import Icon from '@components/Icon/Icon';
import { IOrg } from '../../types/org';
import EditOrg from './home/EditOrg';
console.log('test');
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orgIdString } = useParams();
  const orgId = extractIdFromIdString(orgIdString);
  const { orgs } = useSelector((state:any) => state.ui);
  const idx = orgs.findIndex((org:IOrgType) => org.id === orgId);
  const [workflows, setWorkflows] = useState([]);
  const [missions, setMissions] = useState<IOrg[]>([]);
  const [currentOrg, setCurrentOrg] = useState<IOrg>({
    id: -1,
    title: '',
    desc: '',
    icon_url: '',
    banner_url: '',
    preset_icon_url: '',
    preset_banner_url: '',
    org_type: '',
    org_size: '',
    role: '',
    profile: [],
  });
  const [showOrgEdit, setShowOrgEdit] = useState(false);
  useEffect(() => {
    dispatch(resetBlueprint(''));
    setCurrentOrg(orgs[idx]);
    queryWeb2Integration({
      orgId,
      onLoad: () => {
      },
      dispatch,
    });
    queryWorkflow({
      orgId,
      onLoad: (data) => {
        setWorkflows(data);
      },
      dispatch,
    });
    queryMission({
      orgId,
      onLoad: (newMissions) => {
        setMissions(newMissions);
      },
      dispatch,
    });
  }, [orgs]);
  return (
    <div className="flex flex-col w-full">
      <EditOrg
        isOpen={showOrgEdit}
        onClose={() => setShowOrgEdit(false)}
        title={currentOrg?.title}
        desc={currentOrg?.desc}
        profile={currentOrg?.profile}
        onSave={(obj:any) => {}}
      />
      <BannerDashBoard
        org={currentOrg}
        setShowOrgEdit={setShowOrgEdit}
        setOrg={async (obj:any) => {
          setCurrentOrg(obj);
          upsertAnOrg({
            org: {
              ...currentOrg,
              ...obj,
            },
            onLoad: () => {
            },
            dispatch,
          });
        }}
      />
      <div className="container mx-auto relative">
        <div className="relative my-[50px] cursor-pointer">
          <div className="flex items-center mb-10 container justify-between">
            <div className="text-gray-title font-semibold text-text_5 pl-1.5 flex flex-row items-center">
              <span className="inline-block">
                <DataIcon />
              </span>
              <span className="ml-2">
                Multi-linked Proposals
                (
                {missions.length}
                )
              </span>
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-4 justify-items-left">
            {
              missions.map((m:any) => {
                return (
                  <AntCard
                    key={m.id}
                    bordered
                    className="w-[300px] border-b_1 hover:drop-shadow-lg"
                    actions={[
                      <div
                        onClick={() => {
                          navigate(`/${PAGE_ROUTES.INITIATIVE.ROOT}/${orgIdString}/${PAGE_ROUTES.INITIATIVE.MISSION}/${createIdString(m.title, m.id)}`);
                        }}
                      >
                        {m.status === 'PUBLISHED' ? 'View' : 'Edit'}
                      </div>,
                      <div
                        onClick={() => {
                          if (m.status === 'PUBLISHED') {
                            Modal.info({
                              title: 'Voting',
                              content: (
                                <div>
                                  {m.solana_address}
                                </div>
                              ),
                            });
                          }
                        }}
                        className={`${m.status === 'PUBLISHED' ? null : 'text-slate-300 hover:text-slate-300'}`}
                      >
                        Vote
                      </div>,
                    ]}
                  >
                    <Space direction="horizontal" className="flex items-start">
                      <Icon iconUrl={m.icon_url} size="large" />
                      <Space direction="vertical">
                        <div className="text-ellipsis overflow-hidden max-h-16 font-bold">
                          {m.title}
                        </div>
                        <div className="text-ellipsis overflow-hidden max-h-16 text-gray-400">{m.desc}</div>
                      </Space>
                    </Space>
                  </AntCard>
                );
              })
            }
          </div>
        </div>

        <div className="relative my-[50px] cursor-pointer">
          <div className="flex items-center mb-10 container justify-between">
            <div className="text-gray-title font-semibold text-text_5 pl-1.5 flex flex-row items-center">
              <span className="inline-block">
                <ZapIcon />
              </span>
              <span className="ml-2">
                Workflow
                (
                {workflows.length}
                )
              </span>
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-4 justify-items-left">
            {
              workflows.map((w:any) => {
                return (
                  <AntCard
                    key={w.id}
                    bordered
                    className="w-[300px] border-b_1 cursor-pointer hover:drop-shadow-lg"
                    onClick={() => {
                      navigate(`/${PAGE_ROUTES.WORKFLOW.ROOT}/${orgIdString}/${PAGE_ROUTES.WORKFLOW.EDIT}/${createIdString(w.title, w.id)}`, { replace: true });
                    }}
                  >
                    <Space direction="horizontal" className="flex items-start">
                      <Icon iconUrl={w.icon_url} size="large" />
                      <Space direction="vertical">
                        <div className="text-ellipsis overflow-hidden max-h-16 font-bold">{`${w.title}`}</div>
                        <p className="text-ellipsis overflow-hidden max-h-16 text-gray-400">{`${w.workflow_version.length} versions, ${w.desc}`}</p>
                      </Space>
                    </Space>
                  </AntCard>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
