'use client';

import {
  FacebookFilled,
  InstagramFilled,
  MailOutlined,
  TikTokOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'react-feather';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAppSelector } from '@/lib/redux/store';
import { useMemo } from 'react';
import { useIsClient } from '@/hooks/useIsClient';

const links = [
  {
    id: 1,
    name: 'About Us',
    url: '/about-us',
  },
  {
    id: 2,
    name: 'Refund Policy',
    url: '/refund-policy',
  },
  {
    id: 3,
    name: 'Shipping',
    url: '/shipping',
  },
  {
    id: 4,
    name: 'Account',
    url: '/account',
  },
  {
    id: 5,
    name: 'Shop',
    url: '/shop',
  },
  {
    id: 6,
    name: 'Contact',
    url: '/contact',
  },
];

const AppFooter = () => {
  const auth = useAppSelector(state => state.auth.token);

  const isClient = useIsClient();

  const footerLinks = useMemo(() => {
    if (auth) {
      return links;
    }
    return links.map(link => {
      if (link.name === 'Account') {
        return {
          ...link,
          url: '/login',
          name: 'Login',
        };
      }
      return link;
    });
  }, [auth]);

  if (!isClient) return null;

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='wrapper pb-8 pt-16'>
        <div className='mb-12'>
          <h3 className='mb-4 text-2xl font-bold max-md:text-xl'>
            Join Our Community
          </h3>
          <p className='mb-6 text-gray-400'>
            Get 10% off your first order and be the first to get the latest
            updates on our promotion campaigns, products and services.
          </p>
          <form className='flex items-center gap-2 max-md:flex-col md:max-w-2xl'>
            <Input
              type='email'
              placeholder='Enter your email'
              className='h-12 w-full border-gray-700 bg-gray-800 text-white'
            />
            <Button className='h-12 border-none bg-white text-gray-900 hover:bg-gray-200 hover:text-gray-900 max-md:w-full'>
              Subscribe
            </Button>
          </form>
        </div>
        <div className='grid-cols-12 gap-12 max-md:space-y-12 md:grid'>
          <div className='col-span-7 max-md:col-span-12'>
            <Link
              href='/'
              className='block text-2xl font-bold uppercase tracking-wider text-white max-md:text-xl'
            >
              Timlukfab
            </Link>
            <p className='my-6 text-wrap text-gray-400'>
              The premier e-commerce destination for men and women's style
              combining the best brands that focus on craftsmanship and
              elegance.
            </p>
            <div className='space-y-4 text-gray-400'>
              <div className='flex items-center gap-3'>
                <MapPin className='w-5' />
                <span>North Hollywood, Los Angeles, California.</span>
              </div>
              <div className='flex items-center gap-3'>
                <Phone className='w-5' />
                <span>+1 (310) 702-4047</span>
              </div>
              <div className='flex items-center gap-3'>
                <Mail className='w-5' />
                <span>info@timlukfab.com</span>
              </div>
            </div>
            <div className='mt-8 flex items-center gap-6'>
              <a
                className='text-gray-400 transition-colors hover:text-white'
                href='https://www.tiktok.com/@timlukcollections'
                target='_blank'
                rel='noopener noreferrer'
              >
                <TikTokOutlined
                  style={{ fontSize: '1.25rem', color: '#808080' }}
                />
              </a>

              <a
                className='text-gray-400 transition-colors hover:text-white'
                href='https://www.instagram.com/timlukfabcollections/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <InstagramFilled
                  style={{ fontSize: '1.25rem', color: '#808080' }}
                />
              </a>

              <a
                className='text-gray-400 transition-colors hover:text-white'
                href='https://www.facebook.com/profile.php?id=61569794955996&mibextid=ZbWKwL'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FacebookFilled
                  style={{ fontSize: '1.25rem', color: '#808080' }}
                />
              </a>
              <a
                className='text-gray-400 transition-colors hover:text-white'
                href='mailto:info@timlukfab.com'
              >
                <MailOutlined
                  style={{ fontSize: '1.25rem', color: '#808080' }}
                />
              </a>
            </div>
          </div>
          <div className='col-span-5 mt-8 max-md:col-span-12 md:mt-0'>
            <h4 className='mb-6 text-xl font-semibold'>Quick Links</h4>
            <ul className='grid grid-cols-2 gap-4'>
              {footerLinks.map(link => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className='text-gray-400 transition-colors hover:text-white'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='mt-12 border-t border-gray-800 pt-6 text-center'>
          <p className='text-gray-500'>
            &copy; {new Date().getFullYear()} Timlukfab, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
