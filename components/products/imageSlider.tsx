"use client";

import product1 from "@/assets/images/products/product1.jpg";
import product2 from "@/assets/images/products/product2.jpg";
import product3 from "@/assets/images/products/product3.jpg";
import product4 from "@/assets/images/products/product4.jpg";
import product5 from "@/assets/images/products/product5.jpg";
import { useState, useEffect } from "react";
import Image from "next/image";
import Flickity, { FlickityOptions } from "react-flickity-component";
import "flickity/css/flickity.css";

const images = [product1, product2, product3, product4, product5];

const mainCarouselOptions: FlickityOptions = {
  initialIndex: 0,
  wrapAround: true,
  autoPlay: false,
  imagesLoaded: true,
  cellAlign: "center",
  contain: true,
  pageDots: false,
  prevNextButtons: false,
  asNavFor: ".thumb-carousel",
};

const thumbCarouselOptions: FlickityOptions = {
  contain: true,
  pageDots: false,
  wrapAround: true,
  freeScroll: true,
  prevNextButtons: false,
  imagesLoaded: true,
  cellAlign: "left",
  asNavFor: ".main-carousel",
};

const ImageSlider = () => {
  const [mainFlickity, setMainFlickity] = useState<Flickity | null>(null);
  const [thumbFlickity, setThumbFlickity] = useState<Flickity | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (mainFlickity) {
      mainFlickity.on("change", (index: number) => {
        setSelectedIndex(index);
      });
    }
  }, [mainFlickity]);

  return (
    <div className="col-span-5">
      <div className="bg-red-500">
        <Flickity
          flickityRef={(c) => {
            setMainFlickity(c);
          }}
          className="main-carousel"
          options={mainCarouselOptions}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-[100vh] max-h-[600px] w-full"
            >
              <Image
                src={image}
                alt={`Product ${index + 1}`}
                className="h-full w-full max-w-full object-cover"
              />
            </div>
          ))}
        </Flickity>
      </div>

      <div className="mt-4">
        <Flickity
          flickityRef={(c) => {
            setThumbFlickity(c);
          }}
          options={thumbCarouselOptions}
          className="thumb-carousel"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`mx-4 h-24 w-24 cursor-pointer ${
                selectedIndex === index ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => {
                if (mainFlickity) mainFlickity.select(index);
              }}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Flickity>
      </div>
    </div>
  );
};

export default ImageSlider;
