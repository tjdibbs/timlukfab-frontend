export namespace ReviewsController {

    export interface AddReview {
        productId: number;
        text: string;
        rating?: number;
        parentId?: number;
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
        ProductMedia: {
            productId: number;
            fileId: number;
            createdAt: string;
            updatedAt: string;
        };
    }

    interface Product {
        id: number;
        name: string;
        price: string;
        medias: Media[];
    }

    interface User {
        id: number;
        firstName: string;
        lastName: string;
        imageUrl: string | null;
        gender: string;
    }

    export interface Review {
        id: number;
        productId: number;
        userId: number;
        text: string;
        rating: string;
        parentId: number | null;
        level: number;
        createdAt: string;
        updatedAt: string;
        user: User;
        product: Product;
        replies: Review[];
    }



    export interface GET {
        result: {
            reviews: Review[],
            count: number,
            hasMore: false
            pageNumber: number;
            pageSize: number;
        }
        success: boolean
    }

    export interface PUT {
        review: Review
        success: boolean
    }

    export interface PATCH {
        updatedReview: Review;
        success: boolean;
    }

    export interface DELETE {
        success: boolean;
    }
}