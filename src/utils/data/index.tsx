import { supabase } from '../supabaseClient';
import {
  finishLoading, startLoading, deleteMission as reduxDeleteMission, addOrg,
} from '../../redux/reducers/ui.reducer';
import { queryWeb2Integration as qw2i, deleteWeb2Integration as dw2i } from './integration';

export const newOrg = async ({
  orgInfo, onSuccess, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch,
}: {
  orgInfo: {
    title: string;
    desc: string;
    icon_url: string;
    org_size: string;
    org_type: string;
    preset_banner_url: string;
  };
  onSuccess: (data: any) => void;
  onError?: (data: any) => void;
  dispatch: any;
}) => {
  const { data, error } = await supabase.from('org')
    .insert(orgInfo).select();
  if (error) {
    onError(error);
  } else {
    const info = structuredClone(orgInfo);
    dispatch(addOrg({
      id: data[0].id,
      role: 'ADMIN',
      ...info,
    }));
    onSuccess(data);
  }
};
// TODO: should update redux state in here
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
    onLoad(newData);
  } else if (error) {
    onError(error);
  }
};
// TODO: should update redux state in here
export const queryMission = async ({
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
  const { data, error } = await supabase.from('mission')
    .select('*, workflow_version(id, workflow(owner_org_id))')
    .eq('workflow_version.workflow.owner_org_id', orgId);
  dispatch(finishLoading({}));
  if (data) {
    onLoad(data);
  } else if (error) {
    onError(error);
  }
};
// TODO: should update redux state in here
export const queryAMission = async ({
  missionId, onLoad, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch,
}: {
  missionId: number;
  onLoad: (data: any) => void;
  onError?: (data: any) => void;
  dispatch: any;
}) => {
  dispatch(startLoading({}));
  const { data, error } = await supabase.from('mission').select('*').eq('id', missionId);
  dispatch(finishLoading({}));
  if (data) {
    const newData = [...data];
    data.forEach((d:any, index:number) => {
      newData[index].icon_url = d.icon_url ? d.icon_url : `preset:${d.preset_icon_url}`;
      newData[index].banner_url = d.banner_url ? d.banner_url : `preset:${d.preset_banner_url}`;
      delete newData[index].preset_icon_url;
      delete newData[index].preset_banner_url;
    });
    onLoad(newData);
  } else if (error) {
    onError(error);
  }
};
// TODO: should update redux state in here
export const upsertAMission = async ({
  mission, onLoad, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch,
}: {
  mission: any;
  onLoad: (data: any) => void;
  onError?: (data: any) => void;
  dispatch: any;
}) => {
  dispatch(startLoading({}));
  const newMission = structuredClone(mission);
  if (newMission.id < 0) { // invalid id, probably a new mission
    delete newMission.id;
  }
  if (newMission.icon_url?.indexOf('preset:') === 0) {
    newMission.preset_icon_url = newMission.icon_url.replace('preset:', '');
    newMission.icon_url = '';
  }
  if (newMission.banner_url?.indexOf('preset:') === 0) {
    newMission.preset_banner_url = newMission.banner_url.replace('preset:', '');
    newMission.banner_url = '';
  }
  if (newMission.workflow_version) {
    delete newMission.workflow_version;
  }
  const { data, error } = await supabase.from('mission').upsert(newMission).select();
  dispatch(finishLoading({}));
  if (data) {
    const newData = [...data];
    newData.forEach((d: any, index:number) => {
      newData[index].icon_url = d.preset_icon_url ? `preset:${d.preset_icon_url}` : d.icon_url;
      newData[index].banner_url = d.preset_banner_url ? `preset:${d.preset_banner_url}` : d.banner_url;
      delete newData[index].preset_icon_url;
      delete newData[index].preset_banner_url;
    });
    onLoad(newData);
  } else if (error) {
    onError(error);
  }
};
// TODO: should update redux state in here
export const upsertAnOrg = async ({
  org, onLoad, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch,
  }:{
    org: any;
    onLoad: (data: any) => void;
    onError?: (data: any) => void;
    dispatch: any;
  }) => {
  const newOrg = { ...org };
  dispatch(startLoading({}));
  const props = ['id', 'title', 'desc', 'org_size', 'org_type', 'icon_url', 'banner_url', 'preset_icon_url', 'preset_banner_url'];
  Object.keys(newOrg).forEach((key) => {
    if (props.indexOf(key) === -1) {
      delete newOrg[key];
    }
  });
  if (newOrg.id < 0) { // invalid id, probably a new mission
    delete newOrg.id;
  }
  if (newOrg.icon_url?.indexOf('preset:') === 0) {
    newOrg.preset_icon_url = newOrg.icon_url.replace('preset:', '');
    newOrg.icon_url = '';
  }
  if (newOrg.banner_url?.indexOf('preset:') === 0) {
    newOrg.preset_banner_url = newOrg.banner_url.replace('preset:', '');
    newOrg.banner_url = '';
  }
  const { data, error } = await supabase.from('org').upsert(newOrg).select();
  dispatch(finishLoading({}));
  if (data) {
    const newData = [...data];
    data.forEach((d: any, index:number) => {
      newData[index].icon_url = d.preset_icon_url ? `preset:${d.preset_icon_url}` : d.icon_url;
      newData[index].banner_url = d.preset_banner_url ? `preset:${d.preset_banner_url}` : d.banner_url;
      delete newData[index].preset_icon_url;
      delete newData[index].preset_banner_url;
    });
    onLoad(newData);
  } else if (error) {
    onError(error);
  }
};

// TODO: should update redux state in here
export const deleteMission = async ({
  id, onLoad, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch,
}: {
  id: number;
  onLoad: (data: any) => void;
  onError?: (data: any) => void;
  dispatch: any;
}) => {
  dispatch(startLoading({}));
  const { data, error } = await supabase.from('mission').delete().eq('id', id);
  dispatch(finishLoading({}));
  if (!error) {
    dispatch(reduxDeleteMission({
      id,
    }));
    onLoad(data);
  } else {
    onError(error);
  }
};

export const queryWeb2Integration = qw2i;
export const deleteWeb2Integration = dw2i;
