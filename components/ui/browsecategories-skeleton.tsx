"use client";

import { Divider } from "antd";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "../ui/skeleton";

const BrowseCategoriesSkeleton = () => {
  return (
    <div className="wrapper my-8 md:my-16">
      <div className="mb-6 md:mb-8">
        <Divider>
          <span className="text-xl font-semibold md:text-2xl">
            BROWSE OUR CATEGORIES
          </span>
        </Divider>
      </div>
      <div className="mx-auto w-[95%] md:w-full">
        <Swiper
          className=""
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          loop={true}
          scrollbar={{ draggable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index + 1}>
              <div className="group relative aspect-[5/6] overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrowseCategoriesSkeleton;
