import ArrowDown from '@assets/icons/svg-icons/ArrowDown';
import AttachIcon from '@assets/icons/svg-icons/AttachIcon';
import EyeOffIcon from '@assets/icons/svg-icons/EyeOffIcon';
import Button from '@components/Button/Button';
import Tag from '@components/Card/Tag/Tag';
import { RootState } from '@redux/store';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L } from '@utils/locales/L';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { MethodVoteOptionType } from 'types/proposal';

const ReviewModeProposal = () => {
  const basicInfo = useSelector((state: RootState) => state.proposal.basicInfo);
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);
  const durationData = useSelector((state: RootState) => state.proposal.duration);

  const dataTimeline = [
    {
      id: 1,
      title: 'Start time',
      value: dayjs(durationData.startTime).format('MMM DD[st] hh:mm A'),
    },
    {
      id: 2,
      title: 'End time',
      value: dayjs(durationData.endTime).format('MMM DD[st] hh:mm A'),
    },
    { id: 3, title: 'Threhold', value: `${votingMethodData.thresholdValueResult}% voting power` },
  ];

  const dataVote = votingMethodData.option;

  return (
    <div className="container flex flex-col justify-center py-[100px]">
      <div className="flex justify-between items-center border border-violet-version-5 rounded-lg p-6 bg-[#EFE9F8] ">
        <div>
          <p className="text-violet-version-5 text-[17px]">{L('youAreViewing')}</p>
          <div className="flex items-center">
            <p className="text-violet-version-5 text-[28px] font-semibold">Finance Team</p>
            <ArrowDown color="#5D23BB" />
          </div>
        </div>
        <Link to={`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.REVIEW_PROPOSAL}`}>
          <button className="border-[1.5px] border-violet-version-5 bg-white rounded-lg p-[20px]">
            <div className="flex items-center gap-1">
              <EyeOffIcon />
              <p className="text-violet-version-5 text-[17px]">{L('exitPreviewMode')}</p>
            </div>
          </button>
        </Link>
      </div>
      <div className="flex pointer-events-none flex-1 w-full">
        <div className="flex gap-10 w-full mt-[44px]">
          <div className="basis-2/3 max-w-[66.666667%]">
            <Tag tagType="Active" />
            <h3 className="text-grey-version-7 font-semibold text-base-2xl tracking-[0.36px] leading-[34px] mt-4">
              <div
                className="font-medium text-xl preview-block"
                dangerouslySetInnerHTML={{ __html: basicInfo.description }}
              />
            </h3>
            <div className="flex pt-[24px] gap-[12px]">
              <div className="text-[17px] leading-[22px] tracking-[0.5px]">
                <div className="flex flex-wrap gap-4 mb-[24px]">
                  {basicInfo.listOfFiles.length > 0 &&
                    Array.from(basicInfo.listOfFiles as FileList | File[]).map(
                      (file, index: number) => (
                        <p
                          key={index}
                          className="flex justify-center items-center w-[230px] rounded-full bg-secondary-color border-1.5 gap-2 px-[16px] py-[13px]"
                        >
                          <AttachIcon />
                          <span className="truncate max-w-[80%]">{file?.name}</span>
                        </p>
                      ),
                    )}
                </div>
              </div>
            </div>

            <div className="pt-[35.5px] flex flex-col gap-[20px]">
              <p className="text-xl font-semibold text-[#252422]">{L('voteOnChain')}</p>
              {dataVote.map(
                (ele: MethodVoteOptionType, indx: number) =>
                  ele.isLoop && (
                    <div key={ele.id} className="relative">
                      <Button
                        variant="outline"
                        className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl !text-grey-version-7 bg-white hover:bg-white focus:outline-violet-version-5"
                      >
                        <div className="absolute left-4">
                          <span className="font-semibold text-[17px]">
                            {indx < 4 ? indx + 1 : indx}.
                          </span>
                        </div>
                        <div>
                          <span className="text-[17px]">{ele?.value}</span>
                        </div>
                      </Button>
                    </div>
                  ),
              )}
              <Button className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-4 rounded-xl text-white">
                <p className="text-[17px]">{L('vote')}</p>
              </Button>
            </div>
            <div className="flex flex-col gap-4 mt-[60px]">
              <p className="text-xl font-semibold">{}</p>
              <p className="text-xl font-semibold text-[#252422]">{L('comment')}</p>
              <textarea
                className="w-full h-20 focus:outline-none border-1.5 border-grey-version-3 rounded-8 p-4 font-medium text-xl"
                placeholder="Comment something..."
              />
              <Button
                variant="outline"
                className="w-full h-[60px] text-[17px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl cursor-pointer border-[1.5px] border-[#E3E3E2]"
              >
                {L('post')}
              </Button>
            </div>
          </div>

          <div className="basis-1/3 max-w-[33.333333%]">
            <div className="flex flex-col gap-3 w-full border rounded-lg p-6">
              {dataTimeline.map((ele) => (
                <div key={ele.id} className="flex justify-between">
                  <p className="text-grey-version-7 text-text_2 font-medium">{ele.title}</p>
                  <p className="text-grey-version-7 text-text_2 font-semibold">{ele.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewModeProposal;
