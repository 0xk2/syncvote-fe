import QuestionCircleIcon from '@assets/icons/svg-icons/QuestionCircleIcon';
import SignalIcon from '@assets/icons/svg-icons/SignalIcon';
import { L } from '@utils/locales/L';
import { Tooltip } from 'antd';
import { ICheckpointNode } from 'types/checkpoint';

type Props = {
  node?: ICheckpointNode;
};

const ReviewUpvote = ({ node }: Props) => (
  <div className="flex flex-col gap-5">
    <div className="p-6 flex justify-between items-center border-1.5 border-grey-version-7 rounded-xl cursor-pointer">
      <div className="gap-4 text-[#252422] flex items-center">
        <SignalIcon />
        <p className="text-xl font-semibold">{L('upVote')}</p>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-col gap-[6px]">
          <div className="flex flex-col gap-6">
            <p className="text-[#252422] font-semibold text-[20px]">Voting Participants</p>
            <div className="flex gap-3 w-full border rounded-lg p-6 items-center justify-between">
              <p className="bg-violet-version-1 cursor-pointer p-4px rounded-8 text-violet-version-5 text-regular-callout">
                {node?.config?.allowedRoles[0]?.label}
              </p>
              <p className="text-[#5D23BB] text-[15px] cursor-pointer">View member list</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[10px] items-center">
        <span className="font-[600] text-[20px] tracking-[0.38px]">Voting results</span>
        <Tooltip placement="right" title="Some text here">
          <span className="cursor-pointer">
            <QuestionCircleIcon color="#898988" w="24px" h="24px" />
          </span>
        </Tooltip>
      </div>
    </div>
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col w-full gap-[6px]">
        <p className="flex text-text_1.5 font-medium text-grey-version-6">
          Threshold calculated by
        </p>
        <input
          className="basic-info-input bg-transparent"
          type="text"
          disabled
          value={node?.config?.thresholdCalculatedBy?.label}
        />
      </div>
      <div className="flex flex-col w-full gap-[6px]">
        <p className="flex text-text_1.5 font-medium text-grey-version-6">
          Threshold value for each result (%)
        </p>
        <input
          className="basic-info-input bg-transparent"
          type="text"
          disabled
          value={node?.config?.thresholdValue?.value}
        />
      </div>
    </div>
  </div>
);

export default ReviewUpvote;
