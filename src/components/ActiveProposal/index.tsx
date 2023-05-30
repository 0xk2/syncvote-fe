import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
import { L } from '@utils/locales/L';
import Button from '@components/Button/Button';
import XButton from '@assets/icons/svg-icons/XButton';
import BarChartIcon from '@assets/icons/svg-icons/BarChartIcon';
import React from 'react';
import { Proposal } from '@utils/mockData/proposal';
import { capitalizeFirstLetter } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@utils/constants/pageRoutes';

type Props = {
  handleModalActiveProposal: (value: boolean) => void;
  proposal: Proposal[];
};
function ActiveProposal(props: Props) {
  const { handleModalActiveProposal, proposal } = props;
  const navigate = useNavigate();
  dayjs.locale('en');
  dayjs.extend(relativeTime);
  const formatCreatedTime = (time: Dayjs | string) => {
    return dayjs(time, 'MMM D[st] h:mm A').fromNow();
  };

  const handleNavigate = (id: number) => {
    handleModalActiveProposal(false);
    navigate(`/${PAGE_ROUTES.PROPOSAL_DETAIL}/${id}`);
  };
  return (
    <div className="w-[240px] md:w-[350px] lg:w-[500px] active-proposal-content">
      <div className="mt-[34px]">
        <div className="flex justify-between mb-[34px] items-center">
          <p className="text-grey-version-7 text-2xl font-semibold">
            <span className="text-[#5048BC]">{proposal.length} </span>
            {L('activeSingleProposal')}
          </p>
          <Button
            variant="outline"
            className="w-[40.71px] h-[40.71px] rounded-[113.087px] flex items-center justify-center"
            onClick={() => handleModalActiveProposal(false)}
          >
            <XButton />
          </Button>
        </div>
        {proposal.map((value: Proposal) => (
          <div
            key={value.id}
            className="flex flex-col gap-4 max-h-[270px] w-full border rounded-[12px] p-6 cursor-pointer mb-[24px]"
            onClick={() => handleNavigate(value.id)}
          >
            <>
              <p className="text-grey-version-7 text-[22px] font-semibold flex items-center">
                <BarChartIcon color="#252422" />
                <div className="ml-[8px]">{value.decisionTitle}</div>
              </p>
              <p className="text-sm font-medium py-1 px-2 rounded-[12px] cursor-pointer bg-tag-active-bg text-tag-active-text w-[75px]">
                Member
              </p>
              <div
                className="text-[15px] text-grey-version-6 font-medium max-h-[200px] overflow-hidden truncate"
                dangerouslySetInnerHTML={{ __html: value.description }}
              />
              <p className="text-grey-version-7 font-semibold text-[15px]">
                {capitalizeFirstLetter(formatCreatedTime(value.startTime))}
              </p>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ActiveProposal;
