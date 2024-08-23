"use client";

import { products } from "@/data";
import { formatNumberWithCommas } from "@/utils/functions";
import { Divider } from "antd";
import Image from "next/image";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BestSelling = () => {
  return (
    <div className="wrapper my-16">
      <div className="mb-8">
        <Divider>
          <span className="text-2xl font-semibold max-md:text-lg">
            BEST SELLING PRODUCTS
          </span>
        </Divider>
      </div>
      <div className="max-md:mx-auto max-md:w-[85%]">
        <Swiper
          // install Swiper modules
          className=""
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          autoplay={{ delay: 5000 }}
          loop={true}
          scrollbar={{ draggable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative h-72 max-md:h-96">
                <Image
                  src={product.image}
                  alt={product.name}
                  height={500}
                  width={500}
                  className="z-[-1] h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 flex w-full items-center justify-center">
                  <div className="w-[80%] bg-black py-2 text-center">
                    <p className="text-xs font-semibold uppercase text-[#d9d9d9]">
                      all collections
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {product.name}
                    </p>
                    <p className="text-base font-semibold text-white">
                      ${formatNumberWithCommas(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default BestSelling;
