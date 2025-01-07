'use client';

import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className='fixed left-0 top-0 z-[9999999999] grid h-screen w-full place-items-center bg-black/20'>
      <Spin size='large' />
    </div>
  );
};
export default Loading;
