export namespace FileController {
    export interface File {
        id: number;
        filename: string;
        originalName: string;
        mimeType: string;
        path: string;
        size: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    }

    export interface Post {
        success: boolean;
        files: File[]
    }

    export interface Get {
        success: boolean;
        result: {
            files: File[];
            count: number;
            hasMore: boolean;
            pageSize: string,
            pageNumber: string;
        }
    }

    export interface GetSingle {
        success: boolean;
        file: File;
    }

    export interface Delete {
        success: boolean;
        message: string;
    }
}