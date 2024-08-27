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
    <div className="wrapper my-8 md:my-16">
      <div className="mb-6 md:mb-8">
        <Divider>
          <span className="text-xl font-semibold md:text-2xl">
            BEST SELLING PRODUCTS
          </span>
        </Divider>
      </div>
      <div className="mx-auto w-[95%] md:w-full">
        <Swiper
          className=""
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          autoplay={{ delay: 5000 }}
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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group relative h-64 overflow-hidden md:h-72">
                <Image
                  src={product.image}
                  alt={product.name}
                  height={500}
                  width={500}
                  className="z-[-1] h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full translate-y-full bg-black bg-opacity-70 p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="mb-1 text-xs font-semibold uppercase text-[#d9d9d9]">
                    all collections
                  </p>
                  <p className="mb-1 text-sm font-semibold text-white">
                    {product.name}
                  </p>
                  <p className="text-base font-semibold text-white">
                    ${formatNumberWithCommas(product.price)}
                  </p>
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
