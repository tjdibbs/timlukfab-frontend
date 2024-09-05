export namespace ProductController {
    interface ProductSize {
        productId: number;
        sizeId: number;
        stock: number;
        additionalPrice: string;
        createdAt: string;
        updatedAt: string;
    }

    interface Size {
        id: number;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        ProductSize: ProductSize;
    }

    interface ProductColor {
        productId: number;
        colorId: number;
        stock: number;
        additionalPrice: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    }

    interface Color {
        id: number;
        name: string;
        hexCode: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        ProductColor: ProductColor;
    }

    interface ProductSubcategory {
        productId: number;
        subcategoryId: number;
        createdAt: string;
        updatedAt: string;
    }

    interface Subcategory {
        id: number;
        name: string;
        description: string;
        imageId: number;
        bannerId: number | null;
        categoryId: number;
        createdAt: string;
        updatedAt: string;
        ProductSubcategory: ProductSubcategory;
    }


    interface ProductCategory {
        productId: number;
        categoryId: number;
        createdAt: string;
        updatedAt: string;
    }

    interface Category {
        id: number;
        name: string;
        description: string;
        imageId: number;
        bannerId: number | null;
        createdAt: string;
        updatedAt: string;
        ProductCategory: ProductCategory;
    }

    interface ProductMedia {
        productId: number;
        fileId: number;
        createdAt: string;
        updatedAt: string;
    }

    interface Media {
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
        medias: Media[];
        categories: Category[];
        subcategories: Subcategory[];
        colors: Color[];
        sizes: Size[];
    }
    export interface Get {
        result: {
            products: Product[],
            count: number,
            hasMore: boolean,
        },
        success: boolean,
    }

    export interface GetSingle {
        product: Product,
        success: boolean,
    }

    export interface Put {
        product: Product;
        success: boolean;
    }

    export interface Patch {
        product: Product;
        success: boolean
    }
}