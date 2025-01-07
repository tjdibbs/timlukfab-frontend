export namespace BannerController {
    export interface File {
        id: number;
        filename: string;
        originalName: string;
        mimeType: string;
        path: string;
        size: number;
        createdAt: string;
        updatedAt: string;
        deletedAt?: any;
    }

    export interface Banner {
        id: number;
        title: string;
        description: string;
        pathname: string;
        fileId: number;
        createdAt: string;
        updatedAt: string;
        deletedAt?: any;
        file: File;
    }

    export interface Result {
        banners: Banner[];
        count: number;
        hasMore: boolean;
        pageSize: string;
        pageNumber: string;
    }

    export interface GET {
        result: Result;
        success: boolean;
    }
}