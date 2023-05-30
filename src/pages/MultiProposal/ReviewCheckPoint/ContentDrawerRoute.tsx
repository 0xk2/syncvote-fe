/* eslint-disable @typescript-eslint/no-shadow */
import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import SpenIcon from '@assets/icons/svg-icons/SpenIcon';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { createRootLink } from '@utils/helpers';
import { L } from '@utils/locales/L';
import { useNavigate } from 'react-router-dom';

type Props = {
  cpTarget?: string;
  dataRouteDetails?: any;
  typeId?: string | undefined;
  path?: string | undefined;
};

const ContentRouterRoute = ({ cpTarget, dataRouteDetails, typeId, path }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (path === '/initiative/review-checkpoint') {
      navigate(
        createRootLink([
          PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
          PAGE_ROUTES.EDIT_BLUEPRINT.SETUP_CHECKPOINT,
          '3',
        ]),
      );
    } else {
      navigate(
        createRootLink([
          PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
          PAGE_ROUTES.EDIT_BLUEPRINT.SETUP_CHECKPOINT,
          typeId?.toString() || '',
        ]),
      );
    }
  };
  return (
    <div className="drawer-route">
      {dataRouteDetails.map((routeDetail: any) => {
        if (routeDetail?.id === cpTarget) {
          const { optionConnect, optionTime } = routeDetail;
          return (
            <div key={routeDetail.id}>
              <div className="flex justify-between">
                <div className="text-[28px] font-semibold leading-[34px] tracking-[0.364px] text-[#252422]">
                  <span>Route Detail</span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <div>
                    <SpenIcon />
                  </div>
                  <div
                    className="text-[17px] leading-[22px] cursor-pointer tracking-0.5px text-[#5D23BB]"
                    onClick={handleNavigate}
                  >
                    <span>{L('editInWorkflow')}</span>
                  </div>
                </div>
              </div>
              {[optionConnect].map((item) => {
                return (
                  <div
                    className="border rounded-xl flex justify-between py-[24px] px-[16px] mt-[47px]"
                    key={item.id}
                  >
                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[575655]">
                      <span>Connect to result</span>
                    </div>

                    <div className="text-[15px] leading-[20px] font-semibold tracking-[0.6px] text-[#252422]">
                      <span>{item.label}</span>
                    </div>
                  </div>
                );
              })}
              {optionTime && (
                <>
                  <div className="pt-[30px] flex items-center gap-2">
                    <div>
                      <p className="text-[#252422] font-semibold text-[20px] leading-[25px] tracking-one">
                        {L('votingCondition')}
                      </p>
                    </div>
                    <div>
                      <QuestionCircleIcon w="24px" h="24px" color="#898988" />
                    </div>
                  </div>
                  <div className="border rounded-xl py-[16px] px-[16px] mt-[16px] ">
                    {optionTime.map((data: any) => {
                      return (
                        <div key={data.id} className="flex justify-between py-2">
                          <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[575655]">
                            <span>Delay time</span>
                          </div>
                          <div className="text-[15px] leading-[20px] font-semibold tracking-[0.6px] text-[#252422]">
                            <span>{data.value}</span> <span>{data.option.value}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default ContentRouterRoute;
