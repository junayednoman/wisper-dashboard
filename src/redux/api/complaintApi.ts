import { baseApi } from "./baseApi";

const complaintApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComplaints: builder.query({
      query: (params) => ({
        url: "/complaints",
        method: "GET",
        params,
      }),
      providesTags: ["complaint"],
    }),
  }),
});

export const { useGetComplaintsQuery } = complaintApi;
