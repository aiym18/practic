namespace TODO {
  type getTodoRes = ITodo[];
  type getTodoReq = void;
  type postTodoRes = ITodo[];
  type postTodoReq = ITodo;
  type deleteTodoRes = ITodo[];
  type deleteTodoReq = number;
  type editTodoRes = ITodo[];
  type editTodoReq = {
    _id: number;
    data: ITodo;
  };
}
