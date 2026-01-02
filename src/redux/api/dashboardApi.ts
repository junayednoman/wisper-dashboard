import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: (params) => ({
        url: "/dashboard/stats",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
    getUserOverview: builder.query({
      query: (params) => ({
        url: "/dashboard/user-overview",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetUserStatsQuery, useGetUserOverviewQuery } = dashboardApi;
