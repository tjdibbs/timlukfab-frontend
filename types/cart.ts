export namespace CartController {
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
    };

    export interface ProductSize {
        id: number;
        productId: number;
        sizeId: number;
        stock: number;
        additionalPrice: string;
        createdAt: string;
        updatedAt: string;
    };

    export interface ProductColor {
        id: number;
        productId: number;
        colorId: number;
        stock: number;
        additionalPrice: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    };

    export interface CartItem {
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
        productColorId?: number;
        productSizeId?: number;
    }

    export interface UpdateItem {
        cartItemId: number;
        updateData: AddItem;
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