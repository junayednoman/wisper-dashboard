import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { logOut, setUser } from "../slice/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const wisperAccessToken = Cookies.get("wisperAccessToken");

    // If user have a token set it in the state
    if (wisperAccessToken) {
      headers.set("authorization", `Bearer ${wisperAccessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log("hitting logout 0");
  let result = await baseQuery(args, api, extraOptions);

  // retrieve new token
  if (result?.error?.status === 401) {
    console.log("hitting logout 1");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/refresh-token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    ).then((res) => res.json());

    if (res?.data?.accessToken) {
      console.log("hitting logout 2");
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("hitting logout 3");
      api.dispatch(logOut());
    }
  }
  console.log('hitting here 4');
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "auth",
    "dashboard",
    "user",
    "complaint",
    "job",
    "posts",
    "community",
    "group",
    "class",
    "recommendation",
    "resumes",
    "packages",
    "notifications",
    "legal",
    "profile",
  ],
  endpoints: () => ({}),
});
