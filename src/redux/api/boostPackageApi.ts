import { baseApi } from "./baseApi";

const boostPackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBoostPackage: builder.mutation({
      query: (payload) => ({
        url: `/boost-packages`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["packages"],
    }),
    getBoostPackages: builder.query({
      query: () => ({
        url: `/boost-packages`,
        method: "GET",
      }),
      providesTags: ["packages"],
    }),
    updateBoostPackage: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/boost-packages/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["packages"],
    }),
    deleteBoostPackage: builder.mutation({
      query: (id) => ({
        url: `/boost-packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["packages"],
    }),
  }),
});

export const { useGetBoostPackagesQuery , useCreateBoostPackageMutation, useUpdateBoostPackageMutation, useDeleteBoostPackageMutation} = boostPackageApi;
