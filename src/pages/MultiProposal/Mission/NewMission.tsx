import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import SaveIcon from '@assets/icons/svg-icons/SaveIcon';
import UpLoadIcon from '@assets/icons/svg-icons/UpLoadIcon';
import Button from '@components/Button/Button';
import { initialize, setWorkflows } from '@redux/reducers/ui.reducer';
import { queryAMission, queryWorkflow, upsertAMission } from '@utils/data';
import { createIdString, extractIdFromIdString } from '@utils/helpers';
import { L } from '@utils/locales/L';
import { Modal, Switch, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@components/Icon/Icon';
import Input from '@components/Input/Input';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { create } from '@utils/data/dash';
import DirectedGraph from '@components/DirectedGraph/DirectedGraph';

const NewMission = () => {
  const {
    orgIdString, workflowIdString, missionIdString, versionIdString,
  } = useParams();
  const { workflows, initialized } = useSelector((state: any) => state.ui);
  const [currentWorkflowVersion, setCurrentWorkflowVersion] = useState({
    title: '',
    version: '',
    created_at: '',
    data: '',
  });
  const [currentMission, setCurrentMission] = useState({
    id: -1,
    title: '',
    desc: '',
    data: '',
    status: 'DRAFT',
    icon_url: '',
    owner_org_id: extractIdFromIdString(orgIdString),
    solana_address: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (workflowIdString && workflows.length === 0 && initialized === false) {
      queryWorkflow({
        orgId: extractIdFromIdString(orgIdString),
        onLoad: (data) => {
          dispatch(setWorkflows(data));
          dispatch(initialize({}));
        },
        dispatch,
      });
    }
    workflows.forEach((w: any) => {
      if (w.id === extractIdFromIdString(workflowIdString)) {
        w.workflow_version.forEach((v: any) => {
          if (v.id === extractIdFromIdString(versionIdString)) {
            setCurrentWorkflowVersion({
              title: w.title,
              version: v.version,
              created_at: v.created_at,
              data: v.data,
            });
            setCurrentMission({
              ...currentMission,
              data: v.data,
            });
          }
        });
      }
    });
    // if (missionIdString && initialized === false) {
    if (missionIdString) {
      queryAMission({
        missionId: extractIdFromIdString(missionIdString),
        onLoad: (data) => {
          setCurrentMission(data[0]);
          dispatch(initialize({}));
        },
        dispatch,
      });
    }
  }, [workflows, initialized]);
  return (
    <div className="container flex justify-center mt-12">
      <div className="flex flex-col gap-4 w-full">
        {workflowIdString ?
        (
          <div>
            <p className="text-[28px] text-grey-version-7 font-semibold pb-2">
              New mission from Workflow
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <p className="text-[#575655] text-base">From Workflow</p>
                <div className="font-semibold pt-[0.9px]">
                  <span className="mr-2">{`${currentWorkflowVersion.title}`}</span>
                  <Tag>
                    {`${currentWorkflowVersion.version}`}
                  </Tag>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-[#575655] text-base">Created on</p>
                <p className="font-semibold pt-[0.9px]">
                  {`${moment(currentWorkflowVersion.created_at).format('DD MMM YYYY')}`}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <DirectedGraph
                  data={(() => {
                    let rs = {
                      checkpoints: [],
                    };
                    try {
                      rs = JSON.parse(currentWorkflowVersion.data);
                      if (!rs.checkpoints) {
                        rs.checkpoints = [];
                      }
                    } catch (e) {
                      return rs;
                    }
                    console.log(rs);
                    return rs;
                  })()}
                  onNodeClick={() => {}}
                />
              </div>
              <div className="border-b border-primary_logo w-full" />
            </div>
          </div>
        )
        :
        null
        }
        <div className="flex flex-col gap-4 w-full">
          <div>
            <Icon
              className="w-[100%] border border-primary_logo"
              editable={currentMission.status !== 'PUBLISHED'}
              iconUrl={currentMission.icon_url}
              onUpload={({ filePath, isPreset }: {
                filePath: string,
                isPreset: boolean,
              }) => {
                setCurrentMission({
                  ...currentMission,
                  icon_url: isPreset ? `preset:${filePath}` : filePath,
                });
              }}
            />
          </div>
          <div>
            <Input
              placeholder="Mission title"
              classes="w-full"
              value={currentMission.title}
              onChange={(e) => {
                setCurrentMission({
                  ...currentMission,
                  title: e.target.value,
                });
              }}
              disabled={currentMission.status === 'PUBLISHED'}
            />
          </div>
          <div>
            <TextArea
              placeholder="Mission description"
              className="w-[100%] border border-primary_logo"
              rows={2}
              value={currentMission.desc}
              onChange={(e) => {
                setCurrentMission({
                  ...currentMission,
                  desc: e.target.value,
                });
              }}
              disabled={currentMission.status === 'PUBLISHED'}
            />
          </div>
          <div>
            <TextArea
              value={currentMission.data}
              className="w-[100%] border border-primary_logo"
              rows={6}
              onChange={(e) => {
                setCurrentMission({
                  ...currentMission,
                  data: e.target.value,
                });
              }}
              disabled={currentMission.status === 'PUBLISHED'}
            />
          </div>
          <div>
            <DirectedGraph
              data={(() => {
                let rs = {
                  checkpoints: [],
                };
                try {
                  rs = JSON.parse(currentMission.data);
                  if (!rs.checkpoints) {
                    rs.checkpoints = [];
                  }
                } catch (e) {
                  return rs;
                }
                return rs;
              })()}
              onNodeClick={() => {}}
            />
          </div>
          {currentMission.status === 'PUBLISHED' ?
          (
            <div>
              <span className="mr-4">Development Only:</span>
              <Button
                variant="primary"
                onClick={() => {
                  upsertAMission({
                    mission: {
                      ...currentMission,
                      status: 'DRAFT',
                    },
                    onLoad: (data) => {
                      setCurrentMission(data[0]);
                    },
                    dispatch,
                  });
                }}
              >
                Unpublish
              </Button>
            </div>
          )
          :
          null
          }
        </div>
        <div className="flex justify-between mb-4">
          <Button
            variant="primary"
            startIcon={missionIdString ? <SaveIcon /> : <PlusIcon />}
            disabled={currentMission.status === 'PUBLISHED'}
            onClick={() => {
              upsertAMission({
                mission: currentMission,
                onLoad: (data) => {
                  setCurrentMission(data[0]);
                  navigate(`/${PAGE_ROUTES.INITIATIVE.ROOT}/${orgIdString}/${PAGE_ROUTES.INITIATIVE.MISSION}/${createIdString(data[0].title, data[0].id)}`);
                  Modal.success({
                    title: 'Success',
                    content: 'Mission saved successfully',
                  });
                },
                onError: (error) => {
                  Modal.error({
                    title: 'Error',
                    content: error.message,
                  });
                },
                dispatch,
              });
            }}
          >
            {missionIdString ? 'Save Mission' : 'Create Mission'}
          </Button>
          {missionIdString ?
          (
            <Button
              variant="primary"
              startIcon={<UpLoadIcon />}
              disabled={currentMission.status === 'PUBLISHED'}
              onClick={() => {
                create({
                  json: currentMission.data,
                  title: currentMission.title,
                  desc: currentMission.desc,
                  dispatch,
                  onSuccess: (blockchainResp:any) => {
                    upsertAMission({
                      mission: {
                        ...currentMission,
                        status: 'PUBLISHED',
                        solana_address: blockchainResp.id,
                      },
                      onLoad: (data) => {
                        // set data again
                        setCurrentMission(data[0]);
                        Modal.success({
                          title: 'Success',
                          content: 'Mission published successfully',
                        });
                      },
                      dispatch,
                    });
                  },
                  onError: (error) => {
                    Modal.error({
                      title: 'Error',
                      content: error.message,
                    });
                  },
                });
              }}
            >
              Publish Mission
            </Button>
          )
          :
          null
          }
        </div>
      </div>
    </div>
  );
};

export default NewMission;
