import { useEffect, useState } from "react";
import { Todo } from "../../types/todo";
import { quotes } from "../../data/quotes";
import "./TodaysGoal.scss";

interface TodaysGoalProps {
    todos: Todo[];
}

const TodaysGoal = ({ todos }: TodaysGoalProps) => {
    const [quote, setQuote] = useState<string>("");

    useEffect(() => {
        const getRandomQuote = (): string => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        };
        console.log(quotes.length);

        setQuote(getRandomQuote());
    }, []);

    return (
        <div className="todays-goal">
            <h2 className="todays-goal__heading">
                What is your main goal for today?
            </h2>
            <p className="todays-goal__quote">{quote}</p>
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
