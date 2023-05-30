import EnforcerIconV2 from '@assets/icons/svg-icons/EnforcerIconV2';
import ListIcon from '@assets/icons/svg-icons/ListIcon';
import ZapIcon from '@assets/icons/svg-icons/ZapIcoin';

type Props = {
  urlImg?: string;
  title?: string;
  desc?: string;
  active?: boolean;
  urlAvatar?: string;
  handleOnClickOverlay?: (item: any) => void;
};

const CardBlueprint = ({
  urlImg,
  title,
  desc,
  active,
  urlAvatar,
  handleOnClickOverlay = () => {},
}: Props) => {
  const onClickOverlay = (item: any) => {
    if (!active) return;
    handleOnClickOverlay(item);
  };
  return (
    <div>
      <div
        className={`w-full flex flex-col gap-6' ${
          !active ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } `}
        onClick={onClickOverlay}
      >
        <div className="w-full rounded-xl overflow-hidden group relative">
          {active && (
            <div className="card-overlay bg-[#00000080] opacity-0 absolute group-hover:opacity-100 p-6 flex flex-col justify-between h-[200px] w-full rounded-xl ease-linear duration-300">
              <div className="w-6 h-6 text-white">
                <EnforcerIconV2 />
              </div>
              <div>
                <div className="text-white flex items-center gap-2 font-semibold text-[17px]">
                  <div className="w-4 h-4">
                    <ListIcon />
                  </div>
                  <p>4 checkpoints</p>
                </div>
                <div className="text-white flex items-center gap-2 font-semibold text-[17px]">
                  <ZapIcon width={16} height={16} color="white" />
                  <p>Enforcer applied</p>
                </div>
              </div>
            </div>
          )}

          <img className="w-full h-[200px] object-cover object-center " src={urlImg} alt="" />
        </div>
        <div className="flex items-end gap-2">
          <div className="rounded-full w-[42px] h-[42px] overflow-hidden">
            <img className="w-full h-full object-cover object-center " src={urlAvatar} alt="" />
          </div>
          <div className="w-[80%] pt-[25px]">
            <p className="text-[16px] tracking-0.5px leading-[21px] text-[#252422] font-semibold truncate">
              {title}
            </p>
            <p className="text-[#252422] text-[13px] leading-[18px] tracking-[0.6px]">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardBlueprint;
