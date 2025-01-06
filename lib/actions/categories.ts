'use server';

import { CategoryController } from '@/types/categories';

export const getCategories = async () => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/categories?pageSize=25`,
    {
      next: { revalidate: 100, tags: ['Categories'] },
    }
  );

  const data = await res.json();
  return data as CategoryController.Get;
};

export const getCategoryProducts = async ({
  id,
  pageNumber,
}: {
  id: string;
  pageNumber?: string;
}) => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/categories/${id}/products?pageSize=20&pageNumber=${pageNumber || '1'}`,
    {
      next: { revalidate: 100, tags: ['Products'] },
    }
  );

  const data = await res.json();
  return data as CategoryController.GetProducts;
};

export const getSingleCategory = async (id: string) => {
  const res = await fetch(`${process.env.API_BASE_URL}/categories/${id}`, {
    next: { revalidate: 100 },
  });

  const data = await res.json();
  return data as CategoryController.GetSingle;
};
