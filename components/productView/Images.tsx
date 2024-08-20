"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import SwiperType, { FreeMode, Navigation, Thumbs } from "swiper";
import { CardActionArea, CardMedia } from "@mui/material";
import { Image } from "antd";
import { Carousel } from "react-responsive-carousel";

export default function ProductView({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(
    null
  );

  React.useEffect(() => {
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(1);
    }
  });

  return (
    <>
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs
        swipeable
        emulateTouch
        className="[&_.thumbs]:justify-center [&_.thumbs]:flex [&_.thumb]:rounded-lg"
      >
        {images.map((image, index) => {
          return (
            <div
              key={image}
              className="max-w-full w-[600px] h-[500px] max-h-[500px] grid place-items-center"
            >
              <Image
                alt="Pauloxuries banner"
                rootClassName="w-max h-full max-h-[500px]"
                className="w-max max-h-full"
                src={"https://pauloxuries.com/images/products/" + image}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={alt}
                hidden
                src={"https://pauloxuries.com/images/products/" + image}
              />
            </div>
          );
        })}
      </Carousel>
    </>
  );
}
