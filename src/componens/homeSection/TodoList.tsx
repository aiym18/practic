"use client";
import { FC, useState } from "react";
import scss from "./TodoList.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/redux/api/todo";
import { usePostUplaudMutation } from "@/redux/api/file";

const TodoList: FC = () => {
  const { register, handleSubmit, setValue } = useForm<ITodo>();
  const { data } = useGetTodosQuery();

  const [edit, setEdit] = useState<null | number>(null);
  const [postUplaud] = usePostUplaudMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const onSubmit: SubmitHandler<ITodo> = async (data) => {
    let imgUrl = data.img || "";
    if (data.file && data.file[0]) {
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);

      const { data: responseImage } = await postUplaud(formData);
      imgUrl = responseImage?.url!;
    }

    const updatedData = {
      title: data.title,
      img: imgUrl,
    };

    await editTodo({ _id: edit!, data: updatedData });
    setEdit(null);
  };

  return (
    <section className={scss.TodoList}>
      <div className="container">
        <div className={scss.content}>
          <h1>TodoList</h1>
          {data?.map((el) =>
            edit === el._id ? (
              <div key={el._id} className={scss.list}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                  />
                  <input type="file" {...register("file")} />
                  <input type="hidden" {...register("img")} value={el.img} />
                  <button type="submit">send</button>
                </form>
              </div>
            ) : (
              <div key={el._id} className={scss.top}>
                <h4>{el.title}</h4>
                <img
                  style={{ width: 200, height: 300 }}
                  src={el.img}
                  alt="img"
                />

                <div className={scss.btn}>
                  <button onClick={() => deleteTodo(el._id!)}>delete</button>
                  <button
                    onClick={() => {
                      setEdit(el._id!);
                      setValue("title", el.title);
                      setValue("img", el.img);
                    }}
                  >
                    edit
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TodoList;
