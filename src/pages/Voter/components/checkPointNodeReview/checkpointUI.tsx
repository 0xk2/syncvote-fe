import { useState } from 'react';
import { ECheckpointsType } from 'types/enums/checkpoints';
import { CP_NAME } from '@constants/checkpoint';
import CheckpointNodeReview from './checkPointNodeReview';

const CheckPointUI = () => {
  const [totalItem, setTotalItem] = useState<number>(5);
  const checkpointsList = [
    {
      id: '1',
      isParent: false,
      haveRouteDetail: false,
      iconColor: '#252422',
      name: 'New deal',
      type: ECheckpointsType.polling,
    },
    {
      id: '2',
      isParent: false,
      haveRouteDetail: false,
      iconColor: '#252422',
      name: 'Trending deal',
      type: ECheckpointsType.singleChoice,
    },
    {
      id: '3',
      isParent: false,
      haveRouteDetail: false,
      iconColor: '#252422',
      name: 'IC Reviews',
      type: ECheckpointsType.singleChoice,
    },
    {
      id: '4',
      isParent: false,
      haveRouteDetail: false,
      iconColor: '#252422',
      name: 'Community',
      type: ECheckpointsType.veto,
    },
    {
      id: '5',
      isParent: false,
      haveRouteDetail: false,
      iconColor: '#252422',
      type: ECheckpointsType.enforcer,
      name: CP_NAME.enforcer,
    },
  ];
  return (
    <div className="flex flex-col container">
      <div
        className={`w-full flex p-8 items-center ${
          totalItem > 5 ? 'justify-start' : 'justify-center'
        }`}
      >
        {checkpointsList.length > 0 &&
          checkpointsList.map((item, idx) => (
            <CheckpointNodeReview
              key={item.id}
              isParent={item.isParent}
              haveRouteDetail={item.haveRouteDetail}
              iconColor={item.iconColor}
              value={idx + 1}
              totalItem={totalItem}
              type={item.type}
              name={item.name}
            />
          ))}
      </div>
    </div>
  );
};

export default CheckPointUI;
