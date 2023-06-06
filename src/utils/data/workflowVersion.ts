import { finishLoading, startLoading } from '@redux/reducers/ui.reducer';
import { supabase } from '@utils/supabaseClient';

// TODO: fix this
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
    versionData: string,
    recommended: string,
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
    onSuccess(data);
  } else {
    onError(error);
  }
  // if (data) {
  //   queryWorkflow({
  //     orgId,
  //     onLoad: (_data:any) => {
  //       dispatch(setWorkflows(_data));
  //       extractWorkflowFromList(_data);
  //     },
  //     dispatch,
  //   });
  //   Modal.success({
  //     maskClosable: true,
  //     content: 'Data submit successfully',
  //   });
  // } else {
  //   Modal.error({
  //     title: 'Error',
  //     content: error.message,
  //   });
  // }
};
