import "./TodoList.scss";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
    todos: { text: string; isCompleted: boolean }[];
    completeTodo: (index: number) => void;
    removeTodo: (index: number) => void;
}

const TodoList = ({ todos, completeTodo, removeTodo }: TodoListProps) => {
    return (
        <div className="todo-list">
            {todos.map((todo, index) => (
                <TodoItem
                    key={index}
                    index={index}
                    todo={todo.text}
                    isCompleted={todo.isCompleted}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;
