export namespace CartController {
    export interface Media {
        id: number;
        path: string;
        size: number;
    }

    export interface Size {
        id: number;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    }

    export interface Color {
        id: number;
        name: string;
        hexCode: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    }

    export interface Product {
        id: number;
        name: string;
        description: string;
        price: string;
        discount: string;
        stock: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        medias: Media[]
    };

    export interface ProductSize {
        id: number;
        stock: number;
        additionalPrice: string;
        size: Size;
    }

    export interface ProductColor {
        id: number;
        stock: number;
        additionalPrice: string;
        color: Color;
    }

    export interface CartItem {
        id: number;
        cartId: number;
        productId: number;
        quantity: number;
        price: string;
        createdAt: string;
        updatedAt: string;
        product: Product;
        productSize: ProductSize;
        productColor: ProductColor;
    };

    export interface Cart {
        id: number;
        userId: number;
        checkout: boolean;
        createdAt: string;
        updatedAt: string;
        cartItems: CartItem[];
    };

    export interface CartItemDetail {
        id: number;
        cartId: number;
        productId: number;
        quantity: number;
        productColorId: number;
        productSizeId: number;
        price: string;
        createdAt: string;
        updatedAt: string;
        product: Product;
        productSize: ProductSize;
        productColor: ProductColor;
    }

    export interface UpdatedCartItem {
        id: number;
        cartId: number;
        productId: number;
        quantity: number;
        productColorId: number;
        productSizeId: number;
        price: string;
        createdAt: string;
        updatedAt: string;
        product: Product;
        productSize: ProductSize;
        productColor: ProductColor;
    };

    export interface AddItem {
        productId: number;
        quantity: number;
        productColorId: number;
        productSizeId: number;
    }

    export interface UpdateItem {
        cartItemId: number;
        productSizeId: number;
        quantity: number;
        productColorId: number;
    }

    export interface RemoveItem {
        cartItemId: number;
    }

    export interface ClearCart {
        cartId: number;
    }

    export interface Get {
        success: boolean;
        cart: Cart;
    };

    export interface Put {
        success: boolean;
        data: CartItemDetail;
    }

    export interface Patch {
        success: boolean;
        updatedCartItem: UpdatedCartItem;
    }

    export interface DeleteAll {
        success: boolean;
        message: string;
    }

}