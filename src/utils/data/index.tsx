import { supabase } from '../supabaseClient';
import { finishLoading, startLoading } from '../../redux/reducers/ui.reducer';

export const queryWorkflow = async ({
  orgId, onLoad, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch, filter = {},
}: {
  orgId: number;
  onLoad: (data: any) => void;
  onError?: (data: any) => void;
  dispatch: any;
  filter?: any;
}) => {
  console.log(filter);
  dispatch(startLoading({}));
  const { data, error } = await supabase.from('workflow').select('*, workflow_version ( * )').eq('owner_org_id', orgId).order('created_at', { ascending: false });
  dispatch(finishLoading({}));
  if (data) {
    data.forEach((d) => {
      d.icon_url = d.preset_icon_url ? `preset:${d.preset_icon_url}` : d.icon_url;
      d.banner_url = d.preset_banner_url ? `preset:${d.preset_banner_url}` : d.banner_url;
      delete d.preset_icon_url;
      delete d.preset_banner_url;
    });
    onLoad(data);
  } else if (error) {
    onError(error);
  }
};
export const queryMission = async ({
  orgId, onLoad, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch, filter = {},
}: {
  orgId: number;
  onLoad: (data: any) => void;
  onError?: (data: any) => void;
  dispatch: any;
  filter?: any;
}) => {
  console.log(filter);
  dispatch(startLoading({}));
  const { data, error } = await supabase.from('mission').select('*').eq('owner_org_id', orgId);
  dispatch(finishLoading({}));
  if (data) {
    onLoad(data);
  } else if (error) {
    onError(error);
  }
};
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
    data.forEach(d => {
      d.icon_url = d.icon_url ? d.icon_url : `preset:${d.preset_icon_url}`;
      d.banner_url = d.banner_url ? d.banner_url : `preset:${d.preset_banner_url}`;
      delete d.preset_icon_url;
      delete d.preset_banner_url;
    });
    onLoad(data);
  } else if (error) {
    onError(error);
  }
};
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
  const newMission = { ...mission };
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
  const { data, error } = await supabase.from('mission').upsert(newMission).select();
  dispatch(finishLoading({}));
  if (data) {
    data.forEach((d) => {
      d.icon_url = d.preset_icon_url ? `preset:${d.preset_icon_url}` : d.icon_url;
      d.banner_url = d.preset_banner_url ? `preset:${d.preset_banner_url}` : d.banner_url;
      delete d.preset_icon_url;
      delete d.preset_banner_url;
    });
    onLoad(data);
  } else if (error) {
    onError(error);
  }
};
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
    data.forEach((d) => {
      d.icon_url = d.preset_icon_url ? `preset:${d.preset_icon_url}` : d.icon_url;
      d.banner_url = d.preset_banner_url ? `preset:${d.preset_banner_url}` : d.banner_url;
      delete d.preset_icon_url;
      delete d.preset_banner_url;
    });
    onLoad(data);
  } else if (error) {
    onError(error);
  }
};
export const queryWeb2Integration = async ({
  orgId, onLoad, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch,
}: {
  orgId: number;
  onLoad: (data: any) => void;
  onError?: (data: any) => void;
  dispatch: any;
}) => {
  dispatch(startLoading({}));
  const { data, error } = await supabase.from('web2_key').select('*').eq('org_id', orgId).order('created_at', { ascending: false });
  dispatch(finishLoading({}));
  if (data) {
    const newData:any[] = [];
    data.forEach((d) => {
      const newd = structuredClone(d);
      newd.icon_url = d.preset_icon_url ? `preset:${d.preset_icon_url}` : d.icon_url;
      newd.banner_url = d.preset_banner_url ? `preset:${d.preset_banner_url}` : d.banner_url;
      delete newd.preset_icon_url;
      delete newd.preset_banner_url;
      newData.push(newd);
    });
    onLoad(newData);
  } else if (error) {
    onError(error);
  }
};
export const deleteWeb2Integration = async ({
  id, onLoad, onError = (error) => {
    console.error(error); // eslint-disable-line
  }, dispatch,
}: {
  id: string;
  onLoad: (data: any) => void;
  onError?: (data: any) => void;
  dispatch: any;
}) => {
  dispatch(startLoading({}));
  const { data, error } = await supabase.from('web2_key').delete().eq('id', id);
  dispatch(finishLoading({}));
  if (!error) {
    onLoad(data);
  } else {
    onError(error);
  }
};
