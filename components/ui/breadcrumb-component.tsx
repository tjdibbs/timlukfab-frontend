'use client';

import { SlashIcon } from '@radix-ui/react-icons';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BreadCrumbLink } from '@/lib/types';
import { Fragment } from 'react';

const BreadCrumbComponent = ({ links }: { links: BreadCrumbLink[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => {
          return (
            <Fragment key={link.id}>
              {link.isPage ? (
                <BreadcrumbItem key={link.id}>
                  {' '}
                  <BreadcrumbPage className='text-sm font-semibold uppercase text-black'>
                    {link.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <Fragment>
                  <BreadcrumbItem key={link.id}>
                    {link.isClickable === false ? (
                      <BreadcrumbPage className='text-sm font-semibold uppercase text-black'>
                        {link.name}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={link.href}
                        className='text-sm font-semibold uppercase text-[#777] hover:text-black/60'
                      >
                        {link.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                </Fragment>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbComponent;
