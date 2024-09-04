export namespace CategoryController {
    interface Image {
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

    export interface SubCategory {
        id: number;
        name: string;
        description: string;
        imageId: number;
        bannerId: number | null;
        categoryId: number;
        createdAt: string;
        updatedAt: string
    }

    export interface Category {
        id: number;
        name: string;
        description?: string;
        imageId: number;
        bannerId: number | null;
        createdAt: string;
        updatedAt: string;
        image: Image;
        banner: Image | null;
        subcategories: SubCategory[];
    }
    export interface Get {
        result: {
            categories: Category[],
            count: number,
            hasMore: boolean
        },
        success: boolean
    }

    export interface PUT {
        category: Category;
        success: boolean;
    }

    export interface GetSingle {
        category: Category;
        success: boolean;
    }

    export interface Patch {
        category: Category;
        success: boolean;
    }

    export interface Delete {
        success: boolean;
    }
}