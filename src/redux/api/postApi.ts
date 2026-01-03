import { baseApi } from "./baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params) => ({
        url: "/posts/all",
        method: "GET",
        params,
      }),
      providesTags: ["posts"],
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
