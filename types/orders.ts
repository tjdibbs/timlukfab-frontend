export namespace OrderController {
  export interface Order {
    id: number;
    userId: number;
    orderNote: string;
    status: string;
    paymentStatus: string;
    totalAmount: string;
    discountAmount: string;
    shippingFee: string;
    subTotal: string;
    shippingAddressId: number;
    billingAddressId: number;
    paymentMethod: string;
    paymentRef: string;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];
    user: User;
    shippingAddress: Address;
    billingAddress: Address;
  }

  export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    productColorId: number;
    productSizeId: number;
    price: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    product: Product;
    productSize: ProductSize;
    productColor: ProductColor;
  }

  interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    discount: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    medias: Media[];
  }

  interface Media {
    id: number;
    path: string;
    size: number;
  }

  interface ProductSize {
    id: number;
    stock: number;
    additionalPrice: string;
    size: Size;
  }

  interface Size {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  interface ProductColor {
    id: number;
    stock: number;
    additionalPrice: string;
    color: Color;
  }

  interface Color {
    id: number;
    name: string;
    hexCode: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  interface User {
    firstName: string;
    lastName: string;
    id: number;
    imageUrl: string | null;
    gender: string;
  }

  interface Address {
    id: number;
    userId: number;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export interface Create {
    shippingAddressId: number;
    billingAddressId: number;
    paymentMethod: string;
    orderNote?: string;
    discountAmount: number;
    shippingFee: number;
    paymentRef: string;
    excludeItems: number[];
  }

  export interface POST {
    order: Order;
    success: boolean;
  }

  export interface GET {
    orders: Order[];
    pageNumber: number;
    pageSize: number;
    hasMore: boolean;
    count: number;
  }
}
