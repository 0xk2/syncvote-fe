import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@components/Button/Button';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { CodeOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import Input from '@components/Input/Input';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import SaveIcon from '@assets/icons/svg-icons/SaveIcon';
import Icon from '@components/Icon/Icon';
import { supabase } from '@utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { startLoading, finishLoading, changeWorkflow } from '@redux/reducers/ui.reducer';
import { extractIdFromIdString } from '@utils/helpers';
import DirectedGraph from '@components/DirectedGraph/DirectedGraph';

const env = import.meta.env.VITE_EVN;

type Props = {};

const BuildBlueprint = (props: Props) => {
  // document.title = 'Create new Workflow';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orgIdString } = useParams();
  const orgId = extractIdFromIdString(orgIdString);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [schema, setSchema] = useState('');
  const handleNavigate = () => {
    // const { ROOT, WF_TEMPLATES } = PAGE_ROUTES.WORKFLOW;
    // const path = `/${ROOT}/${WF_TEMPLATES}`;
    // navigate(path, {
    //   state: {
    //     previousPath: `/${PAGE_ROUTES.WORKFLOW.ROOT}/${PAGE_ROUTES.WORKFLOW.SELECT_TEMPLATE}`,
    //   },
    // });
  };
  const handleSave = async () => {
    dispatch(startLoading({}));
    let icon_url, preset_icon_url; // eslint-disable-line
    if (iconUrl.startsWith('preset:')) {
      preset_icon_url = iconUrl.replace('preset:', ''); // eslint-disable-line
    } else {
      icon_url = iconUrl; // eslint-disable-line
    }
    const { data, error } = await supabase
      .from('workflow')
      .insert({
        title, desc, icon_url, preset_icon_url, owner_org_id: orgId,
      }).select();
    if (data) {
      const insertedId = data[0].id;
      const toInsert = {
        workflow_id: insertedId,
        status: 'DRAFT',
        data: schema,
      };
      const { data: versions, error: err } = await supabase
      .from('workflow_version')
      .insert(toInsert).select();
      dispatch(finishLoading({}));
      dispatch(changeWorkflow({
        id: insertedId, title, desc, icon_url: iconUrl, banner_url: '', owner_org_id: orgId, workflow_version: !err ? versions : [],
      }));
      if (!error) navigate(`/${PAGE_ROUTES.WORKFLOW.ROOT}/${orgIdString}/${PAGE_ROUTES.WORKFLOW.EDIT}/${insertedId}`);
    }
    if (error) {
      Modal.error({ content: error.message });
    }
  };
  return (
    <div className="container w-full flex justify-center">
      {env === 'dev' ?
        (
          <div className="w-2/3 flex flex-col gap-8 items-left mt-[5%] mb-4">
            <div>
              <div className="text-[34px] mb-2">
                <CodeOutlined />
                <span className="pl-4">Create new Workflow in debug</span>
              </div>
              <p>This is developer mode, use Debug to edit, save and publish</p>
            </div>
            <div>
              <Icon
                iconUrl={iconUrl}
                editable
                onUpload={(obj) => {
                  const { isPreset, filePath } = obj;
                  if (isPreset) {
                    setIconUrl(`preset:${filePath}`);
                  } else {
                    setIconUrl(filePath);
                  }
                }}
              />
            </div>
            <Input
              placeholder="Workflow name"
              classes="w-full"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full h-[300px] border border-primary_logo rounded-lg p-4 mt-2"
              placeholder="Workflow description"
            />
            <div>
              <p>Version 0.0.1</p>
              <textarea
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                className="w-full h-[300px] border border-primary_logo rounded-lg p-4 mt-2"
                placeholder="Workflow schema in json format"
              />
              <DirectedGraph
                data={(() => {
                  let rs = {
                    checkpoints: [],
                  };
                  try {
                    rs = JSON.parse(schema);
                  } catch (e) {
                    return rs;
                  }
                  return rs;
                })()}
                onNodeClick={() => {}}
              />
            </div>
            <Button
              startIcon={<SaveIcon />}
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </Button>
          </div>
        )
        :
        (
          <div className="w-2/3 flex flex-col gap-8 items-center mt-[5%]">
            <p className="text-[#252422] text-[28px] font-semibold">
              Build
              <span className="text-violet-version-5"> workflow </span>
              with template
            </p>
            <div className="flex flex-col gap-8 my-2 w-full border rounded-lg p-6 text-[#575655]">
              <div className="flex justify-between items-center">
                <p className="text-[17px] truncate">
                  Investment deals evaluation process for Investmen...
                </p>
                <p className="text-[13px]">Created on January 1st, 2023</p>
              </div>
              <div className="border-b border-primary_logo w-full" />
              <div className="flex justify-between">
                <p className="text-[17px]">DAO contributors recruitment process</p>
                <p className="text-[13px]">Created on Dec 12th, 2022</p>
              </div>
              <div className="border-b border-primary_logo w-full" />
              <div className="flex justify-between">
                <p className="text-[17px]">Procurement competitive bidding process</p>
                <p className="text-[13px]">Created on Dec 8th, 2022</p>
              </div>
              {/* <Link to={`/${PAGE_ROUTES.VIEW_BLUEPRINT_TEMPLATES}`}> */}

              <div
                className="text-center text-violet-version-5 text-[17px] cursor-pointer"
                onClick={handleNavigate}
              >
                View all templates in library
              </div>
              {/* </Link> */}
            </div>
            {/* <Link
              to={`/${PAGE_ROUTES.WORKFLOW.ROOT}/${PAGE_ROUTES.WORKFLOW.SET_NAME}`}
              className="w-full"
            >
              <Button className="w-full text-[17px] py-[18px] font-medium tracking-0.5px">
                Build a new workflow
              </Button>
            </Link> */}
          </div>
        )
      }
    </div>
  );
};

export default BuildBlueprint;
