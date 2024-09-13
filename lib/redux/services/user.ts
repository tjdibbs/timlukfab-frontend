
import { UserController } from "@/types/users";
import { api } from "../api";

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<UserController.User, string>({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: "GET"
            }),
            transformResponse: (response: UserController.GetSingle) => response.user,
            providesTags: ["User"],
        }),

    }),
    overrideExisting: false

})

export const { useGetUserQuery } = userApi
export default userApi