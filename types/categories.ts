export namespace CategoryController {
    export interface Get {
        result: {
            categories: [],
            count: number,
            hasnore: boolean
        },
        success: boolean
    }
}