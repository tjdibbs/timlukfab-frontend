import { ProductController } from "./products";

export namespace SubCategoryController {
    interface CategoryImage {
        id: number;
        filename: string;
        originalName: string;
        mimeType: string;
        path: string;
        size: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    };

    interface NestedCategory {
        id: number;
        name: string;
        description: string | null;
        imageId: number;
        bannerId: number | null;
        createdAt: string;
        updatedAt: string;
    };

    export interface Category {
        id: number;
        name: string;
        description: string | null;
        imageId: number;
        bannerId: number | null;
        categoryId: number;
        createdAt: string;
        updatedAt: string;
        image: CategoryImage;
        banner: CategoryImage | null;
        category: NestedCategory;
    };

    export interface Get {
        result: {
            subcategories: Category[],
            count: number,
            hasMore: boolean,
            pageSize: string,
            pageNumber: string;
        },
        success: boolean
    }

    export interface GetProducts {
        result: {
            products: ProductController.Product[],
            count: number,
            hasMore: boolean,
            pageSize: string,
            pageNumber: string;
        }
    }

    export interface GetSingle {
        category: Category;
        success: boolean;
    }
}