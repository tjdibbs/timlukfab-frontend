export namespace AddressController {
    export interface Address {
        id: number;
        streetAddress: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        isDefault: boolean;
        userId: number;
        updatedAt: string;
        createdAt: string;
    }

    export interface GET {
        addresses: Address[];
        success: boolean
    }

    export interface DELETE {
        message: string
    }

    export interface AddNew {
        fullName: string;
        streetAddress: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phoneNumber: string;
        isDefault: boolean;
    }

    export type POST = Address
    export type PUT = Address
    export type PATCH = Address

}