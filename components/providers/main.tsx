'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import Header from '../header';
import { Toaster } from 'react-hot-toast';
import AppFooter from '../footer';

const App = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <SnackbarProvider maxSnack={3}>
        <Toaster />
        <section>
          <Header />
          <main className='bg-white'>{children}</main>
          <AppFooter />
        </section>
      </SnackbarProvider>
    </AntdRegistry>
  );
};

export default App;
