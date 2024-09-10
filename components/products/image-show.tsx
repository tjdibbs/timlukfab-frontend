"use client";

import Image from "next/image";
import { Fragment, useState } from "react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlashIcon } from "@radix-ui/react-icons";
import { ProductController } from "@/types/products";
import { BreadCrumbLink } from "@/lib/types";
import BreadCrumbComponent from "../ui/breadcrumb-component";

type Props = {
  product: ProductController.Product;
};

const Breadcrumb = ({ name }: { name: string }) => {
  const breadcrumbLinks: BreadCrumbLink[] = [
    {
      id: 1,
      name: "Home",
      href: "/",
      isPage: false,
    },
    {
      id: 2,
      name: "Shop",
      href: "/shop",
      isPage: false,
    },
    {
      id: 3,
      name: name,
      href: `/products/${name}`,
      isPage: true,
    },
  ];

  return <BreadCrumbComponent links={breadcrumbLinks} />;
};

const ImageShow = ({ product }: Props) => {
  const [imageToShow, setImageToShow] = useState(product.medias[0]);

  const handleImageClick = (image: ProductController.Media) => {
    setImageToShow(image);
  };

  return (
    <Fragment>
      <div className="col-span-7 flex items-center gap-2 max-lg:hidden">
        <div className="grid w-44 grid-cols-2 gap-1 self-start transition-opacity">
          {product.medias.map(image => {
            return (
              <div
                key={image.id}
                className={
                  "aspect-[5/7] cursor-pointer hover:opacity-65 " +
                  (imageToShow === image ? "border-2 border-black" : "")
                }
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image.path}
                  alt="product image"
                  width={300}
                  height={300}
                  className="h-full w-full max-w-full object-cover"
                />
              </div>
            );
          })}
        </div>
        <div className="flex-1">
          <Image
            src={imageToShow.path}
            alt="product image"
            width={300}
            height={300}
            className="aspect-[8/10] h-full w-full max-w-full object-cover"
          />
        </div>
      </div>
      <div className="mt-4 space-y-4 lg:hidden">
        <Breadcrumb name={product.name} />
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
          {product.medias.map(image => (
            <SwiperSlide key={image.id}>
              <div className="">
                <Image
                  src={image.path}
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
