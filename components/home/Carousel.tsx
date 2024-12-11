'use client';

import { Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '@/assets/images/banners/banner1.jpeg';
import banner3 from '@/assets/images/banners/banner3.jpeg';
import banner4 from '@/assets/images/banners/banner4.jpeg';
import banner5 from '@/assets/images/banners/banner5.jpeg';
import banner6 from '@/assets/images/banners/banner6.jpeg';
import banner7 from '@/assets/images/banners/banner7.jpeg';
import { Button } from '../ui/button';
import Link from 'next/link';

const banners = [
  {
    id: 2,
    image: banner1,
  },
  {
    id: 3,
    image: banner3,
  },
  {
    id: 4,
    image: banner4,
  },
  {
    id: 5,
    image: banner5,
  },
  {
    id: 6,
    image: banner6,
  },
  {
    id: 7,
    image: banner7,
  },
];

const Carousel = () => {
  return (
    <div className='relative'>
      <Swiper
        modules={[Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        loop={true}
        className='mySwiper'
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id}>
            <div className='relative z-0 h-[100vh] max-h-[600px] w-full overflow-hidden'>
              <Image
                src={banner.image}
                alt='Banner image'
                fill
                priority
                className='z-0 object-cover duration-1000 ease-linear hover:scale-125'
              />
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30'>
                <div className='p-4 text-center text-white space-y-8'>
                  <h2 className='text-4xl font-bold md:text-5xl'>
                    This is Editable
                  </h2>
                  <p className='md:text-xl max-w-4xl mx-auto'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas voluptates ratione repellendus voluptate at eaque
                    obcaecati cum dolorum ea vitae.
                  </p>
                  <Button className='' asChild>
                    <Link href='/shop'>Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
