import { FormEvent, useState } from "react";
import "./TodoForm.scss";

interface TodoFormProps {
    // TODO: Add a body arg?
    addTodo: (text: string) => void;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
    const [todo, setTodo] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todo.trim()) {
            addTodo(todo);
            setTodo("");
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                className="todo-form__input"
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button className="todo-form__button" type="submit">
                Add Todo
            </button>
        </form>
    );
};

export default TodoForm;
