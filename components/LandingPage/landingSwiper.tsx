/* eslint-disable @next/next/no-img-element */
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import { useTheme } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const slide = [
  {
    image: "banA",
    title: "Plain Pants",
    text: "What to wear with a suit, perfect match for any dress",
    category: "pant",
  },
  {
    image: "banB",
    title: "Sneakers",
    text: "Varieties of unisex sneakers",
    category: "sneaker",
  },
  {
    image: "banC",
    text: "vintage wear, (outfit idea for men)",
    title: "Vintage Wears",
    category: "vintage",
  },
];

export default function LandingPageSwiper() {
  const theme = useTheme();
  const router = useRouter();
  const [width, setWidth] = React.useState(true);

  React.useEffect(() => {
    setWidth(window.innerWidth < 700);
    const handleResize = (e: any) => {
      e = window.innerWidth;
      if (e > 700) setWidth(false);
      else if (e <= 600) setWidth(true);
    };

    window.onresize = handleResize;

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Swiper
      modules={[Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      loop={true}
      scrollbar={{ draggable: true }}
    >
      {slide.map((slideData, index) => {
        return (
          <SwiperSlide className="relative" key={index}>
            <Image
              src={"/images/slider/" + slideData.image + ".png"}
              // loading="lazy"
              alt={slideData.title}
              width={1000}
              height={400}
              priority
              className={`w-full object-fill  pointer-events-none`}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
