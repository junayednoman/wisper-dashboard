import { baseApi } from "./baseApi";

const legalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLegal: builder.query({
      query: (params) => ({
        url: "/legal",
        method: "GET",
        params,
      }),
      providesTags: ["legal"],
    }),
    updateLegal: builder.mutation({
      query: (payload) => ({
        url: `/legal`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["legal"],
    }),
  }),
});

export const { useGetLegalQuery, useUpdateLegalMutation } = legalApi;
