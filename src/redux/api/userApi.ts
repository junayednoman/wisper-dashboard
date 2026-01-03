import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "/auths",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
