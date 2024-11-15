import { ReactNode } from 'react';
import AccountHeader from './header';
import Sidebar from './sidebar';

type Props = {
  children: ReactNode;
};

export default function AccountLayout({ children }: Props) {
  return (
    <section>
      <AccountHeader />
      <div className='wrapper py-6 lg:grid lg:grid-cols-12'>
        <Sidebar />
        <div className='col-span-9 lg:px-4'>{children}</div>
      </div>
    </section>
  );
}
