"use client";

import { Divider } from "antd";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { CategoryController } from "@/types/categories";
import Link from "next/link";

type Props = {
  categories: CategoryController.Category[];
};

const BrowseCategories = ({ categories }: Props) => {
  return (
    <div className="wrapper my-16">
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
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          autoplay={{ delay: 5000 }}
          loop={categories.length > 5}
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
          {categories.map(category => (
            <SwiperSlide key={category.id}>
              <div className="relative aspect-[11/12] max-md:mx-auto max-md:w-[80%]">
                <Image
                  src={category.image.path}
                  alt={category.name}
                  height={500}
                  width={500}
                  className="z-[-1] h-full w-full object-cover"
                />
                <div className="absolute -bottom-1 left-0 flex w-full items-center justify-center">
                  <div className="w-[80%] bg-black py-4 text-center">
                    <Link
                      href={`/categories/${category.id}`}
                      className="text-lg font-semibold uppercase text-white max-md:text-sm"
                    >
                      {category.name}
                    </Link>
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
export default BrowseCategories;
