import { api as index } from "..";

const ENDPOINT = "https://api.elchocrud.pro/api/v1/6850f-d3e6d-2fded/zweitodo";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TODO.getTodoRes, TODO.getTodoReq>({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: builder.mutation<TODO.postTodoRes, TODO.postTodoReq>({
      query: (data) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation<TODO.deleteTodoRes, TODO.deleteTodoReq>({
      query: (_id) => ({
        url: `${ENDPOINT}/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    editTodo:builder.mutation<TODO.editTodoRes,TODO.editTodoReq>({
        query:({data,_id})=>({
            url:`${ENDPOINT}/${_id}`,
            method:"PATCH",
            body:data
        }),
        invalidatesTags:["todo"]
    })

  }),
});

export const { useGetTodosQuery, usePostTodoMutation,useDeleteTodoMutation,useEditTodoMutation } = api;
