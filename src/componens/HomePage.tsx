import React from 'react';
import AddTodo from './homeSection/AddTodo';
import TodoList from './homeSection/TodoList';

const HomePage = () => {
    return (
        <div>
            <AddTodo/>
            <TodoList/>
        </div>
    );
};

export default HomePage;