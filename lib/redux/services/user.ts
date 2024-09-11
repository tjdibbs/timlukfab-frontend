import { User } from "@/lib/types";
import { api } from "../api";

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<User, string>({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: "GET"
            }),
            providesTags: ["User"],
        }),

    }),

})

export const { useGetUserQuery } = userApi
export default userApi