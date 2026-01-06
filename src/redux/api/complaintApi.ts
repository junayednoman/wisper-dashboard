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
    resolveComplaint: builder.mutation({
      query: (id) => ({
        url: `/complaints/status/${id}`,
        method: "PATCH",
        body: {
          status: "RESOLVED",
        },
      }),
      invalidatesTags: ["complaint"],
    }),
  }),
});

export const { useGetComplaintsQuery, useResolveComplaintMutation } =
  complaintApi;
