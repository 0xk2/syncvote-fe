import Logo from '@assets/icons/svg-icons/Logo';
import { L } from '@utils/locales/L';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { sliceAddressToken } from '@utils/helpers';
// import { AddressToken } from '@utils/mockData/addressToken';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { resetProposalStore } from '@redux/reducers/proposal.reducer';
import { resetBlueprint } from '@redux/reducers/blueprint.reducer';
import { resetVotingStore } from '@redux/reducers/votingMethod.reducer';
import { resetSetUpCheckPointsStore } from '@redux/reducers/setupCheckpoints.reducer';
import { resetRouteStore } from '@redux/reducers/blueprint.reducer/routeDetail';
import { resetStore } from '@redux/reducers/check-node.reducer';
import { supabase } from '@utils/supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { extractIdFromIdString, getImageUrl } from '@utils/helpers';
import { Avatar, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { finishLoading, startLoading } from '@redux/reducers/ui.reducer';

type HeaderProps = {
  // isAuth: boolean;
  // setIsAuth: (value: boolean) => void;
  session: any;
  isMainAppFullHeight: boolean;
};

enum Pages {
  LOGIN,
  ORG_HOME,
  ORG_SELECTOR,
  ORG_SETTING,
  UNKNOWN,
}

function Header({
  // isAuth = false,
  // setIsAuth = () => {},
  session,
  isMainAppFullHeight = false,
}: HeaderProps) {
  const params = useLocation();
  // const token = window.localStorage.getItem('isConnectWallet');
  const dispatch = useDispatch();
  const { orgs } = useSelector((state:any) => state.ui);
  const navigate = useNavigate();
  const { orgIdString } = useParams();
  const orgId = extractIdFromIdString(orgIdString);
  const [currentOrg, setCurrentOrg] = useState(orgs.find((org:any) => org.id === orgId));
  const handleClearStore = () => {
    dispatch(resetProposalStore());
    dispatch(resetBlueprint({ keepName: false }));
    dispatch(resetRouteStore());
    dispatch(resetSetUpCheckPointsStore());
    dispatch(resetVotingStore());
    dispatch(resetStore());
  };
  useEffect(() => {
    setCurrentOrg(orgs.find((org:any) => org.id === orgId));
  }, [orgs, orgId]);
  let currentPage = Pages.UNKNOWN;
  switch (params.pathname) {
    case `/${PAGE_ROUTES.LOGIN}`: currentPage = Pages.LOGIN; break;
    case `/${PAGE_ROUTES.ORG_DETAIL}/${orgIdString}`: currentPage = Pages.ORG_HOME; break;
    case `/${PAGE_ROUTES.ORG_DETAIL}/${orgIdString}/setting`: currentPage = Pages.ORG_SETTING; break;
    case `/${PAGE_ROUTES.ROOT}`: currentPage = Pages.ORG_SELECTOR; break;
    default: currentPage = Pages.UNKNOWN; break;
  }
  return (
    <div className={`flex justify-between items-center px-[32px] md:px-p_1 h-20 w-full border-b-b_1 border-gray-normal font-sans z-20 bg-white ${!isMainAppFullHeight ? 'fixed top-0 left-0' : null}`}>
      <div className=" w-full flex justify-between">
        <div className="flex p-0 gap-2 items-center">
          {currentPage !== Pages.LOGIN ?
            (
              <div className="flex items-center gap-2">
                <span
                  className="cursor-pointer flex"
                >
                  {orgId !== -1 ?
                  (
                    <span className="text-xl flex flex-row items-center">
                      <HomeOutlined
                        style={{ fontSize: '24px' }}
                        onClick={() => {
                          navigate(PAGE_ROUTES.ROOT);
                        }}
                      />
                      <span className="ml-2 mr-2">/</span>
                      <span onClick={() => {
                          navigate(`${PAGE_ROUTES.ORG_DETAIL}/${orgIdString}`);
                        }}
                      >
                        {
                          currentOrg?.icon_url ?
                          (
                            <Avatar
                              src={getImageUrl({ filePath: currentOrg?.icon_url?.replace('preset:', ''), isPreset: currentOrg?.icon_url?.indexOf('preset:') === 0, type: 'icon' })}
                              className="mx-2"
                            />
                          )
                          :
                          (
                            <Avatar>
                              {currentOrg?.title[0]}
                            </Avatar>
                          )
                        }
                      </span>
                      <span
                        className="mr-4"
                        onClick={() => {
                          navigate(`${PAGE_ROUTES.ORG_DETAIL}/${orgIdString}`);
                        }}
                      >
                        {currentOrg?.title}
                      </span>
                      <Button
                        type="text"
                        disabled={currentPage === Pages.ORG_HOME}
                        onClick={() => {
                          navigate(`${PAGE_ROUTES.ORG_DETAIL}/${orgIdString}`);
                        }}
                      >
                        Governance
                      </Button>
                      <Button
                        type="text"
                        className="ml-2"
                        disabled={currentPage === Pages.ORG_SETTING}
                        onClick={() => {
                          navigate(`${PAGE_ROUTES.ORG_DETAIL}/${orgIdString}/setting`);
                        }}
                      >
                        Settings
                      </Button>
                    </span>
                  )
                  :
                  (
                    <span
                      className="mr-2"
                      onClick={() => {
                        handleClearStore();
                        navigate(PAGE_ROUTES.ROOT);
                      }}
                    >
                      <Logo width="128" height="24" />
                    </span>
                  )
                  }
                </span>
              </div>
            )
            :
            (
              <div className="flex items-center gap-2">
                <Logo width="128" height="24" />
              </div>
            )
          }
        </div>
        <div className="flex w-w_3 items-center justify-end">
          {currentPage === Pages.LOGIN ? (
            ''
          ) : (
            <div
              className="border-b_2 py-3 px-4 my-3 mr-0 rounded-lg border-gray-normal  cursor-pointer"
              onClick={async () => {
                dispatch(startLoading({}));
                await supabase.auth.signOut();
                dispatch(finishLoading({}));
                navigate(PAGE_ROUTES.LOGIN);
              }}
              title={L('clickToLogout')}
            >
              <p className="text-text_2 text-[#252422]">
                {/* {token ? sliceAddressToken(AddressToken.ip_address, 5) : 'Connect wallet'} */}
                <img
                  src={session?.user?.user_metadata?.avatar_url}
                  alt="user_avatar"
                  className="w-8 h-8 rounded-full inline-block mr-2"
                />
                {session?.user?.user_metadata?.full_name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
