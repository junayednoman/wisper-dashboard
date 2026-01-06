import { baseApi } from "./baseApi";

const resumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResumes: builder.query({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: "GET",
      }),
      providesTags: ["resumes"],
    }),
  }),
});

export const { useGetResumesQuery } = resumeApi;
