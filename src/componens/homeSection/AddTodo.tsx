"use client";
import { FC } from "react";
import scss from "./AddTodo.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostTodoMutation } from "@/redux/api/todo";
import { usePostUplaudMutation } from "@/redux/api/file";

const AddTodo: FC = () => {
  const { register, handleSubmit } = useForm<ITodo>();
  const [postTodo] = usePostTodoMutation();
  const [uploud] = usePostUplaudMutation();
  const onSubmit: SubmitHandler<ITodo> = async (data) => {
    const file = data.file![0]!;
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseImage } = await uploud(formData);
    console.log(responseImage);

    const newDate = {
      title: data.title,
      img: responseImage?.url!,
    };
    console.log(newDate, "newData");

    const { data: res } = await postTodo(newDate);
    console.log(res, "res");
  };
  return (
    <section className={scss.AddTodo}>
      <div className="container">
        <div className={scss.content}>
          <h1>AddTodo</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title", { required: true })} />
            <input type="file" {...register("file", { required: true })} />
            <button type="submit">AddProduct</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTodo;
