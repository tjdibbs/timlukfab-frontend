export namespace Globals {
    export interface Error {
        name: string,
        message: string,
        statusCode: number,
        path: string;
        method: string;
    }
}