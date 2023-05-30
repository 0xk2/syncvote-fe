import { ICON_LIST_V2 } from '@utils/constants/iconList';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@utils/constants/pageRoutes';

type Props = {
  checkpoints: Array<InitiativeStepType>;
  cpId?: string;
};

export type InitiativeStepType = {
  id: string;
  parentId: string | null;
  level: number;
  name: string;
  haveRouteDetail: boolean;
  typeNode: string;
  iconColor: string;
  isFirstOfLeaf: boolean;
  isLastOfLeaf: boolean;
  memberType?: string | null;
};

const ProposalStep = ({ checkpoints, cpId }: Props) => {
  const navigate = useNavigate();

  const handleChangeStep = (id: string) => {
    navigate(`../${PAGE_ROUTES.INITIATIVE.SET_UP_INITIATIVE}/${id}`);
  };

  return (
    <div className="flex flex-col w-full">
      {checkpoints.map((cp, index) => (
        <div
          className={`flex flex-col w-full mt-6px ${cpId === cp.id ? 'mb-0' : 'mb-12px'}`}
          key={cp.id}
          onClick={() => handleChangeStep(cp.id)}
        >
          <div className="w-full flex justify-start items-center gap-3">
            <span
              className={`w-[60px] h-[60px] rounded-full border-2 text-center cursor-pointer flex justify-center items-center 
              ${cpId === cp.id ? 'border-violet-version-5 text-violet-version-5' : ''}`}
            >
              <div
                className={`w-[26px] h-[26px]  ${
                  cpId === cp.id ? 'text-violet-version-5' : 'text-[#898988]'
                }`}
              >
                {ICON_LIST_V2[cp.typeNode as keyof typeof ICON_LIST_V2].icon}
              </div>
            </span>
            <span
              className={`tracking-0.5px text-emph-body cursor-pointer text-[20px]  font-semibold ${
                cpId === cp.id ? 'text-violet-version-5' : 'text-grey-version-4'
              }`}
            >
              {cp.name}
            </span>
          </div>
          {cpId === cp.id && index !== checkpoints.length - 1 && (
            <span className="w-32px h-32px flex justify-center items-center p-1 ml-3">
              <span className="w-1 h-full bg-white border-l-[2px] border-dashed" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProposalStep;
