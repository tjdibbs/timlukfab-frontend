export namespace ReviewsController {

    export interface AddReview {
        productId: number;
        text: string;
        rating: number;
        parentId: number;
    }

    export interface GET {
        result: {
            reviews: [],
            count: 0,
            hasMore: false
            pageNumber: number;
            pageSize: number;
        }
        success: boolean
    }
}