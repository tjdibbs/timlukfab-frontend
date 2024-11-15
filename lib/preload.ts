'use client';

import ReactDOM from 'react-dom';

export const PreloadResources = () => {
  ReactDOM.preload('/identity/logo.png', { as: 'image' });
  return null;
};
