import React, { forwardRef, ForwardedRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { ECardEnumType } from '@utils/constants';
import Card from '@components/Card/Card';
import BluePrintCardContent from '@components/Card/BluePrintCardContent/BluePrintCardContent';
import InitiativeCardContent from '@components/Card/InitiativeCardContent/InitiativeCardContent';
import ProposalCardContent from '@components/Card/ProposalCardContent/ProposalCardContent';

type Props = {
  slides: any[];
  cardType: ECardEnumType;
  swiperRef?: ForwardedRef<SwiperRef>;
  onCardClick?: (item: any) => void;
};

const MySwiper = forwardRef<SwiperRef, Props>((props, ref) => {
  const { slides, cardType, onCardClick } = props;

  const COMPONENT_MAP: { [key: string]: any } = {
    [ECardEnumType.BLUEPRINT]: BluePrintCardContent,
    [ECardEnumType.INITIATIVE]: InitiativeCardContent,
    [ECardEnumType.PROPOSAL]: ProposalCardContent,
  };
  let Component = COMPONENT_MAP[cardType];

  return (
    <Swiper
      ref={ref}
      navigation={{
        nextEl: `.${cardType}-my-swiper-next`,
        prevEl: `.${cardType}-my-swiper-prev`,
      }}
      modules={[Navigation]}
      className="mySwiper"
      id={cardType}
      slidesPerView={4.5}
      spaceBetween={16}
    >
      {slides.map((slideContent) => (
        <SwiperSlide
          key={slideContent.id}
          onClick={() => (onCardClick ? onCardClick(slideContent) : null)}
        >
          <Card cardType={cardType} tagType={slideContent.tagType}>
            <Component {...slideContent} />
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

export default MySwiper;
