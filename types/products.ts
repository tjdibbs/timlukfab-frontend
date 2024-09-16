export namespace ProductController {


    interface ProductSizeDetails {
        additionalPrice: string;
        stock: number;
    }

    export interface Size {
        id: number;
        name: string;
        ProductSize: ProductSizeDetails;
    }

    interface ProductColorDetails {
        additionalPrice: string;
        stock: number;
    }

    export interface Color {
        id: number;
        name: string;
        hexCode: string;
        ProductColor: ProductColorDetails;
    }

    export interface Subcategory {
        id: number;
        name: string;
        description: string;
    }

    export interface Category {
        id: number;
        name: string;
        description: string;
    }

    export interface Media {
        id: number;
        size: number;
        path: string;
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
        colors: Color[];
        sizes: Size[];
        subcategories: Subcategory[];
        categories: Category[];
    }

    export interface Get {
        result: {
            products: Product[],
            count: number,
            hasMore: boolean,
            pageSize: string,
            pageNumber: string;
        },
        success: boolean,
    }

    export interface GetSingle {
        product: Product,
        success: boolean,
    }
}