import { useEffect, useState } from 'react';
import './index.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@components/Header/Header';
import MainLayout from '@components/Layouts/MainLayout';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { supabase } from '@utils/supabaseClient';
import { Session } from '@supabase/gotrue-js';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOrgs, setPresetBanners, setPresetIcons, startLoading, finishLoading, initialize, setWorkflows
} from '@redux/reducers/ui.reducer';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import { queryWorkflow } from '@utils/data';
// TODO: too many dispatch
function App() {
  // const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  // const token = window.localStorage.getItem('isConnectWallet');
  const [session, setSession] = useState<Session | null>(null);
  let {
    orgs, presetIcons, presetBanners, initialized,
  } = useSelector((state:any) => state.ui);
  const dispatch = useDispatch();
  const handleSession = async (_session: Session | null) => {
    setSession(_session);
    if (_session === null) {
      console.log('navigate to login');
      navigate(PAGE_ROUTES.LOGIN);
    }
    if (_session !== null && (presetIcons.length === 0 || presetBanners.length === 0)) {
      // query to server to get preset icons and banners
      const { data: iconData, error: iconError } = await supabase
      .storage
      .from('preset_images')
      .list('icon', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
      if (!iconError) {
        const tmp = [];
        iconData.map(d => {
          tmp.push(d.name);
        });
        presetIcons = tmp;
        dispatch(setPresetIcons(tmp));
      }
      const { data: bannerData, error: bannerError } = await supabase
      .storage
      .from('preset_images')
      .list('banner', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
      if (!bannerError) {
        const tmp = [];
        bannerData.map(d => {
          tmp.push(d.name);
        });
        presetBanners = tmp;
        dispatch(setPresetBanners(tmp));
      }
    }
    if (_session !== null && initialized === false && orgs.length === 0) {
      // TODO: this line will break the code if user has no orgs
      const { user } = _session as Session;
      console.log('orgs.length: ',orgs.length);
      const { data, error } = await supabase.from('user_org')
      .select(`
        role,
        org (
          id,
          title,
          desc,
          icon_url,
          banner_url,
          preset_icon_url,
          preset_banner_url,
          org_size,
          org_type
        )
      `).eq('user_id', user.id);
      if (!error) {
        const tmp = [];
        data.map(d => {
          const preset_icon = d.org.preset_icon_url? 'preset:'+d.org.preset_icon_url:d.org.preset_icon_url;
          const preset_banner = d.org.preset_banner_url? 'preset:'+d.org.preset_banner_url:d.org.preset_banner_url;
          tmp.push({
            id: d.org.id,
            role: d.role,
            title: d.org.title,
            desc: d.org.desc,
            icon_url: d.org.icon_url ? d.org.icon_url : preset_icon,
            banner_url: d.org.banner_url ? d.org.banner_url : preset_banner,
            org_size: d.org.org_size,
            org_type: d.org.org_type
          });
        });
        orgs = tmp;
        dispatch(setOrgs(tmp));
      }
      dispatch(initialize({}));
    }
    // if user info is null then query to server to fill it
  };

  // query from redux user info
  useEffect(() => {
    // if (!token) {
    //   navigate(PAGE_ROUTES.CONNECT_WALLET);
    // }
    supabase.auth.getSession().then(async ({ data: { session: _session } }) => {
      dispatch(startLoading({}));
      await handleSession(_session);
      dispatch(finishLoading({}));
    });
    supabase.auth.onAuthStateChange(async (_event, _session) => {
      dispatch(startLoading({}));
      if (session === null) {
        await handleSession(_session);
        dispatch(finishLoading({}));
      }
    });
  }, []);
  return (
    <div className="w-full">
      <GlobalLoading />
      <Header
        // isAuth={isAuth}
        // setIsAuth={setIsAuth}
        session={session}
      />
      <MainLayout>
        <Outlet
          context={{
            // isAuth,
            // setIsAuth,
            session,
          }}
        />
      </MainLayout>
    </div>
  );
}
export default App;
