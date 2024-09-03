export namespace UserController {
    interface UserContact {
        text: string;
        country: string;
        isoCode: string;
        dialingCode: string;
    }

    export interface User {
        fullName: string;
        id: number;
        userType: string;
        firstName: string;
        lastName: string;
        imageUrl: string | null;
        gender: string;
        contactId: number;
        country: string;
        email: string;
        createdAt: string;
        updatedAt: string;
        contact: UserContact;
        verified: boolean;
    }

    export interface Get {
        users: {
            users: User[],
            count: number,
            hasMore: boolean
        },
        success: true
    }
}