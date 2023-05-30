import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import SpenIcon from '@assets/icons/svg-icons/SpenIcon';
import { ICheckpointNode } from 'types/checkpoint';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { createRootLink, getRouteId } from '@utils/helpers';
import { L } from '@utils/locales/L';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  cpTarget: ICheckpointNode;
  dataRouteDetails?: any;
  typeId?: string | undefined;
};

const ContentRouterRouteDetail = ({ cpTarget, dataRouteDetails, typeId }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    const { pathname } = location;
    if (pathname.split('/')[1] === 'edit-blueprint') {
      navigate(
        createRootLink([
          PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
          PAGE_ROUTES.EDIT_BLUEPRINT.SETUP_CHECKPOINT,
          typeId?.toString() || '',
        ]),
      );
    } else {
      navigate(createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.SETUP_CHECKPOINT]));
    }
  };

  const routeId = getRouteId({ parentId: cpTarget?.parentId, id: cpTarget?.id });

  const dataRouter = dataRouteDetails.find((item: any) => {
    return item.id === routeId;
  });

  return (
    <div>
      <div key={dataRouter?.id} className="p-[24px]">
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
        <div
          className="border rounded-xl flex justify-between py-[24px] px-[16px] mt-[47px]"
          key={dataRouter?.optionConnect.id}
        >
          <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[575655]">
            <span>Connect to result</span>
          </div>

          <div className="text-[15px] leading-[20px] font-semibold tracking-[0.6px] text-[#252422]">
            <span>{dataRouter?.optionConnect.label}</span>
          </div>
        </div>
        {!!dataRouter?.optionTime?.length && (
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
              {dataRouter.optionTime.map((data: any) => {
                return (
                  <div key={data.id} className="flex justify-between py-2">
                    <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[575655]">
                      <span>Delay time</span>
                    </div>
                    <div className="text-[15px] leading-[20px] font-semibold tracking-[0.6px] text-[#252422]">
                      <span className="pr-[6px]">{data.value}</span>
                      <span>{data?.option?.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentRouterRouteDetail;
