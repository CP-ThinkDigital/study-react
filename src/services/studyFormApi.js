/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studyFormApi = createApi({
  reducerPath: "studyFormApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  // query    - get endponits
  // mutation -post endpoints
  endpoints: (build) => ({
    getData: build.query({
      query: () => ({
        url: "todos",
        method: "GET",
      }),
    }),
    getDataById: build.query({
      query: (id) => ({
        url: `todos/${id}`,
        method: "GET",
      }),
    }),
    postData: build.mutation({
      query: (data) => ({
        url: "posts",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const { useGetDataQuery, useGetDataByIdQuery, usePostDataMutation } =
  studyFormApi;

// export const { endpoints, reducerPath, reducer, middleware } = studyFormApi
// reducerPath, reducer, middleware are only used in store configuration
