import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    postUplaud: builder.mutation<FILE.postUplaudRes, FILE.postUplaudReq>({
      query: (data) => ({
        url: "https://api.elchocrud.pro/api/v1/upload/file",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const { usePostUplaudMutation } = api;
