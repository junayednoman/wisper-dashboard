import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/auths/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getUsers: builder.query({
      query: (params) => ({
        url: "/auths",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),
    changeAccountStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/auths/change-account-status/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["user", "complaint"],
    }),
    getUserRecommendations: builder.query({
      query: (id) => ({
        url: `/recommendations/${id}`,
        method: "GET",
      }),
      providesTags: ["recommendation"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useChangeAccountStatusMutation,
  useGetSingleUserQuery,
  useGetUserRecommendationsQuery,
} = userApi;
