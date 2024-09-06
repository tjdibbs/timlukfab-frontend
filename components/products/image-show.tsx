"use client";

import product1 from "@/assets/images/products/product1.jpg";
import product2 from "@/assets/images/products/product2.jpg";
import product3 from "@/assets/images/products/product3.jpg";
import product4 from "@/assets/images/products/product4.jpg";
import product5 from "@/assets/images/products/product5.jpg";
import Image, { StaticImageData } from "next/image";
import { Fragment, useState } from "react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from "swiper/modules";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlashIcon } from "@radix-ui/react-icons";

const images = [product1, product2, product3, product4, product5];

const ImageShow = () => {
  const [imageToShow, setImageToShow] = useState(images[0]);

  const handleImageClick = (image: StaticImageData) => {
    setImageToShow(image);
  };

  return (
    <Fragment>
      <div className="col-span-7 flex items-center gap-2 max-lg:hidden">
        <div className="grid w-32 grid-cols-2 gap-1 self-start transition-opacity">
          {images.map((image, index) => {
            return (
              <div
                key={index + 1}
                className={
                  "cursor-pointer hover:opacity-65 " +
                  (imageToShow === image ? "border-2 border-black" : "")
                }
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image}
                  alt="product image"
                  width={300}
                  height={300}
                  className="aspect-[5/6] w-full max-w-full object-cover"
                />
              </div>
            );
          })}
        </div>
        <div className="flex-1">
          <Image
            src={imageToShow}
            alt="product image"
            width={300}
            height={300}
            className="aspect-[8/10] h-full w-full max-w-full object-cover"
          />
        </div>
      </div>
      <div className="mt-4 lg:hidden">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-sm uppercase text-[#aaa] hover:text-black/60 max-md:text-sm"
              >
                HOME
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/shop"
                className="text-sm uppercase text-[#aaa] hover:text-black/60 max-md:text-sm"
              >
                SHOP
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Swiper
          className=""
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          autoplay={{ delay: 5000 }}
          loop={true}
          scrollbar={{ draggable: true }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index + 1}>
              <div className="">
                <Image
                  src={image}
                  alt="image"
                  height={300}
                  width={300}
                  className="aspect-[4/6] w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default ImageShow;
