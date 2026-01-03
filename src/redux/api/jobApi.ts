import { baseApi } from "./baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => ({
        url: "/jobs",
        method: "GET",
        params,
      }),
      providesTags: ["job"],
    }),
  }),
});

export const { useGetJobsQuery } = jobApi;
