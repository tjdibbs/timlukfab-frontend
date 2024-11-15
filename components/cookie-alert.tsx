'use client';

import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import Cookies from 'js-cookie';

export default function CookieAlert() {
  const [show, setShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    let visited = Cookies.get('_v');
    var timeout = setTimeout(() => {
      if (!visited) {
        setShow(true);
        Cookies.set('_v', 'true', { expires: 365 * 10 });
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'just', duration: 0.8 } as Transition}
          className='fixed bottom-0 right-0 z-50 w-[500px] max-w-[100vw] bg-white'
        >
          <div className='bg-primary-low/20 p-4'>
            <p className='mb-2 text-sm'>
              We use cookies to personalize information and make you have better
              experience on the site. Your personal information are safe with
              us. We use cookies to personalize content and ads, to provide
              social media features and to analyze our traffic
            </p>
            <div className='actions-group flex justify-end text-primary'>
              <Button
                variant={'contained'}
                color='inherit'
                className='!bg-primary-low text-white'
                onClick={() => setShow(false)}
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
