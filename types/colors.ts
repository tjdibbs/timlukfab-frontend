export namespace ColorsController {
    export interface Color {
        id: number;
        name: string;
        description: string;
        hexCode: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    }

    export interface Get {
        result: {
            colors: Color[],
            count: number,
            hasMore: boolean
        },
        success: boolean
    }

    export interface Put {
        color: Color;
        success: boolean;
    }

    export interface GetSingle {
        color: Color;
        success: boolean;
    }

    export interface Patch {
        color: Color;
        success: boolean;
    }

    export interface Delete {
        success: boolean;
    }
}