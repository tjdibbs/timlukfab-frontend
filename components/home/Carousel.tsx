"use client";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "@/assets/images/banners/banner1.jpeg";
import banner2 from "@/assets/images/banners/banner2.jpeg";
import banner3 from "@/assets/images/banners/banner3.jpeg";
import banner4 from "@/assets/images/banners/banner4.jpeg";
import banner5 from "@/assets/images/banners/banner5.jpeg";
import banner6 from "@/assets/images/banners/banner6.jpeg";
import banner7 from "@/assets/images/banners/banner7.jpeg";
import { v4 as uuidV4 } from "uuid";

const banners = [
  {
    id: uuidV4(),
    image: banner2,
  },
  {
    id: uuidV4(),
    image: banner1,
  },
  {
    id: uuidV4(),
    image: banner3,
  },
  {
    id: uuidV4(),
    image: banner4,
  },
  {
    id: uuidV4(),
    image: banner5,
  },
  {
    id: uuidV4(),
    image: banner6,
  },
  {
    id: uuidV4(),
    image: banner7,
  },
];

const Carousel = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="mySwiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-[60vh] max-h-[600px] min-h-[400px] w-full">
              <Image
                src={banner.image}
                alt="Banner image"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <div className="p-4 text-center text-white">
                  <h2 className="mb-2 text-4xl font-bold md:text-5xl">
                    Your Headline
                  </h2>
                  <p className="mb-4 text-lg md:text-xl">
                    Your subheading or call to action
                  </p>
                  <button className="rounded-full bg-white px-4 py-2 text-black transition-colors hover:bg-opacity-80">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
