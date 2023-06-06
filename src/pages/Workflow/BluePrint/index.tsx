import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PAGE_ROUTES } from '@utils/constants/pageRoutes';
import { useSelector, useDispatch } from 'react-redux';
import { queryWeb2Integration, queryWorkflow } from '@utils/data';
import { createIdString, extractIdFromIdString, getImageUrl } from '@utils/helpers';
import Meta from 'antd/es/card/Meta';
import {
  Avatar, Card, Modal, Switch, Input as AntdInput, Button, Space,
} from 'antd';
import {
  finishLoading, setWorkflows, startLoading, initialize, setWeb2Integrations,
} from '@redux/reducers/ui.reducer';
import ZapIcon from '@assets/icons/svg-icons/ZapIcoin';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import Input from '@components/Input/Input';
import { supabase } from '@utils/supabaseClient';
import {
  CodeOutlined, PlusOutlined, SaveOutlined, StarFilled, StarOutlined,
} from '@ant-design/icons';
import {
  DirectedGraph,
  renderVoteMachineConfigPanel,
  getVoteMachine,
  emptyStage,
  ICheckPoint,
} from '@components/DirectedGraph';

const { TextArea } = AntdInput;

const convertJSONData = (str:any) => {
  let rs = typeof str === 'object' ? str : emptyStage;
  try {
    rs = JSON.parse(str);
  } catch (e) {
    return rs;
  }
  if (rs.checkpoints === undefined || rs.start === undefined) {
    Modal.error({
      title: 'Invalid data',
      content: 'A default data will be used.',
    });
    rs = emptyStage;
  }
  return rs;
};

