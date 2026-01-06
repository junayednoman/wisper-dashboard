import { baseApi } from "./baseApi";

const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: (params) => ({
        url: "/groups",
        method: "GET",
        params,
      }),
      providesTags: ["group"],
    }),
    getClasses: builder.query({
      query: (params) => ({
        url: "/classes",
        method: "GET",
        params,
      }),
      providesTags: ["class"],
    }),
    getCommunityMembers: builder.query({
      query: ({ id, params }) => ({
        url: `/groups/members/${id}`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetClassesQuery,
  useGetCommunityMembersQuery,
} = communityApi;
