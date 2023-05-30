import { Options, VotingResult } from '@utils/mockData/proposal';
import { generateId } from '@utils/helpers';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { sliceAddressToken } from '@utils/helpers';

type Props = {
  optionsIdOfProposal: Options[];
  listUserVote: VotingResult[];
};
function RenderVoteTitle(props: Props) {
  const { optionsIdOfProposal, listUserVote } = props;
  const [activeTab, setActiveTab] = useState(optionsIdOfProposal[0]?.id);

  return (
    <>
      <div className="flex mt-[30px] mb-[16px] gap-[10px] max-w-full overflow-y-auto custom-scroll-bar outline-none">
        {optionsIdOfProposal.map((value: Options) => {
          if (value.isLoop) {
            return (
              <div
                key={generateId(8)}
                className={clsx(
                  `cursor-pointer min-w-[150px] mb-3`,
                  value.id === 1 ? 'pr-2' : 'ml-2',
                )}
                onClick={() => setActiveTab(value.id)}
              >
                <div
                  className={clsx(
                    `flex items-center ${
                      activeTab === value.id
                        ? 'text-[#5d23bb] border-b-2 border-solid border-b-[#5d23bb]'
                        : 'text-[#252422]'
                    }`,
                  )}
                >
                  <span className="py-3 text-center text-base font-medium outline-none min-w-[150px] truncate">
                    {value.value}
                  </span>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="flex flex-col gap-4">
        {listUserVote
          .filter((ele: VotingResult) => ele.optionedId === activeTab)
          .map((item: VotingResult) => (
            <div key={generateId(8)} className="flex justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <img
                    className="rounded-full object-cover object-center w-8 h-8"
                    src={item.urlAvatar}
                    alt=""
                  />
                </div>
                <p>{sliceAddressToken(item.token)}</p>
              </div>
              <p>{item.vote}</p>
            </div>
          ))}
      </div>
    </>
  );
}
export default RenderVoteTitle;
