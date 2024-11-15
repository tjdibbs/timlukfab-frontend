import { StaticImageData } from 'next/image';
export interface ErrorResponse {
  status: number;
  data: {
    name: string;
    message: string;
    statusCode: number;
    path: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  };
}

type UserContact = {
  text: string;
  country: string;
  isoCode: string;
  dialingCode: string;
};

export type User = {
  fullName: string;
  id: number;
  userType: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  gender: string;
  contactId: number;
  country: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  contact: UserContact;
  verified: boolean;
};

export type RegisterResponse = {
  message: string;
  token: string;
  refreshToken: string;
  user: User;
};

export type CartItem = {
  id: string;
  productId: string | number;
  quantity: number;
  size: string;
  price: number;
  title: string;
  image: string | StaticImageData;
};

export type AuthCredentials = {
  id: number | null;
  token: string | null;
  refreshToken: string | null;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type BreadCrumbLink = {
  id: number;
  name: string;
  href: string;
  isPage: boolean;
  isClickable?: boolean;
};
