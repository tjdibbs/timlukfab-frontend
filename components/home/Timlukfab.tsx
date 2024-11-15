import product7 from '@/assets/images/products/product7.jpg';
import product8 from '@/assets/images/products/product8.jpg';
import product9 from '@/assets/images/products/product9.jpg';
import Image from 'next/image';

const reasons = [
  {
    image: product7,
    title: 'CHIC & INNOVATIVE FASHION',
    description:
      'Timlukfab is dedicated to fulfilling your style aspirations with exceptional service and affordable, accessible fashion for everyone.',
  },
  {
    image: product8,
    title: 'STAY CONNECTED & INSPIRED',
    description:
      'Discover creative ways to enhance your wardrobe, from office chic to weekend casual. Timlukfab has you covered with the latest trends and outfit inspiration!',
  },
  {
    image: product9,
    title: 'EVOLVING STYLE FOR ALL',
    description:
      'We cater to all styles, from trendy to timeless, casual to formal. Timlukfab offers fashionable, affordable, and readily available attire to meet your needs.',
  },
];

const Timlukfab = () => {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='wrapper space-y-12'>
        <h1 className='text-center text-2xl font-bold uppercase text-gray-800 max-md:text-xl'>
          Why Choose Timlukfab
        </h1>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {reasons.map(item => (
            <div
              key={item.title}
              className='flex flex-col items-center text-center'
            >
              <div className='mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-gray-300 shadow-lg'>
                <Image
                  src={item.image}
                  alt={item.title}
                  height={100}
                  width={100}
                  className='h-full w-full object-cover'
                />
              </div>
              <h2 className='mb-2 text-lg font-semibold text-gray-700 max-md:text-base'>
                {item.title}
              </h2>
              <p className='text-gray-600'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timlukfab;
