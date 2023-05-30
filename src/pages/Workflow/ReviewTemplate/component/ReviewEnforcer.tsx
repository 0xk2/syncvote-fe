import SpenIcon from '@assets/icons/svg-icons/SpenIcon';
import { ICheckpointNode } from 'types/checkpoint';
import { ICON_LIST_V2 } from '@utils/constants/iconList';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { createRootLink } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';

const actionOptions = [
  {
    action: 'Transfer',
    assetType: {
      id: 'token',
      label: 'Token',
    },
  },
];
type Props = {
  node?: ICheckpointNode;
  wfId?: number | string;
};
const ReviewEnforcer = ({ node, wfId }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(
      createRootLink([
        PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
        PAGE_ROUTES.EDIT_BLUEPRINT.SETUP_CHECKPOINT,
        wfId?.toString() || '',
      ]),
    );
  };
  return (
    <div className="m-6">
      <div className="flex gap-[10.32px]">
        <div className="text-[#898988] w-[24px]">
          {node && ICON_LIST_V2[node?.type as keyof typeof ICON_LIST_V2].icon}
        </div>
        <div className="text-[#898988] text-[20px] leading-[25px] tracking-[0.38px] font-semibold">
          <span>{node && ICON_LIST_V2[node?.type as keyof typeof ICON_LIST_V2].type}</span>
        </div>
      </div>
      <div className="flex justify-between pt-[23px]">
        <div className="text-[28px] leading-[34px] tracking-[0.364px] text-[#252422] font-semibold">
          <span>{node?.name}</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={handleNavigate}>
          <div>
            <SpenIcon />
          </div>
          <div className="text-[17px] leading-[22px] tracking-0.5px text-[#5D23BB]">
            <span>Edit in workflow</span>
          </div>
        </div>
      </div>
      <div className="pt-[47px]">
        <div className=" border border-[#E3E3E2] rounded-xl py-[24px] px-[16px]">
          {actionOptions.map((participant: any) => (
            <div className="flex justify-between" key={participant.id}>
              <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655] w-[280px] ">
                <span>{participant.action && 'Action'}</span>
              </div>
              <div className=" text-[15px] leading-[20px] font-semibold tracking-[0.6px] text-[#252422] flex gap-2 ">
                <div>
                  <span>{participant.action && 'Custom action'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewEnforcer;
