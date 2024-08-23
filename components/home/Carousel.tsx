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
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        loop={true}
        scrollbar={{ draggable: true }}
      >
        {banners.map((banner) => (
          <SwiperSlide className="" key={banner.id}>
            <div className="relative h-[500px] max-md:h-72">
              <Image
                src={banner.image}
                alt="Banner image"
                fill
                priority
                className="z-[-1] h-full w-full cursor-pointer object-cover transition-transform duration-1000 ease-linear hover:scale-125"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Carousel;
