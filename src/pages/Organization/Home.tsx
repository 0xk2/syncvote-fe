import React, { useEffect, useState } from 'react';
import BannerDashBoard from '@components/BannerDashBoard/BannerDashBoard';
import { useDispatch, useSelector } from 'react-redux';
import { resetBlueprint } from '@redux/reducers/blueprint.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { createIdString, extractIdFromIdString, getImageUrl } from '@utils/helpers';
import { IOrgType } from '@redux/reducers/ui.reducer/interface';
import {
  changeOrg,
  setWorkflows as setReducerWorkflows, setMissions as setReducerMissions,
  setWeb2Integrations,
} from '@redux/reducers/ui.reducer';
import { Avatar, Modal, Card as AntCard } from 'antd';
import Meta from 'antd/es/card/Meta';
import ZapIcon from '@assets/icons/svg-icons/ZapIcoin';
import DataIcon from '@assets/icons/svg-icons/DataIcon';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { queryMission, queryWeb2Integration, queryWorkflow, upsertAnOrg } from '@utils/data';

interface IOrg {
  id: number;
  title: string;
  desc: string;
  icon_url: string;
  banner_url: string;
  preset_icon_url?: string;
  preset_banner_url?: string;
  org_type: string;
  org_size: string;
  role: string;
}

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
  });
  useEffect(() => {
    dispatch(resetBlueprint(''));
    setCurrentOrg(orgs[idx]);
    queryWeb2Integration({
      orgId,
      onLoad: (data) => {
        dispatch(setWeb2Integrations(data));
      },
      dispatch,
    });
    queryWorkflow({
      orgId,
      onLoad: (data) => {
        dispatch(setReducerWorkflows(data));
        setWorkflows(data);
      },
      dispatch,
    });
    queryMission({
      orgId,
      onLoad: (data) => {
        const newMissions:IOrg[] = [];
        data.forEach((d:IOrg) => {
          const newd = { ...d };
          newd.icon_url = d.icon_url ? d.icon_url : `preset:${d.preset_icon_url}`;
          delete newd.preset_icon_url;
          delete newd.preset_banner_url;
          newMissions.push(newd);
        });
        dispatch(setReducerMissions(newMissions));
        setMissions(newMissions);
      },
      dispatch,
    });
  }, [orgs]);
  return (
    <div className="flex flex-col w-full">
      <BannerDashBoard
        org={currentOrg}
        setOrg={async (obj:any) => {
          setCurrentOrg(obj);
          upsertAnOrg({
            org: {
              ...currentOrg,
              ...obj,
            },
            onLoad: (data) => {
              dispatch(changeOrg({
                ...currentOrg,
                ...data[0],
              }));
            },
            dispatch,
          });
        }}
      />
      <div className="container mx-auto relative">
        {/* <SliderCard
          cardTitle={CARD_TYPE.INITIATIVE}
          cardType={ECardEnumType.INITIATIVE}
          amount={8}
          dataCard={dataInitiativeCards}
        /> */}
        {/* <SliderCard
          cardTitle={CARD_TYPE.PROPOSAL}
          cardType={ECardEnumType.PROPOSAL}
          amount={9}
          dataCard={dataProposalCards}
        /> */}
        {/* <SliderCard
          cardTitle={CARD_TYPE.BLUEPRINT}
          cardType={ECardEnumType.BLUEPRINT}
          amount={12}
          dataCard={dataBluePrintCards}
        /> */}
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
                let avatarUrl = '';
                let isPreset = false;
                isPreset = m.icon_url ? isPreset = m.icon_url.includes('preset') : false;
                avatarUrl = getImageUrl({ filePath: m.icon_url.replace('preset:', ''), isPreset, type: 'icon' });
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
                    <Meta
                      avatar={<Avatar src={avatarUrl} />}
                      title={`${m.title} (${m.status})`}
                      description={m.desc}
                    />
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
                let avatarUrl = '';
                let isPreset = false;
                isPreset = w.icon_url ? isPreset = w.icon_url.includes('preset') : false;
                avatarUrl = getImageUrl({ filePath: w.icon_url.replace('preset:', ''), isPreset, type: 'icon' });
                return (
                  <AntCard
                    key={w.id}
                    bordered
                    className="w-[300px] border-b_1 cursor-pointer hover:drop-shadow-lg"
                    onClick={() => {
                      navigate(`/${PAGE_ROUTES.WORKFLOW.ROOT}/${orgIdString}/${PAGE_ROUTES.WORKFLOW.EDIT}/${w.id}`, { replace: true });
                    }}
                  >
                    <Meta
                      avatar={<Avatar src={avatarUrl} />}
                      title={`${w.title}`}
                      description={`${w.workflow_version.length} versions, ${w.desc}`}
                    />
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
