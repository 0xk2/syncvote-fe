import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwiperRef } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './SliderCard.scss';

import MySwiper from '@components/SliderCard/MySwiper';

import ChevronsRightIcon from '@assets/icons/svg-icons/ChevronsRightIcon';
import ZapIcon from '@assets/icons/svg-icons/ZapIcoin';
import { ECardEnumType } from '@utils/constants';
import PAGE_ROUTES from '@utils/constants/pageRoutes';

type Props = {
  amount: number;
  cardType: ECardEnumType;
  dataCard: any;
  cardTitle: string;
};

const SliderCard = ({ amount, cardTitle, dataCard, cardType }: Props) => {
  const swiperRef = useRef<SwiperRef>(null);
  const navigate = useNavigate();

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNavigate = (item: any) => {
    if (item.tagType === 'Active' && cardType === ECardEnumType.INITIATIVE) {
      const idProposal = 2;
      navigate(`${PAGE_ROUTES.PROPOSAL_DETAIL}/${+item.id < 5 ? item.id : idProposal}`);
    } else if (item.tagType === 'Active' && item === ECardEnumType.PROPOSAL) {
      navigate(`${PAGE_ROUTES.PROPOSAL_DETAIL}/1`);
    }
  };

  return (
    <div className="relative my-[50px] cursor-pointer">
      <div className="flex items-center mb-10 container justify-between">
        <div className="slider-title flex ">
          <div className="flex items-center">
            <ZapIcon />
            <p className="text-gray-title font-semibold text-text_5 pl-1.5">{cardTitle}</p>
            <p className="text-gray-text text-text_5 font-medium pl-1.5">({amount})</p>
          </div>
          <div className="flex pl-4 items-center text-text_4 cursor-pointer">
            <p>View all</p>
            <ChevronsRightIcon />
          </div>
        </div>
        <div className="controller-slide">
          <button
            className={`my-swiper-prev ${cardType}-my-swiper-prev mr-[12px]`}
            onClick={goPrev}
          >
            <img src="/assets/images/prev_icon.png" alt="prev" />
          </button>
          <button className={`my-swiper-next ${cardType}-my-swiper-next`} onClick={goNext}>
            <img src="/assets/images/next_icon.png" alt="next" />
          </button>
        </div>
      </div>

      <div className="relative min-h-[306px] mr-[-8%]">
        <div className="absolute left-0 right-0">
          <MySwiper
            slides={dataCard}
            cardType={cardType}
            ref={swiperRef}
            onCardClick={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
