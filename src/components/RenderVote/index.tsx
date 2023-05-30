import { Options } from '@utils/mockData/proposal';
import { generateId } from '@utils/helpers';
import Button from '@components/Button/Button';
import React from 'react';
import SingleChoiceIcon from '@assets/icons/svg-icons/SingleChoiceIcon';

type Props = {
  optionsIdOfProposal: Options[];
  setSelectVote: (value: number) => void;
  isSubmitVote: boolean;
  isAuth: boolean;
  selectedVote: number;
};

function RenderVote(props: Props) {
  const { optionsIdOfProposal, isSubmitVote, isAuth, setSelectVote, selectedVote } = props;

  const handleSelectVote = (vote: number) => {
    setSelectVote(vote);
  };
  return (
    <>
      {optionsIdOfProposal.map((ele: Options, index: number) => {
        if (ele.isLoop) {
          return (
            <div key={generateId(8)}>
              <Button
                disabled={!isAuth}
                onClick={() => {
                  handleSelectVote(ele.id);
                }}
                variant="outline"
                className={`w-full min-h-[60px] leading-[22px] tracking-0.5px 
            px-[16px] py-[8px] rounded-xl !text-grey-version-7 bg-white
            hover:bg-white  ${ele.id === selectedVote && 'border-[2px] border-[#5D23BB]'} ${
                  isSubmitVote && 'pointer-events-none'
                }`}
              >
                <div className="flex w-full gap-3">
                  <div className="">
                    <span className="font-semibold text-[17px] shrink-0">{`${index + 1}.`}</span>
                  </div>
                  <div className="md:max-w-full text-start grow shrink items-start">
                    <span className="text-[17px]">{ele.value}</span>
                  </div>
                  <div
                    className={`w-6 h-6 shrink-0 text-violet-version-5 ${
                      ele.isChoice ? 'opacity-1' : 'opacity-0'
                    }`}
                  >
                    <SingleChoiceIcon />
                  </div>
                </div>
              </Button>
            </div>
          );
        }
      })}
    </>
  );
}

export default RenderVote;
