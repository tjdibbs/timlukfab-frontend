'use client';

import ReactDOM from 'react-dom';

export const PreloadResources = () => {
  ReactDOM.preload('/identity/logo.png', { as: 'image' });
  return null;
};

export const PreloadContactResources = () => {
  ReactDOM.preload('/images/contact-us.jpg', { as: 'image' });
  return null;
};
