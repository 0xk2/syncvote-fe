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
  setOrgs, setPresetBanners, setPresetIcons, startLoading, finishLoading, initialize,
} from '@redux/reducers/ui.reducer';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';

// TODO: too many dispatch
function App() {
  // const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  // const token = window.localStorage.getItem('isConnectWallet');
  const [session, setSession] = useState<Session | null>(null);
  const {
    orgs, presetIcons, presetBanners, initialized,
  } = useSelector((state:any) => state.ui);
  const dispatch = useDispatch();
  const handleSession = async (_session: Session | null) => {
    setSession(_session);
    if (_session === null) {
      navigate(PAGE_ROUTES.LOGIN);
    }
    if (_session !== null && (presetIcons.length === 0 || presetBanners.length === 0)) {
      // query to server to get preset icons and banners
      const { data: iconData, error: iconError } = await supabase
      .storage
      .from('preset_images')
      .list('icon', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
      if (!iconError) {
        const tmp:any[] = [];
        iconData.forEach((d) => {
          tmp.push(d.name);
        });
        dispatch(setPresetIcons(tmp));
      }
      const { data: bannerData, error: bannerError } = await supabase
      .storage
      .from('preset_images')
      .list('banner', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
      if (!bannerError) {
        const tmp:any[] = [];
        bannerData.forEach((d) => {
          tmp.push(d.name);
        });
        dispatch(setPresetBanners(tmp));
      }
    }
    if (_session !== null && initialized === false && orgs.length === 0) {
      // TODO: this line will break the code if user has no orgs
      const { user } = _session as Session;
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
        const tmp:any[] = [];
        data.forEach((d) => {
          const org:any = d?.org || {
            id: '', title: '', desc: '',
          };
          const presetIcon = org?.preset_icon_url ? `preset:${org.preset_icon_url}` : org.preset_icon_url;
          const presetBanner = org?.preset_banner_url ? `preset:${org.preset_banner_url}` : org.preset_banner_url;
          tmp.push({
            id: org?.id,
            role: d.role,
            title: org?.title,
            desc: org.desc,
            icon_url: org.icon_url ? org.icon_url : presetIcon,
            banner_url: org.banner_url ? org.banner_url : presetBanner,
            org_size: org.org_size,
            org_type: org.org_type,
          });
        });
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
