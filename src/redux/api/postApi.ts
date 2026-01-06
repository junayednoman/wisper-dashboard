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
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/status/${id}`,
        method: "PATCH",
        body: {
          status: "DELETED",
        },
      }),
      invalidatesTags: ["posts", "complaint"],
    }),
  }),
});

export const { useGetPostsQuery, useDeletePostMutation } = postApi;
