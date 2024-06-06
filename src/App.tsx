import { useEffect, useState } from "react";
import Weather from "./components/Weather/Weather";
import Intro from "./components/Intro/Intro";
import { WeatherData } from "./types/WeatherData";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import "./App.scss";
import TodaysGoal from "./components/TodaysGoal/TodaysGoal";
import Spinner from "./components/Spinner/Spinner";
import { Todo } from "./types/todo";

function App() {
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>("");
    const [greeting, setGreeting] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    useEffect(() => {
        const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

        const fetchWeatherData = async (
            latitude: number,
            longitude: number
        ) => {
            try {
                const response = await fetch(
                    `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no`
                );
                const weatherData: WeatherData = await response.json();
                setData(weatherData);
            } catch (error) {
                if (error instanceof Error) setError(error.message);
            }
        };

        const getGreetingMessage = () => {
            const currentHour = new Date().getHours();
            if (currentHour < 12) return "Good Morning!";
            if (currentHour < 18) return "Good Afternoon!";
            return "Good Evening!";
        };

        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    fetchWeatherData(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setGreeting(getGreetingMessage());
                });
            } else {
                setError("Geolocation is not supported by this browser");
            }
        };

        getUserLocation();
    }, []);

    const addTodo = (text: string) => {
        const newTodos = [...todos, { text, isCompleted: false }];
        setTodos(newTodos);
    };

    const completeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    const removeTodo = (index: number) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            try {
                const parsedTodos = JSON.parse(storedTodos);
                setTodos(parsedTodos);
            } catch (error) {
                console.error(
                    "Failed to parse todos from localStorage:",
                    error
                );
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    if (!data) return <Spinner />;
    return (
        <>
            <Intro
                greeting={greeting}
                name={data.location.name}
                region={data.location.region}
                country={data.location.country}
            />
            <Weather data={data} error={error} />
            <TodaysGoal todos={todos} />
            <TodoForm addTodo={addTodo} />
            <TodoList
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
            />
        </>
    );
}

export default App;
