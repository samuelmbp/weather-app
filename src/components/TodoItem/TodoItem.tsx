import "./TodoItem.scss";

interface TodoItemProps {
    todo: string;
    index: number;
    completeTodo: (index: number) => void;
    removeTodo: (index: number) => void;
    isCompleted: boolean;
}

const TodoItem = ({
    todo,
    index,
    completeTodo,
    removeTodo,
    isCompleted,
}: TodoItemProps) => {
    const capitalizedTodo =
        todo.substring(0, 1).toUpperCase() + todo.substring(1);
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                className="todo-item__checkbox"
                onChange={() => completeTodo(index)}
                checked={isCompleted}
            />
            <span
                className={`todo-item__text ${
                    isCompleted ? "todo-item__text--completed" : ""
                }`}
            >
                {capitalizedTodo}
            </span>
            <button
                onClick={() => removeTodo(index)}
                className="todo-item__button"
            >
                Delete
            </button>
        </div>
    );
};

export default TodoItem;
