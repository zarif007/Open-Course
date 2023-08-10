"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

// import required modules
import { Autoplay, FreeMode } from "swiper/modules";

const SwiperComp = ({
  comps,
  slidesPerView,
}: {
  comps: React.ReactNode[];
  slidesPerView: number;
}) => {
  return (
    <div>
      <div className="sm:hidden">
        <SwiperSlideComp
          slidesPerView={slidesPerView ? slidesPerView : 1}
          comps={comps}
        />
      </div>
      <div className="hidden sm:inline md:hidden">
        <SwiperSlideComp
          slidesPerView={slidesPerView ? slidesPerView : 2}
          comps={comps}
        />
      </div>
      <div className="hidden md:inline">
        <SwiperSlideComp
          slidesPerView={slidesPerView ? slidesPerView : 3}
          comps={comps}
        />
      </div>
    </div>
  );
};

const SwiperSlideComp = ({
  slidesPerView,
  comps,
}: {
  slidesPerView: number;
  comps: React.ReactNode[];
}) => {
  if (!comps) return;
  return (
    <Swiper
      autoplay={true}
      slidesPerView={slidesPerView}
      spaceBetween={30}
      freeMode={true}
      modules={[FreeMode, Autoplay]}
      className="mySwiper"
    >
      {comps.map((comp, index) => {
        return <SwiperSlide key={index}>{comp}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default SwiperComp;
