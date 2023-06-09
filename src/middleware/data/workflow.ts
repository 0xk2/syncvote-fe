import {
  finishLoading, initialize, setWorkflows, startLoading,
} from '@redux/reducers/ui.reducer';
import { supabase } from '@utils/supabaseClient';

export const upsertWorkflowVersion = async ({
  dispatch,
  workflowVersion,
  onSuccess,
  onError = (error:any) => { console.error(error); }, // es-lint-disable-line
}: {
  workflowVersion: {
    versionId: number;
    workflowId: number,
    version: string,
    status: string,
    versionData: any,
    recommended: boolean,
  }
  dispatch: any;
  onSuccess: (data: any) => void;
  onError?: (data: any) => void;
}) => {
  dispatch(startLoading({}));
  const {
    versionId, workflowId, version, status, versionData, recommended,
  } = workflowVersion;
  const { data, error } = await supabase.from('workflow_version').upsert({
    id: versionId !== -1 ? versionId : undefined,
    workflow_id: workflowId,
    version,
    status,
    data: versionData,
    recommended,
  }).select();
  dispatch(finishLoading({}));
  if (data) {
    // TODO: should we store workflow_version in redux?
    onSuccess(data);
  } else {
    onError(error);
  }
};
export const queryWorkflow = async ({
  orgId, onLoad, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch, filter = {}, // eslint-disable-line
}: {
  orgId: number;
  onLoad: (data: any) => void;
  onError?: (data: any) => void;
  dispatch: any;
  filter?: any;
}) => {
  dispatch(startLoading({}));
  // TODO: should we stuff workflow_version into workflow?
  const { data, error } = await supabase.from('workflow').select('*, workflow_version ( * )').eq('owner_org_id', orgId).order('created_at', { ascending: false });
  dispatch(finishLoading({}));
  if (data) {
    const newData = structuredClone(data);
    data.forEach((d:any, index: number) => {
      newData[index].icon_url = d.preset_icon_url ? `preset:${d.preset_icon_url}` : d.icon_url;
      newData[index].banner_url = d.preset_banner_url ? `preset:${d.preset_banner_url}` : d.banner_url;
      delete newData[index].preset_icon_url;
      delete newData[index].preset_banner_url;
    });
    // TODO: is the data match the interface?
    dispatch(setWorkflows(newData));
    dispatch(initialize({}));
    onLoad(newData);
  } else if (error) {
    onError(error);
  }
};
