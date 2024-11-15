export namespace WishesController {
  export interface WishPut {
    id: number;
    userId: number;
    productId: number;
    description: string;
    updatedAt: string;
    createdAt: string;
  }

  export interface WishResult {
    wishes: Wish[];
    count: number;
    hasMore: boolean;
  }

  export interface Wish {
    id: number;
    description: string;
    productId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    user: User;
    product: Product;
  }

  export interface User {
    firstName: string;
    lastName: string;
    id: number;
    imageUrl: string | null;
    gender: string;
  }

  export interface Product {
    id: number;
    name: string;
    price: string;
    medias: Media[];
  }

  export interface Media {
    id: number;
    filename: string;
    originalName: string;
    mimeType: string;
    path: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    ProductMedia: ProductMedia;
  }

  export interface ProductMedia {
    productId: number;
    fileId: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface AddItem {
    productId: number;
    description: string;
  }

  export interface DeleteItem {
    productId: number;
    wishesId: number;
  }

  export interface GET {
    result: WishResult;
    success: boolean;
  }

  export interface PUT {
    success: boolean;
    wish: WishPut;
  }

  export interface DELETE {
    success: boolean;
  }
}