const BluePrint = () => {
  const navigate = useNavigate();
  const { orgIdString, workflowId } = useParams();
  const dispatch = useDispatch();
  const { workflows, initialized, web2Integrations } = useSelector((state:any) => state.ui);
  const orgId = extractIdFromIdString(orgIdString);
  const [workflow, setWorkflow] = useState({
    id: -1,
    title: '',
    desc: '',
    icon_url: '',
    workflow_version: [],
  });
  const [web2IntegrationsState, setWeb2IntegrationsState] = useState(web2Integrations);
  const [editable, setEditable] = useState(true);
  const extractWorkflowFromList = (list:any) => {
    list.forEach((d:any) => {
      const intWorkflowId = workflowId ? parseInt(workflowId, 10) : -1;
      if (d.id === intWorkflowId) {
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
          dispatch(setWorkflows(data));
          extractWorkflowFromList(data);
          dispatch(initialize({}));
        },
        dispatch,
      });
      queryWeb2Integration({
        orgId,
        onLoad: (data) => {
          dispatch(setWeb2Integrations(data));
          dispatch(initialize({}));
          setWeb2IntegrationsState(data);
        },
        dispatch,
      });
    }
  }, [workflows]);
  const [open, setOpen] = useState(false);
  const [newFrmShown, setNewFrmShown] = useState(false);
  // version edit form
  const [versionId, setVersionId] = useState(-1);
  const [versionTitle, setVersionTitle] = useState('');
  const [versionData, setVersionData] = useState(emptyStage);
  const [versionStatus, setVersionStatus] = useState('DRAFT');
  const [versionRecommended, setVersionRecommended] = useState(false);
  // graph data
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [centerPos, setCenterPos] = useState({ x: 0, y: 0 });

  const clearSelectedVersion = () => {
    setVersionId(-1);
    setVersionTitle('');
    setVersionData(emptyStage);
    setVersionStatus('DRAFT');
    setVersionRecommended(false);
    setNewFrmShown(false);
  };
  const handleSave = async () => {
    dispatch(startLoading({}));
    const { data, error } = await supabase.from('workflow_version').upsert({
      id: versionId !== -1 ? versionId : undefined,
      workflow_id: workflow.id,
      version: versionTitle,
      status: versionStatus,
      data: versionData,
      recommended: versionRecommended,
    }).select();
    dispatch(finishLoading({}));
    setOpen(false);
    // clearSelectedVersion();
    if (data) {
      queryWorkflow({
        orgId,
        onLoad: (_data:any) => {
          dispatch(setWorkflows(_data));
          extractWorkflowFromList(_data);
        },
        dispatch,
      });
      Modal.success({
        maskClosable: true,
        content: 'Data submit successfully',
      });
    } else {
      Modal.error({
        title: 'Error',
        content: error.message,
      });
    }
  };
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
              <span onClick={clearSelectedVersion}>
                Versions
              </span>
              (
              {workflow.workflow_version.length}
              )
            </span>
            <span className="ml-2">/</span>
            <span className="ml-2">
              {versionTitle ? `${versionTitle}` : 'New'}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center">
          {(versionTitle || newFrmShown) ? (
            <>
              <Button
                className="flex items-center"
                type="link"
                icon={<CodeOutlined />}
                onClick={() => { setOpen(true); }}
              >
                Debug
              </Button>
              <Button
                type="link"
                className="flex items-center"
                icon={<SaveOutlined />}
                onClick={handleSave}
              >
                Save
              </Button>
              <Space direction="horizontal" size="small">
                <Switch
                  checked={editable}
                  onChange={(checked) => { setEditable(checked); }}
                />
                {editable ? 'Workflow' : 'Mission'}
              </Space>
            </>
          ) : null}
          <Button
            type="link"
            className="flex items-center"
            icon={<PlusOutlined />}
            onClick={() => {
              setVersionId(-1);
              setVersionTitle('');
              setVersionData(emptyStage);
              setVersionStatus('DRAFT');
              setNewFrmShown(true);
            }}
          >
            New & Clear
          </Button>
        </div>
      </div>
      {
        (versionId !== -1 || newFrmShown === true) ?
        (
          <div className="flex flex-col items-left gap-[16px]">
            <Modal
              open={open}
              onOk={() => { setOpen(false); }}
              onCancel={() => { setOpen(false); }}
            >
              <TextArea
                className="w-full"
                value={
                  JSON.stringify(versionData)
                }
                rows={10}
                onChange={(e) => {
                  setVersionData(JSON.parse(e.target.value));
                }}
              />
            </Modal>
            {renderVoteMachineConfigPanel({
                editable,
                web2Integrations: web2IntegrationsState,
                versionData,
                selectedNodeId,
                onChange: (changedData:any) => {
                  const newData = structuredClone(versionData);
                  newData.checkpoints.forEach((v:ICheckPoint, index:number) => {
                    if (v.id === selectedNodeId) {
                      newData.checkpoints[index].data = {
                        ...changedData.data,
                      };
                      if (changedData.children) {
                        newData.checkpoints[index].children = changedData.children;
                      }
                      if (changedData.title) {
                        newData.checkpoints[index].title = changedData.title;
                      }
                      if (changedData.description) {
                        newData.checkpoints[index].description = changedData.description;
                      }
                      if (changedData.locked) {
                        newData.checkpoints[index].locked = changedData.locked;
                      }
                      if (changedData.triggers) {
                        newData.checkpoints[index].triggers = changedData.triggers;
                      }
                      newData.checkpoints[index].isEnd = changedData.isEnd === true;
                      if (changedData.isEnd === true) {
                        newData.checkpoints[index].children = [];
                        delete newData.checkpoints[index].vote_machine_type;
                        delete newData.checkpoints[index].data;
                      }
                    }
                  });
                  setVersionData(newData);
                },
                onNew: (machineType) => {
                  const newData = structuredClone(versionData);
                  newData.checkpoints.forEach((v:any, index:number) => {
                    if (v.id === selectedNodeId) {
                      newData.checkpoints[index].vote_machine_type = machineType;
                    }
                  });
                  setVersionData(newData);
                },
                onDelete: (id) => {
                  if (id === versionData.start) {
                    Modal.error({
                      title: 'Error',
                      content: 'Cannot delete start node',
                    });
                  } else {
                    const newData = structuredClone(versionData);
                    const index = newData.checkpoints.findIndex((v:any) => v.id === id);
                    newData.checkpoints?.forEach((_node:any, cindex: number) => {
                      if (_node.children?.includes(id)) {
                        const newChkpData = getVoteMachine(_node.vote_machine_type)
                        ?.deleteChildNode(
                          _node.data, _node.children, id,
                        ) || _node.data;
                        newData.checkpoints[cindex].data = newChkpData;
                        if (_node.children) {
                          _node.children.splice(_node.children.indexOf(id));
                        }
                      }
                    });
                    newData.checkpoints.splice(index, 1);
                    setVersionData(newData);
                    setSelectedNodeId('');
                  }
                },
                onClose: () => { setSelectedNodeId(''); },
              },
            )}
            <DirectedGraph
              editable={editable}
              data={versionData}
              selectedNodeId={selectedNodeId}
              onNodeChanged={(changedNodes) => {
                const newData = structuredClone(versionData);
                newData.checkpoints.forEach((v:any, index:number) => {
                  const changedNode = changedNodes.find((cN:any) => cN.id === v.id);
                  if (changedNode && changedNode.position) {
                    newData.checkpoints[index].position = changedNode.position;
                  }
                });
                setVersionData(newData);
              }}
              onNodeClick={(event, node) => {
                setSelectedNodeId(node.id);
              }}
              onPaneClick={() => {
                setSelectedNodeId('');
              }}
              onResetPosition={() => {
                const newData = structuredClone(versionData);
                newData.checkpoints.forEach((v:any, index:number) => {
                  delete newData.checkpoints[index].position;
                });
                setVersionData(newData);
              }}
              onAddNewNode={() => {
                const newData = structuredClone(versionData);
                const newId = `node-${new Date().getTime()}`;
                newData.checkpoints.push({
                  id: newId,
                  position: centerPos,
                });
                setVersionData(newData);
                setSelectedNodeId(newId);
              }}
              onViewPortChange={(viewport) => {
                setCenterPos({
                  x: (-viewport.x + 600) / viewport.zoom,
                  y: (-viewport.y + 250) / viewport.zoom,
                });
              }}
            />
            <Input classes="w-full" placeholder="Version title" value={versionTitle} onChange={(e) => { setVersionTitle(e.target.value); }} />
            <div className="mb-2">
              <span className="mr-2">Public status</span>
              <Switch
                className="w-[44px]"
                checked={versionStatus === 'PUBLISHED'}
                onChange={
                  (checked) => {
                    if (!checked) {
                      setVersionStatus('DRAFT');
                      setVersionRecommended(false);
                    } else {
                      setVersionStatus('PUBLISHED');
                    }
                  }
                }
              />
            </div>
            {
              (versionStatus === 'PUBLISHED' && versionId !== -1) ?
              (
                <div className="mb-2">
                  <span className="mr-2">Recommended</span>
                  <Switch
                    className="w-[44px]"
                    checked={versionRecommended}
                    onChange={
                      (checked) => {
                        setVersionRecommended(checked);
                      }
                    }
                  />
                </div>
              ) : null
            }
          </div>
        )
        :
        (
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
                        setVersionId(version.id);
                        setVersionTitle(version.version);
                        setVersionData(convertJSONData(version.data));
                        setVersionStatus(version.status);
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
        )
      }
    </div>
  );
};

export default BluePrint;
