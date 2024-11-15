export namespace Globals {
  export interface Error {
    name: string;
    message: string;
    statusCode: number;
    path: string;
    method: string;
  }

  export interface ActionResponse<T> {
    success: boolean;
    message: string;
    data?: T | null;
  }

  export interface TokenResponse {
    renewed: boolean;
    accessToken: string;
  }
}
