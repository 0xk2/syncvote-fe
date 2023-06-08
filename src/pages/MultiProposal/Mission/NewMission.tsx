import {
  queryWorkflow, upsertAMission,
} from '@utils/data';
import { createIdString, extractIdFromIdString } from '@utils/helpers';
import { Modal, Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { IWorkflowVersion } from '../../../types/workflow';
import { IMission } from '../../../types/mission';
import ReviewWorkflow from './fragments/ReviewWorkflow';
import MissionMeta from './fragments/MissionMeta';

// 3 state:
// review, metadata, edit
// data: workflow_version + mission
const NewMission = () => {
  const {
    orgIdString, workflowIdString, versionIdString,
  } = useParams();
  const { workflows, initialized } = useSelector((state: any) => state.ui);
  const workflowId = extractIdFromIdString(workflowIdString);
  const orgId = extractIdFromIdString(orgIdString);
  const [currentScreen, setCurrentScreen] = useState('review');
  const [currentWorkflowVersion, setCurrentWorkflowVersion] = useState<IWorkflowVersion>({
    id: -1,
    title: '',
    version: '',
    created_at: '',
    workflow_id: workflowId,
    data: '',
  });
  const [currentMission, setCurrentMission] = useState<IMission>({
    id: -1,
    title: '',
    desc: '',
    data: '',
    status: 'DRAFT',
    icon_url: '',
    solana_address: '',
    workflow_version_id: -1,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (workflowIdString && workflows.length === 0 && initialized === false) {
      queryWorkflow({
        orgId,
        onLoad: () => {
        },
        dispatch,
      });
    }
    workflows.forEach((w: any) => {
      if (w.id === workflowId) {
        w.workflow_version.forEach((v: any) => {
          if (v.id === extractIdFromIdString(versionIdString)) {
            setCurrentWorkflowVersion({
              id: v.id,
              title: w.title,
              version: v.version,
              created_at: v.created_at,
              data: v.data,
            });
            setCurrentMission({
              ...currentMission,
              workflow_version_id: v.id,
              data: v.data,
            });
          }
        });
      }
    });
  }, [workflows, initialized]);
  const onSave = async () => {
    await upsertAMission({
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
  };
  return (
    <div className="container flex justify-center mt-12">
      <div className="flex flex-col gap-4 w-full">
        {currentScreen === 'review' ?
          (
            <>
              <ReviewWorkflow
                currentWorkflowVersion={currentWorkflowVersion}
              />
              <Space direction="horizontal" size="large" className="flex justify-between">
                <Button
                  type="default"
                  onClick={() => {
                    if (navigate.length === 0) {
                      navigate(`/${PAGE_ROUTES.ORG_DETAIL}/${orgIdString}`);
                    } else {
                      navigate(-1);
                    }
                  }}
                >
                  Back
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    setCurrentScreen('metadata');
                  }}
                >
                  Next
                </Button>
              </Space>
            </>
          )
          :
          null
        }
        {currentScreen === 'metadata' ?
          (
            <>
              <MissionMeta
                currentMission={currentMission}
                setCurrentMission={setCurrentMission}
              />
              <Space direction="horizontal" size="large" className="flex justify-between">
                <Button
                  type="default"
                  onClick={() => {
                    setCurrentScreen('review');
                  }}
                >
                  Back
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    onSave();
                  }}
                >
                  Create Mission
                </Button>
              </Space>
            </>
          )
         : null
        }
      </div>
    </div>
  );
};

export default NewMission;
