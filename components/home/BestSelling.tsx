"use client";

import { ProductController } from "@/types/products";
import { formatNumberWithCommas } from "@/utils/functions";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  products: ProductController.Product[];
};

const BestSelling = ({ products }: Props) => {
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
          loop={products.length > 5}
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
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <div className="group relative aspect-[5/6] overflow-hidden">
                <Image
                  src={product.medias[0].path}
                  alt={product.name}
                  height={500}
                  width={500}
                  className="z-[-1] h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full translate-y-full bg-black bg-opacity-70 p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <Link
                    href="/shop"
                    className="mb-1 block text-xs font-semibold uppercase text-[#d9d9d9]"
                  >
                    shop
                  </Link>
                  <Link
                    href={`/products/${product.id}`}
                    className="mb-1 block text-sm font-semibold text-white"
                  >
                    {product.name}
                  </Link>
                  <p className="text-base font-semibold text-white">
                    ${formatNumberWithCommas(Number(product.price))}
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
