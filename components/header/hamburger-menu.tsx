import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import clsx from 'clsx';
import { useAppSelector } from '@/lib/redux/store';
import { usePathname } from 'next/navigation';
import LogoutButton from '../account/logoutButton';
import {
  FacebookFilled,
  InstagramFilled,
  TikTokOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useMemo } from 'react';

const protectedLinks = [
  {
    name: 'Account',
    path: '/account',
  },
  {
    name: 'Orders',
    path: '/account/orders',
  },
  {
    name: 'Wishlist',
    path: '/account/wishlist',
  },
  {
    name: 'Addresses',
    path: '/account/addresses',
  },
];

const guestLinks = [
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Register',
    path: '/register',
  },
];

const HamburgerMenu = () => {
  const auth = useAppSelector(state => state.auth.token);

  const links = useMemo(() => {
    return auth ? protectedLinks : guestLinks;
  }, [auth]);

  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className={cn('lg:hidden')}>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className={cn('grid grid-rows-[1fr_auto]')}>
        <div className='py-8'>
          <ul>
            {links.map(link => (
              <li key={link.name}>
                <SheetClose asChild>
                  <Link
                    href={link.path}
                    className={clsx(
                      'block cursor-pointer border-b px-3 py-4 text-[0.85rem] font-semibold uppercase transition-all delay-200 ease-linear hover:bg-gray-100',
                      { 'bg-gray-100': pathname === link.path }
                    )}
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
            {auth && (
              <li>
                <SheetClose asChild>
                  <LogoutButton
                    className={cn(
                      'block w-full cursor-pointer border-b px-3 py-4 text-left text-[0.85rem] font-semibold uppercase transition-all delay-200 ease-linear hover:bg-gray-100'
                    )}
                    text='Logout'
                  />
                </SheetClose>
              </li>
            )}
          </ul>
        </div>

        <SheetFooter>
          <footer className='flex items-center gap-4 p-3'>
            <a
              href='https://www.tiktok.com/@timlukcollections'
              target='_blank'
              rel='noopener noreferrer'
            >
              <TikTokOutlined style={{ fontSize: '1.25rem', color: '#808080' }} />
            </a>

            <a
              href='https://www.instagram.com/timlukfabcollections/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <InstagramFilled style={{ fontSize: '1.25rem', color: '#808080' }} />
            </a>

            <a
              href='https://www.facebook.com/profile.php?id=61569794955996&mibextid=ZbWKwL'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FacebookFilled style={{ fontSize: '1.25rem', color: '#808080' }} />
            </a>
            <a href="mailto:info@timlukfab.com">
              <MailOutlined style={{ fontSize: '1.25rem', color: '#808080' }} />
            </a>
          </footer>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default HamburgerMenu;
