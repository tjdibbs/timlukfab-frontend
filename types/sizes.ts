
export namespace SizesController {
    export interface Size {
        id: number;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    }

    export interface Put {
        size: Size;
        success: boolean;
    }

    export interface Get {
        result: {
            sizes: Size[],
            count: number,
            hasMore: boolean
        },
        success: boolean
    }

    export interface GetSingle {
        size: Size;
        success: boolean;
    }

    export interface Patch {
        size: Size;
        success: boolean;
    }

    export interface Delete {
        success: boolean;
    }

}