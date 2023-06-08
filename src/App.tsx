import { useEffect, useState } from 'react';
import './index.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@components/Header/Header';
import MainLayout from '@components/Layouts/MainLayout';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { supabase } from '@utils/supabaseClient';
import { Session } from '@supabase/gotrue-js';
import { useSelector, useDispatch } from 'react-redux';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import { registerVoteMachine } from '@components/DirectedGraph';

import SingleChoiceRaceToMax from '@votemachines/SingleChoiceRaceToMax';
import MultipleChoiceRaceToMax from '@votemachines/MultipleChoiceRaceToMax';
import { queryOrgs, queryPresetBanner, queryPresetIcon } from '@utils/data';

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
    if (_session !== null) {
      // query to server to get preset icons and banners
      queryPresetBanner({
        dispatch, presetBanners,
      });
      queryPresetIcon({
        dispatch, presetIcons,
      });
    }
    if (_session !== null && initialized === false && orgs.length === 0) {
      const { user } = _session as Session;
      queryOrgs({
        filter: {
          userId: user.id,
        },
        onSuccess: () => {},
        dispatch,
      });
    }
  };
  // query from redux user info
  useEffect(() => {
    // if (!token) {
    //   navigate(PAGE_ROUTES.CONNECT_WALLET);
    // }
    supabase.auth.getSession().then(async ({ data: { session: _session } }) => {
      await handleSession(_session);
    });
    registerVoteMachine(SingleChoiceRaceToMax);
    registerVoteMachine(MultipleChoiceRaceToMax);
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
