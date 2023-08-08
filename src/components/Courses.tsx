"use client";

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import LargeHeading from "./ui/LargeHeading";
import Course from "./Course";

const getCount = () => {
  return window.innerWidth > 1010 ? 3 : 2
}

const Courses = () => {

  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    if(window !== undefined) setWidth(window.innerWidth)
    console.log(width)
  }, [window.innerWidth])



  return (
    <main className="relative h-screen flex flex-col overflow-x-hidden w-full max-w-7xl mx-auto">
      <LargeHeading className="underline decoration-rose-500">
        Courses
      </LargeHeading>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4"></div>
        

        <div className="sm:hidden">
          <Swiper
            autoplay={true}
            slidesPerView={1}
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
          </Swiper>
        </div>

        <div className="hidden sm:inline md:hidden">
          <Swiper
            autoplay={true}
            slidesPerView={2}
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
          </Swiper>
        </div>

        <div className="hidden md:inline">
          <Swiper
            autoplay={true}
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
            <SwiperSlide><Course /></SwiperSlide>
          </Swiper>
        </div>
      </div>
    </main>
  );
};

export default Courses;
