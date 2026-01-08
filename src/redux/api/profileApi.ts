import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (params) => ({
        url: "/admins/profile",
        method: "GET",
        params,
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `/admins`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {useGetProfileQuery, useUpdateProfileMutation} = profileApi;
