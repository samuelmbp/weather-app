import { Todo } from "../../types/todo";
import "./TodaysGoal.scss";

interface TodaysGoalProps {
    todos: Todo[];
}

const TodaysGoal = ({ todos }: TodaysGoalProps) => {
    return (
        <div className="todays-goal">
            <h2 className="todays-goal__heading">
                What is your main goal for today?
            </h2>
            <p className="todays-goal__quote">
                When you wake up in the morning you have two choices: go back to
                sleep, or wake up and chase those dreams.
            </p>
            {todos.length > 0 ? (
                <h2 className="todays-goal__todo-heading">
                    Todos{" "}
                    <span className="todays-goal__todo-length">
                        ({todos.length})
                    </span>
                </h2>
            ) : (
                <h2 className="todays-goal__todo-heading">Todos</h2>
            )}
        </div>
    );
};

export default TodaysGoal;
