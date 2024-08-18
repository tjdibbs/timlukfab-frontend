import { sort } from "@comp/filter";

export type FilterState = {
  availability: string;
  price: {
    min: number;
    max: number;
  };
  color: string;
  size: number;
  type: string;
};

export type State = {
  availability: string;
  price: { max: number; min: number };
  size: number | null;
  color: string | null;
  type: string | null;
  sort: keyof typeof sort;
};

export type Product = {
  id: string;
  userid: string;
  rating: number;
  reviews?: object[];
  image: string;
  images: string;
  thumbnail?: string;
  sold: number;
  sizes: string;
  colors: string;
  createdAt: string;
} & Omit<FormDataType, "frontImage" | "backImage" | "additionalImage">;

export type ProductProp = {
  item: Product;
};

export interface SavedAddress {
  city: string;
  state: string;
  country: string;
  address: string;
  phone: string;
}
export type OrderType = CheckoutInterface<CartInterface> &
  SavedAddress & {
    name: string;
    email: string;
    paymentMethod: "pay-on-delivery" | "transfer";
    amount?: number;
    update?: boolean;
    subscribe: boolean;
    create: boolean;
    other: string;
    agree: boolean;
    additionalInformation: string;
    order_number: number;
  };

export type FormDataType = {
  title: string;
  price: number | string;
  description: string;
  discountPercentage: number;
  frontImage: File;
  backImage: File;
  additionalImages: File[];
  brand: string;
  stock: number;
  category: string;
  sizes: { [x: string]: string | number };
  colors: { [x: string]: string | number };
};

export type FileType = {
  _id: string;
  filename: string;
  type: string;
  views?: number;
};

export type Response = Partial<{
  success: boolean | null;
  loading: boolean;
  message: string;
  uploaded: boolean;
  error: string;
}>;

export interface RouterQuery {
  brand: string;
  sort: string;
  categories: string;
  colors: string;
  availability: string;
  sizes: string;
  price: string;
}

export type AppState = {
  mode: "light" | "dark";
  theme: "default" | "light" | "dark";
  cart: Partial<CartInterface>[];
  wishlist: string[];
  device: "mobile" | "desktop";
  loggedIn: boolean;
  user?: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    image: string;
    admin: boolean;
    cart: string[];
    wishlist: string[];
    verified: boolean;
  } | null;
};

export interface CartInterface {
  id: string;
  user: string;
  product: Partial<{
    id: string;
    title: string;
    price: number | string;
    image: string;
    discountPercentage: number | null;
    stock: number;
    sold: number;
  }>;
  quantity: number;
  sizes: (string | number)[];
  colors: string[];
}

export interface CheckoutInterface<T> {
  cart: T[];
  subtotal: number;
  discount: number;
  total: number;
}
