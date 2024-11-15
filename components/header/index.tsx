import Image from 'next/image';
import Link from 'next/link';
import HeaderWrapper, { CategoriesBar, HeaderActions, NavLinks } from './ui';
import Marquee from 'react-fast-marquee';

const Header = () => {
  return (
    <HeaderWrapper>
      <section className='bg-black text-center text-white'>
        <Marquee direction='left' className='py-2 text-sm' pauseOnHover={true}>
          Summer sales for all products and free express delivery{' '}
          <Link
            href='/shop'
            className='ml-2 inline-block font-semibold underline hover:text-primary'
          >
            Shop now!
          </Link>
        </Marquee>
      </section>
      <div className='wrapper flex items-center py-4'>
        <div className='flex-1'>
          <HeaderLogo />
        </div>
        <div className='flex-[2]'>
          <NavLinks />
        </div>
        <div className='flex-1'>
          <HeaderActions />
        </div>
      </div>
      <div className='bg-[#fefefe] pb-2'>
        <CategoriesBar />
      </div>
    </HeaderWrapper>
  );
};

export const HeaderLogo = () => {
  return (
    <Link href='/' className='block w-36 max-md:w-28'>
      <Image
        src='/identity/logo.png'
        alt='logo'
        height={50}
        width={50}
        priority
        className='w-full max-w-full'
      />
    </Link>
  );
};

export default Header;
