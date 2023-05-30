import { L } from '@utils/locales/L';
import { useState } from 'react';
import clsx from 'clsx';
import CardReview from '@pages/MultiProposal/reviewInitiatives/cardReview';
import TableReview from '@pages/MultiProposal/reviewInitiatives/tableReview';
import TableCard from '@assets/icons/svg-icons/TableCard';

const listReview = [
  {
    title: 'Hiring new graphic designer',
    text: 'Joey’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Vincent’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Leo’s application',
  },
  {
    title: 'Investment',
    text: 'M&T’s deal',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Joey’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Vincent’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Leo’s application',
  },
  {
    title: 'Investment',
    text: 'M&T’s deal',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Joey’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Vincent’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Leo’s application',
  },
  {
    title: 'Investment',
    text: 'M&T’s deal',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Joey’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Vincent’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Leo’s application',
  },
  {
    title: 'Investment',
    text: 'M&T’s deal',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Joey’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Vincent’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Leo’s application',
  },
  {
    title: 'Investment',
    text: 'M&T’s deal',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Joey’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Vincent’s application',
  },
  {
    title: 'Hiring new graphic designer',
    text: 'Leo’s application',
  },
  {
    title: 'Investment',
    text: 'M&T’s deal',
  },
];

function ReviewInitiatives() {
  const [tabName, setTabName] = useState(1);

  const tabViews = [
    {
      id: 1,
      title: L('cardReview'),
      content: <CardReview data={listReview} />,
      icon: <TableCard />,
    },
    {
      id: 2,
      title: L('tableReview'),
      content: <TableReview data={listReview} />,
      icon: <TableCard />,
    },
  ];

  return (
    <div className="container flex flex-col pt-[5rem]">
      <div className="flex justify-between items-center">
        <div className="text-4xl font-medium">{L('reviewInitiatives')}</div>
        <div className="flex text-xl font-medium">
          {tabViews?.map((tab) => (
            <div
              key={tab.id}
              className={clsx(
                `cursor-pointer ${tabName === tab.id ? 'text-[#5D23BB]' : ''}`,
                tab.id === 1 ? 'pr-2 border-r border-color-black border-solid' : 'ml-2',
              )}
              onClick={() => setTabName(tab.id)}
            >
              <div className="flex items-center">
                {tab.icon}
                <span className="pl-2">{tab.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-[2.5rem]">
        {tabViews.map((tab) => tabName === tab.id && <div key={tab.id}>{tab.content}</div>)}
      </div>
    </div>
  );
}
export default ReviewInitiatives;
