import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params) => ({
        url: `/notifications`,
        method: "GET",
        params
      }),
      providesTags: ["notifications"],
    }),
    seenNotifications: builder.mutation({
      query: (payload) => ({
        url: `/notifications/seen`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["notifications"],
    }),
    deleteNotifications: builder.mutation({
      query: (payload) => ({
        url: `/notifications`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {useGetNotificationsQuery, useSeenNotificationsMutation, useDeleteNotificationsMutation} = notificationApi;
