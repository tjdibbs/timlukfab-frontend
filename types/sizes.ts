export namespace SizesController {
    export interface Size {
        id: number;
        name: string;
        description: string;
        createdAt: string;
    }

    export interface Put {
        size: Size;
        success: boolean;
    }
}